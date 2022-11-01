import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// Actual value you want to access
export const UserContext = createContext({
  // Initial value of the context
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  // Initial value of the state
  const [currentUser, setCurrentUser] = useState(null);
  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
