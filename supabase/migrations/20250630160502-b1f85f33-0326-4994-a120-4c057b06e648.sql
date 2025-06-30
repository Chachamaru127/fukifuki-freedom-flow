
-- 開発用初期データの投入（実際のユーザーIDを使用）

-- 1. 管理者ユーザーのプロフィールを更新
UPDATE public.profiles 
SET 
  role = 'admin',
  phone = '090-0000-0001',
  updated_at = now()
WHERE id = '84e7b45c-376e-43cd-a584-0fe1c2bddc72'::uuid;

-- 2. 一般ユーザーのプロフィールを更新
UPDATE public.profiles 
SET 
  role = 'user',
  phone = '090-1234-5678',
  updated_at = now()
WHERE id = '03beb620-5e5d-4123-8a2b-58f024432dbf'::uuid;

-- 3. 管理者用のテスト案件を作成
-- 案件1: draft状態
INSERT INTO public.cases (id, user_id, company_name, employee_name, reason, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '84e7b45c-376e-43cd-a584-0fe1c2bddc72'::uuid,
  '株式会社サンプル商事',
  '田中太郎',
  'パワーハラスメントが継続的に行われており、精神的な負担が大きく退職を希望します。上司からの暴言や理不尽な要求が日常的にあり、業務に支障をきたしています。',
  'draft',
  now() - interval '5 days',
  now() - interval '5 days'
);

-- 案件2: hearing状態（進行中）
INSERT INTO public.cases (id, user_id, company_name, employee_name, reason, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '84e7b45c-376e-43cd-a584-0fe1c2bddc72'::uuid,
  'テクノロジー株式会社',
  '佐藤花子',
  '長時間労働が常態化しており、残業代の未払いもあるため退職代行をお願いしたいです。月100時間を超える残業が続き、体調不良も続いています。',
  'hearing',
  now() - interval '3 days',
  now() - interval '1 day'
);

-- 案件3: completed状態
INSERT INTO public.cases (id, user_id, company_name, employee_name, reason, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '84e7b45c-376e-43cd-a584-0fe1c2bddc72'::uuid,
  '株式会社グローバルマーケティング',
  '山田次郎',
  '職場環境の改善が見込めず、キャリアアップのため転職を決意しました。新しい職場への転職が決まっており、円満に退職したいと考えています。',
  'completed',
  now() - interval '10 days',
  now()
);

-- 4. 一般ユーザーの案件も追加
INSERT INTO public.cases (id, user_id, company_name, employee_name, reason, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '03beb620-5e5d-4123-8a2b-58f024432dbf'::uuid,
  '中小企業株式会社',
  '鈴木一郎',
  '人間関係のトラブルにより、職場での業務継続が困難になりました。同僚との関係が悪化し、協調して業務を進めることができない状況です。',
  'submitted',
  now() - interval '2 days',
  now() - interval '1 day'
);

-- 案件5: negotiating状態
INSERT INTO public.cases (id, user_id, company_name, employee_name, reason, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '03beb620-5e5d-4123-8a2b-58f024432dbf'::uuid,
  '製造業株式会社',
  '高橋美咲',
  '労働条件と実際の業務内容が大きく異なっており、契約違反の状態が続いています。約束されていた休日出勤手当も支払われていません。',
  'negotiating',
  now() - interval '7 days',
  now() - interval '2 days'
);
