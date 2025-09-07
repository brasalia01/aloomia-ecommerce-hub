import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <p className="text-muted-foreground mb-8 text-center">Effective Date: January 1, 2024</p>
          
          <div className="space-y-8">
            <section>
              <p>
                At Aloomia, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard the data you provide when using our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p>
                When you visit or make a purchase on our site, we may collect personal details such as your name, 
                email address, phone number, billing/shipping address, and payment information. We also gather 
                non-identifiable information like browser type, IP address, and usage statistics to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p>
                Your information is used to process orders, provide customer support, send updates or promotions 
                (if you have subscribed), and improve our website experience. We never sell or rent your personal 
                data to third parties. We may share information with trusted service providers who help us run the 
                site, but they are obligated to keep your data secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. If you wish to unsubscribe 
                from our emails, you can do so at any time. For any privacy concerns, please contact us at 
                privacy@aloomia.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Consent</h2>
              <p>
                By using our website, you consent to this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;