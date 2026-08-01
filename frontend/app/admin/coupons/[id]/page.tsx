"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditCouponPage() {
  const router = useRouter();
  const { id } = useParams();

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minimumOrderAmount, setMinimumOrderAmount] = useState("");
  const [maximumDiscount, setMaximumDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadCoupon() {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert(error.message);
        router.push("/admin/coupons");
        return;
      }

      setCode(data.code);
      setDiscountType(data.discount_type);
      setDiscountValue(String(data.discount_value));
      setMinimumOrderAmount(String(data.minimum_order_amount ?? ""));
      setMaximumDiscount(String(data.maximum_discount ?? ""));
      setUsageLimit(String(data.usage_limit ?? ""));
      setExpiresAt(
        data.expires_at
          ? data.expires_at.slice(0, 16)
          : ""
      );
      setIsActive(data.is_active);

      setLoading(false);
    }

    if (id) {
      loadCoupon();
    }
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("coupons")
      .update({
        code: code.toUpperCase(),
        discount_type: discountType,
        discount_value: Number(discountValue),
        minimum_order_amount: Number(minimumOrderAmount || 0),
        maximum_discount: maximumDiscount
          ? Number(maximumDiscount)
          : null,
        usage_limit: Number(usageLimit || 0),
        expires_at: expiresAt || null,
        is_active: isActive,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Coupon updated successfully!");

    router.push("/admin/coupons");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-white">
        Loading coupon...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Edit Coupon
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <input
          placeholder="Coupon Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
          required
        />

        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>

        <input
          type="number"
          placeholder="Discount Value"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
          required
        />

        <input
          type="number"
          placeholder="Minimum Order Amount"
          value={minimumOrderAmount}
          onChange={(e) => setMinimumOrderAmount(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
        />

        <input
          type="number"
          placeholder="Maximum Discount"
          value={maximumDiscount}
          onChange={(e) => setMaximumDiscount(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
        />

        <input
          type="number"
          placeholder="Usage Limit"
          value={usageLimit}
          onChange={(e) => setUsageLimit(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
        />

        <input
          type="datetime-local"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
        />

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active Coupon
        </label>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}