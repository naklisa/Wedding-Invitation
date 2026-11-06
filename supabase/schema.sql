-- ========================================================
-- Supabase Schema for Digital Wedding (Dinda & Fidyan)
-- ========================================================

-- 1. Create table for RSVP & Guestbook Wishes
CREATE TABLE IF NOT EXISTS public.wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('hadir', 'tidak_hadir', 'ragu')),
    guest_count INT DEFAULT 1,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for wishes
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Wishes policies
CREATE POLICY "Public read access for wishes"
ON public.wishes FOR SELECT TO public USING (true);

CREATE POLICY "Public insert access for wishes"
ON public.wishes FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admin delete access for wishes"
ON public.wishes FOR DELETE TO authenticated USING (true);


-- 2. Create table for Guests List (Excel Import & WhatsApp Blast)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    category TEXT DEFAULT 'Umum',
    is_sent BOOLEAN DEFAULT false,
    slug TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration query if table already exists:
-- ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Enable RLS for guests
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Guests policies: Authenticated users (Admin) have full access
CREATE POLICY "Authenticated users full access to guests"
ON public.guests FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow public read if needed for validation, or restrict
CREATE POLICY "Public read guests"
ON public.guests FOR SELECT TO public USING (true);

CREATE POLICY "Public insert guests"
ON public.guests FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Public update guests"
ON public.guests FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON public.wishes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guests_created_at ON public.guests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guests_slug ON public.guests (slug);
