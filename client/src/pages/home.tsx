import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ProgressBar from "@/components/ProgressBar";
import DayCalendar from "@/components/DayCalendar";
import DayDetailModal from "@/components/DayDetailModal";
import PaymentSection from "@/components/PaymentSection";
import UpgradeCallToAction from "@/components/UpgradeCallToAction";
import { useToast } from "@/hooks/use-toast";
import { checkNewStageUnlocked, calculatePoints, getCurrentDiscount, getCurrentPrice } from "@/lib/rewards";

//todo: remove mock functionality - Replace with real data from backend
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
    tip: "Dia de descanso ativo! Faça alongamentos suaves e descanse bem para recuperação muscular.",
    exercise: {
      name: "Descanso Ativo",
      duration: "20 minutos",
      description: "Alongamento suave e respiração profunda.",
      sets: []
    },
    recipe: {
      name: "Wrap Integral de Atum",
      ingredients: ["1 tortilha integral", "1 lata de atum", "Alface", "Tomate", "Cenoura ralada"],
      steps: ["Escorra o atum", "Coloque todos os ingredientes na tortilha", "Enrole firmemente", "Corte ao meio e sirva"]
    }
  },
  {
    day: 8,
    tip: "Elimine refrigerantes e bebidas açucaradas. Beba água com limão ou chás naturais.",
    exercise: {
      name: "Cardio Intervalado",
      duration: "25 minutos",
      description: "Alterne entre alta e baixa intensidade.",
      sets: [
        { exercise: "Corrida estacionária rápida", reps: "5x1 minuto" },
        { exercise: "Caminhada leve", reps: "5x2 minutos" }
      ]
    },
    recipe: {
      name: "Tapioca com Queijo Cottage",
      ingredients: ["3 colheres de goma de tapioca", "2 colheres de queijo cottage", "Tomate cereja", "Manjericão"],
      steps: ["Hidrate a tapioca", "Faça a tapioca na frigideira", "Recheie com cottage e tomate", "Finalize com manjericão"]
    }
  },
  {
    day: 9,
    tip: "Faça 25 abdominais e 30 segundos de prancha. Fortaleça o core!",
    exercise: {
      name: "Treino de Core",
      duration: "20 minutos",
      description: "Fortaleça o abdômen e a região central do corpo.",
      sets: [
        { exercise: "Abdominais", reps: "3x15" },
        { exercise: "Prancha", reps: "3x30 segundos" },
        { exercise: "Prancha lateral", reps: "3x20 segundos cada lado" }
      ]
    },
    recipe: {
      name: "Salada Caprese Light",
      ingredients: ["Tomates", "Mussarela de búfala light", "Manjericão fresco", "Azeite e vinagre balsâmico"],
      steps: ["Fatie tomates e mussarela", "Intercale com manjericão", "Regue com azeite e vinagre", "Tempere com sal e pimenta"]
    }
  },
  {
    day: 10,
    tip: "Aumente a intensidade! 40 minutos de cardio moderado hoje.",
    exercise: {
      name: "Cardio Moderado",
      duration: "40 minutos",
      description: "Corrida leve ou bicicleta em ritmo constante.",
      sets: []
    },
    recipe: {
      name: "Peixe Assado com Legumes",
      ingredients: ["1 filé de peixe branco", "Abobrinha", "Cenoura", "Pimentão", "Limão e ervas"],
      steps: ["Tempere o peixe com limão e ervas", "Corte os legumes em tiras", "Disponha tudo em uma assadeira", "Asse a 180°C por 25 minutos"]
    }
  },
  {
    day: 11,
    tip: "Mastigue devagar e saboreie cada refeição. Isso ajuda na digestão e saciedade.",
    exercise: {
      name: "Pilates Básico",
      duration: "30 minutos",
      description: "Exercícios de pilates para fortalecer e alongar.",
      sets: []
    },
    recipe: {
      name: "Panqueca de Banana e Aveia",
      ingredients: ["1 banana", "2 ovos", "3 colheres de aveia", "Canela"],
      steps: ["Amasse a banana", "Misture com ovos e aveia", "Adicione canela", "Cozinhe em frigideira antiaderente"]
    }
  },
  {
    day: 12,
    tip: "Durma pelo menos 7-8 horas. O sono adequado é crucial para a perda de peso.",
    exercise: {
      name: "Treino Leve de Recuperação",
      duration: "20 minutos",
      description: "Alongamento e respiração para promover o relaxamento.",
      sets: []
    },
    recipe: {
      name: "Risoto de Cogumelos Light",
      ingredients: ["Arroz integral", "Cogumelos variados", "Cebola", "Caldo de legumes", "Queijo parmesão light"],
      steps: ["Refogue cebola e cogumelos", "Adicione o arroz", "Vá adicionando caldo aos poucos", "Finalize com queijo"]
    }
  },
  {
    day: 13,
    tip: "Faça treino intervalado: 1 min intenso, 2 min leve, repita 10x.",
    exercise: {
      name: "HIIT Intervalado",
      duration: "30 minutos",
      description: "Alterne entre alta e baixa intensidade.",
      sets: [
        { exercise: "Burpees", reps: "10x1 minuto" },
        { exercise: "Caminhada leve", reps: "10x2 minutos" }
      ]
    },
    recipe: {
      name: "Salada de Grão-de-Bico",
      ingredients: ["1 lata de grão-de-bico", "Pepino", "Tomate", "Cebola roxa", "Salsinha", "Limão"],
      steps: ["Escorra e lave o grão-de-bico", "Pique todos os vegetais", "Misture tudo", "Tempere com limão, sal e azeite"]
    }
  },
  {
    day: 14,
    tip: "Avalie seu progresso! Tire fotos e anote suas medidas. Metade do caminho!",
    exercise: {
      name: "Treino Completo",
      duration: "35 minutos",
      description: "Combine cardio e força para avaliar seu progresso.",
      sets: [
        { exercise: "Agachamentos", reps: "3x15" },
        { exercise: "Flexões", reps: "3x12" },
        { exercise: "Polichinelos", reps: "3x30" },
        { exercise: "Prancha", reps: "3x40 segundos" }
      ]
    },
    recipe: {
      name: "Bowl de Iogurte Grego",
      ingredients: ["200g iogurte grego natural", "Frutas vermelhas", "Granola", "Mel", "Chia"],
      steps: ["Coloque o iogurte na tigela", "Adicione frutas", "Polvilhe granola e chia", "Finalize com um fio de mel"]
    }
  },
  {
    day: 15,
    tip: "Aumente a ingestão de proteínas. Elas mantêm a saciedade por mais tempo.",
    exercise: {
      name: "Treino de Pernas",
      duration: "30 minutos",
      description: "Foque em fortalecer as pernas e glúteos.",
      sets: [
        { exercise: "Agachamentos", reps: "4x12" },
        { exercise: "Avanços", reps: "3x10 cada perna" },
        { exercise: "Elevação de panturrilha", reps: "3x15" }
      ]
    },
    recipe: {
      name: "Hambúrguer de Frango Caseiro",
      ingredients: ["500g peito de frango moído", "1 ovo", "Aveia", "Alho e cebola", "Temperos"],
      steps: ["Misture todos os ingredientes", "Molde os hambúrgueres", "Grelhe ou asse", "Sirva com salada"]
    }
  },
  {
    day: 16,
    tip: "Faça uma aula online de dança ou zumba. Exercício divertido queima mais calorias!",
    exercise: {
      name: "Dança Fitness",
      duration: "40 minutos",
      description: "Dance livremente ao som de músicas animadas.",
      sets: []
    },
    recipe: {
      name: "Ceviche de Peixe",
      ingredients: ["400g peixe branco em cubos", "Suco de 3 limões", "Cebola roxa", "Coentro", "Pimenta"],
      steps: ["Marine o peixe no limão por 15 min", "Adicione cebola e coentro", "Tempere com sal e pimenta", "Sirva gelado"]
    }
  },
  {
    day: 17,
    tip: "Evite comer 3 horas antes de dormir. Isso melhora a digestão e o sono.",
    exercise: {
      name: "Yoga Noturno",
      duration: "20 minutos",
      description: "Posturas relaxantes para melhorar o sono.",
      sets: []
    },
    recipe: {
      name: "Espaguete de Abobrinha",
      ingredients: ["2 abobrinhas grandes", "Molho de tomate caseiro", "Manjericão", "Alho"],
      steps: ["Corte a abobrinha em tiras finas", "Refogue levemente", "Adicione o molho de tomate", "Finalize com manjericão"]
    }
  },
  {
    day: 18,
    tip: "Faça 50 polichinelos e 30 mountain climbers. Aumente a intensidade!",
    exercise: {
      name: "Treino Cardio Intenso",
      duration: "30 minutos",
      description: "Exercícios de alta intensidade.",
      sets: [
        { exercise: "Polichinelos", reps: "5x50" },
        { exercise: "Mountain climbers", reps: "5x30" },
        { exercise: "Burpees", reps: "3x10" }
      ]
    },
    recipe: {
      name: "Tofu Grelhado com Gergelim",
      ingredients: ["200g tofu firme", "Molho shoyu", "Gergelim", "Gengibre", "Alho"],
      steps: ["Corte o tofu em fatias", "Marine no shoyu com alho e gengibre", "Grelhe até dourar", "Polvilhe gergelim"]
    }
  },
  {
    day: 19,
    tip: "Beba chá verde ou chá branco. Eles aceleram o metabolismo naturalmente.",
    exercise: {
      name: "Caminhada Energética",
      duration: "35 minutos",
      description: "Caminhe em ritmo acelerado ao ar livre.",
      sets: []
    },
    recipe: {
      name: "Bruschetta de Tomate",
      ingredients: ["Pão integral", "Tomates", "Manjericão", "Alho", "Azeite"],
      steps: ["Toste o pão", "Pique tomate com manjericão", "Misture com alho e azeite", "Coloque sobre o pão"]
    }
  },
  {
    day: 20,
    tip: "Faça uma caminhada de 45 minutos ao ar livre. Aproveite a natureza!",
    exercise: {
      name: "Caminhada na Natureza",
      duration: "45 minutos",
      description: "Aproveite o ar livre e conecte-se com a natureza.",
      sets: []
    },
    recipe: {
      name: "Curry de Lentilha",
      ingredients: ["1 xícara de lentilha", "Leite de coco light", "Curry em pó", "Cebola", "Tomate"],
      steps: ["Cozinhe a lentilha", "Refogue cebola e tomate", "Adicione curry e leite de coco", "Misture com a lentilha"]
    }
  },
  {
    day: 21,
    tip: "Três semanas completas! Continue firme. O resultado já é visível!",
    exercise: {
      name: "Treino Celebração",
      duration: "40 minutos",
      description: "Circuito completo para celebrar sua jornada.",
      sets: [
        { exercise: "Agachamentos", reps: "3x20" },
        { exercise: "Flexões", reps: "3x15" },
        { exercise: "Abdominais", reps: "3x20" },
        { exercise: "Prancha", reps: "3x45 segundos" }
      ]
    },
    recipe: {
      name: "Salada Caesar Light",
      ingredients: ["Alface romana", "Frango grelhado", "Croutons integrais", "Molho caesar light", "Parmesão"],
      steps: ["Grelhe o frango", "Rasgue a alface", "Adicione croutons", "Regue com molho e polvilhe queijo"]
    }
  },
  {
    day: 22,
    tip: "Faça agachamentos com salto - 3 séries de 15. Queime gordura e ganhe massa!",
    exercise: {
      name: "Treino Pliométrico",
      duration: "30 minutos",
      description: "Exercícios explosivos para queimar gordura.",
      sets: [
        { exercise: "Agachamentos com salto", reps: "3x15" },
        { exercise: "Avanços com salto", reps: "3x10 cada perna" },
        { exercise: "Burpees", reps: "3x12" }
      ]
    },
    recipe: {
      name: "Berinjela Recheada",
      ingredients: ["2 berinjelas", "Carne moída magra", "Tomate", "Cebola", "Queijo light"],
      steps: ["Corte berinjelas ao meio e retire o miolo", "Refogue carne com tomate e cebola", "Recheie as berinjelas", "Cubra com queijo e asse"]
    }
  },
  {
    day: 23,
    tip: "Hidrate-se! Beba 3 litros de água hoje e observe a diferença.",
    exercise: {
      name: "Natação ou Hidroginástica",
      duration: "45 minutos",
      description: "Exercícios aquáticos de baixo impacto.",
      sets: []
    },
    recipe: {
      name: "Tabule de Quinoa",
      ingredients: ["Quinoa cozida", "Tomate", "Pepino", "Hortelã", "Salsinha", "Limão"],
      steps: ["Pique todos os vegetais", "Misture com a quinoa", "Adicione ervas frescas", "Tempere com limão e azeite"]
    }
  },
  {
    day: 24,
    tip: "Pratique gratidão. Liste 5 coisas boas sobre sua jornada até aqui.",
    exercise: {
      name: "Meditação e Alongamento",
      duration: "25 minutos",
      description: "Exercícios para mente e corpo.",
      sets: []
    },
    recipe: {
      name: "Moqueca Light de Peixe",
      ingredients: ["Peixe", "Tomate", "Pimentão", "Cebola", "Leite de coco light", "Coentro"],
      steps: ["Disponha peixe em uma panela", "Adicione vegetais picados", "Regue com leite de coco", "Cozinhe por 20 minutos"]
    }
  },
  {
    day: 25,
    tip: "Faça burpees - 3 séries de 10. Exercício completo para todo o corpo!",
    exercise: {
      name: "Treino Full Body",
      duration: "35 minutos",
      description: "Treino completo de corpo inteiro.",
      sets: [
        { exercise: "Burpees", reps: "3x10" },
        { exercise: "Agachamentos", reps: "3x15" },
        { exercise: "Flexões", reps: "3x12" },
        { exercise: "Mountain climbers", reps: "3x20" }
      ]
    },
    recipe: {
      name: "Wrap de Alface com Peru",
      ingredients: ["Folhas de alface grandes", "Peito de peru", "Cenoura ralada", "Abacate", "Mostarda"],
      steps: ["Coloque peru nas folhas de alface", "Adicione cenoura e abacate", "Tempere com mostarda", "Enrole como um wrap"]
    }
  },
  {
    day: 26,
    tip: "Reduza o sal. Use ervas e especiarias para dar sabor às refeições.",
    exercise: {
      name: "Treino de Braços",
      duration: "30 minutos",
      description: "Fortaleça e tonifique os braços.",
      sets: [
        { exercise: "Flexões", reps: "4x12" },
        { exercise: "Tríceps no banco", reps: "3x15" },
        { exercise: "Rosca direta", reps: "3x12" }
      ]
    },
    recipe: {
      name: "Stir-Fry de Vegetais",
      ingredients: ["Brócolis", "Cenoura", "Pimentão", "Cogumelos", "Molho shoyu", "Gengibre"],
      steps: ["Corte todos os vegetais", "Refogue em fogo alto", "Adicione shoyu e gengibre", "Cozinhe por 5 minutos"]
    }
  },
  {
    day: 27,
    tip: "Reta final! Faça 60 minutos de atividade física hoje. Você consegue!",
    exercise: {
      name: "Desafio 60 Minutos",
      duration: "60 minutos",
      description: "Combine cardio e força para o desafio final.",
      sets: [
        { exercise: "Corrida/caminhada", reps: "30 minutos" },
        { exercise: "Circuito de força", reps: "30 minutos" }
      ]
    },
    recipe: {
      name: "Salada de Atum com Abacate",
      ingredients: ["1 lata de atum", "1 abacate", "Tomate cereja", "Rúcula", "Limão"],
      steps: ["Escorra o atum", "Corte o abacate", "Misture com tomate e rúcula", "Tempere com limão"]
    }
  },
  {
    day: 28,
    tip: "Organize suas refeições da próxima semana. Planejamento é fundamental!",
    exercise: {
      name: "Treino de Resistência",
      duration: "40 minutos",
      description: "Fortaleça todo o corpo com exercícios de resistência.",
      sets: [
        { exercise: "Agachamentos", reps: "4x15" },
        { exercise: "Flexões", reps: "4x12" },
        { exercise: "Avanços", reps: "3x12 cada perna" },
        { exercise: "Prancha", reps: "3x60 segundos" }
      ]
    },
    recipe: {
      name: "Omelete de Forno com Vegetais",
      ingredients: ["6 ovos", "Espinafre", "Tomate", "Cebola", "Queijo light"],
      steps: ["Bata os ovos", "Adicione vegetais picados", "Despeje em forma untada", "Asse a 180°C por 25 minutos"]
    }
  },
  {
    day: 29,
    tip: "Penúltimo dia! Comemore cada conquista. Você está quase lá!",
    exercise: {
      name: "Treino de Alta Intensidade",
      duration: "45 minutos",
      description: "Desafie-se com exercícios intensos.",
      sets: [
        { exercise: "Burpees", reps: "4x15" },
        { exercise: "Agachamentos com salto", reps: "4x12" },
        { exercise: "Mountain climbers", reps: "4x30" },
        { exercise: "Polichinelos", reps: "4x40" }
      ]
    },
    recipe: {
      name: "Pizza Fit de Couve-Flor",
      ingredients: ["1 couve-flor", "2 ovos", "Queijo", "Molho de tomate", "Orégano"],
      steps: ["Processe a couve-flor", "Misture com ovos e queijo", "Faça discos e asse", "Adicione molho e mais queijo"]
    }
  },
  {
    day: 30,
    tip: "Parabéns! Você completou os 30 dias! Continue com os hábitos saudáveis que adquiriu.",
    exercise: {
      name: "Celebração Final",
      duration: "50 minutos",
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

const FREE_DAYS_LIMIT = 10; // Define o limite de dias gratuitos

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

    // Verificar se o usuário já comprou o pacote completo
    const premium = localStorage.getItem('isPremiumUser');
    if (premium === 'true') {
      setIsPremiumUser(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedDays', JSON.stringify(Array.from(completedDays)));

    // Mostrar CTA quando o usuário completar vários dias gratuitos (a partir do dia 7)
    const freeCompletedDays = Array.from(completedDays).filter(day => day <= FREE_DAYS_LIMIT);
    if (freeCompletedDays.length >= 7 && !isPremiumUser) {
      setShowUpgradeCTA(true);
    }
  }, [completedDays, isPremiumUser]);

  const saveProgress = (days: Set<number>) => {
    localStorage.setItem('completedDays', JSON.stringify(Array.from(days)));
  };

  const handleDayClick = (day: number) => {
    // Se o dia está bloqueado e o usuário não é premium, mostrar CTA
    if (day > FREE_DAYS_LIMIT && !isPremiumUser) {
      setShowUpgradeCTA(true);
      // Scroll suave para a seção de pagamento
      setTimeout(() => {
        const paymentSection = document.getElementById('payment-section');
        paymentSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleToggleComplete = () => {
    if (selectedDay === null) return;

    const freeDaysLimit = isPremiumUser ? CHALLENGE_DATA.length : FREE_DAYS_LIMIT;
    if (selectedDay > freeDaysLimit && !isPremiumUser) {
      return;
    }

    setCompletedDays(prev => {
      const newSet = new Set(prev);
      const previousCount = newSet.size;

      if (newSet.has(selectedDay)) {
        newSet.delete(selectedDay);
      } else {
        newSet.add(selectedDay);
        const newCount = newSet.size;

        // Check if a new stage was unlocked
        const newStage = checkNewStageUnlocked(previousCount, newCount);
        const points = calculatePoints(newCount);
        const currentDiscount = getCurrentDiscount(newCount);
        const currentPrice = getCurrentPrice(newCount);

        if (newStage) {
          // Show combined notification for stage unlock
          const StageIcon = newStage.Icon;
          toast({
            title: `🏆 Etapa ${newStage.stage} Desbloqueada!`,
            description: (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <StageIcon className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">{newStage.bonus}</span>
                </div>
                <div className="text-sm space-y-1">
                  <div>✨ +100 pontos (Total: {points})</div>
                  <div>💰 Novo desconto: {newStage.discount}%</div>
                  <div>🏷️ Novo preço: R$ {newStage.price.toFixed(2)}</div>
                </div>
              </div>
            ),
          });
        } else {
          // Show regular day completion notification
          toast({
            title: `🎉 Dia ${selectedDay} Concluído!`,
            description: (
              <div className="space-y-2">
                <div className="text-sm space-y-1">
                  <div>✨ +100 pontos (Total: {points})</div>
                  <div>💰 Desconto atual: {currentDiscount}%</div>
                  <div>🏷️ Preço atual: R$ {currentPrice.toFixed(2)}</div>
                </div>
              </div>
            ),
          });
        }
      }
      return newSet;
    });
  };

  const handleContinueToNext = () => {
    if (selectedDay === null) return;

    const nextDay = selectedDay + 1;
    const freeDaysLimit = isPremiumUser ? CHALLENGE_DATA.length : FREE_DAYS_LIMIT;

    if (nextDay <= CHALLENGE_DATA.length && nextDay <= freeDaysLimit) {
      setIsModalOpen(false);
      setTimeout(() => {
        setSelectedDay(nextDay);
        setIsModalOpen(true);
      }, 300);
    } else if (nextDay > freeDaysLimit && !isPremiumUser) {
      setIsModalOpen(false);
      setShowUpgradeCTA(true);
      setTimeout(() => {
        const paymentSection = document.getElementById('payment-section');
        paymentSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleUpgrade = () => {
    // Simular a compra e atualizar o estado
    setIsPremiumUser(true);
    localStorage.setItem('isPremiumUser', 'true');
    setShowUpgradeCTA(false); // Ocultar CTA após o upgrade

    // Scroll para a seção de pagamento se ainda não estiver visível
    const paymentSection = document.getElementById('payment-section');
    if (paymentSection && !isElementInView(paymentSection)) {
      paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleStartChallenge = () => {
    // Scroll para o calendário
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
          totalDays={30}
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
          onToggleComplete={handleToggleComplete}
          isLocked={!isPremiumUser}
          onUnlock={() => handleUpgrade()}
          onContinue={handleContinueToNext}
        />
      )}
    </div>
  );
}

// Função auxiliar para verificar se um elemento está visível na tela
function isElementInView(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}