
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

interface MilestoneDialogProps {
  open: boolean;
  onClose: () => void;
  daysCompleted: number;
}

export default function MilestoneDialog({ open, onClose, daysCompleted }: MilestoneDialogProps) {
  const milestoneData = {
    3: {
      title: "Parabéns! 🎉",
      subtitle: "Você completou 3 dias do desafio!",
      benefits: [
        { text: "Perda de peso estimada:", value: "-0.2kg a -0.2kg" },
        { text: "Metabolismo mais acelerado", value: "" }
      ],
      message: "Você está no caminho certo! Os primeiros 3 dias são os mais difíceis e você conseguiu!",
      encouragement: "Continue assim! Você está cada vez mais perto do corpo dos seus sonhos."
    },
    6: {
      title: "Parabéns! 🎉",
      subtitle: "Você completou 6 dias do desafio!",
      benefits: [
        { text: "Perda de peso estimada:", value: "-0.4kg a -0.6kg" },
        { text: "Mais energia e disposição", value: "" }
      ],
      message: "Você está no caminho certo! Metade da primeira semana completada!",
      encouragement: "Continue assim! Você está cada vez mais perto do corpo dos seus sonhos."
    }
  };

  const data = milestoneData[daysCompleted as 3 | 6];
  
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          {/* Ícone de recompensa */}
          <div className="relative">
            <Award className="w-16 h-16 text-orange-500" />
            <div className="absolute -top-1 -right-1">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💙</span>
              </div>
            </div>
          </div>

          {/* Título */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {data.title}
            </h2>
            <p className="text-gray-600">
              {data.subtitle}
            </p>
          </div>

          {/* Benefícios conquistados */}
          <div className="w-full bg-green-50 rounded-lg p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-600">✓</span>
              <h3 className="font-semibold text-green-900">
                Benefícios Já Conquistados
              </h3>
            </div>
            <div className="space-y-2">
              {data.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">
                    {benefit.text} {benefit.value && <span className="font-semibold">{benefit.value}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mensagem de encorajamento */}
          <div className="w-full bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-blue-700 text-sm font-medium">
              {data.message}
            </p>
          </div>

          <p className="text-gray-600 text-sm">
            {data.encouragement}
          </p>

          {/* Botões */}
          <div className="flex gap-3 w-full pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              <span className="mr-2">📤</span>
              Compartilhar
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              onClick={onClose}
            >
              Continuar Desafio
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
