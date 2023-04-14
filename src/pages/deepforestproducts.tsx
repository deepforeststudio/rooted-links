import { HeadFC } from "gatsby";
import React from "react";

// this is so i can advertise this page on my site
// <iframe src="/deepforestproducts" width="100%" height="1000" frameborder="0" allowfullscreen></iframe>

const StripeEmbeddedProductTable: React.FC = () => {
  const stripePricingTableHTML = `
<stripe-pricing-table pricing-table-id="prctbl_1Mum44J1kRFWsGq07Mbz771Z"
publishable-key="pk_live_51MrNSiJ1kRFWsGq0M9Sh4PaS8MsoYizzAg8CK9NMghjYzgu8zSiNofwnwZLStFs7l2KlAEeQAnR10XLmT1SrTAHQ002z0MIrDR">
</stripe-pricing-table>`;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: stripePricingTableHTML,
        }}
      />
    </>
  );
};

export default StripeEmbeddedProductTable;

export const Head: HeadFC = () => {
  return (
    <>
      <title>Stripe Embedded Product Table</title>
      <script async src="https://js.stripe.com/v3/pricing-table.js" />
    </>
  );
};
