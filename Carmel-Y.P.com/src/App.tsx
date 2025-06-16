import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import { ContentProvider } from './contexts/ContentContext';
import MainWebsite from './pages/MainWebsite';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FAQPage from './pages/FAQPage';
import CustomerAreaPage from './pages/CustomerAreaPage'; // Import CustomerAreaPage
import NewServiceRequestPage from './pages/NewServiceRequestPage'; // Import NewServiceRequestPage
import FloatingMenu from './components/FloatingMenu';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AdminProvider>
          <ContentProvider>
            <div className="min-h-screen bg-gray-50">
            <div className="min-h-screen bg-gray-50">
              {/* FloatingMenu is placed here so it can be potentially visible on all pages */}
              {/* However, if pages like AdminDashboard should not have it, conditional rendering or different layout structure would be needed */}
              <FloatingMenu />
              <Routes>
                <Route path="/" element={<MainWebsite />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/customer-area" element={<CustomerAreaPage />} />
                <Route path="/new-service-request" element={<NewServiceRequestPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </div>
          </ContentProvider>
        </AdminProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;