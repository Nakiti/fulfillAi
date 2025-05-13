"use client";
import { useState, useContext } from "react";
import { createCheckoutPortal, createCheckoutSession } from "../services/createServices";
import { AuthContext } from "../context/authContext";
import { FiX, FiArrowRight } from "react-icons/fi";

const UpgradeModal = ({setShowUpgrade}) => {
   const [loadingKey, setLoadingKey] = useState(null);
   const {currentUser, userTier} = useContext(AuthContext)

   const plans = [
      {
         name: "Free",
         price: "$0/month",
         description: "Basic access to writing tools.",
         features: [
            "✓ Create and edit notes",
            "✓ Basic autofill suggestions",
            "✓ Limited usage per month",
         ],
         lookupKey: "free_plan", // used if you want to show active tier
         disabled: userTier == "free",
      },
      {
         name: "Pro",
         price: "$5/month",
         description: "Full access with unlimited smart features.",
         features: [
            "✓ Everything in Free",
            "✓ Increased autofill & rephrase",
            "✓ Unlimited Access to GPT-4o",
            "✓ No Ads",
         ],
         lookupKey: "pro_plan", // matches Stripe price lookup_key
         disabled: userTier == "pro",
      },
   ];

   const handleSubscribe = async (lookupKey) => {
      setLoadingKey(lookupKey);
      const response = await createCheckoutSession(lookupKey, currentUser)

      if (response) {
         window.location.href = response;
      } else {
         alert("Subscription failed.");
         setLoadingKey(null);
      }
   };

   const handlePortal = async() => {
      const response = await createCheckoutPortal(currentUser)
      if (response) {
         window.location.href = response;
      } else {
         alert("error openeing portal.");
         setLoadingKey(null);
      }
   }

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
         <div className="relative flex flex-col bg-white p-8 rounded-xl w-full max-w-4xl shadow-lg">
            <button
               onClick={() => setShowUpgrade(false)}
               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
               title="Close"
            >
               <FiX className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
               Choose Your Plan
            </h1>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
               {plans.map((plan) => (
                  <div
                     key={plan.name}
                     className="border border-gray-200 rounded-xl bg-white p-6"
                  >
                     <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
                     <p className="text-2xl font-bold mb-3">{plan.price}</p>
                     <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                     <ul className="text-sm text-gray-700 space-y-2 mb-4">
                     {plan.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                     ))}
                     </ul>

                     <button
                        disabled={plan.disabled}
                        className={`w-full py-2 rounded-md text-sm font-medium transition ${
                           plan.disabled
                              ? "bg-gray-200 cursor-not-allowed text-gray-500"
                              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 cursor-pointer"
                        }`}
                        onClick={() => handleSubscribe(plan.lookupKey)}
                     >
                        {loadingKey === plan.lookupKey ? "Redirecting..." : plan.disabled ? "Current Plan" : "Get Started"}
                     </button>
                  </div>
               ))}
            </div>
            <button
               onClick={handlePortal}
               className="py-2 rounded-md w-1/4 mx-auto mt-4 text-sm font-medium transition bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 cursor-pointer"
            >
               <p>Manage Plans</p>
            </button>
         </div>
      </div>
   );
};

export default UpgradeModal;
