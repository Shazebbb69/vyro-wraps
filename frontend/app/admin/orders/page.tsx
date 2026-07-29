import { ShoppingCart } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase-server";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const supabase = createServerSupabase();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] p-8 text-white">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          Admin Panel
        </p>

        <h1 className="mt-2 flex items-center gap-3 text-4xl font-bold">
          <ShoppingCart className="text-primary" size={34} />
          Orders
        </h1>

        <p className="mt-2 text-zinc-400">
          View and manage customer orders.
        </p>
      </div>

      {orders && orders.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-left">Payment</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40"
                >
                  <td className="px-6 py-4">
                    {order.id.slice(0, 8)}...
                  </td>

                  <td className="px-6 py-4">
                    ₹{order.total}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {order.payment_status}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {order.order_status}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <Link
  href={`/admin/orders/${order.id}`}
  className="inline-block rounded-lg border border-primary px-4 py-2 text-sm transition hover:bg-primary hover:text-black"
>
  View
</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <ShoppingCart
            size={56}
            className="mx-auto mb-4 text-zinc-600"
          />

          <h2 className="text-2xl font-semibold">
            No Orders Yet
          </h2>

          <p className="mt-2 text-zinc-500">
            Customer orders will appear here once your store goes live.
          </p>
        </div>
      )}
    </main>
  );
}