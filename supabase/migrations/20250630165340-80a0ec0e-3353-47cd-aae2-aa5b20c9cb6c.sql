
-- 既存のポリシーを削除してから新しいポリシーを作成

-- casesテーブルの既存ポリシーを削除
DROP POLICY IF EXISTS "Users can view own cases" ON public.cases;
DROP POLICY IF EXISTS "Users can create own cases" ON public.cases;
DROP POLICY IF EXISTS "Users can update own cases" ON public.cases;
DROP POLICY IF EXISTS "Users can delete own cases" ON public.cases;
DROP POLICY IF EXISTS "Admins can view all cases" ON public.cases;
DROP POLICY IF EXISTS "Users can view own cases or admins can view all" ON public.cases;
DROP POLICY IF EXISTS "Users can insert own cases" ON public.cases;
DROP POLICY IF EXISTS "Users can insert own cases or admins can insert any" ON public.cases;
DROP POLICY IF EXISTS "Users can update own cases or admins can update any" ON public.cases;
DROP POLICY IF EXISTS "Users can delete own cases or admins can delete any" ON public.cases;

-- profilesテーブルの既存ポリシーを削除
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- call_resultsテーブルの既存ポリシーを削除
DROP POLICY IF EXISTS "Users can view own call results" ON public.call_results;
DROP POLICY IF EXISTS "Users can insert own call results" ON public.call_results;
DROP POLICY IF EXISTS "Users can update own call results" ON public.call_results;
DROP POLICY IF EXISTS "Users can delete own call results" ON public.call_results;
DROP POLICY IF EXISTS "Admins can view all call results" ON public.call_results;
DROP POLICY IF EXISTS "Users can view own call results or admins can view all" ON public.call_results;
DROP POLICY IF EXISTS "Users can insert own call results or admins can insert any" ON public.call_results;
DROP POLICY IF EXISTS "Users can update own call results or admins can update any" ON public.call_results;
DROP POLICY IF EXISTS "Users can delete own call results or admins can delete any" ON public.call_results;

-- casesテーブルの新しいRLSポリシーを設定
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分の案件のみ閲覧可能、管理者は全て閲覧可能
CREATE POLICY "Users can view own cases or admins can view all" ON public.cases
  FOR SELECT USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

-- ユーザーは自分の案件のみ作成可能、管理者は任意のユーザーで作成可能
CREATE POLICY "Users can create own cases or admins can create any" ON public.cases
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

-- ユーザーは自分の案件のみ更新可能、管理者は全て更新可能
CREATE POLICY "Users can update own cases or admins can update any" ON public.cases
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

-- ユーザーは自分の案件のみ削除可能、管理者は全て削除可能
CREATE POLICY "Users can delete own cases or admins can delete any" ON public.cases
  FOR DELETE USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

-- profilesテーブルの新しいRLSポリシーを設定
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 全てのプロフィールは閲覧可能（認証不要）
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

-- ユーザーは自分のプロフィールのみ作成可能
CREATE POLICY "Users can create own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ユーザーは自分のプロフィールのみ更新可能
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- call_resultsテーブルの新しいRLSポリシーを設定
ALTER TABLE public.call_results ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分の案件の通話記録のみ閲覧可能、管理者は全て閲覧可能
CREATE POLICY "Users can view own call results or admins can view all" ON public.call_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );

-- ユーザーは自分の案件の通話記録のみ作成可能、管理者は全て作成可能
CREATE POLICY "Users can create own call results or admins can create any" ON public.call_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );

-- ユーザーは自分の案件の通話記録のみ更新可能、管理者は全て更新可能
CREATE POLICY "Users can update own call results or admins can update any" ON public.call_results
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );

-- ユーザーは自分の案件の通話記録のみ削除可能、管理者は全て削除可能
CREATE POLICY "Users can delete own call results or admins can delete any" ON public.call_results
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );
