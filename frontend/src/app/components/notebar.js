import { useState, useRef } from "react";
import { FiSidebar } from "react-icons/fi";
import { useContext } from "react";
import { NoteContext } from "../context/noteContext";

const NoteBar = ({ showNoteBar, setShowNoteBar }) => {
   const [selected, setSelected] = useState(null);
   const {noteBarContent, setTextContent, textContent, prevContent, setPrevContent} = useContext(NoteContext)

   const handleClick = (newText, idx) => {
      // Update state
      setTextContent(`${prevContent} ${newText}`.trim());
      setSelected(idx);
   };

   return (
      <div
         className={`${
         showNoteBar ? "w-96" : "hidden"
         } min-h-screen bg-gray-50 px-4 py-2 flex flex-col text-sm text-gray-800 shadow-md`}
      >
         {/* Close Button */}
         <div className="flex justify-end mb-4">
            <button
               className="p-1 rounded hover:bg-gray-200 cursor-pointer text-gray-600"
               onClick={() => setShowNoteBar(false)}
               title="Close Notebar"
            >
               <FiSidebar className="w-6 h-6" />
            </button>
         </div>

         {/* Autofill Suggestions */}
         <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
               Autofill Suggestions
            </h2>
            <p className="text-xs text-gray-500 mb-1 ">
               These will auto-complete your thoughts as you type:
            </p>
            <div className="space-y-2">
               {noteBarContent ? noteBarContent.auto.map((text, idx) => (
                  <button
                  key={idx}
                  onClick={() => handleClick(text)}
                  className={`w-full text-left cursor-pointer px-2 py-1 text-sm rounded-md transition-all duration-150 hover:bg-gray-200 text-gray-700
                     ${selected ? "bg-gray-200" : "bg-gray-100"}
                     `}
                  >
                  {text}
                  </button>
               )) :
                  <p className="text-xs text-gray-500 text-center my-12">Start Typing. . . </p>
               }
            </div>
         </div>

         {/* Notes & Context */}
         
         <div className="border-t pt-5 border-gradient-to-r from-blue-500 to-indigo-700">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
               External Context & Additional Info
            </h2>
            <p className="text-xs text-gray-500 mb-3">
               These are suggestions for you to consider in your writing:
            </p>
            <ul className="space-y-3 text-gray-700 text-sm">
               {noteBarContent ? noteBarContent.summary.map((note, idx) => (
                  <li key={idx} className="leading-snug flex items-start gap-1">
                  <span className="text-blue-400">•</span>
                  <span>{note}</span>
                  </li>
               ))
               :
               <p className="text-xs text-gray-500 text-center my-12">Start Typing. . . </p>
            }
            </ul>
         </div>
      </div>
   );
};

export default NoteBar;
