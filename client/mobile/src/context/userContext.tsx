// src/context/UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

type UserContextProps = {
  sub: string | null;
  setSub: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextProps>({
  sub: null,
  setSub: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [sub, setSub] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ sub, setSub }}>
      {children}
    </UserContext.Provider>
  );
};
