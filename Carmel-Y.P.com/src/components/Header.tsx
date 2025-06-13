import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.services', path: '/services' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.products', path: '/products' },
    { key: 'nav.testimonials', path: '/testimonials' },
    { key: 'nav.blog', path: '/blog' }, // Added Blog link - Ensure 'nav.blog' is in i18n files
    { key: 'nav.contact', path: '/contact' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" onClick={closeMenu}>
            <motion.div
              className="flex items-center space-x-3 rtl:space-x-reverse"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">י</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Shield className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'} transition-colors`}>
                  ירון פרסי
                </span>
                <span className={`text-sm font-medium ${isScrolled ? 'text-sky-600' : 'text-sky-200'} transition-colors`}>
                  מיזוג אוויר מקצועי
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((item, index) => (
              <Link key={item.key} to={item.path} onClick={closeMenu}>
                <motion.div
                  className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled ? 'text-gray-700 hover:text-sky-600' : 'text-white hover:text-sky-300'
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span> {/* Adjusted for Link */}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* CTA and Language Toggle */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            <motion.button
              onClick={toggleLanguage}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-sky-600 hover:bg-sky-50' 
                  : 'text-white hover:text-sky-300 hover:bg-white/10'
              }`}
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
            
            <motion.a
              href={`tel:${content.contact.phone}`}
              className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              <span>{t('button.contact')}</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50"
        >
          <nav className="py-6 space-y-4">
            {navLinks.map((item, index) => (
              <Link key={item.key} to={item.path} onClick={closeMenu} className="block">
                <motion.div
                  className="w-full text-right text-gray-700 font-medium hover:text-sky-600 transition-colors py-2 px-4" // Added px-4 for consistency
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {t(item.key)}
                </motion.div>
              </Link>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 px-4"> {/* Added px-4 for consistency */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-sky-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Globe className="w-5 h-5" />
                <span>{language === 'he' ? 'English' : 'עברית'}</span>
              </motion.button>
              
              <motion.a
                href={`tel:${content.contact.phone}`}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeMenu} // Close menu on contact button click
              >
                {t('button.contact')}
              </motion.a>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;