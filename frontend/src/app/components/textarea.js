import { useEffect, useState, useRef, useContext, useCallback } from "react"
import { NoteContext } from "../context/noteContext";
import debounce from "lodash/debounce"
import { autofill } from "../services/createServices";
import { FiClipboard } from "react-icons/fi";

const TextArea = () => {
  const {textContent, setTextContent, noteBarContent, setNoteBarContent, setPrevContent, title, saved, setSaved} = useContext(NoteContext)
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto"; // Reset
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
      setPrevContent(value)
      debouncedChange(value);
      setSaved(false)
   };

   const debouncedChange = useCallback(
   debounce(async (query) => {
         console.log(query)
         if (!query.trim()) {
            setNoteBarContent("")
            return
         };
         const response = await autofill(query, title);
         setNoteBarContent(response);
      }, 
   300), []);

   return (
      <div className="relative max-w-4xl w-full ">
         {/* Copy Button */}
         <button
            onClick={handleCopy}
            className="absolute cursor-pointer top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
            title="Copy text"
         >
            <FiClipboard className="w-3 h-3" />
         </button>

         {/* Textarea */}
         <textarea
            ref={textareaRef}
            value={textContent}
            onChange={handleChange}
            className="w-full min-h-96 bg-white text-sm resize-none border border-gray-300 rounded-lg p-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition overflow-y-hidden"
            placeholder="Start writing your thoughts, ideas, or notes here..."
            rows={1}
         />

         {/* Copied Feedback */}
         {copied && (
         <span className="absolute bottom-2 right-4 text-xs text-green-600">
            Copied!
         </span>
         )}
      </div>
   )
}

export default TextArea