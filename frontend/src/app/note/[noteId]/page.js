"use client"
import TextArea from "@/app/components/textarea"
import { getNote } from "@/app/services/fetchServices"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams } from "next/navigation"
import { FiSave } from "react-icons/fi"
import { updateNote } from "@/app/services/updateServices"
import { NoteContext } from "@/app/context/noteContext"
import { FaRegCheckCircle } from "react-icons/fa";
import { AuthContext } from "@/app/context/authContext"

const NotePage = () => {
   const [data, setData] = useState(null)
   const params = useParams()
   const {noteId} = params
   const {textContent, setTextContent, title, setTitle, setSaved, saved} = useContext(NoteContext)
   const {currentUser} = useContext(AuthContext)
   const userId = currentUser || 0 //change in prod, --> save logged out user in local storage

   useEffect(() => {
      const fetchData = async() => {
         const response = await getNote(noteId)
         setData(response)
         setTextContent(response.textContent)
         setTitle(response.note_title)
      }

      fetchData()
   }, [])

   const handleSave = async() => {
      await updateNote(userId, noteId, textContent)
      setSaved(true)
   }

   return (
      <div className="w-full ">
         {data && <div className="w-full bg-gradient-to-b from-white via-blue-50 to-white flex flex-col flex-1 overflow-hidden items-center justify-center px-4 py-4 bg-white">
            <div className="flex flex-row w-full items-center mb-4 max-w-4xl">
               <div className="w-full py-2 bg-white px-6 pr-12 border border-gray-300 rounded-lg text-sm text-gray-800 mr-2">
                  <p>{data.note_title}</p>
               </div>
               {!saved ? <button 
                  className="p-1 rounded-md hover:bg-gray-100 cursor-pointer text-gray-700" 
                  onClick={handleSave}
               >
                  <FiSave className="w-6 h-6" />
               </button> :
               <div className="p-1 rounded-md  text-green-700">
                  <FaRegCheckCircle className="w-6 h-6"/>
               </div>
               }
            </div>

            <TextArea />
         </div>}
      </div>
   )
}

export default NotePage