interface ProductFormProps {
  mode: "create" | "edit";
}

export default function ProductForm({ mode }: ProductFormProps) {
  return (
    <form className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="block mb-2 font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Vyro Wraps"
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
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          rows={5}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium">MRP</label>
          <input
            type="number"
            name="mrp"
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Selling Price</label>
          <input
            type="number"
            name="price"
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3"
          />
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 gap-6">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="is_active" defaultChecked />
          Active Product
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" name="is_featured" />
          Featured Product
        </label>
      </div>

      {/* Images */}
      <div>
        <label className="block mb-2 font-medium">Images</label>
        <input type="file" multiple />
      </div>

      <button
        type="submit"
        className="w-full bg-primary py-3 rounded-lg font-semibold"
      >
        {mode === "create" ? "Create Product" : "Save Changes"}
      </button>
    </form>
  );
}