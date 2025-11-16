import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayCardProps {
  day: number;
  isCompleted: boolean;
  isLocked?: boolean; // Adicionado para indicar se o dia está bloqueado
  onClick: () => void;
}

export default function DayCard({ day, isCompleted, isLocked = false, onClick }: DayCardProps) {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`
        relative rounded-xl p-5 border-2 text-center transition-all duration-200
        ${isLocked 
          ? 'bg-gray-200/70 border-gray-300 cursor-not-allowed opacity-60' 
          : isCompleted 
            ? 'bg-green-50 border-green-500 hover:bg-green-100 hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
            : 'bg-white border-gray-200 hover:border-primary hover:shadow-lg hover:-translate-y-1 cursor-pointer'
        }
      `}
      style={{ 
        backgroundColor: isLocked ? '#e5e7eb' : isCompleted ? '#f0fdf4' : '#ffffff',
        borderColor: isLocked ? '#d1d5db' : isCompleted ? '#22c55e' : '#e5e7eb'
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <span className={`text-3xl font-bold ${isLocked ? 'opacity-40' : ''}`}
        style={{ 
          color: isLocked ? '#9ca3af' : isCompleted ? '#16a34a' : '#374151',
          textShadow: 'none'
        }}>
          {day}
        </span>
        <span className={`text-xs ${isLocked ? 'opacity-40' : 'text-muted-foreground'}`}
        style={{ 
          color: isLocked ? '#9ca3af' : isCompleted ? '#16a34a' : '#374151',
          textShadow: 'none'
        }}>
          Dia {day}
        </span>
        {isCompleted && !isLocked && (
          <CheckCircle2 className="w-7 h-7 text-green-600 absolute top-2 right-2" style={{ color: '#16a34a' }} />
        )}
        {isLocked && (
          <Lock className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }} />
        )}
      </div>
    </div>
  );
}