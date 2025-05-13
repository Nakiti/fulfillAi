import { db } from "../db.js";

export const getUser = (req, res) => {
   const query = "SELECT * FROM users WHERE `id` = ?"

   const values = [req.params.id]

   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}