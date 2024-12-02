/*
  Warnings:

  - You are about to drop the column `advering_cost` on the `Finance` table. All the data in the column will be lost.
  - Added the required column `advertising_cost` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "advering_cost",
ADD COLUMN     "advertising_cost" INTEGER NOT NULL;
