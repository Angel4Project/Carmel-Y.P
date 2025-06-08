import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle, Star, Zap, Shield, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rotate-12 animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <motion.div 
            className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">מעל 10 שנות ניסיון</span>
            </div>
            <span className="text-white/60">•</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">שירות 24/6</span>
            </div>
            <span className="text-white/60">•</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">אלפי לקוחות מרוצים</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
            variants={itemVariants}
          >
            <span className="block">
              <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {content.hero.title.split(' ')[0]}
              </span>
              <span className="text-white"> {content.hero.title.split(' ').slice(1, 2).join(' ')}</span>
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {content.hero.title.split(' ').slice(2).join(' ')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 leading-relaxed font-light"
            variants={itemVariants}
          >
            {content.hero.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {content.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.button
              onClick={scrollToContact}
              className="group relative bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-sky-500/25 flex items-center space-x-3 rtl:space-x-reverse overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <MessageCircle className="w-6 h-6 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10">{t('hero.cta')}</span>
              <Zap className="w-5 h-5 group-hover:animate-bounce relative z-10" />
            </motion.button>
            
            <motion.a
              href={`tel:${content.contact.phone}`}
              className="group bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center space-x-3 rtl:space-x-reverse shadow-xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-6 h-6 group-hover:animate-bounce" />
              <span>{t('hero.phone')}</span>
              <span className="text-sky-300 font-black">{content.contact.phone}</span>
            </motion.a>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {[
              { 
                icon: '🏠', 
                title: 'שירות ביתי מקצועי', 
                desc: 'הגעה מהירה עד הבית',
                gradient: 'from-emerald-500 to-teal-600'
              },
              { 
                icon: '⚡', 
                title: 'תיקון מהיר ויעיל', 
                desc: 'זמן תגובה קצר ופתרון מיידי',
                gradient: 'from-yellow-500 to-orange-600'
              },
              { 
                icon: '🛡️', 
                title: 'אחריות מלאה', 
                desc: 'עד 12 חודשי אחריות',
                gradient: 'from-purple-500 to-indigo-600'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-sky-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;