/*
  # Create mood entries table with proper safety checks

  1. New Tables
    - `mood_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `entry_date` (date, defaults to current date)
      - `mood` (varchar, required)
      - `description` (text, optional)
      - `trigger` (varchar, optional)
      - `energy_level` (integer, 1-5 scale)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `mood_entries` table
    - Add policies for authenticated users to manage their own data

  3. Performance
    - Add indexes for user_id/date and created_at columns
    - Add trigger for automatic updated_at timestamp updates
*/

-- Create table for mood entries (with IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood VARCHAR(50) NOT NULL,
  description TEXT,
  trigger VARCHAR(50),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for user access (with IF NOT EXISTS equivalent using DO blocks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mood_entries' 
    AND policyname = 'Users can view their own mood entries'
  ) THEN
    CREATE POLICY "Users can view their own mood entries" 
    ON public.mood_entries 
    FOR SELECT 
    USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mood_entries' 
    AND policyname = 'Users can create their own mood entries'
  ) THEN
    CREATE POLICY "Users can create their own mood entries" 
    ON public.mood_entries 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mood_entries' 
    AND policyname = 'Users can update their own mood entries'
  ) THEN
    CREATE POLICY "Users can update their own mood entries" 
    ON public.mood_entries 
    FOR UPDATE 
    USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mood_entries' 
    AND policyname = 'Users can delete their own mood entries'
  ) THEN
    CREATE POLICY "Users can delete their own mood entries" 
    ON public.mood_entries 
    FOR DELETE 
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create function to update timestamps (with OR REPLACE for safety)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates (with IF NOT EXISTS check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_mood_entries_updated_at'
  ) THEN
    CREATE TRIGGER update_mood_entries_updated_at
    BEFORE UPDATE ON public.mood_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Create indexes for better performance (with IF NOT EXISTS)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_mood_entries_user_date'
  ) THEN
    CREATE INDEX idx_mood_entries_user_date ON public.mood_entries(user_id, entry_date DESC);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_mood_entries_created_at'
  ) THEN
    CREATE INDEX idx_mood_entries_created_at ON public.mood_entries(created_at DESC);
  END IF;
END $$;