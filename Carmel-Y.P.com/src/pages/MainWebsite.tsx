import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Products from '../components/Products';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const MainWebsite: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Products />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default MainWebsite;