import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-8 text-center">Effective Date: January 1, 2024</p>
          
          <div className="space-y-8">
            <section>
              <p>
                Welcome to Aloomia. By accessing or using our website, you agree to comply with and be bound by 
                the following terms. Please read them carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <p>
                You must be at least 18 years old or have parental/guardian consent to use this site. You agree 
                to provide accurate information when creating an account, placing an order, or subscribing to our 
                services. Misuse of our site, fraudulent activities, or violation of these terms may result in 
                suspension or termination of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Products and Services</h2>
              <p>
                All products, prices, and promotions are subject to change without prior notice. We reserve the 
                right to refuse service, cancel orders, or limit quantities at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p>
                All content on this site, including images, text, logos, and designs, is the property of Aloomia 
                and cannot be copied, distributed, or used without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p>
                We are not responsible for delays, damages, or losses caused by factors outside our control 
                (such as shipping carriers or technical issues).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p>
                By using our site, you agree to these Terms of Service. For any questions, please contact us at 
                info@aloomia.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;