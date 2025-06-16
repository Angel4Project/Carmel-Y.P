import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext'; // For t function
import { LogIn, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerAreaPageInternal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-sky-100">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-black mb-10 text-sky-700"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('customerArea.title', 'אזור לקוחות')}
          </motion.h1>

          <motion.div
            className="bg-white max-w-lg mx-auto p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('customerArea.loginTitle', 'התחברות לאזור האישי')}</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="customer-identifier" className="block text-sm font-medium text-gray-700 text-right mb-1">
                  {t('customerArea.identifierLabel', 'מספר טלפון / ת.ז.')}
                </label>
                <input
                  type="text"
                  name="customer-identifier"
                  id="customer-identifier"
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-100"
                  placeholder={t('customerArea.identifierPlaceholder', 'הזן מספר טלפון או ת.ז.')}
                />
              </div>
              <button
                type="submit"
                disabled
                className="w-full bg-sky-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-sky-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <LogIn className="w-5 h-5" />
                <span>{t('customerArea.loginButton', 'התחבר')}</span>
              </button>
            </form>
            <p className="mt-6 text-sm text-orange-600 bg-orange-50 p-3 rounded-md">
              {t('customerArea.loginComingSoon', 'פונקציונליות התחברות ומעקב אחר קריאות תהיה זמינה בקרוב!')}
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/new-service-request"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-xl hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Edit3 className="mr-3 rtl:ml-3 w-6 h-6" />
              {t('customerArea.newServiceRequestLink', 'פתח קריאת שירות חדשה')}
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CustomerAreaPage: React.FC = () => (
  <LanguageProvider>
    <ContentProvider>
      <AdminProvider> {/* AdminProvider might not be strictly necessary here but kept for consistency if any admin-related info were ever shown */}
        <CustomerAreaPageInternal />
      </AdminProvider>
    </ContentProvider>
  </LanguageProvider>
);

export default CustomerAreaPage;
