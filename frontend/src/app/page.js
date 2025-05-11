"use client"
import { FiArrowUpRight } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import TextArea from "./components/textarea";
import { useRouter } from "next/navigation";
import { createNote, createTitle } from "./services/createServices";
import { NoteContext } from "./context/noteContext";
import { getNotesByUser } from "./services/fetchServices";

const suggestions = [
  "Summarize this article",
  "Generate an outline",
  "Write a hook sentence",
  "Fix grammar issues",
  "Explain this code",
  "Make it more concise",
];

const Page = () => {
   const [subject, setSubject] = useState("")
   const router = useRouter()
   const {setNotes} = useContext(NoteContext)

   const handleClick = async() => {
      if (subject.trim() == "") {
         return
      }

      const title = await createTitle(subject)
      const noteId = await createNote(1, "", title)
      const updatedNotes = await getNotesByUser(1)
      setNotes(updatedNotes)
      router.push(`/note/${noteId}`)
   }

   return (
<div className="flex flex-col flex-1 overflow-hidden items-center justify-center px-4 py-1 bg-gradient-to-b from-white via-blue-50 to-white">
         <div className={`w-full max-w-3xl text-center mt-36`}>
            <h1 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            What are you working on today?
            </h1>

            {<p className="text-md">Enter a short description of what you're working on</p>}
            <div className="relative w-full my-6">
               <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full py-3 px-6 pr-12 border border-gray-300 bg-white rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                    onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        e.preventDefault(); 
                        handleClick()
                     }
                  }}
               />
               {<button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 cursor-pointer hover:shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-600 text-white rounded-full shadow-sm transition"
                  onClick={handleClick}
               >
                  <FiArrowUpRight className="w-4 h-4" />
               </button>}
            </div>

            {/* Suggestions Grid */}
            {<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
               {suggestions.map((text, index) => (
                  <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm transition"
                  >
                  {text}
                  </button>
               ))}
            </div>}
         </div>
      </div>
   );
};

export default Page;
