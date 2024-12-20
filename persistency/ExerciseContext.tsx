import { createContext, useContext, useEffect, useState } from "react";
import { TestExercises } from "@/constants/TestExercises";
import { Exercise, ExerciseTraining, PerformanceType, TrainingSet } from "@/constants/Exercise";
import { Activity } from "@/constants/Activity";
import { calculatePr } from "@/util/prCalculator";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeExercises = async (value : Exercise[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('exercises', jsonValue);
    } catch (e) {
      console.error(e)
    }
};

const getExercises = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('exercises');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e)
    }
};

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
    const [exercises, setExercises] = useState<Exercise[]>([]);
    useEffect(() => {
        getExercises().then((exercises: Exercise[] | null) => {
            if (exercises === null) {
                setExercises([]);
            }
            else {
                setExercises(exercises);
            }
        })
    }, [])

    const persistExercises = (exercises: Exercise[]) => {
        setExercises(exercises);
        storeExercises(exercises);
    }

    const addExercise = (exercise: Exercise) => {
        const updatedExercises = [...exercises, exercise];
        persistExercises(updatedExercises);
    };

    const deleteExercise = (name: string) => {
        const updatedExercises = exercises.filter((exercise) => exercise.name !== name)
        persistExercises(updatedExercises);
    };

    const editExercise = (oldName: string, newExercise: Exercise) => {
        const updatedExercises = exercises.map(exercise =>
            exercise.name === oldName ? newExercise : exercise
        );
        persistExercises(recalculatePr(newExercise.name ,updatedExercises));
    };

    const addExerciseTraining = (exerciseName: string, training: ExerciseTraining) => {
        const updatedExercises = exercises.map(exercise => 
            exercise.name === exerciseName
                ? { ...exercise, trainings: [...exercise.trainings, training] }
                : exercise
        );
        persistExercises(updatedExercises);
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
        persistExercises(updatedExercises);
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