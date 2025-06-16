import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider, useContent, NewLeadData } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NewServiceRequestPageInternal: React.FC = () => {
  const { t } = useLanguage();
  const { addLead } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    issueDescription: '',
    preferredDateTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay (optional)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    const leadMessage = `
      Service Request Details:
      Service Type: ${formData.serviceType}
      Address: ${formData.address}
      Issue: ${formData.issueDescription}
      Preferred Time: ${formData.preferredDateTime}
    `.trim();

    const leadData: NewLeadData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      message: leadMessage,
      source: 'Service Request Form',
      // residentialArea can be derived from address if needed, or added as a separate field
    };

    try {
      await addLead(leadData); // Assuming addLead can be async if it involves API calls
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting service request lead:", error);
      // TODO: Show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center py-12 md:py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('serviceRequest.successTitle', 'הקריאה נשלחה בהצלחה!')}</h2>
            <p className="text-gray-600 mb-8">{t('serviceRequest.successMessage', 'ניצור איתך קשר בהקדם לתיאום השירות. תודה שפנית אלינו!')}</p>
            <RouterLink
              to="/customer-area"
              className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold"
            >
               <ArrowRight className="ml-2 rtl:mr-2 h-4 w-4" />
              {t('serviceRequest.backToCustomerArea', 'חזרה לאזור הלקוחות')}
            </RouterLink>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-black text-center mb-10 text-sky-700"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('serviceRequest.title', 'פתיחת קריאת שירות חדשה')}
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white max-w-2xl mx-auto p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-right mb-1">{t('serviceRequest.nameLabel', 'שם מלא')}*</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-right mb-1">{t('serviceRequest.phoneLabel', 'מספר טלפון')}*</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-right mb-1">{t('serviceRequest.emailLabel', 'כתובת אימייל (אופציונלי)')}</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 text-right mb-1">{t('serviceRequest.addressLabel', 'כתובת מלאה למתן שירות')}*</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 text-right mb-1">{t('serviceRequest.serviceTypeLabel', 'סוג השירות הנדרש')}*</label>
              <select name="serviceType" id="serviceType" value={formData.serviceType} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500">
                <option value="">{t('serviceRequest.selectServicePlaceholder', 'בחר סוג שירות...')}</option>
                <option value="התקנה">{t('serviceRequest.serviceType.installation', 'התקנה')}</option>
                <option value="תיקון">{t('serviceRequest.serviceType.repair', 'תיקון')}</option>
                <option value="תחזוקה">{t('serviceRequest.serviceType.maintenance', 'תחזוקה')}</option>
                <option value="ייעוץ">{t('serviceRequest.serviceType.consultation', 'ייעוץ')}</option>
                <option value="אחר">{t('serviceRequest.serviceType.other', 'אחר')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 text-right mb-1">{t('serviceRequest.issueDescriptionLabel', 'תיאור הבעיה/הבקשה')}*</label>
              <textarea name="issueDescription" id="issueDescription" value={formData.issueDescription} onChange={handleInputChange} required rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"></textarea>
            </div>
            <div>
              <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 text-right mb-1">{t('serviceRequest.preferredDateTimeLabel', 'מועד מועדף לשירות (אופציונלי)')}</label>
              <input type="text" name="preferredDateTime" id="preferredDateTime" value={formData.preferredDateTime} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" placeholder={t('serviceRequest.preferredDateTimePlaceholder', 'לדוגמה: יום א בבוקר, או תאריך ספציפי')}/>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rtl:space-x-reverse text-lg"
            >
              {isSubmitting ? (
                 <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>{t('serviceRequest.submitButton', 'שלח קריאה')}</span>
            </button>
          </motion.form>
          <div className="mt-8 text-center">
            <RouterLink
                to="/customer-area"
                className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold"
              >
                <ArrowRight className="ml-2 rtl:mr-2 h-4 w-4" />
                {t('serviceRequest.backToCustomerAreaShort', 'חזרה לאזור לקוחות')}
            </RouterLink>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};


const NewServiceRequestPage: React.FC = () => (
  <LanguageProvider>
    <ContentProvider>
      <AdminProvider> {/* As with CustomerAreaPage, AdminProvider might be optional here */}
        <NewServiceRequestPageInternal />
      </AdminProvider>
    </ContentProvider>
  </LanguageProvider>
);

export default NewServiceRequestPage;
