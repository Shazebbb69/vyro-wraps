import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-muted-foreground mb-8">
        Thank you for shopping with Vyro Wraps.
        <br />
        Your payment has been received successfully.
      </p>

      <Link href="/products">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
}