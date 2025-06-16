import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';
import { useContent } from '../contexts/ContentContext'; // Import useContent
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';
import { motion } from 'framer-motion';

const ServicesPageInternal: React.FC = () => {
  const { content } = useContent();
  const { t } = useLanguage();

  // Get first 3 FAQs, prioritizing "Services" category, then "כללי", then any FAQ.
  let relevantFAQs = (content.faqs || []).filter(faq => faq.category === 'שירותים'); // Assuming "שירותים" is the Hebrew for "Services"
  if (relevantFAQs.length < 3) {
    const generalFAQs = (content.faqs || []).filter(faq => faq.category === t('faq.defaultCategory', 'כללי'));
    relevantFAQs = [...relevantFAQs, ...generalFAQs.filter(gfaq => !relevantFAQs.find(rfaq => rfaq.id === gfaq.id))];
  }
  if (relevantFAQs.length < 3) {
    const anyOtherFAQs = (content.faqs || []).filter(faq => !relevantFAQs.find(rfaq => rfaq.id === faq.id));
    relevantFAQs = [...relevantFAQs, ...anyOtherFAQs];
  }
  const faqSnippet = relevantFAQs.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Services />
        {faqSnippet.length > 0 && (
          <section className="py-12 md:py-16 bg-sky-50">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-3xl font-bold text-center mb-10 text-sky-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t('servicesPage.faqTitle', 'שאלות נפוצות בנושא שירותים')}
              </motion.h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                {faqSnippet.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}


const ServicesPage: React.FC = () => {
  return (
    <LanguageProvider>
      <ContentProvider>
        <AdminProvider>
          <ServicesPageInternal />
        </AdminProvider>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default ServicesPage;
