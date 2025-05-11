"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";

const Login = () => {
   const [form, setForm] = useState({ username: "", password: "" });
   const router = useRouter();
   const {loginUser} = useContext(AuthContext)

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // send form to backend login endpoint
      await loginUser(form.username, form.password)
      router.push("/")
   };

   return (
      <div className="flex flex-col items-center  justify-center min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4">
         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
         <h1 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
            Log In to Your Account
         </h1>

         <form onSubmit={handleSubmit} className="space-y-4">
            <input
               name="username"
               placeholder="Username"
               value={form.username}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
               type="password"
               name="password"
               placeholder="Password"
               value={form.password}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
               type="submit"
               className="cursor-pointer w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:shadow-lg transition"
            >
               Log In
            </button>
         </form>
         </div>
      </div>
   );
};

export default Login;