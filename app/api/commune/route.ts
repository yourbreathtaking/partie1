import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://deathstrike:amine@cluster0.yzt2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db("store");
    const data = await db.collection("orders").find().toArray();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
