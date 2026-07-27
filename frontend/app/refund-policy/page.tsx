export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-8">
          Return & Refund <span className="text-primary">Policy</span>
        </h1>
        
        <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wider prose-a:text-primary">
          <p>Thank you for shopping at Vyro Wraps.</p>
          <p>If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.</p>
          
          <h2>1. Conditions for Returns</h2>
          <p>In order for the Goods to be eligible for a return, please make sure that:</p>
          <ul>
            <li>The Goods were purchased in the last 7 days.</li>
            <li>The Goods are in the original packaging.</li>
            <li>The Goods were not used or damaged.</li>
            <li>You have the receipt or proof of purchase.</li>
          </ul>

          <h2>2. Returning Goods</h2>
          <p>
            You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods to our headquarters.
            We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service.
          </p>

          <h2>3. Refunds</h2>
          <p>
            We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.
          </p>

          <h2>4. Exchanges</h2>
          <p>
            If you need to exchange it for the same item (e.g., different color), send us an email at support@vyrowraps.com.
          </p>
        </div>
      </div>
    </div>
  )
}
