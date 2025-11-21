
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";

interface UpgradeCallToActionProps {
  onUpgrade: () => void;
}

export default function UpgradeCallToAction({ onUpgrade }: UpgradeCallToActionProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto my-8 sm:my-12 border-2 border-blue-500 shadow-2xl bg-gradient-to-br from-blue-50 to-orange-50">
      <CardHeader className="text-center space-y-3 sm:space-y-4 pb-6 sm:pb-8 p-4 sm:p-6">
        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent px-2">
          Você está arrasando! 🎉
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-gray-700 px-2">
          Parabéns por completar os primeiros 10 dias! Agora é hora de ir mais longe...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="bg-white rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Desbloqueie o Desafio Completo de 30 Dias
          </h3>
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-sm sm:text-base text-gray-700">20 dias adicionais de receitas exclusivas</span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-sm sm:text-base text-gray-700">Dicas avançadas de emagrecimento</span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-sm sm:text-base text-gray-700">Plano nutricional completo</span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-sm sm:text-base text-gray-700">Suporte e acompanhamento</span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-block">
            <div className="text-xs sm:text-sm text-gray-600 line-through">De R$ 59,90</div>
            <div className="text-4xl sm:text-5xl font-bold text-gray-900">
              R$ 29<span className="text-2xl sm:text-3xl">,90</span>
            </div>
            <div className="text-xs sm:text-sm text-green-600 font-semibold px-2">
              50% DE DESCONTO - Oferta por tempo limitado!
            </div>
          </div>

          <Button 
            onClick={onUpgrade}
            size="lg"
            className="w-full md:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Desbloquear Desafio Completo Agora
          </Button>

          <p className="text-xs sm:text-sm text-gray-600 px-2">
            🔒 Pagamento 100% seguro • Acesso imediato após a confirmação
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
