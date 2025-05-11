import { AiOutlinePlus } from "react-icons/ai";
import { FiSidebar } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { NoteContext } from "../context/noteContext";
import { useParams } from "next/navigation";
import { FiTrash } from "react-icons/fi";
import { AuthContext } from "../context/authContext";

const Sidebar = ({showSideBar, setShowSideBar, setShowNoteBar}) => {
   const router = useRouter()
   const {setNoteBarContent, notes} = useContext(NoteContext)
   const params = useParams()
   const {noteId} = params
   const {currentUser} = useContext(AuthContext)

   console.log(currentUser)

   const handleNew = () => {
      router.push("/")
      // setShowNoteBar(false)
   }

   const organizeNotesByDate = (notes) => {
      const sections = {
         Today: [],
         Yesterday: [],
         Older: [],
      };

      const sortedNotes = [...notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      sortedNotes.forEach((note) => {
         const created = new Date(note.created_at);
         const createdDay = new Date(created.getFullYear(), created.getMonth(), created.getDate());

         if (createdDay.getTime() === today.getTime()) {
            sections.Today.push(note);
         } else if (createdDay.getTime() === yesterday.getTime()) {
            sections.Yesterday.push(note);
         } else {
            sections.Older.push(note);
         }
      });

      return sections;
   };

   const grouped = notes && organizeNotesByDate(notes)
   

   const handleNoteClick = (id) => {
      setNoteBarContent("")
      router.push(`/note/${id}`)
   }

   return (
      <div className={`${showSideBar ? "w-64" : "hidden"} bg-gradient-to-b from-white via-blue-50 to-white h-screen text-sm text-gray-800 border-r border-gray-200 px-4 py-2 shadow-inner overflow-y-auto`}>
         {/* Header Icons */}
         <div className="rounded-md flex items-center justify-between px-1 mb-4">
            {/* Left icon */}
            <button className="p-1 rounded hover:bg-gray-100 text-gray-700 bg-white" onClick={() => setShowSideBar(false)}>
               <FiSidebar className="w-6 h-6" />
            </button>

            {/* Right icons */}
            <div className="flex items-center gap-2">
               {/* <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                  <IoSearch className="w-6 h-6" />
               </button> */}
               <button 
                  className="p-1 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                  onClick={() => router.push("/")}
               >
                  <HiOutlinePencilAlt className="w-6 h-6" />
               </button>
            </div>
         </div>

         {/* New Chat Button */}
         <button 
            className="w-full text-gray-600 flex cursor-pointer items-center gap-2 px-3 py-2 mb-6 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
            onClick={handleNew}
         >
            <AiOutlinePlus className="w-4 h-4" />
            <span className="text-sm font-medium">New Chat</span>
         </button>

         {currentUser && grouped && Object.entries(grouped).map(([label, items]) =>
            items.length > 0 ? (
               <div key={label} className="mb-2">
                  <h2 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
                     {label}
                  </h2>
                  <div className="space-y-1">
                     {items.map((note) => (
                        <button
                           key={note.id}
                           className={`w-full text-left px-3 py-2 rounded-md  cursor-pointer transition ${noteId == note.id ? "bg-gray-200" : "bg-none hover:bg-gray-100"}`}
                           onClick={() => handleNoteClick(note.id)}
                        >
                           {note.note_title.replace(/^"|"$/g, "")}
                        </button>
                     ))}
                  </div>
               </div>
            ) : null
         )}
         {!currentUser && <p className="text-center bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">Login to save notes!</p>}
      </div>
   );
};

export default Sidebar;
