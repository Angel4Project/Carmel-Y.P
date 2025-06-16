import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, Clock, Shield, Star, Zap, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();
  const { about: aboutContent, contact: contactContent } = content; // Destructure for easier access

  const stats = [
    {
      icon: Clock,
      number: aboutContent.experience,
      labelKey: 'about.experience',
      color: 'from-sky-500 to-blue-600',
      description: 'של ניסיון מקצועי'
    },
    {
      icon: Users,
      number: aboutContent.customers,
      labelKey: 'about.customers',
      color: 'from-emerald-500 to-teal-600',
      description: 'לקוחות מרוצים'
    },
    {
      icon: CheckCircle,
      number: aboutContent.projects,
      labelKey: 'about.projects',
      color: 'from-purple-500 to-indigo-600',
      description: 'פרויקטים הושלמו'
    },
    {
      icon: Award,
      number: aboutContent.warranty,
      labelKey: 'about.warranty',
      color: 'from-orange-500 to-red-600',
      description: 'חודשי אחריות'
    }
  ];

  const features = [
    { icon: Shield, text: 'שירות מקצועי ואמין 24/6', color: 'text-sky-600' },
    { icon: Star, text: 'צוות מנוסה ומוסמך', color: 'text-emerald-600' },
    { icon: Zap, text: 'ציוד מתקדם ואיכותי', color: 'text-purple-600' },
    { icon: Heart, text: 'מחירים הוגנים ושקופים', color: 'text-orange-600' },
    { icon: Award, text: 'אחריות מלאה על כל העבודות', color: 'text-red-600' }
  ];

  // Certifications are now from content.about.certificates

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-sky-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              מי אנחנו
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                {aboutContent.title}
              </span>
            </h2>

            <motion.p 
              className="text-2xl text-sky-600 font-bold mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {aboutContent.subtitle}
            </motion.p>

            {/* Team Image */}
            {aboutContent.teamImage && (
              <motion.div
                className="mb-10 rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img
                  src={aboutContent.teamImage}
                  alt={t('about.teamImageAlt', 'צוות החברה')}
                  className="w-full h-auto object-cover max-h-96"
                />
              </motion.div>
            )}

            <motion.div
              className="text-lg text-gray-600 leading-relaxed mb-6 prose prose-lg max-w-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('about.establishmentTitle', 'הקמה וניסיון')}</h3>
              <p>{aboutContent.establishmentAndExperience}</p>
            </motion.div>

            {aboutContent.approach && (
              <motion.div
                className="text-lg text-gray-600 leading-relaxed mb-6 prose prose-lg max-w-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('about.approachTitle', 'גישתנו לשירות')}</h3>
                <p>{aboutContent.approach}</p>
              </motion.div>
            )}

            {aboutContent.vision && (
              <motion.div
                className="text-lg text-gray-600 leading-relaxed mb-10 prose prose-lg max-w-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('about.visionTitle', 'החזון שלנו')}</h3>
                <p>{aboutContent.vision}</p>
              </motion.div>
            )}

            {/* Features */}
            <motion.div 
              className="space-y-4 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-4 rtl:space-x-reverse group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <span className="text-gray-700 font-semibold group-hover:text-sky-700 transition-colors duration-300">
                      {feature.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.a
                href={`tel:${contactContent.phone}`}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 text-center shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                צור קשר עכשיו
              </motion.a>
              
              <motion.button
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-sky-500 text-sky-600 px-8 py-4 rounded-2xl font-bold hover:bg-sky-50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                קרא המלצות
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-sky-200 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <motion.div 
                    className={`relative w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="text-4xl font-black text-gray-900 mb-3"
                    
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <div className="text-gray-600 font-semibold text-sm">
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 rounded-3xl p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-sky-500 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-blue-500 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-black text-gray-900 mb-6">הסמכות ובטיחות</h3>
              <p className="text-xl text-gray-600">עבודה על פי התקנים הישראליים והבינלאומיים</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutContent.certificates && aboutContent.certificates.length > 0 ? (
                aboutContent.certificates.map((cert, index) => (
                  <motion.div 
                    key={cert.id || index}
                    className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    {cert.imageUrl ? (
                      <motion.img
                        src={cert.imageUrl}
                        alt={cert.name}
                        className="w-32 h-32 object-contain mx-auto mb-4 rounded-md group-hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.1 }}
                      />
                    ) : (
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Award className="w-8 h-8 text-white" /> {/* Default Icon */}
                      </motion.div>
                    )}
                    <h4 className="font-black text-gray-900 mb-2 text-lg group-hover:text-sky-700 transition-colors">
                      {cert.link ? (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </h4>
                    {/* Optional: Add a description for certificate if needed in AboutContent interface */}
                  </motion.div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">אין כרגע תעודות או רישיונות להצגה.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;