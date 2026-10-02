// Centralized mock data for the Nonkz Membership app.

export const user = {
  name: "Halo",
  initial: "H",
  tier: "Classic",
  nextTier: "Signature",
  points: 1250,
  coupons: 3,
  cardNumber: "NKZ 8235 4860 208",
  memberId: "82354860208",
  spendToNextLevel: 800000,
  tierProgress: 0.28,
  profileCompletion: 0.75,
  phone: "0812-3456-7890",
  email: "halo@nonkz.id",
  joined: "Jan 2025",
};

export const quickActions = [
  { key: "promo", label: "Promo", icon: "pricetags", color: "#E23744", route: "/promo" },
  { key: "tukar-poin", label: "Tukar Poin", icon: "gift", color: "#F7B733", route: "/tukar-poin" },
  { key: "voucher", label: "Voucher", icon: "checkbox", color: "#7C5CFC", route: "/voucher" },
  { key: "outlet", label: "Outlet", icon: "storefront", color: "#1BA784", route: "/outlet" },
  { key: "referal", label: "Referal", icon: "person-add", color: "#4F7BF7", route: "/referal" },
];

export const promos = [
  {
    id: "p1",
    discount: "20%",
    title: "Diskon Minuman",
    desc: "Berlaku untuk semua menu minuman dingin.",
    color: "#2F56D8",
    expiry: "31 Okt 2026",
    code: "NONKZ20",
  },
  {
    id: "p2",
    discount: "Rp 10rb",
    title: "Cashback Poin",
    desc: "Dapatkan cashback poin untuk transaksi min. Rp 50.000.",
    color: "#1BA784",
    expiry: "15 Nov 2026",
    code: "CASH10",
  },
  {
    id: "p3",
    discount: "Buy 1",
    title: "Get 1 Free",
    desc: "Beli 1 gratis 1 untuk menu Ube Series.",
    color: "#E23744",
    expiry: "20 Okt 2026",
    code: "UBE1GET1",
  },
  {
    id: "p4",
    discount: "15%",
    title: "Diskon Member Baru",
    desc: "Khusus member baru di 7 hari pertama.",
    color: "#7C5CFC",
    expiry: "30 Nov 2026",
    code: "WELCOME15",
  },
];

export const rewards = [
  { id: "r1", name: "Voucher Rp 10.000", cost: 500, icon: "cash-outline" },
  { id: "r2", name: "Free Americano", cost: 800, icon: "cafe-outline" },
  { id: "r3", name: "Free Ube Latte", cost: 1200, icon: "cafe-outline" },
  { id: "r4", name: "Voucher Rp 25.000", cost: 1500, icon: "cash-outline" },
  { id: "r5", name: "Tumbler Eksklusif", cost: 3000, icon: "gift-outline" },
  { id: "r6", name: "Voucher Rp 50.000", cost: 2800, icon: "cash-outline" },
];

export const vouchers = [
  {
    id: "v1",
    title: "Diskon Rp 10.000",
    desc: "Min. transaksi Rp 50.000",
    expiry: "31 Okt 2026",
    status: "active",
    color: "#2F56D8",
  },
  {
    id: "v2",
    title: "Gratis Ongkir",
    desc: "Untuk pengiriman dalam kota",
    expiry: "10 Nov 2026",
    status: "active",
    color: "#1BA784",
  },
  {
    id: "v3",
    title: "Diskon 20%",
    desc: "Khusus menu Ube Series",
    expiry: "20 Okt 2026",
    status: "active",
    color: "#7C5CFC",
  },
  {
    id: "v4",
    title: "Cashback Rp 15.000",
    desc: "Sudah digunakan",
    expiry: "01 Sep 2026",
    status: "used",
    color: "#8A90A6",
  },
];

export const orders = [
  {
    id: "ORD-20260930",
    date: "30 Sep 2026",
    outlet: "Nonkz Coffee - Senayan",
    status: "selesai",
    total: 78000,
    items: [
      { name: "Ube Latte", qty: 2, price: 30000 },
      { name: "Matcha Ube", qty: 1, price: 18000 },
    ],
  },
  {
    id: "ORD-20260928",
    date: "28 Sep 2026",
    outlet: "Nonkz Coffee - Kemang",
    status: "selesai",
    total: 45000,
    items: [{ name: "Dirty Ube", qty: 1, price: 45000 }],
  },
  {
    id: "ORD-20260925",
    date: "25 Sep 2026",
    outlet: "Nonkz Coffee - BSD",
    status: "diproses",
    total: 60000,
    items: [
      { name: "Strawberry Ube Latte", qty: 1, price: 32000 },
      { name: "Coconut Ube Cloud", qty: 1, price: 28000 },
    ],
  },
];

export const outlets = [
  {
    id: "o1",
    name: "Nonkz Coffee - Senayan",
    address: "Jl. Asia Afrika No. 8, Jakarta Pusat",
    distance: "1.2 km",
    hours: "08.00 - 22.00",
    open: true,
  },
  {
    id: "o2",
    name: "Nonkz Coffee - Kemang",
    address: "Jl. Kemang Raya No. 12, Jakarta Selatan",
    distance: "3.5 km",
    hours: "08.00 - 23.00",
    open: true,
  },
  {
    id: "o3",
    name: "Nonkz Coffee - BSD",
    address: "ICE BSD City, Tangerang",
    distance: "12.8 km",
    hours: "09.00 - 22.00",
    open: true,
  },
  {
    id: "o4",
    name: "Nonkz Coffee - Bandung",
    address: "Jl. Braga No. 45, Bandung",
    distance: "128 km",
    hours: "08.00 - 21.00",
    open: false,
  },
];

export const pointHistory = [
  { id: "h1", label: "Belanja di Senayan", date: "30 Sep 2026", amount: +78 },
  { id: "h2", label: "Tukar Free Americano", date: "29 Sep 2026", amount: -800 },
  { id: "h3", label: "Belanja di Kemang", date: "28 Sep 2026", amount: +45 },
  { id: "h4", label: "Bonus Referal", date: "27 Sep 2026", amount: +250 },
  { id: "h5", label: "Belanja di BSD", date: "25 Sep 2026", amount: +60 },
];

export const tierBenefits = {
  Classic: ["Poin setiap transaksi", "Promo mingguan", "Akses event member"],
  Signature: [
    "Semua benefit Classic",
    "Poin 1.5x lebih cepat",
    "Gratis upgrade size",
    "Prioritas antrian",
    "Hadiah ulang tahun",
  ],
};

export const formatRupiah = (n) =>
  "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");
