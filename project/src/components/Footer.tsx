import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Star, Shield, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    'התקנת מזגנים',
    'תיקון מזגנים',
    'תחזוקה תקופתית',
    'ייעוץ מקצועי',
    'מילוי גז',
    'שירות חירום 24/6'
  ];

  const navigationLinks = [
    { key: 'nav.home', id: 'hero' },
    { key: 'nav.services', id: 'services' },
    { key: 'nav.about', id: 'about' },
    { key: 'nav.products', id: 'products' },
    { key: 'nav.testimonials', id: 'testimonials' },
    { key: 'nav.contact', id: 'contact' }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: content.social.facebook,
      color: 'hover:bg-blue-600',
      label: 'Facebook'
    },
    {
      icon: Instagram,
      href: content.social.instagram,
      color: 'hover:bg-pink-600',
      label: 'Instagram'
    },
    {
      icon: MessageCircle,
      href: content.social.whatsapp,
      color: 'hover:bg-green-600',
      label: 'WhatsApp'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-sky-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3 rtl:space-x-reverse mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">י</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <Shield className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl">ירון פרסי</span>
                <span className="text-sm text-sky-400 font-semibold">מיזוג אוויר מקצועי</span>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mb-8 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              מעל 10 שנות ניסיון בשירותי מיזוג אוויר מקצועיים. אמינות, איכות ושירות אישי עם אלפי לקוחות מרוצים באזור המרכז והשרון.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4 rtl:space-x-reverse"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-black text-xl mb-8 text-sky-400">{t('footer.services.title')}</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    onClick={() => scrollToSection('services')}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 rtl:space-x-reverse group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-sky-500 rounded-full group-hover:bg-sky-400 transition-colors"></div>
                    <span>{service}</span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-black text-xl mb-8 text-sky-400">{t('footer.contact.title')}</h3>
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  text: content.contact.phone,
                  action: () => window.open(`tel:${content.contact.phone}`, '_self'),
                  color: 'text-green-400'
                },
                {
                  icon: Mail,
                  text: content.contact.email,
                  action: () => window.open(`mailto:${content.contact.email}`, '_self'),
                  color: 'text-blue-400'
                },
                {
                  icon: MapPin,
                  text: content.contact.address,
                  action: () => {},
                  color: 'text-purple-400'
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3 rtl:space-x-reverse group cursor-pointer"
                    onClick={item.action}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <IconComponent className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Business Hours & Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-black text-xl mb-8 text-sky-400">{t('footer.hours.title')}</h3>
            
            <motion.div 
              className="flex items-center space-x-3 rtl:space-x-reverse mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Clock className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-gray-400 text-sm">ראשון - חמישי</div>
                <div className="text-white font-bold">08:00 - 20:00</div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Shield, text: 'רישיון מוסמך', color: 'text-green-400' },
                { icon: Award, text: 'ביטוח מקיף', color: 'text-blue-400' },
                { icon: Star, text: 'דירוג 5 כוכבים', color: 'text-yellow-400' }
              ].map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-2 rtl:space-x-reverse"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <IconComponent className={`w-5 h-5 ${badge.color}`} />
                    <span className="text-gray-400 text-sm">{badge.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Emergency Badge */}
            <motion.div 
              className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-4 mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm font-bold mb-1 flex items-center space-x-2 rtl:space-x-reverse">
                <span>⚡</span>
                <span>שירות חירום</span>
              </div>
              <div className="text-xs opacity-90">זמין 24/6 בימות החום</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Links */}
        <motion.div 
          className="border-t border-gray-800 mt-16 pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {navigationLinks.map((item, index) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-400 hover:text-white transition-colors duration-300 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                {t(item.key)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ירון פרסי - מיזוג אוויר. {t('footer.rights')}.
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-400">
            <motion.span whileHover={{ scale: 1.05 }}>פותח בישראל 🇮🇱</motion.span>
            <span>•</span>
            <motion.span whileHover={{ scale: 1.05 }}>שירות מקצועי ואמין</motion.span>
            <span>•</span>
            <motion.span whileHover={{ scale: 1.05 }}>24/6 זמינות</motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;