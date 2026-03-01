-- Add relocation-related fields to User
-- (enum ResidenceTerm is represented as TEXT in SQLite)

ALTER TABLE "User" ADD COLUMN "baseLocation" TEXT;
ALTER TABLE "User" ADD COLUMN "residenceTerm" TEXT;
