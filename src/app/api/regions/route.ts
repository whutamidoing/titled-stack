import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const city = url.searchParams.get("city");

    if (!city) return NextResponse.json([], { status: 200 });

    // Filter by city
    const regions = await prisma.region.findMany({
      where: { city: { cityName: city } },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch regions" },
      { status: 500 }
    );
  }
}
