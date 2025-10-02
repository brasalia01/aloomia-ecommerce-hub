import { useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Effective Date: [Insert Date]</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            This Cookie Policy explains how Aloomia uses cookies and similar technologies to enhance your browsing experience.
          </p>

          <p>
            Cookies are small files placed on your device when you visit our site. They help us remember your preferences, keep you logged in, and analyze how visitors use our site. We use cookies for essential site functionality, performance analytics, personalization, and marketing purposes.
          </p>

          <p>
            By using our website, you consent to our use of cookies. If you prefer, you can disable cookies through your browser settings, but please note that some features of our site may not work properly without them.
          </p>

          <p>
            We may also use third-party cookies (such as Google Analytics) to understand site traffic and improve performance. These third parties may collect anonymous data in accordance with their own privacy policies.
          </p>

          <p>
            For more details or to withdraw consent, please contact us at info@aloomia.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
