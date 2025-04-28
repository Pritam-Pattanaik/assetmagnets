-- Update Service model to match our implementation
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "color" TEXT;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "details" TEXT[] DEFAULT '{}'::TEXT[];

-- Rename name column to title if it exists and title doesn't exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Service' AND column_name = 'name') 
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Service' AND column_name = 'title') THEN
    ALTER TABLE "Service" RENAME COLUMN "name" TO "title";
  END IF;
END
$$;

-- Add title column if neither name nor title exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Service' AND column_name = 'title')
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Service' AND column_name = 'name') THEN
    ALTER TABLE "Service" ADD COLUMN "title" TEXT NOT NULL DEFAULT '';
  END IF;
END
$$;