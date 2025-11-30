import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rice = await prisma.product.create({
    data: { productName: "Rice", price: 50, quantitySold: 12000 },
  });

  const coffee = await prisma.product.create({
    data: { productName: "Coffee", price: 120, quantitySold: 3000 },
  });

  const cebu = await prisma.city.create({
    data: {
      cityName: "Cebu City",
      country: "Philippines",
      xAxis: -0.4,
      yAxis: 0.4,
      zAxis: -1.1,
      productId: rice.id,
    },
  });

  const california = await prisma.city.create({
    data: {
      cityName: "California",
      country: "USA",
      xAxis: -0.5,
      yAxis: 0.7,
      zAxis: 0.7,
      productId: coffee.id,
    },
  });

  const cebuRegionsData = [
    { name: "Mandaue City", population: 1200, xTile: 0, zTile: 0 },
    { name: "Cebu City", population: 1100, xTile: 0, zTile: 1 },
    { name: "Lapu Lapu City", population: 900, xTile: 0, zTile: 2 },
    { name: "Liloan", population: 1000, xTile: 1, zTile: 0 },
    { name: "Consolacion", population: 2000, xTile: 1, zTile: 1 },
    { name: "Toledo City", population: 850, xTile: 1, zTile: 2 },
    { name: "Santa Fe", population: 800, xTile: 2, zTile: 0 },
    { name: "Santa Rosa", population: 950, xTile: 2, zTile: 1 },
    { name: "Manila", population: 900, xTile: 2, zTile: 2 },
  ];

  const cebuRegions = [];
  for (const r of cebuRegionsData) {
    const region = await prisma.region.create({
      data: { ...r, cityId: cebu.id },
    });
    cebuRegions.push(region);
  }

  const californiaRegionsData = [
    { name: "California North", population: 1500, xTile: 0, zTile: 0 },
    { name: "California East", population: 1400, xTile: 0, zTile: 1 },
    { name: "California South", population: 1300, xTile: 0, zTile: 2 },
    { name: "California West", population: 1600, xTile: 1, zTile: 0 },
    { name: "California Central", population: 2200, xTile: 1, zTile: 1 },
    { name: "California Southwest", population: 1100, xTile: 1, zTile: 2 },
    { name: "California Northwest", population: 1000, xTile: 2, zTile: 0 },
    { name: "California Southeast", population: 1200, xTile: 2, zTile: 1 },
    { name: "California Northeast", population: 1150, xTile: 2, zTile: 2 },
  ];

  const californiaRegions = [];
  for (const r of californiaRegionsData) {
    const region = await prisma.region.create({
      data: { ...r, cityId: california.id },
    });
    californiaRegions.push(region);
  }

  for (const region of cebuRegions) {
    await prisma.demand.create({
      data: {
        cityName: cebu.cityName,
        product_name: rice.productName,
        demand_score: Math.floor(Math.random() * 200),
        regionId: region.id,
        productId: rice.id,
      },
    });
  }

  for (const region of californiaRegions) {
    await prisma.demand.create({
      data: {
        cityName: california.cityName,
        product_name: coffee.productName,
        demand_score: Math.floor(Math.random() * 200),
        regionId: region.id,
        productId: coffee.id,
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
