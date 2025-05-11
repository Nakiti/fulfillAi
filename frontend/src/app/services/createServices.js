import axios from "axios"
const API_BASE_URL = "http://localhost:4000/api"

export const createNote = async(userId, textContent, title) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/notes/create`, {
         userId: userId,
         textContent: textContent,
         title: title
      })
      console.log(response)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const autofill = async(textContent, title) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/gpt/autofill`, {textContent, title})
      console.log(JSON.parse(response.data))
      return JSON.parse(response.data)
   } catch (err) {
      console.log(err)
   }
}

export const createTitle = async(textContent) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/gpt/createTitle`, {textContent})
      return response.data.title
   } catch (err) {
      console.log(err)
   }

}

