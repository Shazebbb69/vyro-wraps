import Link from "next/link";
import DeleteCouponButton from "../../../components/admin/DeleteCouponButton";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function CouponsPage() {
  const supabase = createServerSupabase();

  const { data: coupons } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#0b0b0b] p-8 text-white">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coupons</h1>
          <p className="mt-2 text-zinc-400">
            Create and manage discount coupons.
          </p>
        </div>

        <Link
          href="/admin/coupons/new"
          className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
        >
          + New Coupon
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="px-5 py-4 text-left">Code</th>
              <th className="px-5 py-4 text-left">Type</th>
              <th className="px-5 py-4 text-left">Value</th>
              <th className="px-5 py-4 text-left">Used</th>
              <th className="px-5 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {coupons?.map((coupon) => (
              <tr
                key={coupon.id}
                className="border-t border-zinc-800"
              >
                <td className="px-5 py-4 font-semibold">
                  {coupon.code}
                </td>

                <td className="px-5 py-4 capitalize">
                  {coupon.discount_type}
                </td>

                <td className="px-5 py-4">
                  {coupon.discount_type === "percentage"
                    ? `${coupon.discount_value}%`
                    : `₹${coupon.discount_value}`}
                </td>

                <td className="px-5 py-4">
                  {coupon.times_used} / {coupon.usage_limit}
                </td>

                <td className="px-5 py-4 flex items-center gap-3">
  {coupon.is_active ? (
    <span className="text-green-400">
      Active
    </span>
  ) : (
    <span className="text-red-400">
      Disabled
    </span>
  )}

  <Link
    href={`/admin/coupons/${coupon.id}`}
    className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
  >
    Edit
  </Link>

  <DeleteCouponButton couponId={coupon.id} />
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}