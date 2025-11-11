import { Book, Dumbbell, BarChart3, Utensils, Activity, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RewardStage {
  stage: number;
  daysRequired: number;
  discount: number;
  price: number;
  bonus: string;
  Icon: LucideIcon;
}

export const REWARD_STAGES: RewardStage[] = [
  { stage: 1, daysRequired: 5, discount: 10, price: 81, bonus: "E-book de Receitas", Icon: Book },
  { stage: 2, daysRequired: 10, discount: 20, price: 72, bonus: "Guia de Exercícios", Icon: Dumbbell },
  { stage: 3, daysRequired: 15, discount: 30, price: 63, bonus: "Planilha de Controle", Icon: BarChart3 },
  { stage: 4, daysRequired: 20, discount: 40, price: 54, bonus: "Plano Alimentar", Icon: Utensils },
  { stage: 5, daysRequired: 25, discount: 50, price: 45, bonus: "Programa Avançado", Icon: Activity },
  { stage: 6, daysRequired: 30, discount: 67, price: 29.90, bonus: "Acesso Vitalício", Icon: Award }
];

export const BASE_PRICE = 90;
export const POINTS_PER_DAY = 100;

export function calculatePoints(completedDays: number): number {
  return completedDays * POINTS_PER_DAY;
}

export function calculateLevel(completedDays: number): number {
  return Math.min(Math.floor(completedDays / 5) + 1, 6);
}

export function getCurrentRewardStage(completedDays: number): RewardStage | null {
  const unlockedStages = REWARD_STAGES.filter(stage => completedDays >= stage.daysRequired);
  return unlockedStages.length > 0 ? unlockedStages[unlockedStages.length - 1] : null;
}

export function getNextRewardStage(completedDays: number): RewardStage | null {
  return REWARD_STAGES.find(stage => completedDays < stage.daysRequired) || null;
}

export function getCurrentPrice(completedDays: number): number {
  const currentStage = getCurrentRewardStage(completedDays);
  return currentStage ? currentStage.price : BASE_PRICE;
}

export function getCurrentDiscount(completedDays: number): number {
  const currentStage = getCurrentRewardStage(completedDays);
  return currentStage ? currentStage.discount : 0;
}

export function getUnlockedStages(completedDays: number): RewardStage[] {
  return REWARD_STAGES.filter(stage => completedDays >= stage.daysRequired);
}

export function checkNewStageUnlocked(previousDays: number, currentDays: number): RewardStage | null {
  const previousStage = getCurrentRewardStage(previousDays);
  const currentStage = getCurrentRewardStage(currentDays);
  
  if (!currentStage) return null;
  if (!previousStage) return currentStage;
  if (currentStage.stage > previousStage.stage) return currentStage;
  
  return null;
}
