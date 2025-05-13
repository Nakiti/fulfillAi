
const NoteBarTextItem = ({text, idx, click, selected}) => {

   return (
      <button
         key={idx}
         onClick={() => click(text, idx)}
         className={`w-full text-left cursor-pointer px-2 py-1 text-sm rounded-md transition duration-150 hover:bg-gray-200 ${selected == idx ? "bg-blue-100" : "bg-gray-100"}`}
         >
         {text}
      </button>
   )
}

export default NoteBarTextItem