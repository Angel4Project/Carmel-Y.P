import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import blogData from '../data/blogData.json'; // Assuming the path to your JSON file
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  slug: string;
}

const BlogPage: React.FC = () => {
  const { t } = useLanguage();
  const posts: BlogPost[] = blogData;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-sky-50">
      <div className="container mx-auto px-4">
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
            <BookOpen className="inline-block w-5 h-5 mr-2 rtl:ml-2" />
            {t('blog.title')}
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              {t('blog.mainHeading')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('blog.subHeading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={t(post.title)} // Assuming titles might be translation keys
              date={post.date}
              author={post.author}
              summary={t(post.summary)} // Assuming summaries might be translation keys
              slug={post.slug}
            />
          ))}
        </div>
        {posts.length === 0 && (
          <motion.div
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: 0.5}}
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">{t('blog.noPosts')}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
