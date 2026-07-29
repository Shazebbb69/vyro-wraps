// app/admin/products/[id]/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import ProductForm, { type Product } from "../components/ProductForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const supabase = createServerSupabase();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single<Product>();

  if (error || !product) {
    console.log("Fetched product:", product);
    return (
      <main className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-red-500">
        Product not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit {product.name}</h1>

        <ProductForm mode="edit" initialProduct={product} />
      </div>
    </main>
  );
}