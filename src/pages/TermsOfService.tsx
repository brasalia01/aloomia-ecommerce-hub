import { useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Effective Date: [Insert Date]</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            Welcome to Aloomia. By accessing or using our website, you agree to comply with and be bound by the following terms. Please read them carefully.
          </p>

          <p>
            You must be at least 18 years old or have parental/guardian consent to use this site. You agree to provide accurate information when creating an account, placing an order, or subscribing to our services. Misuse of our site, fraudulent activities, or violation of these terms may result in suspension or termination of your account.
          </p>

          <p>
            All products, prices, and promotions are subject to change without prior notice. We reserve the right to refuse service, cancel orders, or limit quantities at our discretion.
          </p>

          <p>
            All content on this site, including images, text, logos, and designs, is the property of Aloomia and cannot be copied, distributed, or used without permission.
          </p>

          <p>
            We are not responsible for delays, damages, or losses caused by factors outside our control (such as shipping carriers or technical issues).
          </p>

          <p>
            By using our site, you agree to these Terms of Service. For any questions, please contact us at info@aloomia.com
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
