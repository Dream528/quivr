const PRICING_TABLE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const StripePricingTable = (): JSX.Element => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 p-6 bg-highlight">
        <div className="space-y-3 text-center">
          <h3 className="text-2xl font-semibold text-black">Free Tier</h3>
          <ul className="list-none space-y-2">
            <li className="text-lg font-medium text-gray-800">🧠 3 brains</li>
            <li className="text-lg font-medium text-gray-800">
              🙋‍♂️ 20 questions per day
            </li>
            <li className="text-lg font-medium text-gray-800">
              💾 Up to 30Mb of storage
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-2xl font-semibold text-black">
            Premium Features
          </h3>
          <ul className="list-none space-y-2">
            <li className="text-lg font-medium text-gray-800">
              🧠 Bigger & more Brains
            </li>
            <li className="text-lg font-medium text-gray-800">
              🙋‍♂️ More daily questions
            </li>
            <li className="text-lg font-medium text-gray-800">
              🚀 Priority support
            </li>
          </ul>
        </div>
      </div>
      <div className="p-10">
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <stripe-pricing-table
          pricing-table-id={PRICING_TABLE_ID}
          publishable-key={PUBLISHABLE_KEY}
        ></stripe-pricing-table>
      </div>
    </>
  );
};
