import ProductForm from "../components/ProductForm";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">
          Create Product
        </h1>

        <ProductForm mode="create" />
      </div>
    </main>
  );
}