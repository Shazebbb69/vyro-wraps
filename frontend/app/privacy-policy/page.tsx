export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-8">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        
        <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wider prose-a:text-primary">
          <p>Last updated: October 2023</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to Vyro Wraps. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>
          
          <h2>2. The Data We Collect About You</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data</strong> includes payment card details (processed securely by our payment gateway).</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., to process your order).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used or accessed in an unauthorised way, altered or disclosed.
          </p>

          <h2>5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data. 
            If you wish to exercise any of the rights set out above, please contact us.
          </p>
        </div>
      </div>
    </div>
  )
}
