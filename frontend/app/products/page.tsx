import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      product_images(*)
    `);

  return (
    <main className="container mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold mb-10">Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => {
          const image = product.product_images?.[0];
          const imageUrl = image
  ? supabase.storage.from("products").getPublicUrl(image.image_url).data.publicUrl
  : "";

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {image && (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="mt-2 text-primary font-bold">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}