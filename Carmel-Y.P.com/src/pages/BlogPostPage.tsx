import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';
import { ArrowRight } from 'lucide-react'; // For "Back to Blog" link

const BlogPostPageInternal: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useContent();
  const { t } = useLanguage();

  const post = content.posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              {t('blogPost.notFoundTitle', 'פוסט לא נמצא')}
            </h1>
            <p className="text-gray-700 mb-8">
              {t('blogPost.notFoundMessage', 'מצטערים, לא הצלחנו למצוא את הפוסט שחיפשת.')}
            </p>
            <RouterLink
              to="/blog"
              className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold"
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              {t('blogPost.backToBlog', 'חזרה לבלוג')}
            </RouterLink>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl"> {/* Max width for readability */}
          <article>
            <header className="mb-8 border-b pb-6">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="text-gray-500 text-sm">
                <span>{t('blogPost.authorBy', 'מאת')}: {post.author}</span>
                <span className="mx-2">|</span>
                <span>{t('blogPost.publishedOn', 'פורסם בתאריך')}: {new Date(post.date).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </header>

            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
              />
            )}

            {/* Assuming content is HTML. If Markdown, replace with a Markdown renderer */}
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && post.tags.length > 0 && (
              <footer className="mt-10 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('blogPost.tags', 'תגיות')}:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </footer>
            )}
          </article>

          <div className="mt-12 text-center">
            <RouterLink
              to="/blog"
              className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold"
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              {t('blogPost.backToBlog', 'חזרה לבלוג')}
            </RouterLink>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Wrapper component to include providers
const BlogPostPage: React.FC = () => (
  <LanguageProvider>
    <ContentProvider>
      <AdminProvider>
        <BlogPostPageInternal />
      </AdminProvider>
    </ContentProvider>
  </LanguageProvider>
);

export default BlogPostPage;
