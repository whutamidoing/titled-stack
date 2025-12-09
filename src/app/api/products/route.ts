import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Body received:", body);
    const { productName, price, quantitySold, demandScore, regionId } = body;

    if (!productName || !demandScore || !regionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const region = await prisma.region.findUnique({
      where: { id: regionId },
      include: { city: true },
    });
    if (!region)
      return NextResponse.json({ error: "Region not found" }, { status: 404 });

    // check if product already exists
    let product = await prisma.product.findUnique({
      where: { productName: productName },
    });

    if (!product) {
      // create product if it doesn't exist
      product = await prisma.product.create({
        data: { productName: productName, price, quantitySold },
      });
    }

    const demand = await prisma.demand.create({
      data: {
        demand_score: demandScore,
        region: { connect: { id: regionId } },
        product: { connect: { id: product.id } },
      },
    });

    const updatedRegion = await prisma.region.findUnique({
      where: { id: regionId },
      include: { demands: { include: { product: true } } },
    });

    return NextResponse.json(updatedRegion);
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
