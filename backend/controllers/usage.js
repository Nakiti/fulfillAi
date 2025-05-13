import { db } from "../db.js"

export const getUsage = (req, res) => {
   const query = "SELECT * FROM usage WHERE `user_id` = ?"

   const value = [req.params.userId]

   db.query(query, value, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const getUserUsage = (userId) => {
   const query = "SELECT * FROM usage WHERE `user_id` = ?"

   const value = [userId]

   db.query(query, value, (err, data) => {
      if (err) return res.json(err)
      return data[0].tokens_used
   })
}

export const updateUsage = (req, res) => {
   const query = "UPDATE usage SET `tokens_used` = ? WHERE `user_id` = ?"

   const values = [
      req.body.tokens,
      req.params.userId
   ]

   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const createUsage = (req, res) => {
   const query = "INSRET INTO usage (`user_id`, `tokens_used`) VALUES (?)"

   const values = [req.body.userId, req.body.tokens]

   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

