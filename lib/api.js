import { supabase } from "./supabase";

export const formatRupiah = (n) =>
  "Rp " + Number(n || 0).toLocaleString("id-ID").replace(/,/g, ".");

// Map a DB profile row to the shape the UI expects.
export function mapProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name ?? "Member",
    initial: row.initial ?? (row.name ? row.name[0].toUpperCase() : "M"),
    tier: row.tier ?? "Classic",
    nextTier: row.next_tier ?? "Signature",
    points: row.points ?? 0,
    coupons: row.coupons ?? 0,
    cardNumber: row.card_number ?? "NKZ 0000 0000 000",
    memberId: row.member_id ?? "",
    spendToNextLevel: row.spend_to_next_level ?? 800000,
    tierProgress: Number(row.tier_progress ?? 0),
    profileCompletion: Number(row.profile_completion ?? 0.5),
    phone: row.phone ?? "",
    email: row.email ?? "",
    joined: row.joined ?? "",
  };
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return mapProfile(data);
}

export async function updateProfile(userId, patch) {
  const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
  if (error) throw error;
}

export async function getPromos() {
  const { data, error } = await supabase.from("promos").select("*").order("id");
  if (error) throw error;
  return (data || []).map((p) => ({
    id: p.id,
    discount: p.discount,
    title: p.title,
    desc: p.description,
    color: p.color,
    expiry: p.expiry,
    code: p.code,
  }));
}

export async function getRewards() {
  const { data, error } = await supabase.from("rewards").select("*").order("cost");
  if (error) throw error;
  return data || [];
}

export async function getOutlets() {
  const { data, error } = await supabase.from("outlets").select("*").order("id");
  if (error) throw error;
  return (data || []).map((o) => ({
    id: o.id,
    name: o.name,
    address: o.address,
    distance: o.distance,
    hours: o.hours,
    open: o.is_open,
  }));
}

export async function getVouchers(userId) {
  const { data, error } = await supabase
    .from("vouchers")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");
  if (error) throw error;
  return (data || []).map((v) => ({
    id: v.id,
    title: v.title,
    desc: v.description,
    expiry: v.expiry,
    status: v.status,
    color: v.color,
  }));
}

export async function getOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((o) => ({
    id: o.id,
    date: o.date,
    outlet: o.outlet,
    status: o.status,
    total: o.total,
    items: (o.order_items || []).map((it) => ({
      name: it.name,
      qty: it.qty,
      price: it.price,
    })),
  }));
}

export async function getPointHistory(userId) {
  const { data, error } = await supabase
    .from("point_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((h) => ({
    id: h.id,
    label: h.label,
    date: h.date,
    amount: h.amount,
  }));
}

export async function getNotifications(userId) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((n) => ({
    id: n.id,
    icon: n.icon,
    color: n.color,
    title: n.title,
    body: n.body,
    time: n.time,
    unread: n.unread,
  }));
}

// Redeem a reward: deduct points + record history (client-side, RLS-guarded).
export async function redeemReward(userId, reward, currentPoints) {
  if (currentPoints < reward.cost) {
    throw new Error("Poin tidak cukup");
  }
  const newPoints = currentPoints - reward.cost;
  const { error: upErr } = await supabase
    .from("profiles")
    .update({ points: newPoints })
    .eq("id", userId);
  if (upErr) throw upErr;

  await supabase.from("point_history").insert({
    user_id: userId,
    label: `Tukar ${reward.name}`,
    date: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    amount: -reward.cost,
  });

  return newPoints;
}

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
