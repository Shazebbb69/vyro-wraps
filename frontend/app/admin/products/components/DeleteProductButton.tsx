"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete product.");
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-500 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
    >
      <Trash2 size={18} />
    </button>
  );
}