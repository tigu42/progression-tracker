import { ExerciseTraining, PerformanceType } from "./Exercise";

export interface Activity {
    training: ExerciseTraining,
    exerciseName: string,
    performanceType: PerformanceType
}