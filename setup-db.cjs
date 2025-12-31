const { Client } = require('pg');

// Database connection string with URL-encoded password
const connectionString = 'postgresql://postgres:Dinesh%406702@db.rieyzldbygsgfiwhfdmo.supabase.co:5432/postgres';

const sql = `
-- Step 1: Create base tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.jewelry_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.pawn_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  item_description text NOT NULL,
  requested_amount numeric NOT NULL CHECK (requested_amount > 0),
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 2: Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jewelry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pawn_requests ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies (using DO block to avoid errors if they already exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can read own profile') THEN
    CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Anyone can view jewelry items') THEN
    CREATE POLICY "Anyone can view jewelry items" ON public.jewelry_items FOR SELECT TO public USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can create pawn requests') THEN
    CREATE POLICY "Users can create pawn requests" ON public.pawn_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can view own pawn requests') THEN
    CREATE POLICY "Users can view own pawn requests" ON public.pawn_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
END $$;

-- Step 4: Handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
`;

async function setup() {
    const client = new Client({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Connecting to Supabase Database...');
        await client.connect();
        console.log('Connected successfully!');

        console.log('Applying schema...');
        await client.query(sql);
        console.log('✅ Database schema setup complete!');

    } catch (err) {
        console.error('❌ Error during setup:', err.message);
        if (err.message.includes('password authentication failed')) {
            console.error('Hint: Make sure the password "Dinesh@6702" is correct.');
        }
    } finally {
        await client.end();
    }
}

setup();
