export enum PerformanceType {
    RM = "1RM",
    PR = "PR"
}

export interface TrainingSet {
    reps: number,
    weight: number
}

export interface ExerciseTraining {
    time: Date,
    sets: TrainingSet[],
    maxPerfomance: number,
    id: number
}

export interface Exercise {
    name: string,
    trainings: ExerciseTraining[],
    performanceType: PerformanceType
}