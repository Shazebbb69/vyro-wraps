import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const supabase = createServerSupabase();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
        <div>
          <span className="text-zinc-400">Order ID:</span>
          <p>{order.id}</p>
        </div>

        <div>
          <span className="text-zinc-400">Total:</span>
          <p>₹{order.total}</p>
        </div>

        <div>
          <span className="text-zinc-400">Payment Status:</span>
          <p className="capitalize">{order.payment_status}</p>
        </div>

        <div>
          <span className="text-zinc-400">Order Status:</span>
          <p className="capitalize">{order.order_status}</p>
        </div>

        <div>
          <span className="text-zinc-400">Tracking Number:</span>
          <p>{order.tracking_number || "Not assigned"}</p>
        </div>

        <div>
          <span className="text-zinc-400">Created:</span>
          <p>{new Date(order.created_at).toLocaleString()}</p>
        </div>
      </div>
    </main>
  );
}