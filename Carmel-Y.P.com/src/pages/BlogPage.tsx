import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext'; // For t function if needed for static text
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';

const BlogPageInternal: React.FC = () => {
  const { content } = useContent();
  const { t } = useLanguage(); // For any static text like "Read More"

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-sky-700">
            {t('blog.title', 'הבלוג שלנו')}
          </h1>

          {content.posts && content.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  {post.featuredImage && (
                    <Link to={`/blog/${post.slug}`}>
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      />
                    </Link>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800 hover:text-sky-600 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {t('blog.authorBy', 'מאת')}: {post.author} | {t('blog.date', 'תאריך')}: {new Date(post.date).toLocaleDateString('he-IL')}
                    </p>
                    <p className="text-gray-700 mb-4 flex-grow">{post.summary}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-sky-600 hover:text-sky-700 font-semibold self-start"
                    >
                      {t('blog.readMore', 'קרא עוד')} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">{t('blog.noPosts', 'אין כרגע פוסטים בבלוג. נעדכן בקרוב!')}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Wrapper component to include providers
const BlogPage: React.FC = () => (
  <LanguageProvider>
    <ContentProvider>
      <AdminProvider>
        <BlogPageInternal />
      </AdminProvider>
    </ContentProvider>
  </LanguageProvider>
);


export default BlogPage;
