/*
  Warnings:

  - Added the required column `full_name` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `CrewMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "full_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CrewMember" ADD COLUMN     "full_name" TEXT NOT NULL;
