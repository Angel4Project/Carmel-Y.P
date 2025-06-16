import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  about: AboutContent;
  contact: ContactContent; // Updated to use ContactContent interface
  social: {
    whatsapp: string;
    facebook: string;
    instagram: string;
    email: string;
  };
  services: Service[]; // Updated to use Service interface
  products: Array<{
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    features: string[];
  }>;
  testimonials: Testimonial[]; // Updated to use Testimonial interface
  leads: Lead[]; // Added for lead management
  averageRating?: AverageRatingData; // New field for average rating
  posts: Post[]; // New field for blog posts
  faqs: FAQItem[]; // New field for FAQs
}

// Interface for an FAQ Item
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Interface for a Blog Post
export interface Post {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string; // ISO date string
  featuredImage?: string;
  summary: string;
  content: string; // Can be Markdown or HTML
  tags?: string[];
}

// Interface for a Testimonial item
export interface Testimonial {
  id: string;
  name: string;
  location: string; // Or role/company
  rating?: number; // Optional star rating
  text: string;
  avatar?: string; // User photo
  videoUrl?: string; // Optional video testimonial URL
}

// Interface for Average Rating Data
export interface AverageRatingData {
  value: number;
  source?: string;
  reviewCount?: number;
}

// Interface for a Service item
export interface Service {
  id: string;
  titleKey: string;
  descKey: string;
  detailedDescKey: string;
  icon: string;
  color: string;
  hoverColor: string;
  price?: string;
  image?: string; // New: URL for an image specific to the service
}

// Interface for About section content
export interface AboutContent {
  title: string;
  subtitle: string; // Kept subtitle as it was present
  establishmentAndExperience: string; // Renamed from description
  approach?: string;
  vision?: string;
  teamImage?: string;
  certificates?: Array<{ id: string; name: string; imageUrl?: string; link?: string }>;
  // Old fields like experience, customers, projects, warranty are kept for now,
  // but might be deprecated or integrated into the new fields later.
  experience: string;
  customers: string;
  projects: string;
  warranty: string;
}

// Interface for Contact section content
export interface ContactContent {
  phone: string;
  email: string;
  address: string;
  hours: string;
  mapEmbedUrl?: string; // New: For Google Maps iframe URL
}

// Interface for a new Lead
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: 'Contact Form' | 'ChatBot' | 'Manual';
  timestamp: string; // ISO date string
  residentialArea?: string; // New field for residential area
}

// For adding a lead, ID and timestamp are generated
// Explicitly include residentialArea for clarity in addLead parameter
export type NewLeadData = Omit<Lead, 'id' | 'timestamp' | 'residentialArea'> & { residentialArea?: string };


interface ContentContextType {
  content: ContentData;
  updateContent: (section: keyof Omit<ContentData, 'leads' | 'posts' | 'faqs'>, data: any) => void;
  addItem: (section: 'services' | 'products' | 'testimonials' | 'posts' | 'faqs', item: any) => void;
  updateItem: (section: 'services' | 'products' | 'testimonials' | 'posts' | 'faqs', id: string, item: any) => void;
  deleteItem: (section: 'services' | 'products' | 'testimonials' | 'leads' | 'posts' | 'faqs', id: string) => void;
  addLead: (leadData: NewLeadData) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// MOCK Google Apps Script URL - Replace MOCK_DEPLOYMENT_ID with actual ID later
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/MOCK_DEPLOYMENT_ID/exec';

// Placeholder admin contact details for mock notifications
const ADMIN_EMAIL = 'yaron@example.com'; // Replace with actual admin email for real implementation
const ADMIN_WHATSAPP_NUMBER = '+972500000000'; // Replace with actual admin WhatsApp for real implementation


const defaultContent: ContentData = {
  hero: {
    title: 'שירותי מיזוג אוויר מקצועיים',
    subtitle: 'התקנה, תיקון ותחזוקה של מזגנים בכפר סבא ובאזור המרכז והשרון',
    description: 'מעל 10 שנות ניסיון בתחום המיזוג. שירות מקצועי, אמין ומהיר עם אלפי לקוחות מרוצים.',
    backgroundImage: 'https://images.pexels.com/photos/159358/air-conditioner-air-conditioning-cool-159358.jpeg'
  },
  about: {
    title: 'אודות ירון פרסי',
    subtitle: 'מעל עשור של מקצועיות ואמינות',
    establishmentAndExperience: 'ירון פרסי מתמחה בשירותי מיזוג אוויר מעל 10 שנים, עם דגש על איכות, מקצועיות ושירות אישי. אנו מספקים פתרונות מותאמים אישית לכל לקוח, החל מבתים פרטיים ועד עסקים גדולים באזור המרכז והשרון.',
    experience: '10+', // Kept for backward compatibility or if still used separately
    customers: '5000+', // Kept
    projects: '8000+',  // Kept
    warranty: '12',     // Kept
    approach: 'הגישה השירותית שלנו מתמקדת בהבנת צרכי הלקוח לעומק, מתן פתרונות יעילים וחסכוניים, ועבודה נקייה ומסודרת. אנו מאמינים בשקיפות מלאה מול הלקוח לאורך כל התהליך.',
    vision: 'להיות חברת מיזוג האוויר המובילה באזור המרכז והשרון, המוכרת בזכות מקצועיות ללא פשרות, שירות לקוחות יוצא דופן, וחדשנות טכנולוגית מתמדת.',
    teamImage: 'https://via.placeholder.com/600x400.png?text=Team+Photo+Placeholder', // Placeholder image URL
    certificates: [
      { id: 'cert1', name: 'תעודת טכנאי מיזוג אוויר מוסמך', imageUrl: 'https://via.placeholder.com/300x200.png?text=Certificate+1', link: '#' },
      { id: 'cert2', name: 'רישיון עסק בתוקף', imageUrl: 'https://via.placeholder.com/300x200.png?text=License', link: '#' }
    ]
  },
  contact: {
    phone: '054-9740791',
    email: 'yaron7533@gmail.com',
    address: 'כפר סבא ואזור המרכז והשרון',
    hours: 'ראשון - חמישי: 08:00 - 20:00',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.0000000000005!2d34.900000000000006!3d32.183333000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDEwJzYwLjAiTiAzNMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sil!4v1678886400000!5m2!1sen!2sil' // Generic placeholder
  },
  social: {
    whatsapp: 'https://wa.me/972549740791',
    facebook: 'https://facebook.com/yaronparsi',
    instagram: 'https://instagram.com/yaronparsi',
    email: 'mailto:yaron7533@gmail.com'
  },
  services: [
    {
      id: '1',
      titleKey: 'services.installation.title',
      descKey: 'services.installation.desc',
      detailedDescKey: 'services.installation.detailedDesc',
      icon: 'Home',
      color: 'from-sky-500 to-blue-600',
      hoverColor: 'hover:from-sky-600 hover:to-blue-700',
      price: 'services.installation.price', // Assuming price might also be a key
      image: 'https://via.placeholder.com/400x250.png?text=Service+Installation' // Placeholder image
    },
    {
      id: '2',
      titleKey: 'services.repair.title',
      descKey: 'services.repair.desc',
      detailedDescKey: 'services.repair.detailedDesc',
      icon: 'Wrench',
      color: 'from-emerald-500 to-teal-600',
      hoverColor: 'hover:from-emerald-600 hover:to-teal-700',
      price: 'services.repair.price',
      image: 'https://via.placeholder.com/400x250.png?text=Service+Repair' // Placeholder image
    },
    {
      id: '3',
      titleKey: 'services.maintenance.title',
      descKey: 'services.maintenance.desc',
      detailedDescKey: 'services.maintenance.detailedDesc',
      icon: 'Settings',
      color: 'from-purple-500 to-indigo-600',
      hoverColor: 'hover:from-purple-600 hover:to-indigo-700',
      price: 'services.maintenance.price'
    },
    {
      id: '4',
      titleKey: 'services.consultation.title',
      descKey: 'services.consultation.desc',
      detailedDescKey: 'services.consultation.detailedDesc',
      icon: 'MessageSquare',
      color: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700',
      price: 'services.consultation.price'
    },
    {
      id: '5',
      titleKey: 'services.gas.title',
      descKey: 'services.gas.desc',
      detailedDescKey: 'services.gas.detailedDesc',
      icon: 'Zap',
      color: 'from-yellow-500 to-orange-600',
      hoverColor: 'hover:from-yellow-600 hover:to-orange-700',
      price: 'services.gas.price'
    },
    {
      id: '6',
      titleKey: 'services.emergency.title',
      descKey: 'services.emergency.desc',
      detailedDescKey: 'services.emergency.detailedDesc',
      icon: 'Phone',
      color: 'from-red-500 to-pink-600',
      hoverColor: 'hover:from-red-600 hover:to-pink-700',
      price: 'services.emergency.price'
    }
  ],
  products: [
    {
      id: '1',
      name: 'מזגן אינוורטר 1 כ״ח',
      category: 'inverter',
      price: '₪2,500',
      image: 'https://images.pexels.com/photos/159358/air-conditioner-air-conditioning-cool-159358.jpeg',
      features: ['חיסכון בחשמל', 'פעולה שקטה', 'שלט רחוק', 'מסנן אוויר']
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'דוד כהן',
      location: 'כפר סבא',
      rating: 5,
      text: 'שירות מצוין! ירון הגיע במהירות, אבחן את הבעיה ותיקן את המזגן תוך שעה. מקצועי, אמין ובמחיר הוגן.',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      videoUrl: undefined // No video for this one
    },
    {
      id: '2',
      name: 'שרה לוי',
      location: 'רעננה',
      rating: 4,
      text: 'התקינו לי מזגן חדש, עבודה נקייה ומחיר טוב. ממליצה בחום!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder video
    },
    {
      id: '3',
      name: 'משה כהן',
      location: 'הרצליה',
      text: 'שירות מהיר ואדיב.',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      // No rating or videoUrl for this one
    }
  ],
  leads: [], // Initialize leads as an empty array
  averageRating: { // Placeholder for average rating
    value: 4.8,
    source: 'Google Reviews',
    reviewCount: 152
  },
  posts: [
    {
      id: '1',
      slug: 'first-blog-post',
      title: 'המדריך המלא לבחירת מזגן לבית',
      author: 'ירון פרסי',
      date: '2024-05-15T10:00:00Z',
      featuredImage: 'https://via.placeholder.com/800x400.png?text=Choosing+AC',
      summary: 'כל מה שצריך לדעת לפני שבוחרים מזגן חדש - גודל, סוג, טכנולוגיה וטיפים לחיסכון בחשמל.',
      content: '<p>בחירת מזגן היא החלטה חשובה שיכולה להשפיע על הנוחות שלכם ועל חשבון החשמל לאורך שנים. במדריך זה נעבור על כל השיקולים המרכזיים...</p><h3>סוגי מזגנים</h3><p>קיימים מספר סוגי מזגנים עיקריים: מזגן עילי, מיני מרכזי, מרכזי, רצפתי ונייד. לכל אחד יתרונות וחסרונות...</p>',
      tags: ['מיזוג אוויר', 'מדריכים', 'חיסכון בחשמל']
    },
    {
      id: '2',
      slug: 'common-ac-problems',
      title: '5 תקלות נפוצות במזגנים ואיך לזהות אותן',
      author: 'צוות האתר',
      date: '2024-05-20T14:30:00Z',
      featuredImage: 'https://via.placeholder.com/800x400.png?text=AC+Problems',
      summary: 'למדו לזהות תקלות נפוצות במזגן שלכם, מתי אפשר לטפל לבד ומתי חובה לקרוא לטכנאי.',
      content: '<p>מזגנים הם מכשירים מורכבים ולעיתים הם סובלים מתקלות. זיהוי מוקדם יכול לחסוך לכם כסף ואי נעימות...</p><ol><li>המזגן לא מקרר/מחמם</li><li>נזילת מים מהמזגן</li></ol>',
      tags: ['תקלות נפוצות', 'תיקון מזגנים', 'תחזוקה']
    }
  ],
  faqs: [
    {
      id: 'faq1',
      question: 'כל כמה זמן מומלץ לבצע תחזוקה למזגן?',
      answer: 'מומלץ לבצע תחזוקה שוטפת למזגן לפחות פעם בשנה, כולל ניקוי פילטרים ובדיקת גז. תחזוקה נכונה מאריכה את חיי המזגן וחוסכת בחשמל.',
      category: 'תחזוקה'
    },
    {
      id: 'faq2',
      question: 'המזגן לא מקרר, מה יכולה להיות הסיבה?',
      answer: 'סיבות נפוצות כוללות פילטרים סתומים, חוסר גז, בעיה בקבל או במדחס. יש לבדוק ראשית את הפילטרים, ובמידה והבעיה נמשכת לקרוא לטכנאי.',
      category: 'תקלות'
    },
    {
      id: 'faq3',
      question: 'האם אתם מתקינים מזגנים בכל הארץ?',
      answer: 'אנו מתמקדים בעיקר באזור המרכז והשרון. ניתן ליצור קשר לבדיקת זמינות באזורים אחרים.',
      category: 'כללי'
    }
  ]
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentData>(() => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      // Ensure arrays exist, even if loading from older localStorage
      return {
        ...defaultContent,
        ...parsedContent,
        leads: parsedContent.leads || [],
        posts: parsedContent.posts || [],
        faqs: parsedContent.faqs || []
      };
    }
    return defaultContent;
  });

  useEffect(() => {
    // Persist to localStorage whenever content changes
    localStorage.setItem('websiteContent', JSON.stringify(content));
  }, [content]);

  const saveContent = (newContent: ContentData) => {
    setContent(newContent);
    // localStorage.setItem('websiteContent', JSON.stringify(newContent)); // Now handled by useEffect
  };

  const updateContent = (section: keyof Omit<ContentData, 'leads' | 'posts' | 'faqs'>, data: any) => {
    // If updating 'about', ensure certificates have IDs if they are new
    if (section === 'about' && data.certificates) {
      data.certificates = data.certificates.map((cert: any) => ({
        ...cert,
        id: cert.id || `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }));
    }
    const newContent = { ...content, [section]: data };
    saveContent(newContent);
  };

  const addItem = (section: 'services' | 'products' | 'testimonials' | 'posts' | 'faqs', item: any) => {
    const currentSection = content[section] as Array<any> || []; // Type assertion
    const newContent = {
      ...content,
      [section]: [...currentSection, { ...item, id: Date.now().toString() }]
    };
    saveContent(newContent);
  };

  const updateItem = (section: 'services' | 'products' | 'testimonials' | 'posts' | 'faqs', id: string, item: any) => {
    const currentSection = content[section] as Array<any> || []; // Type assertion
    const newContent = {
      ...content,
      [section]: currentSection.map((existing: any) =>
        existing.id === id ? { ...existing, ...item } : existing
      )
    };
    saveContent(newContent);
  };

  const deleteItem = (section: 'services' | 'products' | 'testimonials' | 'leads' | 'posts' | 'faqs', id: string) => {
    const currentSection = content[section] as Array<any> || []; // Type assertion
    const newContent = {
      ...content,
      [section]: currentSection.filter((item: any) => item.id !== id)
    };
    saveContent(newContent);
  };

  const addLead = async (leadData: NewLeadData) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    const newContent = {
      ...content,
      leads: [newLead, ...(content.leads || [])] // Add to the beginning of the array
    };
    saveContent(newContent);

    // Send data to Google Apps Script
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for simple Apps Script web apps if they don't handle CORS preflight
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });
      console.log('Lead data submitted to Google Apps Script (mock).', newLead);
    } catch (error) {
      console.error('Error submitting lead data to Google Apps Script:', error, newLead);
    }

    // Mock Email Notification
    // TODO: Replace with actual email sending API (e.g., SendGrid, Resend)
    const emailSubject = `New Lead: ${newLead.name} (${newLead.source})`;
    const emailBody = `
      A new lead has been received:
      Name: ${newLead.name}
      Phone: ${newLead.phone}
      Email: ${newLead.email || 'N/A'}
      Residential Area: ${newLead.residentialArea || 'N/A'}
      Message: ${newLead.message || 'N/A'}
      Source: ${newLead.source}
      Timestamp: ${newLead.timestamp}
    `;
    console.log(`[MOCK EMAIL NOTIFICATION]
      To: ${ADMIN_EMAIL}
      Subject: ${emailSubject}
      Body: ${emailBody.trim()}
    `);

    // Mock WhatsApp Notification
    // TODO: Replace with actual WhatsApp Business API integration or third-party service
    const whatsappMessage = `New Lead:
      Name: ${newLead.name},
      Phone: ${newLead.phone},
      Source: ${newLead.source}.
      Message: ${newLead.message || 'N/A'}.
      Area: ${newLead.residentialArea || 'N/A'}`;
    console.log(`[MOCK WHATSAPP NOTIFICATION]
      To: ${ADMIN_WHATSAPP_NUMBER} (via API)
      Message: ${whatsappMessage}
    `);
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateContent,
      addItem,
      updateItem,
      deleteItem,
      addLead
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};