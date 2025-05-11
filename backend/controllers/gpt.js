import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
});

export const autofill = async(req, res) => {

   console.log("writing")

   try {
      const completion = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: [
            {
               role: "user",
               content: `
               You are acting as an intelligent autofill and external research assistant. Based on the following input text, perform two tasks with strict formatting:

               ---
               This is the overall topic: "${req.body.title}". Make sure all generated text is relevant to this. 

               1. **Generate 3 continuation suggestions that adds at least 2 sentences to the existing text** Each continuation should logically extend the topic in a distinct way, while staying relevant to the tone, purpose, and subject of the original input. **Each suggestion must contain at least two full, well-structured sentences using proper grammar and punctuation. Do not generate one-sentence outputs.** If the sentence is partially complete, then complete it before creating a new sentence!

               2. **Provide 3 bullet points of factual or contextual information** that could supplement or enhance the original text. **Each bullet point must contain two full sentences** that add clarity, depth, or background. These should not repeat content from the original text, but still be relevant to what is discussed.

               ---

               Return your response strictly in the following JSON format:

               {
               "auto": ["", "", ""],
               "summary": ["", "", ""]
               }

               Do not include explanations, markdown, or formatting outside of this structure.

               Here is the original text:
               "${req.body.textContent}"
               `
            }
         ]
      })

      const content = completion.choices[0].message.content
      return res.status(200).json(content)
   } catch (err) {
      console.log(err)
   }
}

export const createTitle = async(req, res) => {
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
      console.log(title)
      return res.status(200).json({ title });
   } catch (err) {
      console.log(err)
   }

}