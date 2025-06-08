import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'he' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  he: {
    // Header
    'nav.home': 'בית',
    'nav.services': 'שירותים',
    'nav.about': 'אודות',
    'nav.products': 'מוצרים',
    'nav.testimonials': 'המלצות',
    'nav.contact': 'צור קשר',
    'button.contact': 'צור קשר',
    
    // Hero
    'hero.title': 'שירותי מיזוג אוויר מקצועיים',
    'hero.subtitle': 'התקנה, תיקון ותחזוקה של מזגנים בכפר סבא ובאזור המרכז והשרון',
    'hero.description': 'מעל 10 שנות ניסיון בתחום המיזוג. שירות מקצועי, אמין ומהיר עם אלפי לקוחות מרוצים.',
    'hero.cta': 'קבל הצעת מחיר',
    'hero.phone': 'התקשר עכשיו',
    
    // Services
    'services.title': 'השירותים שלנו',
    'services.subtitle': 'פתרונות מקצועיים לכל צרכי המיזוג שלכם',
    'services.installation.title': 'התקנת מזגנים',
    'services.installation.desc': 'התקנה מקצועית של מזגנים לבתים ועסקים עם אחריות מלאה',
    'services.repair.title': 'תיקון מזגנים',
    'services.repair.desc': 'אבחון מהיר ותיקון יעיל של תקלות במזגנים מכל הסוגים',
    'services.maintenance.title': 'תחזוקה תקופתית',
    'services.maintenance.desc': 'שירותי תחזוקה מקצועיים להארכת חיי המזגן ושמירה על יעילותו',
    'services.consultation.title': 'ייעוץ מקצועי',
    'services.consultation.desc': 'ייעוץ מקצועי לבחירת המזגן המתאים לצרכים שלכם',
    'services.gas.title': 'מילוי גז',
    'services.gas.desc': 'מילוי וטיפול בגז קירור עם בדיקות איכות מקצועיות',
    'services.emergency.title': 'שירות חירום',
    'services.emergency.desc': 'זמינות 24/6 לתיקונים דחופים בימות החום הקשים',
    
    // About
    'about.title': 'אודות ירון פרסי',
    'about.subtitle': 'מעל עשור של מקצועיות ואמינות',
    'about.experience': 'שנות ניסיון',
    'about.customers': 'לקוחות מרוצים',
    'about.projects': 'פרויקטים הושלמו',
    'about.warranty': 'חודשי אחריות',
    'about.description': 'ירון פרסי מתמחה בשירותי מיזוג אוויר מעל 10 שנים, עם דגש על איכות, מקצועיות ושירות אישי. אנו מספקים פתרונות מותאמים אישית לכל לקוח, החל מבתים פרטיים ועד עסקים גדולים באזור המרכז והשרון.',
    
    // Products
    'products.title': 'המוצרים שלנו',
    'products.subtitle': 'מבחר רחב של מזגנים איכותיים ויעילים',
    'products.filter.all': 'הכל',
    'products.filter.inverter': 'אינוורטר',
    'products.filter.central': 'מרכזי',
    'products.filter.portable': 'נייד',
    'products.filter.commercial': 'מסחרי',
    
    // Testimonials
    'testimonials.title': 'מה אומרים הלקוחות',
    'testimonials.subtitle': 'המלצות מלקוחות מרוצים',
    
    // Contact
    'contact.title': 'צור קשר',
    'contact.subtitle': 'נשמח לעזור לכם עם כל צורך במיזוג אוויר',
    'contact.form.name': 'שם מלא',
    'contact.form.phone': 'טלפון',
    'contact.form.email': 'אימייל',
    'contact.form.service': 'סוג שירות',
    'contact.form.message': 'הודעה',
    'contact.form.submit': 'שלח הודעה',
    'contact.info.title': 'פרטי יצירת קשר',
    'contact.info.phone': 'טלפון',
    'contact.info.email': 'אימייל',
    'contact.info.location': 'מיקום',
    'contact.info.hours': 'שעות פעילות',
    'contact.info.hours.value': 'ראשון - חמישי: 08:00 - 20:00',
    
    // Footer
    'footer.services.title': 'שירותים',
    'footer.contact.title': 'יצירת קשר',
    'footer.hours.title': 'שעות פעילות',
    'footer.rights': 'כל הזכויות שמורות'
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'button.contact': 'Contact Us',
    
    // Hero
    'hero.title': 'Professional Air Conditioning Services',
    'hero.subtitle': 'Installation, Repair & Maintenance of AC Units in Kfar Saba and Central Sharon Region',
    'hero.description': 'Over 10 years of experience in air conditioning. Professional, reliable and fast service with thousands of satisfied customers.',
    'hero.cta': 'Get Quote',
    'hero.phone': 'Call Now',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Professional solutions for all your air conditioning needs',
    'services.installation.title': 'AC Installation',
    'services.installation.desc': 'Professional installation of air conditioners for homes and businesses with full warranty',
    'services.repair.title': 'AC Repair',
    'services.repair.desc': 'Quick diagnosis and efficient repair of faults in all types of air conditioners',
    'services.maintenance.title': 'Periodic Maintenance',
    'services.maintenance.desc': 'Professional maintenance services to extend AC life and maintain efficiency',
    'services.consultation.title': 'Professional Consultation',
    'services.consultation.desc': 'Professional advice for choosing the right air conditioner for your needs',
    'services.gas.title': 'Gas Refill',
    'services.gas.desc': 'Refrigerant filling and treatment with professional quality checks',
    'services.emergency.title': 'Emergency Service',
    'services.emergency.desc': '24/6 availability for urgent repairs during hot summer days',
    
    // About
    'about.title': 'About Yaron Parsi',
    'about.subtitle': 'Over a decade of professionalism and reliability',
    'about.experience': 'Years Experience',
    'about.customers': 'Happy Customers',
    'about.projects': 'Completed Projects',
    'about.warranty': 'Months Warranty',
    'about.description': 'Yaron Parsi specializes in air conditioning services for over 10 years, focusing on quality, professionalism and personal service. We provide customized solutions for every client, from private homes to large businesses in the central and Sharon regions.',
    
    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'Wide selection of quality and efficient air conditioners',
    'products.filter.all': 'All',
    'products.filter.inverter': 'Inverter',
    'products.filter.central': 'Central',
    'products.filter.portable': 'Portable',
    'products.filter.commercial': 'Commercial',
    
    // Testimonials
    'testimonials.title': 'What Customers Say',
    'testimonials.subtitle': 'Testimonials from satisfied customers',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We\'d be happy to help you with any air conditioning need',
    'contact.form.name': 'Full Name',
    'contact.form.phone': 'Phone',
    'contact.form.email': 'Email',
    'contact.form.service': 'Service Type',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',
    'contact.info.hours': 'Business Hours',
    'contact.info.hours.value': 'Sunday - Thursday: 08:00 - 20:00',
    
    // Footer
    'footer.services.title': 'Services',
    'footer.contact.title': 'Contact',
    'footer.hours.title': 'Business Hours',
    'footer.rights': 'All rights reserved'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'he' | 'en'>('he');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'he' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Update document direction and language
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'he' ? 'en' : 'he';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['he']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};