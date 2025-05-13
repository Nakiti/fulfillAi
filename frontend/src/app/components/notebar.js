import { useState, useRef } from "react";
import { FiSidebar } from "react-icons/fi";
import { useContext } from "react";
import { NoteContext } from "../context/noteContext";
import NoteBarTextItem from "./noteBarText";

const NoteBar = () => {
   const {noteBarContent, setTextContent, textContent, prevContent, setPrevContent, showNoteBar, setShowNoteBar, loading, error, errorMessage, selectedAuto, setSelectedAuto, selectedRephrase, setSelectedRephrase} = useContext(NoteContext)

   const handleClick = (newText, idx) => {
      if (idx == selectedAuto) {
         setTextContent(prevContent)
         setSelectedAuto(null)
      } else {
         setTextContent(`${prevContent.trim()} ${newText.trim()}`)
         setSelectedAuto(idx)
      }
   };

   const handleRephraseClick = (newText, idx) => {
      if (idx == selectedRephrase) {
         setTextContent(prevContent)
         setSelectedRephrase(null)
      } else {
         setTextContent(newText)
         setSelectedRephrase(idx)
      }
   }

   return (
      <div
         className={`${
         showNoteBar ? "w-96" : "hidden"
         } h-screen bg-gray-50 px-4 py-2 flex flex-col text-sm text-gray-800 shadow-md overflow-y-auto`}
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
               {!error ? (loading ? (
                  <div className="text-center py-4 text-sm text-blue-500 animate-pulse">Generating suggestions...</div>
               ) : noteBarContent ? (
                  noteBarContent.auto.map((text, idx) => (
                     <NoteBarTextItem key={idx} text={text} idx={idx} click={handleClick} selected={selectedAuto}/>
                  ))
               ) : (
                  <p className="text-center py-4 text-sm text-blue-500 animate-pulse">Start typing...</p>
               )) :
                  <p className="text-center py-4 text-xs text-red-500 animate-pulse">{errorMessage}</p>
               }
            </div>
         </div>
         <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
               Rephrase Suggestions
            </h2>
            <p className="text-xs text-gray-500 mb-1 ">
               These will rephrase your thoughts as you type:
            </p>
            <div className="space-y-2">
               {!error ? (loading ? (
                  <div className="text-center py-4 text-sm text-blue-500 animate-pulse">Generating suggestions...</div>
               ) : noteBarContent ? (
                  noteBarContent.rephrase.map((text, idx) => (
                     <NoteBarTextItem key={idx} text={text} idx={idx} click={handleRephraseClick} selected={selectedRephrase}/>
                  ))
               ) : (
                  <p className="text-center py-4 text-sm text-blue-500 animate-pulse">Start typing...</p>
               )) :
               <p className="text-center py-4 text-xs text-red-500 animate-pulse">{errorMessage}</p>
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
               {!error ? (loading ? (
                  <div className="text-center py-4 text-sm text-blue-500 animate-pulse">Researching Info...</div>
               ) : noteBarContent ? noteBarContent.summary.map((note, idx) => (
                  <li key={idx} className="leading-snug flex items-start gap-1">
                     <span className="text-blue-400">•</span>
                     <span>{note}</span>
                  </li>
               ))
               :
               <div className="text-center py-4 text-sm text-blue-500 animate-pulse">Researching Information...</div>)
               :<p className="text-center py-4 text-xs text-red-500 animate-pulse">{errorMessage}</p>
            }
            </ul>
         </div>
      </div>
   );
};

export default NoteBar;
