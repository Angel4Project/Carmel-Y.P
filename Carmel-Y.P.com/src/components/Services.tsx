import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Home, Settings, MessageSquare, Zap, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const iconComponents: { [key: string]: React.ElementType } = {
  Home,
  Wrench,
  Settings,
  MessageSquare,
  Zap,
  Phone,
};

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const { content } = useContent();
  const { services } = content; // Get services from context

  const [flippedStates, setFlippedStates] = useState(Array(services.length).fill(false));

  // Effect to reset flipped states if the number of services changes
  useEffect(() => {
    setFlippedStates(Array(services.length).fill(false));
  }, [services.length]);

  const handleFlip = (index: number) => {
    setFlippedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-sky-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-sky-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            השירותים המקצועיים שלנו
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon];
            const isFlipped = flippedStates[index];

            if (!IconComponent) {
              console.warn(`Icon component not found for service: ${service.icon}`);
              return null; // Or a fallback UI
            }

            // Ensure service.color and service.hoverColor are defined, provide defaults if not
            const cardColor = service.color || 'from-gray-500 to-gray-600';
            const cardHoverColor = service.hoverColor || 'hover:from-gray-600 hover:to-gray-700';


            return (
              <motion.div
                key={service.id || index} // Use service.id if available, otherwise index
                variants={itemVariants}
                className="relative"
                style={{ perspective: 1000 }} // Required for 3D effect
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                >
                  {/* Front of the card */}
                  <motion.div
                    className="absolute w-full h-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col" // Removed p-8 and justify-between for now
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} // Hide back when not visible
                  >
                    {/* Service Image */}
                    {service.image && (
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-40 object-cover" // Adjusted height
                      />
                    )}
                    {/* Content Padding */}
                    <div className="p-6 flex flex-col flex-grow justify-between"> {/* Added p-6 here and flex-grow */}
                      <div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${cardColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                        <motion.div
                          className={`relative w-20 h-20 bg-gradient-to-br ${cardColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${service.image ? '-mt-12' : ''}`} // Conditional margin if image exists
                        >
                          <IconComponent className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-sky-700 transition-colors duration-300">
                          {t(service.titleKey)}
                        </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                        {t(service.descKey)}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => handleFlip(index)}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 font-semibold hover:text-sky-700 transition-colors duration-300 self-start"
                      whileHover={{ x: language === 'he' ? -5 : 5 }}
                    >
                      <span>{t('services.readMore')}</span>
                      {language === 'he' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </motion.button>
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>

                  {/* Back of the card */}
                  <motion.div
                    className="absolute w-full h-full bg-gradient-to-br from-sky-600 to-blue-700 text-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col" // Removed p-8
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} // Hide back when not visible and pre-rotate
                  >
                     {/* Service Image on Back as well? (Optional) - For now, keeping it simple */}
                     {/* {service.image && (
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-40 object-cover opacity-50"
                      />
                    )} */}
                    {/* Content Padding for Back */}
                    <div className="p-6 flex flex-col flex-grow justify-between"> {/* Added p-6 here */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4">
                          {t(service.titleKey)}
                        </h3>
                        {/* Optional: Display image on back if design requires */}
                        {/* {service.image && !isFlippedCardFrontImage && (
                          <img src={service.image} alt={t(service.titleKey)} className="w-full h-32 object-cover rounded-lg mb-4" />
                        )} */}
                        <p className="leading-relaxed mb-6 text-sm"> {/* text-sm for potentially more text */}
                          {t(service.detailedDescKey, `Detailed information about ${t(service.titleKey)}.`)}
                        </p>
                      </div>
                      <motion.button
                      onClick={() => handleFlip(index)}
                      className="flex items-center space-x-2 rtl:space-x-reverse font-semibold hover:text-gray-200 transition-colors duration-300 self-start"
                      whileHover={{ x: language === 'he' ? -5 : 5 }}
                    >
                      <span>{t('services.showLess')}</span>
                      {language === 'he' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="relative bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 rounded-3xl p-12 text-white overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <motion.h3 
              className="text-4xl md:text-5xl font-black mb-6"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              זקוק לשירות מיזוג אוויר?
            </motion.h3>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              צור קשר עכשיו לקבלת הצעת מחיר ללא התחייבות ושירות מקצועי ומהיר
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href={`tel:${content.contact.phone}`}
                className="bg-white text-sky-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-3 rtl:space-x-reverse shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                <span>התקשר עכשיו: {content.contact.phone}</span>
              </motion.a>
              
              <motion.a
                href={content.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all duration-300 inline-flex items-center space-x-3 rtl:space-x-reverse shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-6 h-6" />
                <span>WhatsApp</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;