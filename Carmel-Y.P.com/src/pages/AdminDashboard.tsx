import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  // Users, // Removed unused import
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
  Trash2,
  BookText // Icon for Blog
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useContent, ContentProviderData } from '../contexts/ContentContext'; // Adjusted import
import { useNavigate } from 'react-router-dom';
import initialBlogData from '../data/blogData.json'; // Import blog data

// Define BlogPost interface (can be moved to a types file later)
interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  slug: string;
}

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout, updateCredentials, adminData } = useAdmin();
  // addItem, updateItem, deleteItem from useContent are not used in this specific file's current logic.
  // They might be for other parts of content management not shown or for future features.
  // For now, we'll keep them if they are part of the ContentContext's intended API for other sections.
  const { content, updateContent, addItem, updateItem, deleteItem } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogData);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isBlogPostFormOpen, setIsBlogPostFormOpen] = useState(false);

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
      updateContent(editingSection as keyof ContentProviderData, formData); // Ensure type safety
      setEditingSection(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  // Blog Post CRUD Operations
  const handleCreateNewPost = () => {
    setEditingPost(null); // No post is being edited, so it's a new one
    setFormData({ // Reset form data for a new post
      id: String(Date.now()), // Simple unique ID
      title: '',
      date: new Date().toISOString().split('T')[0], // Today's date
      author: adminData.username || 'Admin', // Default author
      summary: '',
      content: '',
      slug: ''
    });
    setIsBlogPostFormOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setIsBlogPostFormOpen(true);
  };

  const handleSavePost = () => {
    if (editingPost) { // Editing existing post
      setBlogPosts(blogPosts.map(p => p.id === editingPost.id ? {...formData, id: editingPost.id } as BlogPost : p));
    } else { // Creating new post
      setBlogPosts([...blogPosts, formData as BlogPost]);
    }
    setIsBlogPostFormOpen(false);
    setEditingPost(null);
    setFormData({}); // Reset form
  };

  const handleDeletePost = (postId: string) => {
    // TODO: i18n - 'Are you sure you want to delete this post?'
    if (window.confirm('Are you sure you want to delete this post?')) {
      setBlogPosts(blogPosts.filter(p => p.id !== postId));
    }
  };

  const handleDownloadBlogData = () => {
    const jsonString = JSON.stringify(blogPosts, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "blogData.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const tabs = [
    // TODO: i18n for all labels
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'blog', label: 'Blog Management', icon: BookText },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'products', label: 'Products', icon: Image },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
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
                {/* Other content sections like Contact Info, Social Media can remain here if needed */}
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  {/* TODO: i18n - 'Blog Posts Management' */}
                  <h2 className="text-2xl font-bold text-gray-900">Blog Posts Management</h2>
                  <div className="space-x-3 rtl:space-x-reverse">
                    <button
                      onClick={handleCreateNewPost}
                      className="flex items-center space-x-2 rtl:space-x-reverse bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      {/* TODO: i18n - 'Create New Post' */}
                      <span>Create New Post</span>
                    </button>
                    <button
                      onClick={handleDownloadBlogData}
                      className="flex items-center space-x-2 rtl:space-x-reverse bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      {/* TODO: i18n - 'Save / Download Data' */}
                      <span>Save / Download Data</span>
                    </button>
                  </div>
                </div>

                {isBlogPostFormOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-6 rounded-xl shadow-sm border mb-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      {/* TODO: i18n - 'Edit Post' : 'Create New Post' */}
                      {editingPost ? 'Edit Post' : 'Create New Post'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        {/* TODO: i18n - 'Title' */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" name="title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                      <div>
                        {/* TODO: i18n - 'Author' */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input type="text" name="author" value={formData.author || ''} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                      <div>
                        {/* TODO: i18n - 'Date' */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" name="date" value={formData.date || ''} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2 border rounded-md"/>
                      </div>
                       <div>
                        {/* TODO: i18n - 'Slug (for URL)' */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (for URL)</label>
                        <input type="text" name="slug" value={formData.slug || ''} onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} placeholder="my-new-post-slug" className="w-full p-2 border rounded-md"/>
                      </div>
                    </div>
                    <div className="mb-4">
                      {/* TODO: i18n - 'Summary' */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                      <textarea name="summary" value={formData.summary || ''} onChange={(e) => setFormData({...formData, summary: e.target.value})} rows={3} className="w-full p-2 border rounded-md"></textarea>
                    </div>
                    <div className="mb-4">
                      {/* TODO: i18n - 'Full Content (HTML)' */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Content (HTML)</label>
                      <textarea name="content" value={formData.content || ''} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={10} className="w-full p-2 border rounded-md"></textarea>
                    </div>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <button onClick={handleSavePost} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        {/* TODO: i18n - 'Save Post' */}
                        <Save className="w-4 h-4 inline-block ml-1 rtl:mr-1" /> Save Post
                      </button>
                      <button onClick={() => { setIsBlogPostFormOpen(false); setEditingPost(null); }} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                        {/* TODO: i18n - 'Cancel' */}
                        <X className="w-4 h-4 inline-block ml-1 rtl:mr-1" /> Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {/* TODO: i18n for table headers - Title, Author, Date, Actions */}
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.date).toLocaleDateString('he-IL')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3 rtl:space-x-reverse">
                            <button onClick={() => handleEditPost(post)} className="text-sky-600 hover:text-sky-800">
                              <Edit className="w-5 h-5 inline-block" />
                            </button>
                            <button onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-800">
                              <Trash2 className="w-5 h-5 inline-block" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* TODO: i18n - 'No posts found.' */}
                  {blogPosts.length === 0 && <p className="text-center py-4 text-gray-500">No posts found.</p>}
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6 mt-8"> {/* Added margin top if content follows blog */}
                 {/* Contact Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">פרטי יצירת קשר</h3>
                    {/* This is part of the original content management, keep as is or refactor if needed */}
                    <button onClick={() => handleEdit('contact', content.contact)} className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700">
                      <Edit className="w-4 h-4" />
                      <span>ערוך</span>
                    </button>
                  </div>
                  {editingSection === 'contact' ? (
                     <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">טלפון</label>
                          <input type="text" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">אימייל</label>
                          <input type="email" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">כתובת</label>
                        <input type="text" value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">שעות פעילות</label>
                        <input type="text" value={formData.hours || ''} onChange={(e) => setFormData({...formData, hours: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <button onClick={handleSave} className="flex items-center space-x-2 rtl:space-x-reverse bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"> <Save className="w-4 h-4" /> שמור </button>
                        <button onClick={handleCancel} className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"> <X className="w-4 h-4" /> בטל </button>
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
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">רשתות חברתיות</h3>
                    {/* This is part of the original content management, keep as is or refactor if needed */}
                    <button onClick={() => handleEdit('social', content.social)} className="flex items-center space-x-2 rtl:space-x-reverse text-sky-600 hover:text-sky-700">
                      <Edit className="w-4 h-4" />
                      <span>ערוך</span>
                    </button>
                  </div>
                  {editingSection === 'social' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                          <input type="url" value={formData.whatsapp || ''} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                          <input type="url" value={formData.facebook || ''} onChange={(e) => setFormData({...formData, facebook: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                        </div>
                         <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                          <input type="url" value={formData.instagram || ''} onChange={(e) => setFormData({...formData, instagram: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input type="email" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"/>
                        </div>
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <button onClick={handleSave} className="flex items-center space-x-2 rtl:space-x-reverse bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"> <Save className="w-4 h-4" /> שמור </button>
                        <button onClick={handleCancel} className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"> <X className="w-4 h-4" /> בטל </button>
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

             {/* Settings Tab - No changes needed here for blog functionality */}
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