import { useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Effective Date: [Insert Date]</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            At Aloomia, customer satisfaction is our top priority. If you are not fully satisfied with your purchase, we're here to help.
          </p>

          <p>
            You may request a return or refund within 15 working days of receiving your order, provided the item is unused, in its original packaging, and in resellable condition. Certain items such as intimate wear, digital downloads, and clearance products may be non-refundable.
          </p>

          <p>
            To initiate a return, please contact us at [Insert Contact Email] with your order number and reason for return. Once your return is approved, we will provide instructions for shipping the item back. Please note that shipping costs are non-refundable and you will be responsible for return shipping fees (unless the product was defective or damaged upon arrival).
          </p>

          <p>
            Refunds will be issued to your original payment method within [X business days] after we receive and inspect the returned product.
          </p>

          <p>
            If you receive a defective or incorrect item, please contact us immediately so we can resolve the issue promptly.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
