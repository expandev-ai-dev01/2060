import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';
import { PackageIcon } from 'lucide-react';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
      <PackageIcon className="size-16 text-primary" />
      <h1 className="text-4xl font-bold">Bem-vindo à Lozorio Móveis</h1>
      <p className="text-muted-foreground max-w-2xl text-lg">
        Explore nosso catálogo completo de móveis de alta qualidade para todos os ambientes da sua
        casa.
      </p>
      <Button size="lg" onClick={() => navigate('/catalog')}>
        Ver Catálogo
      </Button>
    </div>
  );
}

export { HomePage };
