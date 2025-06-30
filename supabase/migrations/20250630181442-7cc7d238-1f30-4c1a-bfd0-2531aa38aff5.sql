
-- Enable RLS on all tables if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own health records" ON public.health_records;
DROP POLICY IF EXISTS "Users can create their own health records" ON public.health_records;
DROP POLICY IF EXISTS "Users can update their own health records" ON public.health_records;
DROP POLICY IF EXISTS "Users can delete their own health records" ON public.health_records;

DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can create their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can delete their own appointments" ON public.appointments;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for health_records table
CREATE POLICY "Users can view their own health records" 
  ON public.health_records 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health records" 
  ON public.health_records 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health records" 
  ON public.health_records 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health records" 
  ON public.health_records 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for appointments table
CREATE POLICY "Users can view their own appointments" 
  ON public.appointments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments" 
  ON public.appointments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own appointments" 
  ON public.appointments 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add updated_at triggers for all tables (drop first if they exist)
DROP TRIGGER IF EXISTS handle_updated_at_profiles ON public.profiles;
DROP TRIGGER IF EXISTS handle_updated_at_health_records ON public.health_records;
DROP TRIGGER IF EXISTS handle_updated_at_appointments ON public.appointments;

CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_health_records
  BEFORE UPDATE ON public.health_records
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_appointments
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
