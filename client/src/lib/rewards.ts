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
  { stage: 1, daysRequired: 3, discount: 30, price: 63, bonus: "Planilha de Controle", Icon: BarChart3 },
  { stage: 2, daysRequired: 6, discount: 60, price: 36, bonus: "Acesso Premium", Icon: Award },
  { stage: 3, daysRequired: 10, discount: 100, price: 29.90, bonus: "Acesso Vitalício", Icon: Award }
];

export const BASE_PRICE = 299;
export const POINTS_PER_DAY = 100;

export function calculatePoints(completedDays: number): number {
  return completedDays * POINTS_PER_DAY;
}

export function calculateLevel(completedDays: number): number {
  return Math.min(completedDays, 10);
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
