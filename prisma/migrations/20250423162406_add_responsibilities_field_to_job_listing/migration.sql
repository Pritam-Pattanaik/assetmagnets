-- AlterTable
ALTER TABLE "JobListing" ADD COLUMN "responsibilities" TEXT DEFAULT 'Job responsibilities will be discussed during the interview process.';

-- Update all existing records to have the default value
UPDATE "JobListing" SET "responsibilities" = 'Job responsibilities will be discussed during the interview process.' WHERE "responsibilities" IS NULL;

-- Add NOT NULL constraint after setting values
ALTER TABLE "JobListing" ALTER COLUMN "responsibilities" SET NOT NULL;

-- Remove the default constraint
ALTER TABLE "JobListing" ALTER COLUMN "responsibilities" DROP DEFAULT;
