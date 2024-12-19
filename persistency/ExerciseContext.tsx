import { createContext, useContext, useState } from "react";
import { TestExercises } from "@/constants/TestExercises";
import { Exercise } from "@/constants/Exercise";

interface ExerciseContextType {
    exercises: Exercise[];
    addExercise: (exercise: Exercise) => void;
    deleteExercise: (name: string) => void;
    editExercise: (name: string, newExercise: Exercise) => void;
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

    return (
        <ExerciseContext.Provider value={{ exercises, addExercise, deleteExercise, editExercise }}>
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