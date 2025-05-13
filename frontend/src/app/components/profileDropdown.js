import {
  FiLogOut,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiInfo,
  FiArrowUpRight,
} from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { PiPlugsConnectedThin } from "react-icons/pi";
import { logout } from "../services/createServices";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const ProfileDropdown = ({ setShowDropdown, router, setShowSettings, setShowUpgrade, currentUser }) => {
   const {logoutUser} = useContext(AuthContext)

   const handleClick = async (action) => {
      setShowDropdown(false);
      if (typeof action === "string" && action === "logout") {
         await logoutUser()
         router.push("/")
      } else if (typeof action === "function") {
         action();
      }
   };

   const menuItems = [
      currentUser ? { label: "Upgrade Plan", icon: BsStars, action: () => setShowUpgrade(true) } : null,
      currentUser ? { label: "Settings", icon: FiUser, action: () => setShowSettings(true) } : null,
      currentUser ? "divider" : null,
      currentUser ? { label: "Log out", icon: FiLogOut, action: "logout" } : null,
      !currentUser ? { label: "Log In", icon: FiLogOut, action: () => router.push("/auth/login") } : null
   ];

   return (
      <div className="relative mt-2 w-64 py-2 bg-white shadow-xl border border-gray-200 rounded-xl z-50 overflow-hidden">
         {menuItems.map((item, idx) =>
         item != null && ( item === "divider" ? (
            <div key={idx} className="border-t border-gray-200 my-1" />
         ) : (
            <button
               key={idx}
               onClick={() => handleClick(item.action)}
               className="w-full cursor-pointer flex items-center gap-3 text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
            >
               <item.icon className="w-4 h-4 text-gray-500" />
               <span>{item.label}</span>
            </button>
         ))
         )}
      </div>
   );
};

export default ProfileDropdown;
