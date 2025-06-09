import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Image, 
  MessageSquare,
  LogOut,
  Eye,
  Edit,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useContent } from '../contexts/ContentContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout, updateCredentials, adminData } = useAdmin();
  const { content, updateContent, addItem, updateItem, deleteItem } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = (section: string, data: any) => {
    setEditingSection(section);
    setFormData(data);
  };

  const handleSave = () => {
    if (editingSection) {
      updateContent(editingSection as any, formData);
      setEditingSection(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  const tabs = [
    { id: 'overview', label: 'סקירה כללית', icon: BarChart3 },
    { id: 'content', label: 'ניהול תוכן', icon: FileText },
    { id: 'services', label: 'שירותים', icon: Settings },
    { id: 'products', label: 'מוצרים', icon: Image },
    { id: 'testimonials', label: 'המלצות', icon: MessageSquare },
    { id: 'settings', label: 'הגדרות', icon: Settings }
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">י</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">פאנל ניהול</h1>
                <p className="text-sm text-gray-600">ירון פרסי - מיזוג אוויר</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-gray-900"
              >
                <Eye className="w-5 h-5" />
                <span>צפה באתר</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>התנתק</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl shadow-sm p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-sky-50 text-sky-600 border border-sky-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">סקירה כללית</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">סה"כ שירותים</p>
                        <p className="text-2xl font-bold text-gray-900">{content.services.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-sky-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">סה"כ מוצרים</p>
                        <p className="text-2xl font-bold text-gray-900">{content.products.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Image className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">סה"כ המלצות</p>
                        <p className="text-2xl font-bold text-gray-900">{content.testimonials.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">ניהול תוכן</h2>
                
                {/* Hero Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">סקציית גיבור</h3>
                    <button
                      onClick={() => handleEdit('hero', content.hero)}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>ערוך</span>
                    </button>
                  </div>
                  
                  {editingSection === 'hero' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">כותרת</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">כותרת משנה</label>
                        <input
                          type="text"
                          value={formData.subtitle || ''}
                          onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">תיאור</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 rtl:space-x-reverse bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                          <Save className="w-4 h-4" />
                          <span>שמור</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          <X className="w-4 h-4" />
                          <span>בטל</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p><strong>כותרת:</strong> {content.hero.title}</p>
                      <p><strong>כותרת משנה:</strong> {content.hero.subtitle}</p>
                      <p><strong>תיאור:</strong> {content.hero.description}</p>
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">פרטי יצירת קשר</h3>
                    <button
                      onClick={() => handleEdit('contact', content.contact)}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>ערוך</span>
                    </button>
                  </div>
                  
                  {editingSection === 'contact' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">טלפון</label>
                          <input
                            type="text"
                            value={formData.phone || ''}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">אימייל</label>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">כתובת</label>
                        <input
                          type="text"
                          value={formData.address || ''}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">שעות פעילות</label>
                        <input
                          type="text"
                          value={formData.hours || ''}
                          onChange={(e) => setFormData({...formData, hours: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 rtl:space-x-reverse bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                          <Save className="w-4 h-4" />
                          <span>שמור</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          <X className="w-4 h-4" />
                          <span>בטל</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>טלפון:</strong> {content.contact.phone}</p>
                      <p><strong>אימייל:</strong> {content.contact.email}</p>
                      <p><strong>כתובת:</strong> {content.contact.address}</p>
                      <p><strong>שעות פעילות:</strong> {content.contact.hours}</p>
                    </div>
                  )}
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">רשתות חברתיות</h3>
                    <button
                      onClick={() => handleEdit('social', content.social)}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>ערוך</span>
                    </button>
                  </div>
                  
                  {editingSection === 'social' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                          <input
                            type="url"
                            value={formData.whatsapp || ''}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                          <input
                            type="url"
                            value={formData.facebook || ''}
                            onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                          <input
                            type="url"
                            value={formData.instagram || ''}
                            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 rtl:space-x-reverse bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                          <Save className="w-4 h-4" />
                          <span>שמור</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          <X className="w-4 h-4" />
                          <span>בטל</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>WhatsApp:</strong> {content.social.whatsapp}</p>
                      <p><strong>Facebook:</strong> {content.social.facebook}</p>
                      <p><strong>Instagram:</strong> {content.social.instagram}</p>
                      <p><strong>Email:</strong> {content.social.email}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">הגדרות מערכת</h2>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">שינוי פרטי התחברות</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">שם משתמש נוכחי</label>
                      <input
                        type="text"
                        value={adminData.username}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">סיסמה נוכחית</label>
                      <input
                        type="password"
                        value={adminData.password}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newUsername = prompt('שם משתמש חדש:', adminData.username);
                        const newPassword = prompt('סיסמה חדשה:', adminData.password);
                        if (newUsername && newPassword) {
                          updateCredentials(newUsername, newPassword);
                          alert('פרטי ההתחברות עודכנו בהצלחה');
                        }
                      }}
                      className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      שנה פרטי התחברות
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;