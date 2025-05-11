import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api"

export const updateNote = async(userId, noteId, textContent) => {
   try {
      const response = await axios.put(`${API_BASE_URL}/notes/update/${noteId}`, {
         userId: userId,
         textContent: textContent
      })
   } catch (err) {
      console.log(err)
   }
}