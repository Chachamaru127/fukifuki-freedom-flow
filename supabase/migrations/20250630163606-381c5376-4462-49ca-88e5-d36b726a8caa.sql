
-- 1. 管理者権限チェック用のセキュリティ関数を作成（無限再帰を防ぐため）
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 2. 既存のRLSポリシーを削除して新しいポリシーを設定

-- profilesテーブルのRLSポリシー
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- casesテーブルのRLSポリシー
DROP POLICY IF EXISTS "Users can view own cases or admins can view all" ON public.cases;
CREATE POLICY "Users can view own cases or admins can view all" 
  ON public.cases FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can insert own cases or admins can insert any" ON public.cases;
CREATE POLICY "Users can insert own cases or admins can insert any" 
  ON public.cases FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can update own cases or admins can update any" ON public.cases;
CREATE POLICY "Users can update own cases or admins can update any" 
  ON public.cases FOR UPDATE 
  USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can delete own cases or admins can delete any" ON public.cases;
CREATE POLICY "Users can delete own cases or admins can delete any" 
  ON public.cases FOR DELETE 
  USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

-- call_resultsテーブルのRLSポリシー（casesテーブル経由でアクセス制御）
DROP POLICY IF EXISTS "Users can view own call results or admins can view all" ON public.call_results;
CREATE POLICY "Users can view own call results or admins can view all" 
  ON public.call_results FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND (cases.user_id = auth.uid() OR public.get_current_user_role() = 'admin')
  ));

DROP POLICY IF EXISTS "Users can insert own call results or admins can insert any" ON public.call_results;
CREATE POLICY "Users can insert own call results or admins can insert any" 
  ON public.call_results FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND (cases.user_id = auth.uid() OR public.get_current_user_role() = 'admin')
  ));

DROP POLICY IF EXISTS "Users can update own call results or admins can update any" ON public.call_results;
CREATE POLICY "Users can update own call results or admins can update any" 
  ON public.call_results FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND (cases.user_id = auth.uid() OR public.get_current_user_role() = 'admin')
  ));

DROP POLICY IF EXISTS "Users can delete own call results or admins can delete any" ON public.call_results;
CREATE POLICY "Users can delete own call results or admins can delete any" 
  ON public.call_results FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND (cases.user_id = auth.uid() OR public.get_current_user_role() = 'admin')
  ));

-- RLSが有効化されていることを確認
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_results ENABLE ROW LEVEL SECURITY;
