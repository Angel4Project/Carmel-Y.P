import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

interface BlogCardProps {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, date, author, summary, slug }) => {
  const { language, t } = useLanguage(); // Get language and t function

  return (
    <motion.article
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 hover:border-sky-200"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-sky-700 transition-colors duration-300">
          <Link to={`/blog/${slug || id}`}>{title}</Link>
        </h3>
        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Calendar className="w-4 h-4" />
            {/* Use dynamic locale for date formatting */}
            <span>{new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'he-IL')}</span>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">{summary}</p>
        <Link
          to={`/blog/${slug || id}`}
          className="inline-flex items-center space-x-2 rtl:space-x-reverse text-sky-600 font-semibold hover:text-sky-700 transition-colors group"
        >
          {/* TODO: i18n - 'Read More' */}
          <span>{t('blog.readMore', 'Read More')}</span>
          <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;
