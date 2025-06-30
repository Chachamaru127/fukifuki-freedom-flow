
-- 1. profilesテーブルの作成（存在しない場合）と拡張
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- profilesテーブルにカラムを追加（存在しない場合のみ）
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'phone') THEN
    ALTER TABLE public.profiles ADD COLUMN phone VARCHAR(20);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
    ALTER TABLE public.profiles ADD COLUMN role VARCHAR(10) DEFAULT 'user';
  END IF;
END $$;

-- 2. casesテーブルを作成
CREATE TABLE public.cases (
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

-- 3. call_resultsテーブルを作成
CREATE TABLE public.call_results (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases ON DELETE CASCADE,
  transcript TEXT,
  result_json JSONB,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 4. updated_atを自動更新するトリガー関数を作成
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

-- 7. RLSを有効化
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_results ENABLE ROW LEVEL SECURITY;

-- 8. profilesテーブルのRLSポリシー
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 9. casesテーブルのRLSポリシー
DROP POLICY IF EXISTS "Users can view own cases" ON public.cases;
CREATE POLICY "Users can view own cases" 
  ON public.cases FOR SELECT 
  USING (auth.uid() = user_id);

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

-- 10. call_resultsテーブルのRLSポリシー
DROP POLICY IF EXISTS "Users can view own call results" ON public.call_results;
CREATE POLICY "Users can view own call results" 
  ON public.call_results FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.cases 
    WHERE cases.id = call_results.case_id 
    AND cases.user_id = auth.uid()
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

-- 11. 新規ユーザー登録時にprofilesテーブルにレコードを自動作成する関数とトリガー
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
