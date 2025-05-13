import { useEffect, useState, useRef, useContext } from "react";
import { NoteContext } from "../context/noteContext";
import debounce from "lodash/debounce";
import { autofill } from "../services/createServices";
import { FiClipboard } from "react-icons/fi";
import { AuthContext } from "../context/authContext";

const TextArea = () => {
   const {
      textContent, setTextContent,
      noteBarContent, setNoteBarContent,
      setPrevContent, title,
      saved, setSaved, loading, setLoading, setErrorMessage, setError, setSelectedAuto, setSelectedRephrase
   } = useContext(NoteContext);
   const {currentUser} = useContext(AuthContext)

   const textareaRef = useRef(null);
   const [copied, setCopied] = useState(false);
   const debouncedChangeRef = useRef(null);

   useEffect(() => {
      // Create the debounced function once
      debouncedChangeRef.current = debounce(async (query) => {
         if (!query.trim()) {
            setNoteBarContent("");
            return;
         }
         setLoading(true);
         const response = await autofill(query, title, currentUser);
         console.log("response", response)
         if (response == 403) {
            setError(true)
            setErrorMessage("Max Queries Reached. Upgrade Plan or Try Again in x hours")
         } else if (typeof response === "number") {
            setError(true)
            setErrorMessage("Error. Try Again Later")
         } else {
            setNoteBarContent(response);
            setLoading(false);
         }
      }, 500); // Adjust delay as needed

      return () => {
         debouncedChangeRef.current.cancel(); // Clean up on unmount
      };
   }, []);

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto";
         textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
   }, [textContent]);

   const handleCopy = () => {
      if (!textContent) return;
      navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const handleChange = (e) => {
      const value = e.target.value;
      setTextContent(value);
      setPrevContent(value);
      setSaved(false);
      setSelectedAuto(null)
      setSelectedRephrase(null)
      debouncedChangeRef.current(value); // call the debounced function
   };

   return (
      <div className="relative max-w-4xl w-full">
         <button
         onClick={handleCopy}
         className="absolute cursor-pointer bottom-3 right-1 p-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
         title="Copy text"
         >
         <FiClipboard className="w-3 h-3" />
         </button>

         <textarea
            ref={textareaRef}
            value={textContent}
            onChange={handleChange}
            className="w-full min-h-96 bg-white text-sm resize-none border border-gray-300 rounded-lg p-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition overflow-y-hidden"
            placeholder="Start writing your thoughts, ideas, or notes here..."
            rows={1}
         />

         {copied && (
         <span className="absolute bottom-2 right-4 text-xs text-green-600">
            Copied!
         </span>
         )}
      </div>
   );
};

export default TextArea;
