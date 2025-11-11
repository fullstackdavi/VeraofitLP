import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartChallenge: () => void;
}

export default function HeroSection({ onStartChallenge }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      <div className="relative z-10 container mx-auto px-4 py-16 text-center max-w-4xl">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Verão Fit
        </h1>
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
          Desafio de 30 Dias
        </h2>
        
        <p className="text-white/95 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Receitas, desafios e checkpoints para secar até o verão. 
          Transforme seu corpo com um plano completo de 30 dias.
        </p>
        
        <Button 
          size="lg"
          variant="secondary"
          className="text-lg px-8 py-6 h-auto font-semibold hover:scale-105 transition-transform"
          onClick={onStartChallenge}
          data-testid="button-start-challenge"
        >
          Entrar no Desafio
        </Button>
        
        <p className="text-white/80 text-sm mt-6">
          ✨ Mais de 500 pessoas já começaram
        </p>
      </div>
    </section>
  );
}
