"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/authContext";
import Link from "next/link";

const Login = () => {
   const [form, setForm] = useState({ username: "", password: "" });
   const router = useRouter();
   const { loginUser } = useContext(AuthContext);

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await loginUser(form.username, form.password);
      router.push("/");
   };

   return (
      <div className="flex justify-center min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4">
         <div className="w-full max-w-md bg-white border h-1/2 mt-24 border-gray-200 rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
               Sign in
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
               <div>
                  <label htmlFor="username" className="block text-sm text-gray-700 mb-1">
                     Username
                  </label>
                  <input
                     id="username"
                     name="username"
                     placeholder="Enter your username"
                     value={form.username}
                     onChange={handleChange}
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Enter your password"
                     value={form.password}
                     onChange={handleChange}
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <button
                  type="submit"
                  className="w-full cursor-pointer py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition"
               >
                  Log In
               </button>

               <div className="flex items-center justify-center">
                  <Link href="/auth/register" className="text-sm text-center mx-auto">
                     Don't Have An Account? Register
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
