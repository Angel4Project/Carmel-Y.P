import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Image, 
  MessageSquare,
  HelpCircle, // Added for FAQ
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
  const { content, updateContent, addItem, updateItem, deleteItem, addLead } = useContent(); // Added addLead
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSection, setEditingSection] = useState<string | null>(null); // For single section editing like 'hero', 'contact'
  const [editingItem, setEditingItem] = useState<any | null>(null); // For editing items in a list (e.g., a service)
  const [editingItemType, setEditingItemType] = useState<string | null>(null); // To specify 'service', 'product', etc.
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
    if (editingSection) { // For single sections like 'hero'
      updateContent(editingSection as any, formData);
      setEditingSection(null);
    } else if (editingItem && editingItemType) { // For items in a list
      if (editingItem.id) { // Existing item
        updateItem(editingItemType as any, editingItem.id, formData);
      } else { // New item
        addItem(editingItemType as any, { ...formData, id: Date.now().toString() });
      }
      setEditingItem(null);
      setEditingItemType(null);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditingItem(null);
    setEditingItemType(null);
    setFormData({});
  };

  const handleEditItem = (type: string, item: any) => {
    setEditingItemType(type);
    setEditingItem(item);
    setFormData(item);
    // Ensure form scrolls into view or is otherwise visible
  };

  const handleAddNewItem = (type: string, defaultStructure: any = {}) => {
    setEditingItemType(type);
    setEditingItem({}); // Empty object for a new item
    setFormData({ id: '', ...defaultStructure }); // Pre-fill with default structure if any
     // Ensure form scrolls into view or is otherwise visible
  };

  const handleDeleteItem = (type: string, itemId: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type} item?`)) {
      deleteItem(type as any, itemId);
    }
  };

  const tabs = [
    { id: 'overview', label: 'סקירה כללית', icon: BarChart3 },
    { id: 'leads', label: 'ניהול לידים', icon: Users },
    { id: 'content', label: 'ניהול תוכן', icon: FileText },
    { id: 'services', label: 'שירותים', icon: Settings },
    { id: 'products', label: 'מוצרים', icon: Image },
    { id: 'testimonials', label: 'המלצות', icon: MessageSquare },
    { id: 'blog', label: 'ניהול בלוג', icon: FileText }, // Assuming FileText for Blog too
    { id: 'faq', label: 'ניהול שאלות נפוצות', icon: HelpCircle },
    { id: 'settings', label: 'הגדרות', icon: Settings }
  ];

  // Helper to format ISO date string to a more readable format
  const formatTimestamp = (isoString: string) => {
    if (!isoString) return 'N/A';
    try {
      return new Date(isoString).toLocaleString('he-IL', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">קישור הטמעת מפה (Google Maps Embed URL)</label>
                        <input
                          type="url"
                          value={formData.mapEmbedUrl || ''}
                          onChange={(e) => setFormData({...formData, mapEmbedUrl: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          placeholder="https://www.google.com/maps/embed?pb=..."
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
                      <p><strong>קישור מפה:</strong> {content.contact.mapEmbedUrl ? <a href={content.contact.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">פתח מפה</a> : '-'}</p>
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

                {/* About Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">אודות (מי אנחנו)</h3>
                    <button
                      onClick={() => handleEdit('about', content.about)}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>ערוך</span>
                    </button>
                  </div>

                  {editingSection === 'about' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">כותרת ראשית</label>
                        <input type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">כותרת משנה</label>
                        <input type="text" value={formData.subtitle || ''} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">פסקה על הקמה וניסיון</label>
                        <textarea value={formData.establishmentAndExperience || ''} onChange={(e) => setFormData({...formData, establishmentAndExperience: e.target.value})} className="w-full p-2 border rounded-md" rows={4}/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">גישה שירותית</label>
                        <textarea value={formData.approach || ''} onChange={(e) => setFormData({...formData, approach: e.target.value})} className="w-full p-2 border rounded-md" rows={3}/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">חזון החברה</label>
                        <textarea value={formData.vision || ''} onChange={(e) => setFormData({...formData, vision: e.target.value})} className="w-full p-2 border rounded-md" rows={3}/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">קישור לתמונת צוות/בעלים (URL)</label>
                        <input type="url" value={formData.teamImage || ''} onChange={(e) => setFormData({...formData, teamImage: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>

                      {/* Legacy Stats - Good to group them or note they are older fields */}
                      <fieldset className="border p-4 rounded-md">
                        <legend className="text-sm font-medium text-gray-600 px-2">נתונים סטטיסטיים (Legacy)</legend>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ניסיון (מספר שנים)</label>
                            <input type="text" value={formData.experience || ''} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full p-2 border rounded-md"/>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">לקוחות מרוצים</label>
                            <input type="text" value={formData.customers || ''} onChange={(e) => setFormData({...formData, customers: e.target.value})} className="w-full p-2 border rounded-md"/>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">פרויקטים שהושלמו</label>
                            <input type="text" value={formData.projects || ''} onChange={(e) => setFormData({...formData, projects: e.target.value})} className="w-full p-2 border rounded-md"/>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">חודשי אחריות</label>
                            <input type="text" value={formData.warranty || ''} onChange={(e) => setFormData({...formData, warranty: e.target.value})} className="w-full p-2 border rounded-md"/>
                          </div>
                        </div>
                      </fieldset>

                      {/* Certificates Management */}
                      <div className="space-y-3">
                        <h4 className="text-md font-semibold text-gray-800 pt-2">ניהול תעודות ורישיונות</h4>
                        {(formData.certificates || []).map((cert: any, index: number) => (
                          <div key={cert.id || index} className="border p-3 rounded-md space-y-2 bg-gray-50">
                            <input
                              type="text"
                              placeholder="שם התעודה/רישיון"
                              value={cert.name || ''}
                              onChange={(e) => {
                                const newCerts = [...(formData.certificates || [])];
                                newCerts[index].name = e.target.value;
                                setFormData({...formData, certificates: newCerts});
                              }}
                              className="w-full p-2 border rounded-md text-sm"
                            />
                            <input
                              type="url"
                              placeholder="קישור לתמונה (URL)"
                              value={cert.imageUrl || ''}
                              onChange={(e) => {
                                const newCerts = [...(formData.certificates || [])];
                                newCerts[index].imageUrl = e.target.value;
                                setFormData({...formData, certificates: newCerts});
                              }}
                              className="w-full p-2 border rounded-md text-sm"
                            />
                            <input
                              type="url"
                              placeholder="קישור חיצוני (URL)"
                              value={cert.link || ''}
                              onChange={(e) => {
                                const newCerts = [...(formData.certificates || [])];
                                newCerts[index].link = e.target.value;
                                setFormData({...formData, certificates: newCerts});
                              }}
                              className="w-full p-2 border rounded-md text-sm"
                            />
                            <button
                              onClick={() => {
                                const newCerts = (formData.certificates || []).filter((_:any, i:number) => i !== index);
                                setFormData({...formData, certificates: newCerts});
                              }}
                              className="text-red-500 hover:text-red-700 text-xs flex items-center space-x-1 rtl:space-x-reverse"
                            >
                              <Trash2 className="w-3 h-3"/> <span>מחק תעודה</span>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newCert = { id: `newcert-${Date.now()}`, name: '', imageUrl: '', link: '' };
                            setFormData({...formData, certificates: [...(formData.certificates || []), newCert]});
                          }}
                          className="bg-sky-100 text-sky-700 px-3 py-2 rounded-md hover:bg-sky-200 text-sm flex items-center space-x-2 rtl:space-x-reverse"
                        >
                           <Plus className="w-4 h-4"/> <span>הוסף תעודה</span>
                        </button>
                      </div>

                      <div className="flex space-x-3 rtl:space-x-reverse pt-3">
                        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 rtl:space-x-reverse"><Save className="w-4 h-4"/><span>שמור</span></button>
                        <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2 rtl:space-x-reverse"><X className="w-4 h-4"/><span>בטל</span></button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <p><strong>כותרת:</strong> {content.about.title}</p>
                      <p><strong>כותרת משנה:</strong> {content.about.subtitle}</p>
                      <p><strong>הקמה וניסיון:</strong> {content.about.establishmentAndExperience}</p>
                      <p><strong>גישה שירותית:</strong> {content.about.approach || '-'}</p>
                      <p><strong>חזון החברה:</strong> {content.about.vision || '-'}</p>
                      <p><strong>תמונת צוות:</strong> {content.about.teamImage ? <a href={content.about.teamImage} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">קישור</a> : '-'}</p>
                      <div className="mt-2">
                        <strong>תעודות ורישיונות:</strong>
                        {content.about.certificates && content.about.certificates.length > 0 ? (
                          <ul className="list-disc list-inside pl-4">
                            {content.about.certificates.map(cert => (
                              <li key={cert.id}>{cert.name} {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">(קישור)</a>}</li>
                            ))}
                          </ul>
                        ) : <p>אין תעודות להצגה</p>}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">ניהול שירותים</h2>
                  <button
                    onClick={() => handleAddNewItem('services', { titleKey: '', descKey: '', detailedDescKey: '', icon: '', color: '', hoverColor: '', price: '', image: '' })}
                    className="flex items-center space-x-2 rtl:space-x-reverse bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
                  >
                    <Plus className="w-4 h-4" />
                    <span>הוסף שירות חדש</span>
                  </button>
                </div>

                {(editingItem && editingItemType === 'services') && (
                  <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">{formData.id ? 'ערוך שירות' : 'הוסף שירות חדש'}</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">מפתח כותרת (לצורך תרגום)</label>
                      <input type="text" placeholder="services.yourService.title" value={formData.titleKey || ''} onChange={(e) => setFormData({...formData, titleKey: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">מפתח תיאור קצר (לצורך תרגום)</label>
                      <textarea placeholder="services.yourService.desc" value={formData.descKey || ''} onChange={(e) => setFormData({...formData, descKey: e.target.value})} className="w-full p-2 border rounded-md" rows={2}/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">מפתח תיאור מפורט (לצורך תרגום)</label>
                      <textarea placeholder="services.yourService.detailedDesc" value={formData.detailedDescKey || ''} onChange={(e) => setFormData({...formData, detailedDescKey: e.target.value})} className="w-full p-2 border rounded-md" rows={4}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שם אייקון (Lucide React)</label>
                        <input type="text" placeholder="Home, Wrench, Zap" value={formData.icon || ''} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">קישור לתמונה (URL, אופציונלי)</label>
                        <input type="url" placeholder="https://example.com/image.png" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">מחיר (טקסט חופשי, אופציונלי)</label>
                        <input type="text" placeholder="services.yourService.price או ₪200" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">צבע רקע ( TailwindCSS gradient)</label>
                      <input type="text" placeholder="from-sky-500 to-blue-600" value={formData.color || ''} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">צבע רקע במעבר עכבר (TailwindCSS hover gradient)</label>
                      <input type="text" placeholder="hover:from-sky-600 hover:to-blue-700" value={formData.hoverColor || ''} onChange={(e) => setFormData({...formData, hoverColor: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 rtl:space-x-reverse"><Save className="w-4 h-4" /><span>שמור</span></button>
                      <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2 rtl:space-x-reverse"><X className="w-4 h-4" /><span>בטל</span></button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.services.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm space-y-3">
                      <h4 className="text-md font-semibold text-sky-700">{service.titleKey}</h4>
                      <p className="text-sm text-gray-600 truncate" title={service.descKey}><strong>תיאור קצר:</strong> {service.descKey}</p>
                      <p className="text-sm text-gray-600 truncate" title={service.detailedDescKey}><strong>תיאור מפורט:</strong> {service.detailedDescKey}</p>
                      <p className="text-sm text-gray-500"><strong>אייקון:</strong> {service.icon}</p>
                      <p className="text-sm text-gray-500"><strong>תמונה:</strong> {service.image ? <a href={service.image} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">קישור</a> : '-'}</p>
                      <p className="text-sm text-gray-500"><strong>צבע:</strong> {service.color}</p>
                      <p className="text-sm text-gray-500"><strong>צבע Hover:</strong> {service.hoverColor}</p>
                      <p className="text-sm text-gray-500"><strong>מחיר:</strong> {service.price || 'לא צוין'}</p>
                      <div className="flex space-x-3 rtl:space-x-reverse pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handleEditItem('services', service)}
                          className="text-blue-500 hover:text-blue-600 flex items-center space-x-1 rtl:space-x-reverse"
                        >
                          <Edit className="w-4 h-4" />
                          <span>ערוך</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem('services', service.id)}
                          className="text-red-500 hover:text-red-600 flex items-center space-x-1 rtl:space-x-reverse"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>מחק</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Average Rating Settings */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">הגדרות דירוג ממוצע (בדף המלצות)</h3>
                    <button
                      onClick={() => handleEdit('averageRating', content.averageRating || { value: 0, source: '', reviewCount: 0 })}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>ערוך</span>
                    </button>
                  </div>

                  {editingSection === 'averageRating' ? (
                    <div className="space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ערך דירוג (למשל 4.5)</label>
                          <input type="number" step="0.1" min="0" max="5" value={formData.value || 0} onChange={(e) => setFormData({...formData, value: parseFloat(e.target.value)})} className="w-full p-2 border rounded-md"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">מקור הדירוג (למשל Google Reviews)</label>
                          <input type="text" value={formData.source || ''} onChange={(e) => setFormData({...formData, source: e.target.value})} className="w-full p-2 border rounded-md"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">מספר ביקורות</label>
                          <input type="number" step="1" min="0" value={formData.reviewCount || 0} onChange={(e) => setFormData({...formData, reviewCount: parseInt(e.target.value)})} className="w-full p-2 border rounded-md"/>
                        </div>
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse pt-3">
                        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 rtl:space-x-reverse"><Save className="w-4 h-4"/><span>שמור</span></button>
                        <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2 rtl:space-x-reverse"><X className="w-4 h-4"/><span>בטל</span></button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <p><strong>ערך דירוג:</strong> {content.averageRating?.value || 'לא מוגדר'}</p>
                      <p><strong>מקור:</strong> {content.averageRating?.source || '-'}</p>
                      <p><strong>מספר ביקורות:</strong> {content.averageRating?.reviewCount || '-'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">ניהול לידים ({content.leads?.length || 0})</h2>
                  {/* Optional: Button to manually add a lead */}
                  {/*
                  <button
                    onClick={() => handleAddNewItem('leads', { name: '', phone: '', email: '', message: '', source: 'Manual', residentialArea: '' })}
                    className="flex items-center space-x-2 rtl:space-x-reverse bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
                  >
                    <Plus className="w-4 h-4" />
                    <span>הוסף ליד ידנית</span>
                  </button>
                  */}
                </div>

                {/* TODO: Implement form for manual lead addition if uncommenting button above, similar to services form */}

                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3">שם</th>
                        <th scope="col" className="px-6 py-3">טלפון</th>
                        <th scope="col" className="px-6 py-3">אימייל</th>
                        <th scope="col" className="px-6 py-3">מקור</th>
                        <th scope="col" className="px-6 py-3">הודעה</th>
                        <th scope="col" className="px-6 py-3">תאריך</th>
                        <th scope="col" className="px-6 py-3">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(content.leads && content.leads.length > 0) ? content.leads.map((lead) => (
                        <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{lead.name}</td>
                          <td className="px-6 py-4">{lead.phone}</td>
                          <td className="px-6 py-4">{lead.email || '-'}</td>
                          <td className="px-6 py-4">{lead.source}</td>
                          <td className="px-6 py-4 max-w-xs truncate" title={lead.message}>{lead.message || '-'}</td>
                          <td className="px-6 py-4">{formatTimestamp(lead.timestamp)}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteItem('leads', lead.id)}
                              className="text-red-500 hover:text-red-700 flex items-center space-x-1 rtl:space-x-reverse"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>מחק</span>
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-gray-500">לא נמצאו לידים.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">ניהול המלצות</h2>
                  <button
                    onClick={() => handleAddNewItem('testimonials', { name: '', location: '', text: '', avatar: '', rating: 0, videoUrl: '' })}
                    className="flex items-center space-x-2 rtl:space-x-reverse bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
                  >
                    <Plus className="w-4 h-4" />
                    <span>הוסף המלצה חדשה</span>
                  </button>
                </div>

                {(editingItem && editingItemType === 'testimonials') && (
                  <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">{formData.id ? 'ערוך המלצה' : 'הוסף המלצה חדשה'}</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">שם הממליץ</label>
                      <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">מיקום (למשל, עיר)</label>
                      <input type="text" value={formData.location || ''} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">טקסט ההמלצה</label>
                      <textarea value={formData.text || ''} onChange={(e) => setFormData({...formData, text: e.target.value})} className="w-full p-2 border rounded-md" rows={4}/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">קישור לתמונת פרופיל (URL)</label>
                      <input type="url" value={formData.avatar || ''} onChange={(e) => setFormData({...formData, avatar: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">קישור לסרטון (YouTube Embed URL, אופציונלי)</label>
                      <input type="url" placeholder="https://www.youtube.com/embed/VIDEO_ID" value={formData.videoUrl || ''} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">דירוג (0-5, אופציונלי)</label>
                      <input type="number" step="1" min="0" max="5" value={formData.rating || 0} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 rtl:space-x-reverse"><Save className="w-4 h-4" /><span>שמור</span></button>
                      <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2 rtl:space-x-reverse"><X className="w-4 h-4" /><span>בטל</span></button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(content.testimonials || []).map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm space-y-3">
                      <h4 className="text-md font-semibold text-sky-700">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500"><strong>מיקום:</strong> {testimonial.location}</p>
                      <p className="text-sm text-gray-600 truncate" title={testimonial.text}><strong>המלצה:</strong> {testimonial.text}</p>
                      <p className="text-sm text-gray-500"><strong>דירוג:</strong> {testimonial.rating || 'אין'}</p>
                      <p className="text-sm text-gray-500"><strong>סרטון:</strong> {testimonial.videoUrl ? <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">קישור</a> : '-'}</p>
                      <p className="text-sm text-gray-500"><strong>אווטאר:</strong> {testimonial.avatar ? <a href={testimonial.avatar} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">קישור</a> : '-'}</p>
                      <div className="flex space-x-3 rtl:space-x-reverse pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handleEditItem('testimonials', testimonial)}
                          className="text-blue-500 hover:text-blue-600 flex items-center space-x-1 rtl:space-x-reverse"
                        >
                          <Edit className="w-4 h-4" />
                          <span>ערוך</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem('testimonials', testimonial.id)}
                          className="text-red-500 hover:text-red-600 flex items-center space-x-1 rtl:space-x-reverse"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>מחק</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">ניהול שאלות נפוצות (FAQ)</h2>
                  <button
                    onClick={() => handleAddNewItem('faqs', { question: '', answer: '', category: '' })}
                    className="flex items-center space-x-2 rtl:space-x-reverse bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
                  >
                    <Plus className="w-4 h-4" />
                    <span>הוסף שאלה נפוצה</span>
                  </button>
                </div>

                {(editingItem && editingItemType === 'faqs') && (
                  <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">{formData.id ? 'ערוך שאלה' : 'הוסף שאלה חדשה'}</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">שאלה</label>
                      <textarea value={formData.question || ''} onChange={(e) => setFormData({...formData, question: e.target.value})} className="w-full p-2 border rounded-md" rows={2}/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">תשובה</label>
                      <textarea value={formData.answer || ''} onChange={(e) => setFormData({...formData, answer: e.target.value})} className="w-full p-2 border rounded-md" rows={4}/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה (אופציונלי)</label>
                      <input type="text" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 rtl:space-x-reverse"><Save className="w-4 h-4" /><span>שמור</span></button>
                      <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2 rtl:space-x-reverse"><X className="w-4 h-4" /><span>בטל</span></button>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3">שאלה</th>
                        <th scope="col" className="px-6 py-3">תשובה (תצוגה מקדימה)</th>
                        <th scope="col" className="px-6 py-3">קטגוריה</th>
                        <th scope="col" className="px-6 py-3">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(content.faqs || []).map((faqItem) => (
                        <tr key={faqItem.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900 max-w-md">{faqItem.question}</td>
                          <td className="px-6 py-4 max-w-md truncate" title={faqItem.answer}>{faqItem.answer}</td>
                          <td className="px-6 py-4">{faqItem.category || '-'}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <button
                                onClick={() => handleEditItem('faqs', faqItem)}
                                className="text-blue-500 hover:text-blue-600"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('faqs', faqItem.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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