import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-8 text-red-500">
        Failed to load products.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          href="/admin/products/new"
          className="bg-primary px-5 py-2 rounded-md"
        >
          + Add Product
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="border-t border-zinc-800">
                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="rounded-md bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      className="rounded-md bg-red-600 px-3 py-1 text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}