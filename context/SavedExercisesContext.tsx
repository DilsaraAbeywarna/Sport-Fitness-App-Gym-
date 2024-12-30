import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface SavedExercisesContextProps {
  children: ReactNode;
}

interface SavedExercisesContextType {
  savedExercises: string[];
  addSavedExercise: (exerciseName: string) => void;
  removeSavedExercise: (exerciseName: string) => void;
}

// Create the context
const SavedExercisesContext = createContext<SavedExercisesContextType | undefined>(undefined);

// Create the provider
const SavedExercisesProvider: React.FC<SavedExercisesContextProps> = ({ children }) => {
  const [savedExercises, setSavedExercises] = useState<string[]>([]);

  const addSavedExercise = (exerciseName: string) => {
    setSavedExercises((prev) => [...prev, exerciseName]);
  };

  const removeSavedExercise = (exerciseName: string) => {
    setSavedExercises((prev) => prev.filter((name) => name !== exerciseName));
  };

  return (
    <SavedExercisesContext.Provider value={{ savedExercises, addSavedExercise, removeSavedExercise }}>
      {children}
    </SavedExercisesContext.Provider>
  );
};

// Custom hook to use the saved exercises context
const useSavedExercises = (): SavedExercisesContextType => {
  const context = useContext(SavedExercisesContext);
  if (!context) {
    throw new Error('useSavedExercises must be used within a SavedExercisesProvider');
  }
  return context;
};

export { SavedExercisesProvider, useSavedExercises };
