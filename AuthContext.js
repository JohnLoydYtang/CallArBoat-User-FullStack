import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    try {
      // Simulating a successful login
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userId', 'user.uid'); // store the user's ID
      setIsAuthenticated(true);
      console.log('Login successful');
   
      // Get the auth object and the current user
      const auth = getAuth();
      const user = auth.currentUser;
   
      // Log all the user's information
      console.log('User information:', user);
    } catch (error) {
      console.log(error);
      console.log('Login Failed');
    }
   };
  
  const logout = async () => {
    try {
  
      // Simulating a successful logout
      await AsyncStorage.removeItem('isLoggedIn');
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      console.log('Logout Failed');
    }
  };
  
  const updateAuthenticationStatus = (status) => {
    setIsAuthenticated(status);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updateAuthenticationStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
