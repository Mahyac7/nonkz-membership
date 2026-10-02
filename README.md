# Nonkz Membership

Aplikasi membership **Nonkz** dibangun dengan **React Native + Expo** (expo-router).

## Fitur (Home)

- Header gradient biru dengan avatar, logo, notifikasi & menu
- Kartu Member (tier Classic, saldo poin, kupon, progress ke Signature, nomor kartu)
- Quick actions: Promo, Tukar Poin, Voucher, Outlet, Referal
- Banner promo (Ube Series)
- Pill "Lengkapi profil 75%"
- Promo horizontal yang bisa di-scroll
- Bottom tab: Home, Order, Member, Profile

## Menjalankan

```bash
npm install
npx expo start
```

Lalu:
- Scan QR dengan aplikasi **Expo Go** di HP, atau
- Tekan `w` untuk web, `a` untuk Android, `i` untuk iOS.

## Struktur

```
app/
  _layout.js            # root layout + status bar
  (tabs)/
    _layout.js          # bottom tab navigation
    index.js            # Home
    order.js
    member.js
    profile.js
components/              # komponen UI reusable
constants/theme.js      # palet warna & spacing
```

## Tech stack

- Expo SDK 51
- expo-router
- expo-linear-gradient
- @expo/vector-icons (Ionicons)
