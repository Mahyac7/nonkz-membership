// Static UI configuration (not backed by the API).
// Dynamic data (profile, promos, vouchers, orders, etc.) comes from Supabase via lib/api.js.

export const quickActions = [
  { key: "promo", label: "Promo", icon: "pricetags", color: "#E23744", route: "/promo" },
  { key: "tukar-poin", label: "Tukar Poin", icon: "gift", color: "#F7B733", route: "/tukar-poin" },
  { key: "voucher", label: "Voucher", icon: "checkbox", color: "#7C5CFC", route: "/voucher" },
  { key: "outlet", label: "Outlet", icon: "storefront", color: "#1BA784", route: "/outlet" },
  { key: "referal", label: "Referal", icon: "person-add", color: "#4F7BF7", route: "/referal" },
];
