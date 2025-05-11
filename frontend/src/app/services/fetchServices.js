import axios from "axios";
const API_BASE_URL = "http://localhost:4000/api"

export const getNote = async(id) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/notes/get/${id}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getNotesByUser = async(id) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/notes/getByUser/${id}`)
      return response.data

   } catch (err) {
      console.log(err)
   }
}