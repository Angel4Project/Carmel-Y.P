import React from 'react';
import Hero from '../components/Hero';
import Services from './Services';
import About from './About';
import Products from './Products';
import Testimonials from './Testimonials';
import Contact from './Contact';
import WhyChooseUs from '../components/WhyChooseUs';
import Gallery from '../components/Gallery';
import CallToAction from '../components/CallToAction';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Gallery />
      <CallToAction />
      {/* Placeholder for content that was originally in MainWebsite.tsx
          Or this component can be structured to display sections as before,
          but now other routes also exist.
      */}
      {/* <Services />
      <About />
      <Products />
      <Testimonials />
      <Contact /> */}
    </>
  );
};

export default Home;
