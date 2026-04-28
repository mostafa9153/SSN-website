-- ==========================================
-- সিরাজিয়া শিশু নিকেতন Database Schema
-- ==========================================

-- 1. Notices Table
CREATE TABLE IF NOT EXISTS public.notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT CHECK (type IN ('text', 'image', 'pdf')) DEFAULT 'text',
  file_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Teachers Table
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT,
  subject TEXT,
  photo_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Classes Table
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  display_order INT DEFAULT 0,
  syllabus_url TEXT,
  routine_url TEXT,
  exam_info TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Alumni Table
CREATE TABLE IF NOT EXISTS public.alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo_url TEXT,
  achievement TEXT,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Stats Table (Single row for site stats)
CREATE TABLE IF NOT EXISTS public.stats (
  id INT PRIMARY KEY DEFAULT 1,
  teacher_count INT DEFAULT 0,
  student_count INT DEFAULT 0,
  founding_year INT DEFAULT 2000,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert initial stats
INSERT INTO public.stats (id, teacher_count, student_count, founding_year)
VALUES (1, 7, 124, 2011)
ON CONFLICT (id) DO UPDATE SET
  teacher_count = EXCLUDED.teacher_count,
  student_count = EXCLUDED.student_count,
  founding_year = EXCLUDED.founding_year;

-- 7. Fees Table
CREATE TABLE IF NOT EXISTS public.fees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_name TEXT NOT NULL,
  admission_fee NUMERIC,
  monthly_fee NUMERIC,
  annual_fee NUMERIC,
  age_requirement TEXT,
  display_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (Row Level Security) on all tables to allow public read but secure writes
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;

-- Create policies for public READ access
DROP POLICY IF EXISTS "Allow public read-only access" ON public.notices;
CREATE POLICY "Allow public read-only access" ON public.notices FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only access" ON public.teachers;
CREATE POLICY "Allow public read-only access" ON public.teachers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only access" ON public.classes;
CREATE POLICY "Allow public read-only access" ON public.classes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only access" ON public.gallery;
CREATE POLICY "Allow public read-only access" ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only access" ON public.alumni;
CREATE POLICY "Allow public read-only access" ON public.alumni FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only access" ON public.stats;
CREATE POLICY "Allow public read-only access" ON public.stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only access" ON public.fees;
CREATE POLICY "Allow public read-only access" ON public.fees FOR SELECT USING (true);

-- (Admin writes will bypass RLS using the service_role key, so no insert/update policies are strictly needed for the anon role)

-- Storage Buckets setup
-- You will need to create these buckets manually in the Supabase Storage dashboard:
-- 1. "documents" (for PDFs) -> set to Public
-- 2. "photos" (for images) -> set to Public
-- 3. "videos" (for hero video) -> set to Public
