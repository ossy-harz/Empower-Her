-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own reports
DROP POLICY IF EXISTS "Users can view their own reports" ON reports;
CREATE POLICY "Users can view their own reports"
ON reports FOR SELECT
USING (user_id = auth.uid() OR is_anonymous = true);

-- Create policy for users to insert their own reports
DROP POLICY IF EXISTS "Users can insert their own reports" ON reports;
CREATE POLICY "Users can insert their own reports"
ON reports FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Create policy for users to update their own reports
DROP POLICY IF EXISTS "Users can update their own reports" ON reports;
CREATE POLICY "Users can update their own reports"
ON reports FOR UPDATE
USING (user_id = auth.uid());

-- Create policy for users to delete their own reports
DROP POLICY IF EXISTS "Users can delete their own reports" ON reports;
CREATE POLICY "Users can delete their own reports"
ON reports FOR DELETE
USING (user_id = auth.uid());

-- Create report_media table for storing media files
CREATE TABLE IF NOT EXISTS report_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE report_media ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view media for their own reports
DROP POLICY IF EXISTS "Users can view media for their own reports" ON report_media;
CREATE POLICY "Users can view media for their own reports"
ON report_media FOR SELECT
USING (
  report_id IN (
    SELECT id FROM reports WHERE user_id = auth.uid() OR is_anonymous = true
  )
);

-- Create policy for users to insert media for their own reports
DROP POLICY IF EXISTS "Users can insert media for their own reports" ON report_media;
CREATE POLICY "Users can insert media for their own reports"
ON report_media FOR INSERT
WITH CHECK (
  report_id IN (
    SELECT id FROM reports WHERE user_id = auth.uid()
  )
);

-- Create policy for users to delete media for their own reports
DROP POLICY IF EXISTS "Users can delete media for their own reports" ON report_media;
CREATE POLICY "Users can delete media for their own reports"
ON report_media FOR DELETE
USING (
  report_id IN (
    SELECT id FROM reports WHERE user_id = auth.uid()
  )
);

-- Enable realtime for reports
alter publication supabase_realtime add table reports;
alter publication supabase_realtime add table report_media;