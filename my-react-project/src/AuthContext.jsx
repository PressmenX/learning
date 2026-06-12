import { createContext, useState } from "react";

export const AuthContext = createContext();

export  function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "Budi", isAdmin: true });

  return (
    
    <AuthContext.Provider value={user}>
      {children} 
    </AuthContext.Provider>
  );
}