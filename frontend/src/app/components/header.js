import { useContext, useState, useRef, useEffect } from "react";
import { FiSidebar } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/authContext";
import { NoteContext } from "../context/noteContext";
import ProfileDropdown from "./profileDropdown";
import UpgradeModal from "./upgradeModal";
import SettingsModal from "./settingsModal";

const Header = ({ isAuth }) => {
   const { currentUser } = useContext(AuthContext);
   const {
      setNoteBarContent,
      showSideBar,
      setShowSideBar,
      showNoteBar,
      setShowNoteBar,
   } = useContext(NoteContext);

   const router = useRouter();
   const [showDropdown, setShowDropdown] = useState(false);
   const [showUpgrade, setShowUpgrade] = useState(false)
   const [showSettings, setShowSettings] = useState(false)
   const dropdownRef = useRef();

   const handleNew = () => {
      setNoteBarContent("");
      setShowNoteBar(false);
      router.push("/");
   };

   // Close dropdown on outside click
   useEffect(() => {
      const handleClickOutside = (e) => {
         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
         setShowDropdown(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div className="bg-white border-b shadow-sm border-gray-100 flex justify-between items-center py-2 px-4">
         <div className="flex items-center">
         {!showSideBar && !isAuth && (
            <div className="flex items-center gap-2">
               <button
               className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
               onClick={() => setShowSideBar(true)}
               >
               <FiSidebar className="w-6 h-6" />
               </button>
               <button
               className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
               onClick={handleNew}
               >
               <HiOutlinePencilAlt className="w-6 h-6" />
               </button>
            </div>
         )}
         <h1 className="text-lg font-semibold text-gray-800 ml-2 bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
            FulFill AI
         </h1>
         </div>

         <div className="relative" ref={dropdownRef}>
            <button
               className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
               onClick={() => setShowDropdown((prev) => !prev)}
            >
               <CgProfile className="w-6 h-6" />
            </button>

            {showDropdown && (
               <div className="absolute right-0 top-full mt-0 z-50">
                  <ProfileDropdown
                     currentUser={currentUser}
                     setShowDropdown={setShowDropdown}
                     router={router}
                     setShowSettings={setShowSettings}
                     setShowUpgrade={setShowUpgrade}
                  />
               </div>
            )}
            {!showNoteBar && !isAuth && (
            <button
               className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
               onClick={() => setShowNoteBar(true)}
            >
               <FiSidebar className="w-6 h-6" />
            </button>
            )}
         </div>
         
         {showUpgrade && <UpgradeModal setShowUpgrade={setShowUpgrade}/>}
         {showSettings && <SettingsModal setShowSettings={setShowSettings}/>}
      </div>
   );
};

export default Header;
