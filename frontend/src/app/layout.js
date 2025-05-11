"use client";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import NoteBar from "./components/notebar";
import { useState, useEffect } from "react";
import { getNotesByUser } from "./services/fetchServices";
import { NoteContextProvider } from "./context/noteContext";

export default function RootLayout({ children }) {
   const [showSidebar, setShowSidebar] = useState(false)
   const [showNoteBar, setShowNoteBar] = useState(true)
   

   return (
      <html lang="en" className="h-full">
         <body className="h-full">
            <div className="flex min-h-screen">
               <NoteContextProvider>
                  {<Sidebar showSideBar={showSidebar} setShowSideBar={setShowSidebar} setShowNoteBar={setShowNoteBar}/>}

                  <div className="flex flex-col flex-1 overflow-hidden">
                     <Header showSideBar={showSidebar} showNoteBar={showNoteBar} setShowSideBar={setShowSidebar} setShowNoteBar={setShowNoteBar}/>
                     <main className="flex-1 overflow-y-auto">{children}</main>
                  </div>

                  <NoteBar showNoteBar={showNoteBar} setShowNoteBar={setShowNoteBar}/>
               </NoteContextProvider>
            </div>
         </body>
      </html>
   );
}
