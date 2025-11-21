import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, CheckCircle2 } from "lucide-react";

export default function PaymentSection() {
  const benefits = [
    "30 dias de desafios personalizados",
    "Receitas saudáveis e práticas",
    "Checkpoints diários de progresso",
    "Dicas de nutrição e exercícios",
    "Acompanhamento visual do seu progresso",
    "Acesso vitalício ao conteúdo"
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
            🔥 OFERTA ESPECIAL DE LANÇAMENTO
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Desbloqueie os 30 Dias Completos
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Você já experimentou os primeiros 10 dias gratuitos. Agora continue sua jornada com acesso completo!
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">Mais 20 Dias de Receitas</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Continue com receitas exclusivas e variadas</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">Dicas Avançadas</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Técnicas profissionais de emagrecimento</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">Acesso Vitalício</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Refaça o desafio quantas vezes quiser</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">Garantia de 7 Dias</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Satisfação garantida ou seu dinheiro de volta</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-2 border-orange-500">
            <CardHeader className="text-center bg-gradient-to-br from-orange-50 to-blue-50 p-4 sm:p-6">
              <div className="text-xs sm:text-sm text-orange-600 font-semibold mb-2">
                50% OFF - SOMENTE HOJE
              </div>
              <CardTitle className="text-xl sm:text-2xl">Desafio Completo de 30 Dias</CardTitle>
              <CardDescription className="text-sm">Desbloqueie todos os dias agora</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="text-center">
                <div className="text-base sm:text-lg text-gray-500 line-through mb-1">
                  De R$ 59,90
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  R$ 29<span className="text-2xl sm:text-3xl">,90</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-2">
                  Pagamento único • Acesso vitalício
                </div>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-green-600">
                  💚 Mais de 500 pessoas já começaram
                </div>
              </div>

              <Button
                size="lg"
                className="w-full text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
                onClick={() => window.open('https://pay.kirvano.com/7ae6b1fa-9f19-477b-83e8-cdd267f712c2', '_blank')}
              >
                🔓 Desbloquear Agora - R$ 29,90
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                🔒 Pagamento 100% seguro • Garantia de 7 dias
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-xs sm:text-sm text-muted-foreground italic">
            "Melhor investimento que fiz para minha saúde! Já perdi 5kg nos primeiros 15 dias." - Ana Silva
          </p>
        </div>
      </div>
    </section>
  );
}