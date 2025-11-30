import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      include: { demandedProduct: true },
    });
    return NextResponse.json(cities);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
