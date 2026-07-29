// app/admin/products/components/ProductForm.tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  mrp: number | null;
  stock: number;
  sku: string | null;
  is_active: boolean;
  is_featured: boolean;
  image_urls: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ProductFormProps {
  mode: "create" | "edit";
  initialProduct?: Product;
}

interface ProductFormState {
  name: string;
  slug: string;
  description: string;
  mrp: string;
  price: string;
  comparePrice: string;
  sku: string;
  stock: string;
  isActive: boolean;
  isFeatured: boolean;
}

interface FormErrors {
  name?: string;
  slug?: string;
  price?: string;
  general?: string;
}

interface NewImageEntry {
  id: string;
  file: File;
  previewUrl: string;
}

const STORAGE_BUCKET = "products";

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function generateUniqueFileName(originalName: string): string {
  const extension = originalName.includes(".")
    ? originalName.substring(originalName.lastIndexOf("."))
    : "";
  const timestamp = Date.now();
  const randomSegment = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomSegment}${extension}`;
}

function parseOptionalNumber(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  }
  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseRequiredNumber(value: string): number {
  const parsed = Number(value.trim());
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getInitialFormState(initialProduct?: Product): ProductFormState {
  if (!initialProduct) {
    return {
      name: "",
      slug: "",
      description: "",
      mrp: "",
      price: "",
      comparePrice: "",
      sku: "",
      stock: "0",
      isActive: true,
      isFeatured: false,
    };
  }

  return {
    name: initialProduct.name ?? "",
    slug: initialProduct.slug ?? "",
    description: initialProduct.description ?? "",
    mrp: initialProduct.mrp !== null && initialProduct.mrp !== undefined ? String(initialProduct.mrp) : "",
    price: initialProduct.price !== null && initialProduct.price !== undefined ? String(initialProduct.price) : "",
    comparePrice:
      initialProduct.compare_price !== null && initialProduct.compare_price !== undefined
        ? String(initialProduct.compare_price)
        : "",
    sku: initialProduct.sku ?? "",
    stock:
      initialProduct.stock !== null && initialProduct.stock !== undefined ? String(initialProduct.stock) : "0",
    isActive: initialProduct.is_active ?? true,
    isFeatured: initialProduct.is_featured ?? false,
  };
}

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function ProductForm({ mode, initialProduct }: ProductFormProps) {
  const router = useRouter();

  const [formState, setFormState] = useState<ProductFormState>(() => getInitialFormState(initialProduct));

  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    initialProduct?.image_urls ? [...initialProduct.image_urls] : []
  );

  const [newImages, setNewImages] = useState<NewImageEntry[]>([]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  /* ------------------------------------------------------------------------ */
  /* FIELD HANDLERS                                                           */
  /* ------------------------------------------------------------------------ */

  const updateField = useCallback(
    <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => {
      setFormState((previous) => ({
        ...previous,
        [field]: value,
      }));
    },
    []
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("name", event.target.value);
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("slug", event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField("description", event.target.value);
  };

  const handleMrpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("mrp", event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("price", event.target.value);
  };

  const handleComparePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("comparePrice", event.target.value);
  };

  const handleSkuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("sku", event.target.value);
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("stock", event.target.value);
  };

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("isActive", event.target.checked);
  };

  const handleIsFeaturedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("isFeatured", event.target.checked);
  };

  /* ------------------------------------------------------------------------ */
  /* IMAGE HANDLERS                                                           */
  /* ------------------------------------------------------------------------ */

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const nextEntries: NewImageEntry[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNewImages((previous) => [...previous, ...nextEntries]);

    event.target.value = "";
  };

  const handleRemoveExistingImage = (url: string) => {
    setExistingImageUrls((previous) => previous.filter((existingUrl) => existingUrl !== url));
  };

  const handleRemoveNewImage = (id: string) => {
    setNewImages((previous) => {
      const target = previous.find((entry) => entry.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return previous.filter((entry) => entry.id !== id);
    });
  };

  /* ------------------------------------------------------------------------ */
  /* UPLOAD                                                                   */
  /* ------------------------------------------------------------------------ */

  const uploadNewImages = async (files: NewImageEntry[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const entry of files) {
      const uniqueFileName = generateUniqueFileName(entry.file.name);
      const filePath = `${uniqueFileName}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, entry.file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Failed to upload image "${entry.file.name}": ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error(`Failed to retrieve public URL for image "${entry.file.name}"`);
      }

      uploadedUrls.push(filePath);
    }

    return uploadedUrls;
  };

  /* ------------------------------------------------------------------------ */
  /* VALIDATION                                                               */
  /* ------------------------------------------------------------------------ */

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (formState.name.trim() === "") {
      nextErrors.name = "Product name is required.";
    }

    if (formState.slug.trim() === "") {
      nextErrors.slug = "Slug is required.";
    }

    if (formState.price.trim() === "") {
      nextErrors.price = "Selling price is required.";
    } else if (Number.isNaN(Number(formState.price.trim()))) {
      nextErrors.price = "Selling price must be a valid number.";
    }

    return nextErrors;
  };

  /* ------------------------------------------------------------------------ */
  /* SUBMIT                                                                   */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      const uploadedUrls = await uploadNewImages(newImages);
      const finalImageUrls = [...existingImageUrls, ...uploadedUrls];

      const stockValue = formState.stock.trim() === "" ? 0 : parseRequiredNumber(formState.stock);

      const payload = {
        name: formState.name.trim(),
        slug: formState.slug.trim(),
        description: formState.description.trim() === "" ? null : formState.description.trim(),
        mrp: parseOptionalNumber(formState.mrp),
        price: parseRequiredNumber(formState.price),
        compare_price: parseOptionalNumber(formState.comparePrice),
        sku: formState.sku.trim() === "" ? null : formState.sku.trim(),
        stock: stockValue,
        is_active: formState.isActive,
        is_featured: formState.isFeatured,
        image_urls: finalImageUrls,
      };

      if (mode === "create") {
        const { data: insertedProduct, error: insertError } = await supabase
          .from("products")
          .insert(payload)
          .select()
          .single();

        if (insertError) {
          throw new Error(insertError.message);
        }

        if (!insertedProduct?.id) {
          throw new Error("Failed to retrieve inserted product id.");
        }

        if (uploadedUrls.length > 0) {
          const productImageRows = uploadedUrls.map((imageUrl, index) => ({
            product_id: insertedProduct.id,
            image_url: imageUrl,
            sort_order: index + 1,
          }));

          const { error: imagesError } = await supabase.from("product_images").insert(productImageRows);

          if (imagesError) {
            throw new Error(imagesError.message);
          }
        }
      } else {
        if (!initialProduct?.id) {
          throw new Error("Missing product id for update.");
        }
        console.log("Initial Product:", initialProduct);
console.log("ID being updated:", initialProduct?.id);
        const { data, error: updateError } = await supabase
  .from("products")
  .update({
    ...payload,
    updated_at: new Date().toISOString(),
  })
  .eq("id", initialProduct.id)
  .select();

console.log("Updated row:", data);
console.log("Update error:", updateError);

        if (updateError) {
          throw new Error(updateError.message);
        }
      }

      newImages.forEach((entry) => URL.revokeObjectURL(entry.previewUrl));

      router.push("/admin/products");
      router.refresh();
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "An unexpected error occurred while saving the product.";
      setErrors({ general: message });
      setIsSaving(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  const submitLabel = isSaving ? (mode === "create" ? "Creating..." : "Saving...") : mode === "create" ? "Create Product" : "Save Changes";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-[#0b0b0b] border border-zinc-700 rounded-xl p-6 space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formState.name}
            onChange={handleNameChange}
            className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            placeholder="e.g. Matte Black Car Wrap"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label htmlFor="slug" className="block text-sm font-medium text-zinc-300">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="slug"
            type="text"
            value={formState.slug}
            onChange={handleSlugChange}
            className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            placeholder="e.g. matte-black-car-wrap"
          />
          {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-zinc-300">
            Description
          </label>
          <textarea
            id="description"
            value={formState.description}
            onChange={handleDescriptionChange}
            rows={5}
            className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-y"
            placeholder="Describe the product..."
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="mrp" className="block text-sm font-medium text-zinc-300">
              MRP
            </label>
            <input
              id="mrp"
              type="number"
              step="0.01"
              min="0"
              value={formState.mrp}
              onChange={handleMrpChange}
              className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-zinc-300">
              Selling Price <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formState.price}
              onChange={handlePriceChange}
              className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="0.00"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="comparePrice" className="block text-sm font-medium text-zinc-300">
              Compare Price
            </label>
            <input
              id="comparePrice"
              type="number"
              step="0.01"
              min="0"
              value={formState.comparePrice}
              onChange={handleComparePriceChange}
              className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* SKU + Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="sku" className="block text-sm font-medium text-zinc-300">
              SKU
            </label>
            <input
              id="sku"
              type="text"
              value={formState.sku}
              onChange={handleSkuChange}
              className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="e.g. VW-BLK-001"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="block text-sm font-medium text-zinc-300">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              step="1"
              min="0"
              value={formState.stock}
              onChange={handleStockChange}
              className="w-full bg-[#151515] border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6">
          <label htmlFor="isActive" className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id="isActive"
              type="checkbox"
              checked={formState.isActive}
              onChange={handleIsActiveChange}
              className="w-4 h-4 rounded border-zinc-700 bg-[#151515] accent-zinc-100"
            />
            <span className="text-sm text-zinc-300">Active</span>
          </label>

          <label htmlFor="isFeatured" className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id="isFeatured"
              type="checkbox"
              checked={formState.isFeatured}
              onChange={handleIsFeaturedChange}
              className="w-4 h-4 rounded border-zinc-700 bg-[#151515] accent-zinc-100"
            />
            <span className="text-sm text-zinc-300">Featured</span>
          </label>
        </div>

        {/* Images */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-300">Product Images</label>

          {existingImageUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {existingImageUrls.map((url) => (
                <div
                  key={url}
                  className="relative aspect-square rounded-xl overflow-hidden border border-zinc-700 bg-[#151515]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Product image" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(url)}
                    className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 transition-colors"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {newImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {newImages.map((entry) => (
                <div
                  key={entry.id}
                  className="relative aspect-square rounded-xl overflow-hidden border border-zinc-700 bg-[#151515]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.previewUrl} alt="New product image" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(entry.id)}
                    className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 transition-colors"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center gap-2 border border-dashed border-zinc-700 rounded-xl px-4 py-6 cursor-pointer text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
          >
            <Upload size={18} />
            <span className="text-sm">Click to upload images</span>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {errors.general && (
        <div className="bg-red-950/40 border border-red-900 rounded-xl px-4 py-3">
          <p className="text-sm text-red-400">{errors.general}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-zinc-100 hover:bg-white disabled:bg-zinc-600 disabled:cursor-not-allowed text-black font-medium rounded-xl px-6 py-2.5 transition-colors"
        >
          {isSaving && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}