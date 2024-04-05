import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  developerType: string;
  changeDeveloperType: (type: string) => void;
  languageType: string;
  changeLanguageType: (type: string) => void;
  learningType: string;
  changeLearningType: (type: string) => void;
  userName: string;
  changeUserName: (type: string) => void;
};

const defaultAppContextValue: AppContextType = {
  developerType: "",
  changeDeveloperType: () => {},
  languageType: "",
  changeLanguageType: () => {},
  learningType: "",
  changeLearningType: () => {},
  userName: "",
  changeUserName: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContextValue);

export const useAppContext = () => useContext(AppContext);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [developerType, setDeveloperType] = useState("");
  const [languageType, setLanguageType] = useState("");
  const [learningType, setLearningType] = useState("");
  const [userName, setUserName] = useState("");

  const changeDeveloperType = (type: string) => setDeveloperType(type);
  const changeLanguageType = (type: string) => setLanguageType(type);
  const changeLearningType = (type: string) => setLearningType(type);
  const changeUserName = (type: string) => setUserName(type);

  return (
    <AppContext.Provider
      value={{
        developerType,
        changeDeveloperType,
        languageType,
        changeLanguageType,
        learningType,
        changeLearningType,
        userName,
        changeUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
