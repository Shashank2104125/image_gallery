import PropTypes from 'prop-types';
import {onAuthStateChanged } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from '../firebase/config';

// Create context
export const AuthContext = createContext({
  user: null,
  isLoading: false,
});

// Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true

  // Check if the user is already signed in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false); // Set isLoading to false once the user state is set
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
