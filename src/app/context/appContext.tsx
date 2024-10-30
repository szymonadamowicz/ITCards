import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  developerType: string;
  changeDeveloperType: (type: string) => void;
  languageType: string;
  changeLanguageType: (type: string) => void;
  learningType: string;
  changeLearningType: (type: string) => void;
};

const defaultAppContextValue: AppContextType = {
  developerType: "",
  changeDeveloperType: () => {},
  languageType: "",
  changeLanguageType: () => {},
  learningType: "",
  changeLearningType: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContextValue);

export const useAppContext = () => useContext(AppContext);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [developerType, setDeveloperType] = useState(() => localStorage.getItem("developerType") || "");
  const [languageType, setLanguageType] = useState(() => localStorage.getItem("languageType") || "");
  const [learningType, setLearningType] = useState(() => localStorage.getItem("learningType") || "");

  const changeDeveloperType = (type: string) => {
    setDeveloperType(type);
    localStorage.setItem("developerType", type);
  };

  const changeLanguageType = (type: string) => {
    setLanguageType(type);
    localStorage.setItem("languageType", type);
  };

  const changeLearningType = (type: string) => {
    setLearningType(type);
    localStorage.setItem("learningType", type);
  };


  return (
    <AppContext.Provider
      value={{
        developerType,
        changeDeveloperType,
        languageType,
        changeLanguageType,
        learningType,
        changeLearningType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
