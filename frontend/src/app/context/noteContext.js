import { createContext, useState, useEffect, useContext } from "react";
import { getNote, getNotesByUser } from "../services/fetchServices";
import { AuthContext } from "./authContext";

export const NoteContext = createContext()

export const NoteContextProvider = ({children}) => {
   const [textContent, setTextContent] = useState(null)
   const [noteBarContent, setNoteBarContent] = useState(null)
   const [prevContent, setPrevContent] = useState(null)
   const [title, setTitle] = useState(null)
   const [notes, setNotes] = useState(null)
   const [saved, setSaved] = useState(true)
   const [showSideBar, setShowSideBar] = useState(false)
   const [showNoteBar, setShowNoteBar] = useState(false)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)
   const [errorMessage, setErrorMessage] = useState("")
   const {currentUser, authLoading} = useContext(AuthContext)
   const [selectedAuto, setSelectedAuto] = useState(null)
   const [selectedRephrase, setSelectedRephrase] = useState(null)
   const userId = currentUser

   useEffect(() => {
      console.log("authloading", authLoading)
      if (!authLoading && currentUser) {
         const fetchData = async() => {
            const response = await getNotesByUser(userId)
            setNotes(response)
            console.log(response)
         }

         fetchData()
      }
   }, [currentUser])

   return (
      <NoteContext.Provider value={{textContent, setTextContent, noteBarContent, setNoteBarContent, prevContent, setPrevContent, title, setTitle, notes, setNotes, saved, setSaved, showSideBar, setShowSideBar, showNoteBar, setShowNoteBar, loading, setLoading, error, setError, errorMessage, setErrorMessage, selectedAuto, setSelectedAuto, selectedRephrase, setSelectedRephrase}}>
         {children}
      </NoteContext.Provider>
   )
}