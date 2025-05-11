import { createContext, useState, useEffect } from "react";
import { getNote, getNotesByUser } from "../services/fetchServices";

export const NoteContext = createContext()

export const NoteContextProvider = ({children}) => {
   const [textContent, setTextContent] = useState(null)
   const [noteBarContent, setNoteBarContent] = useState(null)
   const [prevContent, setPrevContent] = useState(null)
   const [title, setTitle] = useState(null)
   const [notes, setNotes] = useState(null)
   const [saved, setSaved] = useState(true)

   useEffect(() => {
      const fetchData = async() => {
         const response = await getNotesByUser(1)
         setNotes(response)
      }

      fetchData()
   }, [])

   return (
      <NoteContext.Provider value={{textContent, setTextContent, noteBarContent, setNoteBarContent, prevContent, setPrevContent, title, setTitle, notes, setNotes, saved, setSaved}}>
         {children}
      </NoteContext.Provider>
   )
}