CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_profiles ap
    WHERE ap.user_id = auth.uid()
      AND ap.role = 'admin'
  );
$$;

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experience ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_all_access" ON public.admin_profiles;
CREATE POLICY "admin_profiles_select_own" ON public.admin_profiles
  FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "admin_profiles_insert_own" ON public.admin_profiles
  FOR INSERT
  WITH CHECK (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "admin_profiles_update_own" ON public.admin_profiles
  FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin())
  WITH CHECK (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "question_bank_server_only" ON public.exam_questions;
CREATE POLICY "exam_questions_admin_only" ON public.exam_questions
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "participant_attempts_read_own" ON public.exam_attempts;
CREATE POLICY "exam_attempts_select_own_or_admin" ON public.exam_attempts
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND (
      normalized_full_name = (
        SELECT normalized_full_name
        FROM public.exam_attempts e2
        WHERE e2.id = exam_attempts.id
      )
      OR public.is_admin()
    )
  );

CREATE POLICY "exam_attempts_insert_public" ON public.exam_attempts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "exam_attempts_update_admin_only" ON public.exam_attempts
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "participant_answers_controlled" ON public.exam_answers;
CREATE POLICY "exam_answers_owner_or_admin" ON public.exam_answers
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.exam_attempts ea
      WHERE ea.id = exam_answers.attempt_id
        AND (
          ea.normalized_full_name = (
            SELECT e2.normalized_full_name
            FROM public.exam_attempts e2
            WHERE e2.id = exam_answers.attempt_id
          )
          OR public.is_admin()
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.exam_attempts ea
      WHERE ea.id = exam_answers.attempt_id
        AND (
          ea.normalized_full_name = (
            SELECT e2.normalized_full_name
            FROM public.exam_attempts e2
            WHERE e2.id = exam_answers.attempt_id
          )
          OR public.is_admin()
        )
    )
  );

DROP POLICY IF EXISTS "certificate_owner_access" ON public.certificates;
CREATE POLICY "certificates_admin_or_owner" ON public.certificates
  FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "settings_admin_only" ON public.app_settings;
CREATE POLICY "app_settings_admin_only" ON public.app_settings
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "portfolio_public_access" ON public.portfolio_profile;
CREATE POLICY "portfolio_profile_public" ON public.portfolio_profile
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "portfolio_projects_public_access" ON public.portfolio_projects;
CREATE POLICY "portfolio_projects_public" ON public.portfolio_projects
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "portfolio_experience_public_access" ON public.portfolio_experience;
CREATE POLICY "portfolio_experience_public" ON public.portfolio_experience
  FOR SELECT
  USING (true);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_user_id ON public.admin_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON public.admin_profiles(role);
