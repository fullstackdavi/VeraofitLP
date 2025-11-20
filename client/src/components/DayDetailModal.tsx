
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, UtensilsCrossed, CheckCircle2, Dumbbell, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DayData {
  day: number;
  tip: string;
  exercise: {
    name: string;
    duration: string;
    description: string;
    sets: Array<{ exercise: string; reps: string }>;
  };
  recipe: {
    name: string;
    ingredients: string[];
    steps: string[];
  };
}

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayData: DayData;
  isCompleted: boolean;
  onToggleComplete: () => void;
  isLocked?: boolean;
  onUnlock?: () => void;
  onContinue?: () => void;
}

export default function DayDetailModal({
  isOpen,
  onClose,
  dayData,
  isCompleted,
  onToggleComplete,
  isLocked = false,
  onUnlock,
  onContinue,
}: DayDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-day-detail">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            Dia {dayData.day}
            {isCompleted && (
              <Badge className="bg-chart-3 text-white">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Concluído
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Siga as orientações do dia para conquistar seus objetivos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Dica do Dia - Sempre bloqueada para usuários não premium */}
          <div className="bg-accent/30 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold text-gray-700">
                  Desbloqueie o pacote completo para acessar as dicas do dia
                </p>
                <Button 
                  onClick={onUnlock} 
                  size="sm" 
                  className="mt-3 bg-gradient-to-r from-blue-600 to-orange-600"
                >
                  Desbloquear Agora
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-3 blur-sm">
              <div className="bg-primary rounded-full p-2">
                <Lightbulb className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Dica do Dia</h3>
            </div>
            <p className="text-foreground leading-relaxed blur-sm">
              {dayData.tip}
            </p>
          </div>

          {/* Exercício do Dia - Sempre bloqueado para usuários não premium */}
          <div className="bg-blue-50/30 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold text-gray-700">
                  Desbloqueie o pacote completo para acessar o cronograma de exercícios
                </p>
                <Button 
                  onClick={onUnlock} 
                  size="sm" 
                  className="mt-3 bg-gradient-to-r from-blue-600 to-orange-600"
                >
                  Desbloquear Agora
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-4 blur-sm">
              <div className="bg-blue-600 rounded-full p-2">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Exercício do Dia</h3>
            </div>
            <div className="blur-sm">
              <h4 className="font-semibold text-foreground mb-2">{dayData.exercise.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">Duração: {dayData.exercise.duration}</p>
              <p className="text-foreground text-sm mb-4">{dayData.exercise.description}</p>
              {dayData.exercise.sets.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Séries:</p>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    {dayData.exercise.sets.map((set, index) => (
                      <li key={index} className="text-sm">
                        {set.exercise} - {set.reps}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Receita - Sempre visível */}
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-secondary rounded-full p-2">
                <UtensilsCrossed className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Receita Saudável</h3>
            </div>
            
            <h4 className="font-semibold text-foreground mb-2" data-testid="text-recipe-name">
              {dayData.recipe.name}
            </h4>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Ingredientes:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground">
                {dayData.recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Modo de Preparo:</p>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                {dayData.recipe.steps.map((step, index) => (
                  <li key={index} className="text-sm">{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <div className="flex gap-3">
              <Button
                className="flex-1"
                variant={isCompleted ? "outline" : "default"}
                onClick={onToggleComplete}
                data-testid="button-toggle-complete"
              >
                {isCompleted ? "Desmarcar como Feito" : "Marcar como Feito"}
              </Button>
              <Button variant="outline" onClick={onClose} data-testid="button-close">
                Fechar
              </Button>
            </div>
            
            {isCompleted && dayData.day === 10 && isLocked && onUnlock && (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white"
                onClick={onUnlock}
                data-testid="button-unlock-checkout"
              >
                🔓 Desbloquear Dias 11-30 Agora
              </Button>
            )}
            
            {isCompleted && onContinue && dayData.day < 30 && !(dayData.day === 10 && isLocked) && (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={onContinue}
                data-testid="button-continue"
              >
                ▶ Continuar para Próximo Dia
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
