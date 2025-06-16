import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ThumbsUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();
  const { testimonials, averageRating } = content; // Use testimonials and averageRating from context

  const renderStars = (rating: number, isAverageRating: boolean = false) => {
    const starArray = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      starArray.push(
        <Star key={`full-${i}`} className={`w-5 h-5 text-yellow-400 fill-current`} />
      );
    }
    if (halfStar) {
      // Using a half-filled star icon would be ideal here. Lucide-react doesn't have one by default.
      // For simplicity, we can show a full star for .5 or greater, or an empty one.
      // Or, use a more complex SVG or two icons overlaid.
      // For now, let's represent .5 as a full star for simplicity in this component.
      starArray.push(
        <Star key="half" className={`w-5 h-5 text-yellow-400 fill-current`} /> // Simplified: show full for .5
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(
        <Star key={`empty-${i}`} className={`w-5 h-5 text-gray-300`} />
      );
    }

    return starArray.map((star, index) => (
      <motion.div
        key={index}
        initial={isAverageRating ? { scale: 0 } : { scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        viewport={{ once: true }}
      >
        {star}
      </motion.div>
    ));
  };

  // getServiceColor can be removed if 'service' and 'date' are removed from testimonial cards
  // For now, 'location' can be used in place of 'service' for the badge, or it can be removed.
  // Let's remove the badge for now to simplify, as 'service' and 'date' are not in the new Testimonial interface.

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

        {/* Average Rating Display */}
        {averageRating && averageRating.value > 0 && (
          <motion.div
            className="mb-16 text-center p-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {t('testimonials.averageRatingTitle', 'דירוג ממוצע')}
            </h3>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="text-4xl font-black text-orange-500">{averageRating.value.toFixed(1)}</span>
              <div className="flex">{renderStars(averageRating.value, true)}</div>
            </div>
            {averageRating.source && (
              <p className="text-sm text-gray-600">
                {t('testimonials.basedOn', 'מבוסס על')} {averageRating.reviewCount && `${averageRating.reviewCount} `} {t('testimonials.reviewsFrom', 'ביקורות מ')}{averageRating.source}
              </p>
            )}
          </motion.div>
        )}

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

              {/* Video Testimonial */}
              {testimonial.videoUrl && (
                <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                  <iframe
                    width="100%"
                    height="180" // Adjust height as needed
                    src={testimonial.videoUrl.replace("watch?v=", "embed/")} // Basic embed conversion
                    title={`Video testimonial from ${testimonial.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Rating */}
              {testimonial.rating && testimonial.rating > 0 && (
                <div className="flex items-center space-x-1 rtl:space-x-reverse mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}

              {/* Testimonial Text */}
              <motion.p 
                className="text-gray-700 leading-relaxed mb-6 text-lg relative z-10 group-hover:text-gray-800 transition-colors duration-300"
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
                  {testimonial.avatar ? (
                    <motion.img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-200 group-hover:border-yellow-300 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl font-bold border-2 border-yellow-200 group-hover:border-yellow-300 transition-colors duration-300">
                      {testimonial.name.substring(0,1)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-yellow-700 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
                {/* Date was removed, can be added back if needed in Testimonial interface */}
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

        {/* Old Stats Section - To be removed or re-evaluated based on averageRating display */}
        {/*
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