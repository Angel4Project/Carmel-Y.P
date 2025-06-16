import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQAccordionItem: React.FC<{ faq: FAQItemProps, isOpen: boolean, onToggle: () => void }> = ({ faq, isOpen, onToggle }) => {
  const { t } = useLanguage();
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 px-6 text-lg font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-right">{faq.question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-sky-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '0px', marginBottom: '16px' },
              collapsed: { opacity: 0, height: 0, marginTop: '0px', marginBottom: '0px' }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-700 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const FAQPageInternal: React.FC = () => {
  const { content } = useContent();
  const { t } = useLanguage();
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  // Group FAQs by category
  const groupedFAQs: { [category: string]: FAQItemProps[] } = (content.faqs || []).reduce((acc, faq) => {
    const category = faq.category || t('faq.defaultCategory', 'כללי');
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as { [category: string]: FAQItemProps[] });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-sky-50">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-black text-center mb-12 md:mb-16 text-sky-700"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('faq.title', 'שאלות ותשובות נפוצות')}
          </motion.h1>

          {Object.keys(groupedFAQs).length > 0 ? (
            Object.entries(groupedFAQs).map(([category, faqsInCategory], index) => (
              <motion.div
                key={category}
                className="mb-12 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200/50"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold py-5 px-6 bg-sky-600 text-white">
                  {category}
                </h2>
                <div className="divide-y divide-gray-200">
                  {faqsInCategory.map((faq) => (
                    <FAQAccordionItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openFAQId === faq.id}
                      onToggle={() => handleToggle(faq.id)}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-xl">{t('faq.noFAQs', 'אין כרגע שאלות ותשובות להצגה. נעדכן בקרוב!')}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const FAQPage: React.FC = () => (
  <LanguageProvider>
    <ContentProvider>
      <AdminProvider>
        <FAQPageInternal />
      </AdminProvider>
    </ContentProvider>
  </LanguageProvider>
);

export default FAQPage;
