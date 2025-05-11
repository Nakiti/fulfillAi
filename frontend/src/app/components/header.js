import { FiSidebar } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FiSave } from "react-icons/fi";

const Header = ({showSideBar, setShowSideBar, showNoteBar, setShowNoteBar}) => {



   return (
      <div className="bg-white border-b shadow-sm border-gray-100 flex flex-row justify-between items-center py-2 px-4">
         <div className="flex flex-row items-center">
            {!showSideBar && <div>
               <button className="p-1 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setShowSideBar(true)}>
                  <FiSidebar className="w-6 h-6" />
               </button>
               <button className="p-1 rounded-md hover:bg-gray-100 cursor-pointer">
                  <HiOutlinePencilAlt className="w-6 h-6" />
               </button>
            </div>}
            <h1 className="text-lg font-semibold text-gray-800 ml-2">FulFill AI</h1>
         </div>
         <div>

            {!showNoteBar && <button className="p-1 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setShowNoteBar(true)}>
               <FiSidebar className="w-6 h-6" />
            </button>}
         </div>
      </div>
   );
};

export default Header;
