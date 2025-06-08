import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Products: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();
  const [activeFilter, setActiveFilter] = useState('all');

  const products = [
    {
      id: 1,
      name: 'מזגן אינוורטר 1 כ״ח',
      category: 'inverter',
      price: '₪2,500',
      originalPrice: '₪3,200',
      image: 'https://images.pexels.com/photos/159358/air-conditioner-air-conditioning-cool-159358.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 124,
      features: ['חיסכון בחשמל עד 60%', 'פעולה שקטה במיוחד', 'שלט רחוק חכם', 'מסנן אוויר מתקדם'],
      badge: 'מבצע'
    },
    {
      id: 2,
      name: 'מזגן מרכזי 3 כ״ח',
      category: 'central',
      price: '₪8,500',
      image: 'https://images.pexels.com/photos/7031591/pexels-photo-7031591.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 89,
      features: ['מתאים לבתים גדולים', 'יעילות אנרגטית A+++', 'בקרה מתקדמת', 'עיצוב מודרני ונסתר'],
      badge: 'פופולרי'
    },
    {
      id: 3,
      name: 'מזגן נייד 1.5 כ״ח',
      category: 'portable',
      price: '₪1,800',
      image: 'https://images.pexels.com/photos/7031725/pexels-photo-7031725.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviews: 67,
      features: ['ניידות מלאה', 'התקנה קלה ומהירה', 'מתאים לשכירות', 'חיסכון במקום'],
      badge: 'חדש'
    },
    {
      id: 4,
      name: 'מזגן מסחרי 5 כ״ח',
      category: 'commercial',
      price: '₪15,000',
      image: 'https://images.pexels.com/photos/7031592/pexels-photo-7031592.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 45,
      features: ['מתאים לעסקים גדולים', 'עמידות גבוהה', 'תחזוקה קלה', 'אחריות מורחבת 3 שנים'],
      badge: 'מקצועי'
    },
    {
      id: 5,
      name: 'מזגן אינוורטר 2 כ״ח',
      category: 'inverter',
      price: '₪3,200',
      image: 'https://images.pexels.com/photos/159358/air-conditioner-air-conditioning-cool-159358.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 156,
      features: ['טכנולוגיה מתקדמת', 'חיסכון מקסימלי', 'WiFi מובנה', 'מצב לילה שקט'],
      badge: 'מומלץ'
    },
    {
      id: 6,
      name: 'מזגן מיני מרכזי 4 כ״ח',
      category: 'central',
      price: '₪12,000',
      image: 'https://images.pexels.com/photos/7031591/pexels-photo-7031591.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 78,
      features: ['מתאים לדירות גדולות', 'עיצוב נסתר', 'בקרה אינטליגנטית', 'פעולה שקטה במיוחד'],
      badge: 'יוקרה'
    }
  ];

  const filters = [
    { key: 'all', labelKey: 'products.filter.all', count: products.length },
    { key: 'inverter', labelKey: 'products.filter.inverter', count: products.filter(p => p.category === 'inverter').length },
    { key: 'central', labelKey: 'products.filter.central', count: products.filter(p => p.category === 'central').length },
    { key: 'portable', labelKey: 'products.filter.portable', count: products.filter(p => p.category === 'portable').length },
    { key: 'commercial', labelKey: 'products.filter.commercial', count: products.filter(p => p.category === 'commercial').length }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const getBadgeColor = (badge: string) => {
    const colors = {
      'מבצע': 'bg-red-500',
      'פופולרי': 'bg-green-500',
      'חדש': 'bg-blue-500',
      'מקצועי': 'bg-purple-500',
      'מומלץ': 'bg-orange-500',
      'יוקרה': 'bg-yellow-500'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-sky-500 rounded-full filter blur-3xl"></div>
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
            className="inline-block bg-gradient-to-r from-blue-500 to-sky-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            המוצרים שלנו
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-sky-700 bg-clip-text text-transparent">
              {t('products.title')}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse overflow-hidden ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-blue-500 to-sky-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl'
              }`}
              whileHover={{ scale: activeFilter === filter.key ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-5 h-5" />
              <span>{t(filter.labelKey)}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeFilter === filter.key ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          layout
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 ${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {product.badge}
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 rtl:space-x-reverse">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 rtl:space-x-reverse">
                    <motion.button
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="bg-white text-red-500 p-3 rounded-full hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                    <div className="text-3xl font-black text-blue-600">{product.price}</div>
                    {product.originalPrice && (
                      <div className="text-lg text-gray-400 line-through">{product.originalPrice}</div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {product.features.map((feature, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-sky-600 text-white py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-sky-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>הזמן עכשיו</span>
                    </motion.button>
                    
                    <motion.button 
                      className="px-6 py-4 border-2 border-blue-500 text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      פרטים
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <motion.h3 
                className="text-4xl md:text-5xl font-black mb-6"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                לא מוצא את המזגן המתאים?
              </motion.h3>
              
              <motion.p 
                className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                צור קשר לייעוץ מקצועי ומציאת הפתרון הטוב ביותר עבורך
              </motion.p>
              
              <motion.button 
                className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                קבל ייעוץ מקצועי
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;