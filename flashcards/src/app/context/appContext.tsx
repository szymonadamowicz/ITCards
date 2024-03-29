import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextProvider = {
  developerType: string;
  changeDeveloperType: (type: string) => void;
  languageType: string;
  changeLanguageType: (type: string) => void;
};

const defaultAppContextValue: AppContextProvider = {
  developerType: "",
  changeDeveloperType: () => {}, 
  languageType: "",
  changeLanguageType: () => {}, 
};

const AppContextProvider = createContext<AppContextProvider>(defaultAppContextValue);

export const useAppContext = () => useContext(AppContextProvider);

type DeveloperProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: DeveloperProviderProps) => {
  const [developerType, setDeveloperType] = useState("");
  const [languageType, setLanguageType] = useState(""); 
  const changeDeveloperType = (type: string) => {
    setDeveloperType(type);
  };

  const changeLanguageType = (type: string) => { 
    setLanguageType(type);
  };

  return (
    <AppContextProvider.Provider value={{ developerType, changeDeveloperType, languageType, changeLanguageType}}>
      {children}
    </AppContextProvider.Provider>
  );
};
