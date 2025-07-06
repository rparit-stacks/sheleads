-- Simple script to create admin user
-- Copy and paste this into your Supabase SQL Editor

-- Create the admin user
INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  '[YOUR_ADMIN_EMAIL]',
  crypt('[YOUR_SECURE_PASSWORD]', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
);

-- Create the identity record
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at,
  email
) VALUES (
  '[YOUR_ADMIN_EMAIL]',
  (SELECT id FROM auth.users WHERE email = '[YOUR_ADMIN_EMAIL]'),
  jsonb_build_object(
    'sub', (SELECT id FROM auth.users WHERE email = '[YOUR_ADMIN_EMAIL]'),
    'email', '[YOUR_ADMIN_EMAIL]',
    'email_verified', true,
    'phone_verified', false
  ),
  'email',
  now(),
  now(),
  now(),
  '[YOUR_ADMIN_EMAIL]'
);

-- Verify the user was created
SELECT email, created_at FROM auth.users WHERE email = '[YOUR_ADMIN_EMAIL]'; 