import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
