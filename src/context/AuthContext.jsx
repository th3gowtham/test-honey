
import React, { createContext, useContext, useEffect, useState } from 'react';   // necessary hook imports , usecontext for using it later in components



const AuthContext = createContext();   //managing and passing the roles across pages without prop 

export const AuthProvider = ({ children }) => {    //wraps your app and shares values with all its children
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {                                    // Runs once when the component mounts , It retrieves previously saved values from sessionStorage 
    const role = sessionStorage.getItem('userRole');
    const name = sessionStorage.getItem('userName');
    if (role && name) {
      setUserRole(role);
      setUserName(name);
    }
  }, []);

  return (                // provides the values to any child component that calls useAuth()
    <AuthContext.Provider value={{ userRole, userName, setUserRole, setUserName }}>       
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);     // custom hook to access the context easily, wherever in child
