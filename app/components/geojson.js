import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect("mongodb+srv://deathstrike:amine@cluster0.yzt2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  const db = client.db("store");
  const data = await db.collection("orders").find().toArray();
  res.status(200).json(data);
}