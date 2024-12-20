import { createContext, useContext, useState } from "react";
import { TestExercises } from "@/constants/TestExercises";
import { Exercise, ExerciseTraining, PerformanceType, TrainingSet } from "@/constants/Exercise";
import { Activity } from "@/constants/Activity";
import { calculatePr } from "@/util/prCalculator";

const getPR = (exercise: Exercise): number => {
    return exercise.trainings.reduce((highest, training) => 
      Math.max(highest, training.maxPerfomance), 0
    );
};

const recalculatePr = (name: string, exercises : Exercise[]) : Exercise[] => {
    const targetExercise = exercises.find(exercise => exercise.name === name);

    // Falls kein Exercise mit dem Namen gefunden wurde, Rückgabe des Original-Arrays
    if (!targetExercise) {
        console.warn(`Exercise with name "${name}" not found.`);
        return exercises;
    }

    const updatedExercise = {...targetExercise,
                                trainings: targetExercise.trainings.map((t: ExerciseTraining) => ({...t, maxPerfomance: calculatePr(t.sets, targetExercise.performanceType)}))}


    const updatedExercises = exercises.map(exercise =>
        exercise.name === name ? updatedExercise : exercise
    );

    return updatedExercises;
}

interface ExerciseContextType {
    exercises: Exercise[];
    addExercise: (exercise: Exercise) => void;
    deleteExercise: (name: string) => void;
    editExercise: (name: string, newExercise: Exercise) => void;
    addExerciseTraining: (exerciseName: string, training : ExerciseTraining) => void;
    editExerciseTraining: (exerciseName: string, training : ExerciseTraining) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {
    const [exercises, setExercises] = useState<Exercise[]>(TestExercises);

    const addExercise = (exercise: Exercise) => {
        setExercises((prev) => [...prev, exercise]);
    };

    const deleteExercise = (name: string) => {
        setExercises((prev) => prev.filter((exercise) => exercise.name !== name));
    };

    const editExercise = (oldName: string, newExercise: Exercise) => {
        const updatedExercises = exercises.map(exercise =>
            exercise.name === oldName ? newExercise : exercise
        );
        setExercises(recalculatePr(newExercise.name ,updatedExercises));
    };

    const addExerciseTraining = (exerciseName: string, training: ExerciseTraining) => {
        const updatedExercises = exercises.map(exercise => 
            exercise.name === exerciseName
                ? { ...exercise, trainings: [...exercise.trainings, training] }
                : exercise
        );
        setExercises(updatedExercises);
    };

    const editExerciseTraining = (exerciseName: string, training: ExerciseTraining) => {
        const updatedExercises = exercises.map(exercise => {
            if (exercise.name === exerciseName) {
                return {
                    ...exercise,
                    trainings: exercise.trainings.map(t =>
                        t.id === training.id ? training : t
                    ),
                };
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };
    
    

    return (
        <ExerciseContext.Provider value={{ exercises, addExercise, deleteExercise, editExercise, addExerciseTraining, editExerciseTraining }}>
            {children}
        </ExerciseContext.Provider>
    );
};

export const useExercise = (): ExerciseContextType => {
    const context = useContext(ExerciseContext);
    if (!context) {
        throw new Error("useExercise must be used within an ExerciseProvider");
    }
    return context;
};