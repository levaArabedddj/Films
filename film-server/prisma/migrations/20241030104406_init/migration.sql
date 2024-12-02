-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "scriptId" INTEGER,
    "financeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "filmId" INTEGER,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" SERIAL NOT NULL,
    "actor_salary" INTEGER NOT NULL,
    "crew_salary" INTEGER NOT NULL,
    "advering_cost" INTEGER NOT NULL,
    "editing_cost" INTEGER NOT NULL,
    "equipment_cost" INTEGER NOT NULL,
    "filmId" INTEGER,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShootingDay" (
    "id" SERIAL NOT NULL,
    "shooting_day" TIMESTAMP(3) NOT NULL,
    "shooting_time" INTEGER NOT NULL,
    "shooting_location" TEXT NOT NULL,
    "estimated_duration_hours" INTEGER NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "ShootingDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "raiting" INTEGER NOT NULL,
    "salary_per_hour" INTEGER NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrewMember" (
    "id" SERIAL NOT NULL,
    "salary_per_hour" INTEGER NOT NULL,

    CONSTRAINT "CrewMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Enrollments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Film_scriptId_key" ON "Film"("scriptId");

-- CreateIndex
CREATE UNIQUE INDEX "Film_financeId_key" ON "Film"("financeId");

-- CreateIndex
CREATE UNIQUE INDEX "_Enrollments_AB_unique" ON "_Enrollments"("A", "B");

-- CreateIndex
CREATE INDEX "_Enrollments_B_index" ON "_Enrollments"("B");

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShootingDay" ADD CONSTRAINT "ShootingDay_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_A_fkey" FOREIGN KEY ("A") REFERENCES "CrewMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_B_fkey" FOREIGN KEY ("B") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;
