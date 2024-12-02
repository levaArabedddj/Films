/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_Enrollments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Enrollments" DROP CONSTRAINT "_Enrollments_A_fkey";

-- DropForeignKey
ALTER TABLE "_Enrollments" DROP CONSTRAINT "_Enrollments_B_fkey";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";

-- DropTable
DROP TABLE "_Enrollments";

-- CreateTable
CREATE TABLE "_FilmActors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FilmCrewMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmActors_AB_unique" ON "_FilmActors"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmActors_B_index" ON "_FilmActors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FilmCrewMembers_AB_unique" ON "_FilmCrewMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmCrewMembers_B_index" ON "_FilmCrewMembers"("B");

-- AddForeignKey
ALTER TABLE "_FilmActors" ADD CONSTRAINT "_FilmActors_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmActors" ADD CONSTRAINT "_FilmActors_B_fkey" FOREIGN KEY ("B") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmCrewMembers" ADD CONSTRAINT "_FilmCrewMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "CrewMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmCrewMembers" ADD CONSTRAINT "_FilmCrewMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;
