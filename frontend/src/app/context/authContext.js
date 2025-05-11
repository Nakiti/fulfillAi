"use client";
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/fetchServices";
import { login } from "../services/createServices";

export const AuthContext = createContext()

//need to fix getCurrentUser, 

export const AuthContextProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [loading, setLoading] = useState(true)
 
   useEffect(() => {
      // always checks that user is logged in
      const fetchData = async () => {
         const response = await getCurrentUser()
         console.log("from auth context ", response?.id)
         setCurrentUser(response?.id)
         console.log("currentUser ", currentUser)
         setLoading(false)
      }
      
      fetchData()
   }, []);

   const loginUser = async(username, password) => {
      const loginResponse = await login(username, password)
      setCurrentUser(loginResponse?.id)
      return loginResponse
   }

   return (
      <AuthContext.Provider value={{currentUser, loading, setCurrentUser, loginUser}}>
         {children}
      </AuthContext.Provider>
   );
}
