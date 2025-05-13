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

export const autofill = async(textContent, title, userId) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/gpt/autofill`, {textContent, title, userId})
      console.log(JSON.parse(response.data))
      return JSON.parse(response.data)
   } catch (err) {
      console.log(err.status)
      return err.status
   }
}

export const createTitle = async(textContent, userId) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/gpt/createTitle`, {textContent, userId})
      return response.data.title
   } catch (err) {
      console.log(err)
      return err.status
   }

}

export const register = async(username, email, password) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {username, email, password})
   } catch (err) {
      console.log(err)
   }
}

export const login = async(username, password) => {
   try {
      const response = await axios.post(
         `${API_BASE_URL}/auth/login`,
         { username, password },
         { withCredentials: true }
      );
      return response
   } catch (err) {
      console.log(err)
   }
}

export const logout = async() => {
   try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
   } catch (err) {
      console.log(err)
   }
}

export const createCheckoutSession = async(lookupKey, userId) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/stripe/create-checkout-session`, {lookupKey, userId})
      console.log(response)
      return response.data
   } catch (err) {
      console.log(err)
      return err
   }
}

export const createCheckoutPortal = async(userId) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/stripe/create-portal-session`, {userId})
      return response.data
   } catch (err) {
      console.log(err)
   }
}