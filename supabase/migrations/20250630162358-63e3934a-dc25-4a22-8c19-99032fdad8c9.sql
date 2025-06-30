
-- 1. 現在のprofilesテーブルの状態を確認
SELECT * FROM public.profiles;

-- 2. 現在ログインしているユーザー（admin@fukifuki.com）のprofileレコードを作成/更新
INSERT INTO public.profiles (id, role, created_at, updated_at)
VALUES (
  'a9267d45-138a-4a18-ae3f-0453de374905', -- 現在ログインしているユーザーのID
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  updated_at = NOW();

-- 3. 新規ユーザー登録時に自動でprofileレコードを作成するトリガーが正常に動作しているか確認
-- 必要に応じてトリガー関数を再作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, created_at, updated_at)
  VALUES (NEW.id, 'user', NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. トリガーを再設定（存在する場合は先に削除）
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
