
-- 1. 管理者権限チェック用のセキュリティ関数を作成（無限再帰を防ぐため）
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 2. 既存のRLSポリシーを削除して新しいポリシーを設定

-- casesテーブルのポリシー更新
DROP POLICY IF EXISTS "Users can view own cases" ON public.cases;
CREATE POLICY "Users can view own cases or admins can view all" 
  ON public.cases FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can insert own cases" ON public.cases;
CREATE POLICY "Users can insert own cases" 
  ON public.cases FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own cases" ON public.cases;
CREATE POLICY "Users can update own cases" 
  ON public.cases FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own cases" ON public.cases;
CREATE POLICY "Users can delete own cases" 
  ON public.cases FOR DELETE 
  USING (auth.uid() = user_id);

-- call_resultsテーブルのポリシー更新（casesテーブル経由でアクセス制御）
DROP POLICY IF EXISTS "Users can view own call results" ON public.call_results;
CREATE POLICY "Users can view own call results or admins can view all" 
  ON public.call_results FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND (cases.user_id = auth.uid() OR public.get_current_user_role() = 'admin')
  ));

DROP POLICY IF EXISTS "Users can insert own call results" ON public.call_results;
CREATE POLICY "Users can insert own call results" 
  ON public.call_results FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND cases.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update own call results" ON public.call_results;
CREATE POLICY "Users can update own call results" 
  ON public.call_results FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND cases.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete own call results" ON public.call_results;
CREATE POLICY "Users can delete own call results" 
  ON public.call_results FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND cases.user_id = auth.uid()
  ));

-- profilesテーブルのポリシー更新
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- RLSが有効化されていることを確認
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_results ENABLE ROW LEVEL SECURITY;
