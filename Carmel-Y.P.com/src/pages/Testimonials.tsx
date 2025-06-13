import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ThumbsUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();

  const testimonials = [
    {
      id: 1,
      name: 'דוד כהן',
      location: 'כפר סבא',
      rating: 5,
      text: 'שירות מצוין! ירון הגיע במהירות, אבחן את הבעיה ותיקן את המזגן תוך שעה. מקצועי, אמין ובמחיר הוגן. בהחלט אמליץ!',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      service: 'תיקון מזגן',
      date: 'לפני שבוע'
    },
    {
      id: 2,
      name: 'שרה לוי',
      location: 'רעננה',
      rating: 5,
      text: 'התקנת מזגן חדש בבית. העבודה הייתה מקצועית ונקייה, הסביר לי על התחזוקה והשירות היה מעל הציפיות. תודה רבה!',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      service: 'התקנת מזגן',
      date: 'לפני שבועיים'
    },
    {
      id: 3,
      name: 'מיכאל אברהם',
      location: 'הרצליה',
      rating: 5,
      text: 'שירות תחזוקה מעולה. ירון מקצועי, אמין ותמיד זמין. הצליח לחסוך לי הרבה כסף על ידי תיקון במקום החלפה מלאה.',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      service: 'תחזוקה',
      date: 'לפני חודש'
    },
    {
      id: 4,
      name: 'רחל גרין',
      location: 'כפר סבא',
      rating: 5,
      text: 'המזגן נתקע בשבת בצהריים. ירון הגיע תוך חצי שעה ותיקן את הבעיה. שירות חירום מדהים! לא יכולתי לבקש יותר.',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      service: 'שירות חירום',
      date: 'לפני 3 ימים'
    },
    {
      id: 5,
      name: 'יוסי מזרחי',
      location: 'רמת השרון',
      rating: 5,
      text: 'התקנה של מערכת מיזוג למשרד. עבודה מקצועית, נקייה ויעילה. הצוות הגיע בזמן וסיים מהר מהצפוי. איכות מעולה!',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      service: 'התקנה מסחרית',
      date: 'לפני שבוע'
    },
    {
      id: 6,
      name: 'אסתר שמיר',
      location: 'גבעתיים',
      rating: 5,
      text: 'שירות מעולה ומחירים הוגנים. ירון מסביר בסבלנות ונותן עצות טובות לתחזוקה. אני לקוחה קבועה כבר שנתיים!',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      service: 'לקוחה קבועה',
      date: 'לפני יומיים'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Star
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      </motion.div>
    ));
  };

  const getServiceColor = (service: string) => {
    const colors = {
      'תיקון מזגן': 'bg-red-100 text-red-700',
      'התקנת מזגן': 'bg-blue-100 text-blue-700',
      'תחזוקה': 'bg-green-100 text-green-700',
      'שירות חירום': 'bg-orange-100 text-orange-700',
      'התקנה מסחרית': 'bg-purple-100 text-purple-700',
      'לקוחה קבועה': 'bg-pink-100 text-pink-700'
    };
    return colors[service as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
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
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            המלצות לקוחות
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-yellow-600 to-orange-700 bg-clip-text text-transparent">
              {t('testimonials.title')}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 relative hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Quote Icon */}
              <motion.div 
                className="absolute top-6 right-6 text-yellow-200 group-hover:text-yellow-300 transition-colors duration-300"
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-10 h-10" />
              </motion.div>

              {/* Service Badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${getServiceColor(testimonial.service)}`}>
                {testimonial.service}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 rtl:space-x-reverse mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <motion.p 
                className="text-gray-700 leading-relaxed mb-8 text-lg relative z-10 group-hover:text-gray-800 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                "{testimonial.text}"
              </motion.p>

              {/* Author */}
              <motion.div 
                className="flex items-center justify-between relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow-200 group-hover:border-yellow-300 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-yellow-700 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">{testimonial.date}</div>
              </motion.div>

              {/* Hover Effect */}
              <motion.div
                className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ThumbsUp className="w-6 h-6 text-yellow-500" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 rounded-3xl p-12 text-white relative overflow-hidden"
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
          
          <div className="relative z-10">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { value: '5.0', label: 'דירוג ממוצע', icon: Star },
                { value: '1200+', label: 'ביקורות חיוביות', icon: MessageCircle },
                { value: '98%', label: 'שביעות רצון', icon: ThumbsUp },
                { value: '24/6', label: 'תמיכה זמינה', icon: Quote }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8" />
                    </motion.div>
                    <div className="text-4xl font-black mb-2">{stat.value}</div>
                    <div className="text-white/90 font-semibold">{stat.label}</div>
                    {stat.icon === Star && (
                      <div className="flex justify-center mt-2">
                        {renderStars(5)}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            רוצה להצטרף ללקוחות המרוצים שלנו?
          </motion.h3>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            צור קשר עכשיו לקבלת שירות מקצועי ואמין שיעבור את כל הציפיות שלך
          </motion.p>
          
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            צור קשר עכשיו
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
