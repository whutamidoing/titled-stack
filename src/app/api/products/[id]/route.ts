import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { register } from "module";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const demandId = Number(id);
  if (isNaN(demandId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { demand_score, quantitySold } = await req.json();

  const demand = await prisma.demand.findUnique({
    where: { id: demandId },
    include: { product: true },
  });

  if (!demand) {
    return NextResponse.json({ error: "Demand not found" }, { status: 404 });
  }

  if (!demand.product) {
    return NextResponse.json(
      { error: "Product not found for this demand" },
      { status: 404 }
    );
  }

  await prisma.product.update({
    where: { id: demand.product.id },
    data: { quantitySold },
  });

  const updatedDemand = await prisma.demand.update({
    where: { id: demandId },
    data: { demand_score },
    include: { product: true },
  });

  return NextResponse.json(updatedDemand);
}

// Deletes the demand not product
export async function DELETE(request: Request, context: any) {
  const params = await context.params; // Next 15 bug workaround
  const demandId = Number(params.id);

  if (isNaN(demandId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const demand = await prisma.demand.findUnique({
    where: { id: demandId },
  });

  if (!demand) {
    return NextResponse.json({ error: "Demand not found" }, { status: 404 });
  }

  await prisma.demand.delete({ where: { id: demandId } });

  return NextResponse.json({ success: true });
}
