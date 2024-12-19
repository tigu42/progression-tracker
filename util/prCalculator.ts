import { PerformanceType, TrainingSet } from "@/constants/Exercise";

const epley = (set: TrainingSet): number => {
    let w = set.weight;
    let r = set.reps;
    if (r === 1) return 0;
    return w * (1 + r/30);
}

const brzycki = (set: TrainingSet): number => {
    let w = set.weight;
    let r = set.reps;
    return w * (36 / (37 - r));
}

const lombardi = (set: TrainingSet): number => {
    let w = set.weight;
    let r = set.reps;
    return w * Math.pow(r, 0.10);
}

const mixedPr = (set: TrainingSet): number => {
    let epleyPr = epley(set);
    let brzyckiPr = brzycki(set);
    let lombardiPr = lombardi(set);
    return (epleyPr + brzyckiPr + lombardiPr) / 3
}

export const calculatePr = (sets: TrainingSet[], performanceType: PerformanceType) : number => {
    let pr = 0;
    let maxReps = 0;
    for (let set of sets) {
        let tempPr = mixedPr(set);
        if (tempPr > pr) pr = tempPr;
        if (set.reps > maxReps) maxReps = set.reps;
    }
    pr = Math.round(pr);
    if (performanceType === PerformanceType.RM) return pr;
    else return maxReps;
}