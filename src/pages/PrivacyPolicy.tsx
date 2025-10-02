import { useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Effective Date: [Insert Date]</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            At Aloomia, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when using our website.
          </p>

          <p>
            When you visit or make a purchase on our site, we may collect personal details such as your name, email address, phone number, billing/shipping address, and payment information. We also gather non-identifiable information like browser type, IP address, and usage statistics to improve our services.
          </p>

          <p>
            Your information is used to process orders, provide customer support, send updates or promotions (if you have subscribed), and improve our website experience. We never sell or rent your personal data to third parties. We may share information with trusted service providers who help us run the site, but they are obligated to keep your data secure.
          </p>

          <p>
            You have the right to access, update, or delete your personal information. If you wish to unsubscribe from our emails, you can do so at any time. For any privacy concerns, please contact us at [Insert Contact Email].
          </p>

          <p>
            By using our website, you consent to this Privacy Policy.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
