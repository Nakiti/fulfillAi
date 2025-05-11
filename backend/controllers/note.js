import { db } from "../db.js";
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";

dotenv.config();

const accountName  = process.env.AZURE_ACCOUNT_NAME
const containerName = process.env.AZURE_CONTAINER_NAME
const token = process.env.AZURE_TOKEN
 
const blobServiceClient = new BlobServiceClient(
   `https://${accountName}.blob.core.windows.net?${token}`
)

export const createNote = async (req, res) => {
   try {
      const containerClient = blobServiceClient.getContainerClient(containerName)
      const blobName = `${req.body.userId}/${uuidv4()}.txt`
      const blockBlobClient = containerClient.getBlockBlobClient(blobName)

      const buffer = Buffer.from(req.body.textContent, "utf-8")

      const uploadBlobResponse = await blockBlobClient.uploadData(buffer, {
         blobHTTPHeaders: {
            blobContentType: 'text/plain',
            blobContentDisposition: 'inline' 
         }
      })

      console.log(uploadBlobResponse)

      const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`

      const query = "INSERT INTO notes (`user_id`, `note_title`, `blob_url`) VALUES (?)"

      const values = [
         req.body.userId,
         req.body.title,
         blobUrl
      ]

      db.query(query, [values], (err, data) => {
         if (err) return console.log(err)
         return res.status(200).json(data.insertId)
      })
   } catch (err) {
      console.log(err)
   } 
}

export const getNotesByUser = (req, res) => {
   const query = "SELECT * FROM notes WHERE `user_id` = ?"

   const value = [req.params.userId]

   db.query(query, value, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
   })
}

export const getNote = (req, res) => {
   const query = "SELECT * FROM notes WHERE `id` = ?"

   const value = [req.params.noteId]

   db.query(query, value, async(err, data) => {
      if (err) return res.json(err)
      
      try {
         const blobUrl = data[0].blob_url;
         const containerClient = blobServiceClient.getContainerClient("notes");
         
         const blobPath = new URL(blobUrl).pathname.replace(`/${containerName}/`, "")
         console.log("path", blobPath)
         const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

         const download = await blockBlobClient.download();
         const text = await streamToText(download.readableStreamBody);
         console.log(text)
         // Step 3: Respond with both metadata and blob text
         return res.status(200).json({
            ...data[0],
            textContent: text,
         });
      } catch (err) {
         console.log(err)
      }
   })
}

const streamToText = async (readable) => {
   const chunks = [];
   for await (const chunk of readable) {
      chunks.push(chunk);
   }
   return Buffer.concat(chunks).toString("utf-8");
};

export const updateNote = async (req, res) => {
   try {
      const containerClient = blobServiceClient.getContainerClient(containerName);

      const blobName = `${req.body.userId}/${uuidv4()}.txt`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      console.log(req.body.textContent)
      const buffer = Buffer.from(req.body.textContent, "utf-8");

      await blockBlobClient.uploadData(buffer, {
            blobHTTPHeaders: {
            blobContentType: "text/plain",
            blobContentDisposition: "inline",
         },
      });

      const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      // Now update DB with the new blob URL
      const query = "UPDATE notes SET blob_url = ? WHERE id = ?";
      const values = [blobUrl, req.params.noteId];

      db.query(query, values, (err, data) => {
         if (err) return console.log(err);
         return res.status(200).json({ message: "Note updated", blobUrl });
      });
   } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to upload or update note" });
   }
};