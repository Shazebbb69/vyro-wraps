"use client";

import { useRouter } from "next/navigation";

interface Props {
  couponId: string;
}

export default function DeleteCouponButton({ couponId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (!confirmed) return;

    const res = await fetch("/api/admin/coupons/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        couponId,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.error || "Failed to delete coupon");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}