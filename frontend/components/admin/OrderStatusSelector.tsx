"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusSelector({
  orderId,
  currentStatus,
}: Props) {
  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

async function updateStatus(value: string) {
  setStatus(value);
  setLoading(true);

  await fetch("/api/admin/orders/update-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      orderStatus: value,
    }),
  });

  setLoading(false);

  console.log("Fetch completed");
  const res = await fetch("/api/admin/orders/update-status", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orderId,
    orderStatus: value,
  }),
});

const data = await res.json();
console.log(data);
}

  return (
    <select
  disabled={loading}
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="mt-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white"
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="packed">Packed</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}