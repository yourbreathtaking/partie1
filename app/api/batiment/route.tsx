import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "data", "l7ouz_updt2.json");
    const geojson = JSON.parse(readFileSync(filePath, "utf-8"));
    return NextResponse.json(geojson);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load GeoJSON" }, { status: 500 });
  }
}
