import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { useEffect } from 'react';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
          
          <p className="text-muted-foreground mb-8 text-center">Effective Date: January 1, 2024</p>
          
          <div className="space-y-8">
            <section>
              <p>
                This Cookie Policy explains how Aloomia uses cookies and similar technologies to enhance your 
                browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
              <p>
                Cookies are small files placed on your device when you visit our site. They help us remember 
                your preferences, keep you logged in, and analyze how visitors use our site. We use cookies for 
                essential site functionality, performance analytics, personalization, and marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
              <p>
                We may also use third-party cookies (such as Google Analytics) to understand site traffic and 
                improve performance. These third parties may collect anonymous data in accordance with their own 
                privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p>
                By using our website, you consent to our use of cookies. If you prefer, you can disable cookies 
                through your browser settings, but please note that some features of our site may not work properly 
                without them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                For more details or to withdraw consent, please contact us at info@aloomia.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;