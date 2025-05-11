import { FiSidebar } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";

const Header = ({showSideBar, setShowSideBar, showNoteBar, setShowNoteBar, isAuth}) => {
   const {currentUser} = useContext(AuthContext)
   const router = useRouter()

   return (
      <div className="bg-white border-b shadow-sm border-gray-100 flex flex-row justify-between items-center py-2 px-4">
         <div className="flex flex-row items-center">
            {!showSideBar && !isAuth && <div>
               <button className="p-1 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setShowSideBar(true)}>
                  <FiSidebar className="w-6 h-6" />
               </button>
               <button className="p-1 rounded-md hover:bg-gray-100 cursor-pointer ">
                  <HiOutlinePencilAlt className="w-6 h-6 " />
               </button>
            </div>}
            <h1 className="text-lg font-semibold text-gray-800 ml-2 bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">FulFill AI</h1>
         </div>
         <div>
            {!currentUser && <button 
               className="p-1 rounded-md hover:bg-gray-100 cursor-pointer" 
               onClick={() => router.push("/auth/login")}
            >
               <CgProfile className="w-6 h-6" />
            </button>}
            {!showNoteBar && !isAuth && <button className="p-1 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setShowNoteBar(true)}>
               <FiSidebar className="w-6 h-6" />
            </button>}
         </div>
      </div>
   );
};

export default Header;
