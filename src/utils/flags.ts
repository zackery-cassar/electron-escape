import { parseTimeToSeconds } from "./time";

export type Flag = "none" | "warning" | "critical";

const THRESHOLDS = {
  warningTime: 10 * 60,
  criticalTime: 3 * 60,
  warningProgress: 75,
  criticalProgress: 90,
};

export function computeFlag(time: string, progress: number): Flag {
    const sec = parseTimeToSeconds(time)

    if(sec <= THRESHOLDS.criticalTime || progress >= THRESHOLDS.criticalProgress) return 'critical'
    if(sec <= THRESHOLDS.warningTime || progress >= THRESHOLDS.warningProgress) return 'warning'
    return 'none';
}