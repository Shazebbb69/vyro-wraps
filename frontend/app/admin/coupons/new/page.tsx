"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewCouponPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minimumOrderAmount, setMinimumOrderAmount] = useState("");
  const [maximumDiscount, setMaximumDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.from("coupons").insert({
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
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Coupon created successfully!");
    router.push("/admin/coupons");
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Create Coupon
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
          disabled={loading}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Coupon"}
        </button>
      </form>
    </div>
  );
}