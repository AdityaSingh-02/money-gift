/*
  Warnings:

  - You are about to drop the column `Guests` on the `Events` table. All the data in the column will be lost.
  - Added the required column `eventVenue` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "Guests",
ADD COLUMN     "eventVenue" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Guests" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestMobile" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,

    CONSTRAINT "Guests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
