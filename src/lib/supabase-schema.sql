
-- FUKIFUKI退職代行サービス データベーススキーマ
-- 作成日: 2025-06-30
-- 説明: プロフィール、案件、通話記録の管理とRLSポリシー

-- 1. profilesテーブルの作成
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  phone VARCHAR(20),
  role VARCHAR(10) DEFAULT 'user',
  PRIMARY KEY (id)
);

-- 2. casesテーブルの作成
CREATE TABLE IF NOT EXISTS public.cases (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  employee_name VARCHAR(100),
  reason TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 3. call_resultsテーブルの作成
CREATE TABLE IF NOT EXISTS public.call_results (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases ON DELETE CASCADE,
  transcript TEXT,
  result_json JSONB,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 4. updated_atを自動更新するトリガー関数
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- 5. profilesテーブルにupdated_atトリガーを設定
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 6. casesテーブルにupdated_atトリガーを設定
DROP TRIGGER IF EXISTS update_cases_updated_at ON public.cases;
CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 7. 管理者権限チェック用のセキュリティ関数
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 8. 新規ユーザー登録時にprofilesテーブルにレコードを自動作成する関数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, created_at, updated_at)
  VALUES (NEW.id, 'user', NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. 新規ユーザー作成トリガー
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. RLSを有効化
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_results ENABLE ROW LEVEL SECURITY;

-- 11. profilesテーブルのRLSポリシー
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create own profile" ON public.profiles;
CREATE POLICY "Users can create own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 12. casesテーブルのRLSポリシー
DROP POLICY IF EXISTS "Users can view own cases or admins can view all" ON public.cases;
CREATE POLICY "Users can view own cases or admins can view all" ON public.cases
  FOR SELECT USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can create own cases or admins can create any" ON public.cases;
CREATE POLICY "Users can create own cases or admins can create any" ON public.cases
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can update own cases or admins can update any" ON public.cases;
CREATE POLICY "Users can update own cases or admins can update any" ON public.cases
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

DROP POLICY IF EXISTS "Users can delete own cases or admins can delete any" ON public.cases;
CREATE POLICY "Users can delete own cases or admins can delete any" ON public.cases
  FOR DELETE USING (
    auth.uid() = user_id OR 
    public.get_current_user_role() = 'admin'
  );

-- 13. call_resultsテーブルのRLSポリシー
DROP POLICY IF EXISTS "Users can view own call results or admins can view all" ON public.call_results;
CREATE POLICY "Users can view own call results or admins can view all" ON public.call_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );

DROP POLICY IF EXISTS "Users can create own call results or admins can create any" ON public.call_results;
CREATE POLICY "Users can create own call results or admins can create any" ON public.call_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );

DROP POLICY IF EXISTS "Users can update own call results or admins can update any" ON public.call_results;
CREATE POLICY "Users can update own call results or admins can update any" ON public.call_results
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );

DROP POLICY IF EXISTS "Users can delete own call results or admins can delete any" ON public.call_results;
CREATE POLICY "Users can delete own call results or admins can delete any" ON public.call_results
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = call_results.case_id 
      AND (user_id = auth.uid() OR public.get_current_user_role() = 'admin')
    )
  );

-- 14. 管理者ユーザーの初期設定（必要に応じて実行）
-- INSERT INTO public.profiles (id, role, created_at, updated_at)
-- VALUES (
--   'a9267d45-138a-4a18-ae3f-0453de374905', -- admin@fukifuki.comのユーザーID
--   'admin',
--   NOW(),
--   NOW()
-- )
-- ON CONFLICT (id) 
-- DO UPDATE SET 
--   role = 'admin',
--   updated_at = NOW();
