-- 1. Create Role Enum
CREATE TYPE public.user_role AS ENUM ('student', 'organizer');

-- 2. Create Profiles Table (Linked to Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'student',
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect profiles so users can only view/edit their own, unless they are organizers looking at participants (we'll keep it simple for now)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Create Events Table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
-- Everyone can view events
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (true);
-- Only organizers can insert/edit their own events (enforced here and by backend)
CREATE POLICY "Organizers can insert events" ON public.events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizers can update their own events" ON public.events FOR UPDATE USING (auth.uid() = organizer_id);

-- 4. Create Registrations Table
CREATE TABLE public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(student_id, event_id)
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
-- Students can view their own registrations
CREATE POLICY "Students see their own registrations" ON public.registrations FOR SELECT USING (auth.uid() = student_id);
-- Organizers can see registrations for their events
CREATE POLICY "Organizers see their event registrations" ON public.registrations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.events 
    WHERE events.id = registrations.event_id 
    AND events.organizer_id = auth.uid()
  )
);
-- Students can insert registrations
CREATE POLICY "Students can register for events" ON public.registrations FOR INSERT WITH CHECK (auth.uid() = student_id);

-- 5. Trigger to automatically create a profile after Supabase auth sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    -- Default to student unless specified in meta data
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'student'::public.user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
