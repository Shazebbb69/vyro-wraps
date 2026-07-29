"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingCart,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">Vyro Wraps Admin</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Manage your store from one place.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:border-red-500 hover:text-red-400"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-8 md:grid-cols-3">
        <Link href="/admin/products">
          <div className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-primary hover:-translate-y-1">
            <Package className="mb-4 text-primary" size={34} />
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="mt-2 text-zinc-400">
              Add, edit and remove products.
            </p>
          </div>
        </Link>

        <Link href="/admin/orders">
          <div className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-primary hover:-translate-y-1">
            <ShoppingCart className="mb-4 text-primary" size={34} />
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="mt-2 text-zinc-400">
              View and manage customer orders.
            </p>
          </div>
        </Link>

        
      </div>
    </main>
  );
}