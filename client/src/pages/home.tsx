import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ProgressBar from "@/components/ProgressBar";
import DayCalendar from "@/components/DayCalendar";
import DayDetailModal from "@/components/DayDetailModal";
import PaymentSection from "@/components/PaymentSection";
import UpgradeCallToAction from "@/components/UpgradeCallToAction";
import { useToast } from "@/hooks/use-toast";
import { checkNewStageUnlocked, calculatePoints, getCurrentDiscount, getCurrentPrice } from "@/lib/rewards";

const CHALLENGE_DATA = [
  {
    day: 1,
    tip: "Beba pelo menos 2 litros de água ao longo do dia e caminhe por 30 minutos. A hidratação é essencial para o metabolismo e a caminhada ajuda a queimar calorias.",
    exercise: {
      name: "Caminhada Leve",
      duration: "30 minutos",
      description: "Caminhe em ritmo confortável, mantendo uma respiração constante.",
      sets: []
    },
    recipe: {
      name: "Salada de Quinoa com Legumes",
      ingredients: ["1 xícara de quinoa cozida", "1 tomate picado", "1 pepino picado", "1/2 cebola roxa", "Suco de 1 limão", "Azeite, sal e pimenta"],
      steps: ["Cozinhe a quinoa e deixe esfriar", "Misture todos os vegetais picados", "Tempere com limão, azeite, sal e pimenta", "Sirva gelado"]
    }
  },
  {
    day: 2,
    tip: "Faça 20 minutos de exercícios aeróbicos pela manhã. O exercício matinal acelera o metabolismo para o resto do dia.",
    exercise: {
      name: "Exercícios Aeróbicos",
      duration: "20 minutos",
      description: "Polichinelos e corrida estacionária alternados.",
      sets: [
        { exercise: "Polichinelos", reps: "3x30 segundos" },
        { exercise: "Corrida estacionária", reps: "3x1 minuto" }
      ]
    },
    recipe: {
      name: "Omelete de Claras com Espinafre",
      ingredients: ["4 claras de ovo", "1 xícara de espinafre", "1/2 tomate picado", "Sal e pimenta"],
      steps: ["Bata as claras levemente", "Adicione espinafre e tomate", "Cozinhe em fogo médio por 3-4 minutos", "Dobre ao meio e sirva"]
    }
  },
  {
    day: 3,
    tip: "Evite açúcar refinado hoje. Substitua por frutas frescas quando sentir vontade de doce.",
    exercise: {
      name: "Alongamento Matinal",
      duration: "15 minutos",
      description: "Alongue todo o corpo de forma suave.",
      sets: []
    },
    recipe: {
      name: "Smoothie Verde Detox",
      ingredients: ["1 banana", "1 xícara de espinafre", "1/2 maçã verde", "200ml de água de coco", "Gelo"],
      steps: ["Coloque todos os ingredientes no liquidificador", "Bata até ficar homogêneo", "Sirva imediatamente"]
    }
  },
  {
    day: 4,
    tip: "Faça 30 agachamentos e 20 flexões. Exercícios de força ajudam a tonificar e queimar gordura.",
    exercise: {
      name: "Treino de Força Básico",
      duration: "25 minutos",
      description: "Exercícios para fortalecer e tonificar o corpo.",
      sets: [
        { exercise: "Agachamentos", reps: "3x10" },
        { exercise: "Flexões (pode ser de joelhos)", reps: "3x8" },
        { exercise: "Prancha", reps: "3x20 segundos" }
      ]
    },
    recipe: {
      name: "Frango Grelhado com Brócolis",
      ingredients: ["1 peito de frango", "2 xícaras de brócolis", "Alho, limão e azeite"],
      steps: ["Tempere o frango com alho e limão", "Grelhe por 6-8 minutos de cada lado", "Cozinhe o brócolis no vapor por 5 minutos", "Sirva com azeite"]
    }
  },
  {
    day: 5,
    tip: "Pratique 15 minutos de meditação ou yoga. O controle do estresse ajuda na perda de peso.",
    exercise: {
      name: "Yoga para Iniciantes",
      duration: "15 minutos",
      description: "Sequência básica de yoga para relaxamento e alongamento.",
      sets: []
    },
    recipe: {
      name: "Bowl de Açaí Light",
      ingredients: ["1 pack de açaí sem açúcar", "1/2 banana", "Granola integral", "Morangos"],
      steps: ["Bata o açaí com meio copo de água", "Coloque na tigela", "Adicione banana, granola e morangos", "Sirva imediatamente"]
    }
  },
  {
    day: 6,
    tip: "Caminhe 10.000 passos hoje. Use um aplicativo contador de passos para monitorar.",
    exercise: {
      name: "Caminhada Ativa",
      duration: "45 minutos",
      description: "Caminhe em ritmo acelerado para atingir 10.000 passos.",
      sets: []
    },
    recipe: {
      name: "Sopa de Legumes",
      ingredients: ["2 cenouras", "1 abobrinha", "1 cebola", "2 tomates", "Caldo de legumes", "Temperos"],
      steps: ["Refogue a cebola", "Adicione os legumes picados", "Cubra com caldo de legumes", "Cozinhe por 20 minutos"]
    }
  },
  {
    day: 7,
    tip: "Parabéns! Você completou os 7 dias! Continue com os hábitos saudáveis que adquiriu.",
    exercise: {
      name: "Celebração Final",
      duration: "30 minutos",
      description: "Treino completo para celebrar sua conquista!",
      sets: [
        { exercise: "Todos os exercícios favoritos", reps: "À vontade" }
      ]
    },
    recipe: {
      name: "Celebration Bowl",
      ingredients: ["Arroz integral", "Frango grelhado", "Legumes grelhados", "Abacate", "Molho tahine"],
      steps: ["Cozinhe o arroz", "Grelhe frango e legumes", "Monte tudo em uma tigela", "Finalize com abacate e molho"]
    }
  }
];

const FREE_DAYS_LIMIT = 7;

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showUpgradeCTA, setShowUpgradeCTA] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('completedDays');
    if (stored) {
      setCompletedDays(new Set(JSON.parse(stored)));
    }

    const premium = localStorage.getItem('isPremiumUser');
    if (premium === 'true') {
      setIsPremiumUser(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedDays', JSON.stringify(Array.from(completedDays)));

    const freeCompletedDays = Array.from(completedDays).filter(day => day <= FREE_DAYS_LIMIT);
    if (freeCompletedDays.length >= 5 && !isPremiumUser) {
      setShowUpgradeCTA(true);
    }
  }, [completedDays, isPremiumUser]);

  const saveProgress = (days: Set<number>) => {
    localStorage.setItem('completedDays', JSON.stringify(Array.from(days)));
  };

  const handleDayClick = (day: number) => {
    if (day > FREE_DAYS_LIMIT && !isPremiumUser) {
      setShowUpgradeCTA(true);
      setTimeout(() => {
        const paymentSection = document.getElementById('payment-section');
        paymentSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (day: number) => {
    const previousSize = completedDays.size;
    
    setCompletedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
        
        const newStage = checkNewStageUnlocked(previousSize, newSet.size);
        
        if (newStage) {
          const points = calculatePoints(newSet.size);
          const discount = getCurrentDiscount(newSet.size);
          const price = getCurrentPrice(newSet.size);
          
          setTimeout(() => {
            toast({
              title: `🎉 Etapa ${newStage.stage} Desbloqueada!`,
              description: (
                <div className="space-y-2">
                  <p className="font-semibold text-green-600">Novo Bônus: {newStage.bonus}</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Pontos</p>
                      <p className="font-bold">{points}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Desconto</p>
                      <p className="font-bold text-green-600">{discount}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Preço</p>
                      <p className="font-bold text-orange-600">R$ {price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ),
              duration: 5000,
            });
          }, 300);
        }
      }
      saveProgress(newSet);
      return newSet;
    });
  };

  const handleContinueToNext = (currentDay: number) => {
    if (currentDay < CHALLENGE_DATA.length) {
      const nextDay = currentDay + 1;
      
      if (nextDay > FREE_DAYS_LIMIT && !isPremiumUser) {
        setIsModalOpen(false);
        setShowUpgradeCTA(true);
        setTimeout(() => {
          const paymentSection = document.getElementById('payment-section');
          paymentSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        return;
      }
      
      setSelectedDay(nextDay);
    } else {
      setIsModalOpen(false);
      
      toast({
        title: "🎉 Parabéns!",
        description: "Você completou todos os 7 dias do desafio!",
        duration: 5000,
      });
    }
  };

  const handleUpgrade = () => {
    setIsPremiumUser(true);
    localStorage.setItem('isPremiumUser', 'true');
    setShowUpgradeCTA(false);

    const paymentSection = document.getElementById('payment-section');
    if (paymentSection && !isElementInView(paymentSection)) {
      paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleStartChallenge = () => {
    const calendar = document.getElementById('calendar-section');
    calendar?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentDayData = selectedDay !== null ? CHALLENGE_DATA[selectedDay - 1] : null;

  return (
    <div className="min-h-screen">
      <HeroSection onStartChallenge={handleStartChallenge} />

      <div className="py-12 space-y-12 container mx-auto px-4">
        <ProgressBar
          completedDays={completedDays.size}
          totalDays={7}
        />

        <div id="calendar-section">
          <DayCalendar
            completedDays={completedDays}
            onDayClick={handleDayClick}
            freeDaysLimit={isPremiumUser ? CHALLENGE_DATA.length : FREE_DAYS_LIMIT}
          />
        </div>

        {showUpgradeCTA && !isPremiumUser && (
          <UpgradeCallToAction onUpgrade={handleUpgrade} />
        )}

        <div id="payment-section">
          <PaymentSection />
        </div>
      </div>

      {currentDayData && (
        <DayDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dayData={currentDayData}
          isCompleted={completedDays.has(selectedDay!)}
          onToggleComplete={() => handleToggleComplete(selectedDay!)}
          isLocked={!isPremiumUser}
          onUnlock={() => handleUpgrade()}
          onContinue={() => handleContinueToNext(selectedDay!)}
        />
      )}
    </div>
  );
}

function isElementInView(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
