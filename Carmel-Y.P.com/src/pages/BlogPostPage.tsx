import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogData from '../data/blogData.json'; // Assuming the path to your JSON file
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
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

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { t, language } = useLanguage(); // Added language
  const posts: BlogPost[] = blogData;
  // Find post by slug or id. Prioritize slug if available.
  const post = posts.find(p => p.slug === postId || p.id === postId);

  if (!post) {
    return (
      <div className="py-24 text-center">
        {/* TODO: i18n */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('blog.postNotFound.title', 'Oops! Post Not Found.')}</h1>
        {/* TODO: i18n */}
        <p className="text-gray-600 mb-8">{t('blog.postNotFound.message', 'The link may be broken or the post may have been removed.')}</p>
        <Link to="/blog" className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition">
          {/* TODO: i18n */}
          {t('blog.backToBlogButton', 'Back to Blog')}
        </Link>
      </div>
    );
  }

  // For simplicity, this example assumes post.content is HTML.
  // In a real app, you'd sanitize this or use a safer rendering method.
  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });


  return (
    <article className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700 font-semibold mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            <span>{t('blog.backButton')}</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
             <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                {t(post.title)}
             </span>
          </h1>

          <div className="flex flex-wrap items-center space-x-6 rtl:space-x-reverse text-sm text-gray-500 mb-8">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2 md:mb-0">
              <Calendar className="w-5 h-5 text-sky-500" />
              {/* TODO: i18n for date and "Published on" */}
              <span>{t('blog.publishedOn', 'Published on')} {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'he-IL')}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2 md:mb-0">
              <User className="w-5 h-5 text-sky-500" />
              <span>{t('blog.by')} {post.author}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Tag className="w-5 h-5 text-sky-500" />
              {/* Placeholder for categories/tags if you add them later */}
              <span>{t('blog.categoryPlaceholder')}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {renderHTML(t(post.content))}
          </div>

          {/* You could add social sharing buttons or related posts here */}
        </motion.div>
      </div>
    </article>
  );
};

export default BlogPostPage;
