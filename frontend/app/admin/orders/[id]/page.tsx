import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import OrderStatusSelector from "@/components/admin/OrderStatusSelector";

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
    .select(`
      *,
      addresses (
        *
      ),
      order_items (
        id,
        quantity,
        price,
        products (
          name
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] p-8 text-white">
      <h1 className="mb-8 text-3xl font-bold">Order Details</h1>

      <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
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

          <OrderStatusSelector
  orderId={order.id}
  currentStatus={order.order_status}
/>
        </div>

        <div>
          <span className="text-zinc-400">Tracking Number:</span>
          <p>{order.tracking_number || "Not assigned"}</p>
        </div>

        <div>
          <span className="text-zinc-400">Created:</span>
          <p>{new Date(order.created_at).toLocaleString()}</p>
        </div>

        <div className="border-t border-zinc-800 pt-4">
          <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>

          <p>{order.addresses?.full_name}</p>
          <p>{order.addresses?.phone}</p>
          <p>{order.addresses?.address_line1}</p>

          {order.addresses?.address_line2 && (
            <p>{order.addresses.address_line2}</p>
          )}

          <p>
            {order.addresses?.city}, {order.addresses?.state}
          </p>

          <p>
            {order.addresses?.postal_code}, {order.addresses?.country}
          </p>
        </div>

        <div className="border-t border-zinc-800 pt-4">
          <h2 className="mb-4 text-xl font-semibold">Products</h2>

          <div className="space-y-3">
            {order.order_items?.length ? (
              order.order_items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
                >
                  <div>
                    <p className="font-medium">
                      {item.products?.name ?? "Unknown Product"}
                    </p>

                    <p className="text-sm text-zinc-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}