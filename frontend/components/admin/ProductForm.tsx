interface ProductFormProps {
  mode: "create" | "edit";
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    mrp: number | null;
    price: number;
    stock: number;
    is_active: boolean;
    is_featured: boolean;
  };
}

export default function ProductForm({
  mode,
  product,
}: ProductFormProps) {
  return (
    <form className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="block mb-2 font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Vyro Wraps"
          defaultValue={product?.name}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block mb-2 font-medium">Slug</label>
        <input
          type="text"
          name="slug"
          placeholder="vyro-wraps"
          defaultValue={product?.slug}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          rows={5}
          defaultValue={product?.description}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium">MRP</label>
          <input
            type="number"
            name="mrp"
            defaultValue={product?.mrp ?? ""}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Selling Price</label>
          <input
            type="number"
            name="price"
            defaultValue={product?.price}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            defaultValue={product?.stock}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Product Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex items-center gap-3 rounded-lg border border-zinc-700 p-4 cursor-pointer">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={product?.is_active ?? true}
            className="h-5 w-5"
          />
          <span>Active Product</span>
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-zinc-700 p-4 cursor-pointer">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={product?.is_featured}
            className="h-5 w-5"
          />
          <span>Featured Product</span>
        </label>
      </div>

      {/* Images */}
      <div>
        <label className="block mb-2 font-medium">Upload Images</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:opacity-90 transition py-3 rounded-lg font-semibold"
      >
        {mode === "create" ? "Create Product" : "Save Changes"}
      </button>
    </form>
  );
}