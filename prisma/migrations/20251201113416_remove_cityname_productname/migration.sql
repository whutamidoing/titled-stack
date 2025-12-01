/*
  Warnings:

  - You are about to drop the column `cityName` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `Demand` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Demand_cityName_key";

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "cityName",
DROP COLUMN "product_name";
