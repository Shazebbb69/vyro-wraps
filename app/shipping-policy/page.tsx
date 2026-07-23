export default function ShippingPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-8">
          Shipping <span className="text-primary">Policy</span>
        </h1>
        
        <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wider prose-a:text-primary">
          <p>Thank you for visiting and shopping at Vyro Wraps. Following are the terms and conditions that constitute our Shipping Policy.</p>
          
          <h2>1. Domestic Shipping Policy</h2>
          <h3>Shipment processing time</h3>
          <p>
            All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
          </p>
          <p>
            If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.
          </p>

          <h3>Shipping rates & delivery estimates</h3>
          <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
          <ul>
            <li><strong>Standard Delivery:</strong> 3-5 business days (Free for orders over ₹1500, otherwise ₹150)</li>
            <li><strong>Express Delivery:</strong> 1-2 business days (₹250 flat rate)</li>
          </ul>

          <h2>2. International Shipping</h2>
          <p>
            We currently do not ship outside the country. However, we are working on expanding our reach globally soon.
          </p>

          <h2>3. Shipment confirmation & Order tracking</h2>
          <p>
            You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). 
            The tracking number will be active within 24 hours.
          </p>

          <h2>4. Damages</h2>
          <p>
            Vyro Wraps is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.
            Please save all packaging materials and damaged goods before filing a claim.
          </p>
        </div>
      </div>
    </div>
  )
}
