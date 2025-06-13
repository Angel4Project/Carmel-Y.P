import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import { ContentProvider } from './contexts/ContentContext';
import Home from './pages/Home'; // Changed MainWebsite to Home
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FloatingMenu from './components/FloatingMenu';
import Header from './components/Header'; // Assuming Header might be needed for layout
import Footer from './components/Footer'; // Assuming Footer might be needed for layout

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AdminProvider>
          <ContentProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header /> {/* Added Header here for consistent layout */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} /> {/* Root path now points to Home */}
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:postId" element={<BlogPostPage />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
              </main>
              <FloatingMenu />
              <Footer /> {/* Added Footer here for consistent layout */}
            </div>
          </ContentProvider>
        </AdminProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;