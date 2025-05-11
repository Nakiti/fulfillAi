// register.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/services/createServices";

const Register = () => {
   const [form, setForm] = useState({ username: "", email: "", password: "" });
   const router = useRouter();

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // send form to backend register endpoint
      await register(form.username, form.email, form.password)
      router.push("/auth/login")
   };

   return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4">
         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-24">
         <h1 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
            Create an Account
         </h1>

         <form onSubmit={handleSubmit} className="space-y-4">
            <input
               type="text"
               name="username"
               placeholder="Username"
               value={form.username}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
               type="email"
               name="email"
               placeholder="Email"
               value={form.email}
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
               className="w-full cursor-pointer py-2 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:shadow-lg transition"
            >
               Register
            </button>
         </form>
         </div>
      </div>
   );
};

export default Register;