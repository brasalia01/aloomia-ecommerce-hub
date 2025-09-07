import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { useEffect } from 'react';

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-center">Refund Policy</h1>
          
          <p className="text-muted-foreground mb-8 text-center">Effective Date: January 1, 2024</p>
          
          <div className="space-y-8">
            <section>
              <p>
                At Aloomia, customer satisfaction is our top priority. If you are not fully satisfied with your 
                purchase, we're here to help.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Eligibility</h2>
              <p>
                You may request a return or refund within 15 working days of receiving your order, provided the 
                item is unused, in its original packaging, and in resellable condition. Certain items such as 
                intimate wear, digital downloads, and clearance products may be non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
              <p>
                To initiate a return, please contact us at returns@aloomia.com with your order number and reason 
                for return. Once your return is approved, we will provide instructions for shipping the item back. 
                Please note that shipping costs are non-refundable and you will be responsible for return shipping 
                fees (unless the product was defective or damaged upon arrival).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Processing</h2>
              <p>
                Refunds will be issued to your original payment method within 5-7 business days after we receive 
                and inspect the returned product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Defective or Incorrect Items</h2>
              <p>
                If you receive a defective or incorrect item, please contact us immediately at support@aloomia.com 
                so we can resolve the issue promptly.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;