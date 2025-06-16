import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About'; // Assuming About.tsx is in components
import { LanguageProvider } from '../contexts/LanguageContext';
import { ContentProvider } from '../contexts/ContentContext';
import { AdminProvider } from '../contexts/AdminContext';


const AboutPage: React.FC = () => {
  return (
    <LanguageProvider>
      <ContentProvider>
        <AdminProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </div>
        </AdminProvider>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default AboutPage;
