import { useState } from "react";
import { FiX } from "react-icons/fi";

const tabs = [
  "General",
  "Notifications",
  "Personalization",
  "Speech",
  "Data controls",
  "Builder profile",
  "Connected apps",
  "Security",
  "Subscription",
];

const SettingsModal = ({ setShowSettings }) => {
   const [activeTab, setActiveTab] = useState("General");

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
         <div className="relative bg-white w-full max-w-4xl h-[80vh] rounded-2xl shadow-lg flex overflow-hidden">
         {/* Close Button */}
         <button
            onClick={() => setShowSettings(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
         >
            <FiX className="w-5 h-5" />
         </button>

         {/* Sidebar */}
         <div className="w-48 border-r border-gray-200 bg-white py-4 px-2 overflow-y-auto">
            {tabs.map((tab) => (
               <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition ${
                  activeTab === tab
                     ? "bg-gray-100 font-semibold text-black"
                     : "hover:bg-gray-50 text-gray-600"
               }`}
               >
               {tab}
               </button>
            ))}
         </div>

         {/* Main Panel */}
         <div className="flex-1 p-6 overflow-y-auto space-y-4 text-sm text-gray-800">
            {activeTab === "General" && (
               <>
               <div className="flex justify-between items-center">
                  <span className="text-gray-700">Theme</span>
                  <select className="border rounded-md px-2 py-1 text-sm">
                     <option>System</option>
                     <option>Light</option>
                     <option>Dark</option>
                  </select>
               </div>
               <div className="flex justify-between items-center">
                  <span>Always show code when using data analyst</span>
                  <input type="checkbox" className="toggle" />
               </div>
               <div className="flex justify-between items-center">
                  <span>Show follow-up suggestions in chats</span>
                  <input type="checkbox" className="toggle" />
               </div>
               <div className="flex justify-between items-center">
                  <span>Language</span>
                  <select className="border rounded-md px-2 py-1 text-sm">
                     <option>Auto-detect</option>
                     <option>English</option>
                     <option>Spanish</option>
                  </select>
               </div>
               </>
            )}

            {activeTab === "Subscription" && (
               <>
               <div className="flex justify-between items-center">
                  <span>Archived chats</span>
                  <button className="border rounded-md px-3 py-1 text-sm">Manage</button>
               </div>
               <div className="flex justify-between items-center">
                  <span>Archive all chats</span>
                  <button className="border rounded-md px-3 py-1 text-sm">Archive all</button>
               </div>
               <div className="flex justify-between items-center">
                  <span>Delete all chats</span>
                  <button className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600">
                     Delete all
                  </button>
               </div>
               </>
            )}

            {/* Add more tab panels as needed */}
         </div>
         </div>
      </div>
   );
};

export default SettingsModal;
