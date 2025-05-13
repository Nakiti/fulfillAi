"use client"
import { FiArrowUpRight } from "react-icons/fi";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { createNote, createTitle } from "./services/createServices";
import { NoteContext } from "./context/noteContext";
import { getNotesByUser } from "./services/fetchServices";
import { AuthContext } from "./context/authContext";
import LoadingSpinner from "./components/loadingSpinner";

const suggestions = [
  "Doctoral Thesis",
  "Email for Work",
  "Medical Appeal Letter",
  "College Application Essay",
  "Fantasy Novel Draft",
  "Essay on Monkeys",
];

const Page = () => {
   const [subject, setSubject] = useState("")
   const router = useRouter()
   const {setNotes, setShowNoteBar, setTitle, authLoading, setError, setErrorMessage, error, errorMessage} = useContext(NoteContext)
   const {currentUser} = useContext(AuthContext)
   const userId = currentUser || 0 
   const [loading, setLoading] = useState(false)

   const handleClick = async() => {
      if (subject.trim() == "") {
         return
      }
      console.log("currentUser", currentUser)

      try {
         setLoading(true);
         const userIdToUse = currentUser || 0;
         const title = await createTitle(subject, userIdToUse);

         if (title == 403) {
            console.log("error!")
            setError(true);
            setErrorMessage("Max Queries Reached. Upgrade Plan or Try Again in x hours");
            setLoading(false)
            return;
         } else if (typeof title === "number") {
            setError(true);
            setErrorMessage("Error. Try Again Later");
            setLoading(false)
            return;
         }

         setTitle(title);
         setShowNoteBar(true);
         setError(false)

         if (currentUser) {
            const noteId = await createNote(userIdToUse, "", title);
            const updatedNotes = await getNotesByUser(userIdToUse);
            setNotes(updatedNotes);
            router.push(`/note/${noteId}`);
         } else {
            router.push(`/note/temp`);
         }
      } finally {
         setLoading(false);
      }
   }

   if (authLoading) {
      return <LoadingSpinner />;
   }

   return (
      <div className="flex flex-col flex-1 overflow-hidden items-center justify-center px-4 py-1 bg-gradient-to-b from-white via-blue-50 to-white">
         <div className={`w-full max-w-3xl text-center mt-36`}>
            <h1 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
               What are you working on today?
            </h1>

            <p className="text-md">Enter a short description of what you're working on</p>
            <div className="relative w-full my-6">
               <input
                  type="text"
                  placeholder="Type a description..."
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
               <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 cursor-pointer hover:shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-600 text-white rounded-full shadow-sm transition"
                  onClick={handleClick}
               >
                  <FiArrowUpRight className="w-4 h-4" />
               </button>
            </div>
            {error && <p className="text-center py-4 text-xs text-red-500 animate-pulse">{errorMessage}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
               {suggestions.map((text, index) => (
                  <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm transition"
                  >
                  {text}
                  </button>
               ))}
            </div>
         </div>
         {loading && <LoadingSpinner />}
      </div>
   );
};

export default Page;
