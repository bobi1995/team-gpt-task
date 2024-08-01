import React, { createContext, useState, useContext, ReactNode } from "react";

interface ContextType {
  type: string;
  setType: (value: string) => void;
  number: string; //може да е 2.1.3 версия
  setNumber: (value: string) => void;
  name: string;
  setName: (value: string) => void;
}

const NotificationContext = createContext<ContextType | null>(null);

//Не бих използвал Context за създаването на нова нотификация, но забелязах, че е от изискваните условия
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  return (
    <NotificationContext.Provider
      value={{
        type,
        setType,
        number,
        setNumber,
        name,
        setName,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    console.log(context);
    throw new Error("Context error");
  }
  return context;
};
