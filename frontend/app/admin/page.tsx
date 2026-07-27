import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Vyro Wraps Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 hover:border-primary transition cursor-pointer h-full">
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-zinc-400 mt-2">
              Manage products, variants and images.
            </p>
          </div>
        </Link>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-zinc-400 mt-2">
            View customer orders.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <p className="text-zinc-400 mt-2">
            Manage customer reviews.
          </p>
        </div>
      </div>
    </main>
  );
}