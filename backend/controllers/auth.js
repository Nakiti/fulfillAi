import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { serialize } from "cookie";

export const login = (req, res) => {
   const query = "SELECT * FROM users WHERE email = ?";

   console.log(req.body)

   db.query(query, [req.body.email], (err, data) => {
      if (err) return res.status(500).json("Server error");
      if (data.length === 0) return res.status(404).json("User not found");
   
      const isPasswordCorrect = bcrypt.compareSync(
         req.body.password,
         data[0].password_hash 
      );
   
      if (!isPasswordCorrect) {
         console.log("err")
         return res.status(400).json("Password is incorrect");
      }

      const token = jwt.sign({id: data[0].id, userType: data[0].role}, "jwtkey")

      const cookie = serialize("session", token, {
         httpOnly: true,
         secure: true,
         maxAge: 60 * 60 * 24,
         path: "/",
         sameSite: "none"
      });

      res.setHeader("Set-Cookie", cookie)
      const {password, id, role, ...userData} = data[0]
      res.status(200).json({id: id, role: role});
   });
};

export const logout = (req, res) => {
   res.setHeader('Set-Cookie', 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly;');
   res.status(200).json({ message: 'Logged out' });
   console.log("ayo")
}

export const createUser = (req, res) => {
   const q = "SELECT * FROM users WHERE email = ?"

   db.query(q, req.body.email, (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.length > 0) {return res.status(409).json("Email already in use")}
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const query = "INSERT INTO users (`username`, `email`, `password_hash`) VALUES (?)"
      const values = [
         req.body.username,
         req.body.lastName,
         req.body.email,
         hash,

      ]
  
      db.query(query, [values], (err, data) => {
         if (err) return console.log(err)
         return res.status(200).json(data.insertId)
      })
   })
}

