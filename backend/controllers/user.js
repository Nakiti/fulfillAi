import { db } from "../db.js";

export const getCurrentUser = (req, res) => {
   const token = req.cookies.session
   // console.log("cookies", req.cookies)
   // console.log("token \n", req.cookies.session, "\n")

   if (!token) return res.status(401).json("Not authenticated");

   jwt.verify(token, "jwtkey", (err, data) => {
      if (err) return res.status(403).json("Token is not Valid")
      
      res.status(200).json({id: data.id})
   })
}

export const getUser = (req, res) => {
   const query = "SELECT * FROM users WHERE `id` = ?"

   const values = [req.params.id]

   db.query(query, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}