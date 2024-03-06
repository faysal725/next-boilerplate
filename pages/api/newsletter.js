import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method == "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid emial address." });
      return;
    }
    const client = await MongoClient.connect(
      "mongodb+srv://next-course:Ff123456789@cluster0.hozny.mongodb.net/newsletter?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    await db.collection("emails").insertOne({ email: userEmail });
    client.close();
    console.log(userEmail);
    res.status(201).json({ message: "Signed Up" });
  }
}

export default handler;
