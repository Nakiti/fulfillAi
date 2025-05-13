import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { serialize } from "cookie";

export const login = (req, res) => {
   const query = "SELECT * FROM users WHERE username = ?";

   console.log(req.body)

   db.query(query, [req.body.username], (err, data) => {
      if (err) return res.status(500).json("Server error");
      if (data.length === 0) return res.status(404).json("User not found");
   
      const isPasswordCorrect = bcrypt.compareSync(
         req.body.password,
         data[0].password 
      );
   
      if (!isPasswordCorrect) {
         console.log("err")
         return res.status(400).json("Password is incorrect");
      }

      const token = jwt.sign({id: data[0].id, tier: data[0].tier}, "jwtkey")
      console.log(token)
      console.log("sadfsdfsdf")

      const cookie = serialize("session", token, {
         httpOnly: true,
         secure: false,
         maxAge: 60 * 60 * 24,
         path: "/",
         sameSite: "lax"
      });

      console.log("cookie", cookie)
      res.setHeader("Set-Cookie", cookie)
      const {password, id, tier, ...userData} = data[0]
      console.log(id, tier)
      res.status(200).json({id: id, tier: tier});
   });
};

export const logout = (req, res) => {
   const expiredCookie = serialize("session", "", {
      httpOnly: true,
      secure: false,            
      sameSite: "lax",            
      path: "/",                   
      expires: new Date(0),        
   });
   res.setHeader("Set-Cookie", expiredCookie);
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

      const query = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)"
      const values = [
         req.body.username,
         req.body.email,
         hash,
      ]
  
      db.query(query, [values], (err, data) => {
         if (err) return console.log(err)
         return res.status(200).json(data.insertId)
      })
   })
}

export const getCurrentUser = (req, res) => {
   const token = req.cookies.session
   console.log("cookies", req.cookies)
   // console.log("token \n", req.cookies.session, "\n")
   const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
   console.log("decoded", decoded);

   if (!token) return res.status(401).json("Not authenticated");

   jwt.verify(token, "jwtkey", (err, decoded) => {
      if (err) return res.status(403).json("Token is not valid");

      const userId = decoded.id;

      db.query("SELECT tier FROM users WHERE id = ?", [userId], (err, data) => {
         if (err) return res.status(500).json("Database error");

         const latestTier = data[0]?.tier

         if (decoded.tier !== latestTier) {
            const updatedToken = jwt.sign({ id: userId, tier: latestTier }, "jwtkey");

            const cookie = serialize("session", updatedToken, {
               httpOnly: true,
               secure: false,
               maxAge: 60 * 60 * 24,
               path: "/",
               sameSite: "lax"
            });

            res.setHeader("Set-Cookie", cookie);
         }

         res.status(200).json({ id: userId, tier: latestTier });
      });
   });
}