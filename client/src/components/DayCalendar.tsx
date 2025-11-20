import DayCard from "./DayCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, TrendingDown, Gift } from "lucide-react";
import { 
  calculatePoints, 
  getCurrentDiscount, 
  getCurrentPrice, 
  getNextRewardStage, 
  REWARD_STAGES 
} from "@/lib/rewards";

interface DayCalendarProps {
  completedDays: Set<number>;
  onDayClick: (day: number) => void;
  freeDaysLimit?: number;
}

export default function DayCalendar({ completedDays, onDayClick, freeDaysLimit = 10 }: DayCalendarProps) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const completedCount = completedDays.size;
  const points = calculatePoints(completedCount);
  const currentDiscount = getCurrentDiscount(completedCount);
  const currentPrice = getCurrentPrice(completedCount);
  const nextStage = getNextRewardStage(completedCount);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Calendário do Desafio - 30 Dias
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Complete os 30 dias e ganhe 10% de desconto a cada etapa! Primeiros 10 dias grátis. Clique em cada dia para ver as dicas, receitas e marcar como concluído
        </p>

        <Card 
          className="mb-8 p-6 border-4"
          style={{
            backgroundColor: '#f0f9ff',
            borderColor: '#7c3aed',
            boxShadow: '0 8px 20px rgba(124, 58, 237, 0.2)'
          }}
          data-testid="reward-progress-banner"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Star className="w-8 h-8 text-purple-600" />
              <div className="text-sm font-medium" style={{ color: '#6b7280' }}>Pontos</div>
              <div className="text-2xl font-bold" style={{ color: '#7c3aed' }}>{points}</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <div className="text-sm font-medium" style={{ color: '#6b7280' }}>Desconto Atual</div>
              <div className="text-2xl font-bold" style={{ color: '#16a34a' }}>{currentDiscount}%</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Gift className="w-8 h-8 text-blue-600" />
              <div className="text-sm font-medium" style={{ color: '#6b7280' }}>Próxima Meta</div>
              {nextStage ? (
                <div className="text-lg font-bold" style={{ color: '#2563eb' }}>
                  {nextStage.daysRequired} dias
                </div>
              ) : (
                <div className="text-lg font-bold" style={{ color: '#16a34a' }}>Completo!</div>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {days.map((day) => (
            <DayCard
              key={day}
              day={day}
              isCompleted={completedDays.has(day)}
              isLocked={day > freeDaysLimit}
              onClick={() => onDayClick(day)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}