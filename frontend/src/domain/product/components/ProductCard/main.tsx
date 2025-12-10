/**
 * Product Card Component
 * Displays product information in grid or list view
 */

import { cva } from 'class-variance-authority';
import { cn } from '@/core/lib/utils';
import { Badge } from '@/core/components/badge';
import { Card, CardContent } from '@/core/components/card';
import type { ProductCardProps } from './types';

const productCardVariants = cva(
  'group cursor-pointer transition-all duration-200 hover:shadow-lg',
  {
    variants: {
      viewMode: {
        grid: 'flex flex-col',
        list: 'flex flex-row gap-4',
      },
    },
    defaultVariants: {
      viewMode: 'grid',
    },
  }
);

function ProductCard({ product, viewMode = 'grid', className }: ProductCardProps) {
  const formatPrice = (price: number | null) => {
    if (price === null) return 'Sob consulta';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Card
      className={cn(productCardVariants({ viewMode }), className)}
      role="article"
      aria-label={`Produto: ${product.name}`}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-t-xl',
          viewMode === 'grid' ? 'aspect-square w-full' : 'h-48 w-48 shrink-0 rounded-l-xl'
        )}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-2">
          {product.featured && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Destaque
            </Badge>
          )}
        </div>

        <div className="absolute right-2 top-2 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Novo
            </Badge>
          )}
        </div>

        <div className="absolute bottom-2 right-2 flex flex-col gap-2">
          {product.onSale && (
            <Badge variant="destructive" className="bg-destructive text-white">
              Promoção
            </Badge>
          )}
        </div>

        {/* Unavailable overlay */}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="outline" className="text-foreground border-white bg-white/90">
              Indisponível
            </Badge>
          </div>
        )}
      </div>

      <CardContent className={cn('flex flex-1 flex-col gap-2', viewMode === 'list' && 'py-4')}>
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.category}</p>
        </div>

        <div className="mt-auto">
          <p
            className={cn(
              'text-lg font-bold',
              product.price === null ? 'text-muted-foreground text-sm' : 'text-primary'
            )}
          >
            {formatPrice(product.price)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProductCard, productCardVariants };
