CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_number INTEGER NOT NULL UNIQUE,
  topic TEXT NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name TEXT NOT NULL,
  normalized_full_name TEXT NOT NULL,
  asmo TEXT NOT NULL,
  normalized_asmo TEXT NOT NULL,
  exam_date DATE NOT NULL,
  started_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUBMITTED', 'TIMEOUT', 'REJECTED')),
  total_questions INTEGER NOT NULL DEFAULT 15,
  correct_answers INTEGER,
  incorrect_answers INTEGER,
  unanswered INTEGER,
  final_score NUMERIC(5,2),
  pass_status BOOLEAN,
  participant_token_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_daily_attempt UNIQUE (normalized_full_name, normalized_asmo, exam_date)
);

CREATE TABLE IF NOT EXISTS exam_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES exam_questions(id) ON DELETE CASCADE,
  selected_option TEXT CHECK (selected_option IN ('A', 'B', 'C', 'D')),
  is_correct BOOLEAN,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (attempt_id, question_id)
);

CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL UNIQUE REFERENCES exam_attempts(id) ON DELETE CASCADE,
  certificate_number TEXT NOT NULL UNIQUE,
  certificate_file_path TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  summary TEXT,
  email TEXT,
  linkedin TEXT,
  whatsapp TEXT,
  location TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  preview_image_url TEXT,
  tools JSONB NOT NULL DEFAULT '[]'::jsonb,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  employment_period TEXT,
  responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam_date ON exam_attempts(exam_date);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_normalized_identity ON exam_attempts(normalized_full_name, normalized_asmo, exam_date);
CREATE INDEX IF NOT EXISTS idx_exam_questions_question_number ON exam_questions(question_number);
CREATE INDEX IF NOT EXISTS idx_certificates_attempt_id ON certificates(attempt_id);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_all_access" ON admin_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "question_bank_server_only" ON exam_questions FOR SELECT USING (true);
CREATE POLICY "participant_attempts_read_own" ON exam_attempts FOR SELECT USING (true);
CREATE POLICY "participant_attempts_write_own" ON exam_attempts FOR INSERT WITH CHECK (true);
CREATE POLICY "participant_answers_controlled" ON exam_answers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "certificate_owner_access" ON certificates FOR SELECT USING (true);
CREATE POLICY "settings_admin_only" ON app_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "portfolio_public_access" ON portfolio_profile FOR SELECT USING (true);
CREATE POLICY "portfolio_projects_public_access" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "portfolio_experience_public_access" ON portfolio_experience FOR SELECT USING (true);
