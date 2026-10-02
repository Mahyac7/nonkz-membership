# Nonkz Membership

Aplikasi membership **Nonkz** dibangun dengan **React Native + Expo** (expo-router) + **Supabase** sebagai backend.

## Fitur

- **Auth**: login & register (Supabase Auth, email + password)
- **Home**: kartu member dinamis, quick actions, promo, pull-to-refresh
- **Order**: daftar pesanan (filter status) + detail pesanan
- **Member**: tier, saldo poin, benefit, riwayat poin
- **Profile**: info user, statistik, edit profil, logout
- **Fitur**: Promo (list + detail + klaim), Tukar Poin (redeem real → poin berkurang), Voucher, Outlet, Referal, Kode Member (QR), Notifikasi

Semua data (profil, poin, voucher, order, promo, outlet, dll) diambil dari **Supabase**.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Konfigurasi Supabase
Salin `.env.example` menjadi `.env` dan isi dengan nilai project Supabase kamu
(Dashboard → Settings → API):
```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx   # atau anon key (eyJ...)
```

### 3. Siapkan database
Buka **Supabase Dashboard → SQL Editor → New query**, lalu copy-paste isi file
[`supabase/schema.sql`](./supabase/schema.sql) dan klik **Run**.

Ini membuat semua tabel, Row Level Security, seed data (promo/reward/outlet),
dan trigger yang otomatis mengisi profil + data contoh setiap ada user baru mendaftar.

> **Tips untuk testing cepat:** di dashboard **Authentication → Providers → Email**,
> matikan **"Confirm email"** agar bisa langsung login setelah register tanpa verifikasi email.

### 4. Jalankan
```bash
npx expo start
```
- Scan QR dengan **Expo Go**, atau tekan `w` (web) / `a` (Android) / `i` (iOS).

## Struktur

```
app/
  _layout.js            # root + AuthProvider + routing guard
  (auth)/               # login & register
  (tabs)/               # Home, Order, Member, Profile
  promo, promo-detail, tukar-poin, voucher, outlet,
  referal, kode-member, order-detail, notifikasi, edit-profile
components/             # komponen UI reusable
constants/theme.js      # palet warna & spacing
constants/data.js       # konfigurasi UI statis (quick actions)
lib/
  supabase.js           # Supabase client
  api.js                # service layer (fetch data)
  AuthContext.js        # session & profile global
supabase/schema.sql     # schema + RLS + seed (jalankan di SQL Editor)
```

## Build APK
GitHub Actions otomatis build APK setiap push ke `main`
(lihat `.github/workflows/build-apk.yml`). Download dari tab **Actions → Artifacts**.

Agar APK terhubung ke Supabase, set repository **secrets**
`EXPO_PUBLIC_SUPABASE_URL` dan `EXPO_PUBLIC_SUPABASE_ANON_KEY`
(Settings → Secrets and variables → Actions). Jika tidak diset, workflow memakai nilai default yang ada.

## Tech stack

- Expo SDK 51, expo-router
- @supabase/supabase-js + AsyncStorage (persist session)
- expo-linear-gradient, @expo/vector-icons
