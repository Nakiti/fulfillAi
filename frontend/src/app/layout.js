"use client";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import NoteBar from "./components/notebar";
import { useState } from "react";
import { NoteContextProvider } from "./context/noteContext";
import { usePathname } from "next/navigation";
import { AuthContextProvider } from "./context/authContext";

export default function RootLayout({ children }) {
   const pathname = usePathname()
   const isAuth = pathname.split("/")[1] == "auth"
   const [showSidebar, setShowSidebar] = useState(false)
   const [showNoteBar, setShowNoteBar] = useState(false)

   return (
      <html lang="en" className="h-full">
         <body className="h-full">
            <div className="flex min-h-screen">
               <AuthContextProvider>
                  <NoteContextProvider>
                     {<Sidebar showSideBar={showSidebar} setShowSideBar={setShowSidebar} setShowNoteBar={setShowNoteBar}/>}

                     <div className="flex flex-col flex-1 overflow-hidden">
                        <Header isAuth={isAuth} showSideBar={showSidebar} showNoteBar={showNoteBar} setShowSideBar={setShowSidebar} setShowNoteBar={setShowNoteBar}/>
                        <main className="flex-1 overflow-y-auto">{children}</main>
                     </div>

                     <NoteBar showNoteBar={showNoteBar} setShowNoteBar={setShowNoteBar}/>
                  </NoteContextProvider>
               </AuthContextProvider>
            </div>
         </body>
      </html>
   );
}
