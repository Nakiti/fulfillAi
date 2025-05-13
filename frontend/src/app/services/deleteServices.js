import axios from "axios";
const API_BASE_URL = "http://localhost:4000/api"

export const deleteNote = async(url, id) => {
   try {
      await axios.delete(`${API_BASE_URL}/notes/delete/${id}`, {
         data: { blobUrl: url },
      })

   } catch (err) {
      console.log(err)
   }
}