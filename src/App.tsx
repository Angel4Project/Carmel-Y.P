import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import { ContentProvider } from './contexts/ContentContext';
import MainWebsite from './pages/MainWebsite';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FloatingMenu from './components/FloatingMenu';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AdminProvider>
          <ContentProvider>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<MainWebsite />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
              <FloatingMenu />
            </div>
          </ContentProvider>
        </AdminProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;