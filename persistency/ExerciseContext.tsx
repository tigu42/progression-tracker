import { createContext, useContext, useState } from "react";
import { TestExercises } from "@/constants/TestExercises";
import { Exercise, ExerciseTraining, TrainingSet } from "@/constants/Exercise";
import { Activity } from "@/constants/Activity";

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
        let toSave: Exercise[] = []
        for (let i = 0; i < exercises.length; i++) {
            const name = exercises[i].name;
            if (name === oldName) {
                toSave.push(newExercise);
            }
            else toSave.push(exercises[i]);
        }
        setExercises(toSave);
    }

    const addExerciseTraining = (exerciseName: string, training : ExerciseTraining) => {
        let toSave: Exercise[] = []
        for (let i = 0; i < exercises.length; i++) {
            const name = exercises[i].name;
            if (name === exerciseName) {
                exercises[i].trainings.push(training)
            }
            toSave.push(exercises[i]);
        }
        setExercises(toSave)
    }

    const editExerciseTraining = (exerciseName: string, training : ExerciseTraining) => {
        let toSave: Exercise[] = []
        for (let i = 0; i < exercises.length; i++) {
            const name = exercises[i].name;
            if (name === exerciseName) {
                for (let j = 0; j < exercises[i].trainings.length; j++) {
                    if (exercises[i].trainings[j].id === training.id) exercises[i].trainings[j] = training;
                }
            }
            toSave.push(exercises[i]);
        }
        setExercises(toSave)
    }

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