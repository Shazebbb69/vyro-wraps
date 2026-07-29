
import Link from "next/link";
import { Plus, Package, Pencil, Trash2 } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase-server";
import DeleteProductButton from "./components/DeleteProductButton";

export default async function AdminProductsPage() {
  const supabase = await createServerSupabase();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-red-500 text-lg">
        Failed to load products.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold mt-1 flex items-center gap-3">
            <Package className="text-primary" size={34} />
            Products
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage all products available on your store.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-black transition hover:scale-105"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400 text-sm">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">
            {products?.length ?? 0}
          </h2>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400 text-sm">In Stock</p>
          <h2 className="text-3xl font-bold mt-2">
            {products?.filter((p: any) => p.stock > 0).length ?? 0}
          </h2>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400 text-sm">Out of Stock</p>
          <h2 className="text-3xl font-bold mt-2">
            {products?.filter((p: any) => p.stock === 0).length ?? 0}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-950">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Stock
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products?.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-16 text-center text-zinc-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products?.map((product: any) => (
                <tr
                  key={product.id}
                  className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
                >
                  <td className="px-6 py-5">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-zinc-500">
                      {product.slug}
                    </div>
                  </td>

                  <td className="px-6 py-5 font-medium">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.stock > 0
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="rounded-lg border border-blue-500 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                      >
                        <Pencil size={18} />
                      </Link>

                      <DeleteProductButton productId={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}