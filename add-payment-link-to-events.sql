-- Add payment_link column to events table
-- Run this in your Supabase SQL Editor

-- Add payment_link column to events table
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS payment_link TEXT;

-- Add payment_link column to trainings table as well (for consistency)
ALTER TABLE public.trainings 
ADD COLUMN IF NOT EXISTS payment_link TEXT;

-- Update existing events to have empty payment_link if not set
UPDATE public.events 
SET payment_link = '' 
WHERE payment_link IS NULL;

-- Update existing trainings to have empty payment_link if not set
UPDATE public.trainings 
SET payment_link = '' 
WHERE payment_link IS NULL;

-- Verify the changes
SELECT 'Payment link column added successfully to events table' as message
WHERE EXISTS (
  SELECT 1 FROM information_schema.columns 
  WHERE table_name = 'events' AND column_name = 'payment_link'
);

SELECT 'Payment link column added successfully to trainings table' as message
WHERE EXISTS (
  SELECT 1 FROM information_schema.columns 
  WHERE table_name = 'trainings' AND column_name = 'payment_link'
); 