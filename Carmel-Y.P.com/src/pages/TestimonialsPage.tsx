import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';

const TestimonialsPage: React.FC = () => {
  return (
    <LanguageProvider>
      <ContentProvider>
        <AdminProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Testimonials />
            </main>
            <Footer />
          </div>
        </AdminProvider>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default TestimonialsPage;
