import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabase();

const {
  data: { user },
} = await supabase.auth.getUser();

console.log("Current user:", user);

  try {
    // Get product images
    const { data: images } = await supabase
      .from("product_images")
      .select("image_url")
      .eq("product_id", id);

    // Delete images from storage
    if (images?.length) {
      await supabase.storage
        .from("products")
        .remove(images.map((img) => img.image_url));
    }

    // Delete related records
    await supabase.from("product_images").delete().eq("product_id", id);
    await supabase.from("product_variants").delete().eq("product_id", id);

    // Delete product
   console.log("Deleting product ID:", id);

const { data: before } = await supabase
  .from("products")
  .select("id")
  .eq("id", id);

console.log("Found before delete:", before);

const { data, error } = await supabase
  .from("products")
  .delete()
  .eq("id", id)
  .select();

console.log("Deleted rows:", data);
console.log("Delete error:", error);

if (error) {
  console.error(error);
  return NextResponse.json(
    { success: false, error },
    { status: 500 }
  );
}

return NextResponse.json({
  success: true,
  id,
  before,
  deleted: data,
});
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}