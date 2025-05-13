"use client";
import { createContext, use, useEffect, useState } from "react";
import { getCurrentUser } from "../services/fetchServices";
import { login, logout } from "../services/createServices";

export const AuthContext = createContext()

//need to fix getCurrentUser, 

export const AuthContextProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [authLoading, setAuthLoading] = useState(true)
   const [userTier, setUserTier] = useState(null)
 
   useEffect(() => {
      // always checks that user is logged in

      
      fetchData()
   }, []);

   const fetchData = async () => {
      const response = await getCurrentUser()
      console.log("from auth context ", response)
      setCurrentUser(response?.id)
      setUserTier(response?.tier)
      console.log("currentUser ", currentUser)
      setAuthLoading(false)
   }

   const loginUser = async(username, password) => {
      const loginResponse = await login(username, password)
      setCurrentUser(loginResponse?.id)
      await fetchData()
   }

   const logoutUser = async() => {
      await logout()
      setCurrentUser(null)
   }

   return (
      <AuthContext.Provider value={{currentUser, authLoading, setCurrentUser, loginUser, logoutUser, userTier}}>
         {children}
      </AuthContext.Provider>
   );
}
