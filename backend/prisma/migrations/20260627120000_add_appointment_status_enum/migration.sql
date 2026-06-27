-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CHECKED_IN');

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Appointment" ALTER COLUMN "status" TYPE "AppointmentStatus" USING ("status"::"AppointmentStatus");
ALTER TABLE "Appointment" ALTER COLUMN "status" SET DEFAULT 'PENDING';
