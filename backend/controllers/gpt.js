import OpenAI from "openai";
import dotenv from "dotenv";
import { getUserUsage } from "./usage.js";
import { db } from "../db.js";

dotenv.config();
const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
});

export const autofill = (req, res) => {
   const userId = req.body.userId; // assuming JWT is decoded
   console.log(userId)
   db.query("SELECT * FROM users WHERE `id` = ?", [userId], async(err, data) => {
      if (err) console.log(err)
      const user = data[0]

      console.log(user)
      if (user.tier == "free") {
         // Add usage limit, rate limit, or restrict model
         const monthlyUsage = user.tokens_used;
         console.log(monthlyUsage)
         if (monthlyUsage > 100000) {
            return res.status(403).json({ error: "Free tier limit reached. Upgrade to continue." });
         }
      } 

      try {
         const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
               {
                  role: "user",
                  content: `
                  You are an intelligent autofill assistant. Given the topic "${req.body.title}" and this input: "${req.body.textContent}", do the following:
                  
                  Guidelines:
                  - Treat the input as partial writing. Your job is to extend or transform it.
                  - **Do NOT repeat any part of the input in your suggestions.**
                  - If the input ends mid-sentence, you must **continue the sentence directly**.
                  - All text must be grammatically correct, natural, and coherent.
                  - Do not start your suggestions with text that overlaps or rephrases the input.

                  1. "auto": 3 unique continuations (each ≥2 full sentences, starting where the input ends).
                  2. "summary": 3 relevant facts or insights (2 full sentences each, no repeats).
                  3. "rephrase": 3 paraphrased versions of the input (natural, same meaning).

                  Return **only** a valid JSON object. No extra formatting. Expected format:
                  {"auto": ["", "", ""], "summary": ["", "", ""], "rephrase": ["", "", ""]}
                  `
               }
            ]
         })

         const content = completion.choices[0].message.content
         const tokensUsed = completion.usage.total_tokens

         db.query(
            "UPDATE users SET tokens_used = tokens_used + ? WHERE id = ?",
            [tokensUsed, userId]
         );
         console.log(content, tokensUsed)
         return res.status(200).json(content)
      } catch (err) {
         console.log(err)
         return res.status(400).json(err)
      }
   });
}

export const createTitle = async(req, res) => {
   const userId = req.body.userId

   db.query("SELECT * FROM users WHERE `id` = ?", [userId], async(err, data) => {
      if (err) console.log(err)
      const user = data[0]

      if (user.tier == "free") {
         // Add usage limit, rate limit, or restrict model
         const monthlyUsage = user.tokens_used;
         console.log(monthlyUsage)
         if (monthlyUsage > 100000) {
            return res.status(403).json({ error: "Free tier limit reached. Upgrade to continue." });
         }
      } 
      try {
         const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
               {
                  role: "user",
                  content: `
                  Extract a concise up to 4-word title from the following . No creativity — just most relevant keywords.No quotes, no punctuation, no formatting — just the plain text title: 
                  "${req.body.textContent}"
                  `
               }
            ]
         })

         const title = completion.choices[0].message.content.trim();
         const tokensUsed = completion.usage.total_tokens

         db.query(
            "UPDATE users SET tokens_used = tokens_used + ? WHERE id = ?",
            [tokensUsed, userId]
         );
         console.log(title)
         return res.status(200).json({ title });
      } catch (err) {
         console.log(err)
         return res.status(400).json(err)
      }
   })
}