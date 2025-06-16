import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';

const ContactPage: React.FC = () => {
  return (
    <LanguageProvider>
      <ContentProvider>
        <AdminProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Contact />
            </main>
            <Footer />
          </div>
        </AdminProvider>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default ContactPage;
