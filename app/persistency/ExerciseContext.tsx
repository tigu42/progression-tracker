import { createContext, useContext, useState } from "react";
import { TestExercises } from "@/constants/TestExercises";
import { Exercise } from "@/constants/Exercise";

interface ExerciseContextType {
    exercises: Exercise[];
    addExercise: (exercise: Exercise) => void;
    deleteExercise: (name: string) => void;
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

    return (
        <ExerciseContext.Provider value={{ exercises, addExercise, deleteExercise }}>
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