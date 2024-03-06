import { connectDatabase, insertDocument } from "@/helpers/db-utill";
import { MongoClient } from "mongodb";

// async function connectDatabase() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://next-course:Ff123456789@cluster0.hozny.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
//   );
//   return client;
// }

// async function insertDocument(client, document) {
//   const db = client.db();

//   await db.collection("newsletter").insertOne(document);
// }


async function handler(req, res) {
  if (req.method == "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid emial address." });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'connecting to the database failed'})
        return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
        res.status(500).json({message: 'inserting data failed'})
        return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed Up" });
  }
}

export default handler;
