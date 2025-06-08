import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    experience: string;
    customers: string;
    projects: string;
    warranty: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  social: {
    whatsapp: string;
    facebook: string;
    instagram: string;
    email: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    price: string;
  }>;
  products: Array<{
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    features: string[];
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    avatar: string;
  }>;
}

interface ContentContextType {
  content: ContentData;
  updateContent: (section: keyof ContentData, data: any) => void;
  addItem: (section: 'services' | 'products' | 'testimonials', item: any) => void;
  updateItem: (section: 'services' | 'products' | 'testimonials', id: string, item: any) => void;
  deleteItem: (section: 'services' | 'products' | 'testimonials', id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

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
    description: 'ירון פרסי מתמחה בשירותי מיזוג אוויר מעל 10 שנים, עם דגש על איכות, מקצועיות ושירות אישי. אנו מספקים פתרונות מותאמים אישית לכל לקוח, החל מבתים פרטיים ועד עסקים גדולים באזור המרכז והשרון.',
    experience: '10+',
    customers: '5000+',
    projects: '8000+',
    warranty: '12'
  },
  contact: {
    phone: '054-9740791',
    email: 'yaron7533@gmail.com',
    address: 'כפר סבא ואזור המרכז והשרון',
    hours: 'ראשון - חמישי: 08:00 - 20:00'
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
      title: 'התקנת מזגנים',
      description: 'התקנה מקצועית של מזגנים לבתים ועסקים עם אחריות מלאה',
      icon: 'Home',
      price: 'החל מ-₪2,500'
    },
    {
      id: '2',
      title: 'תיקון מזגנים',
      description: 'אבחון מהיר ותיקון יעיל של תקלות במזגנים מכל הסוגים',
      icon: 'Wrench',
      price: 'החל מ-₪200'
    },
    {
      id: '3',
      title: 'תחזוקה תקופתית',
      description: 'שירותי תחזוקה מקצועיים להארכת חיי המזגן ושמירה על יעילותו',
      icon: 'Settings',
      price: 'החל מ-₪150'
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
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg'
    }
  ]
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const saveContent = (newContent: ContentData) => {
    setContent(newContent);
    localStorage.setItem('websiteContent', JSON.stringify(newContent));
  };

  const updateContent = (section: keyof ContentData, data: any) => {
    const newContent = { ...content, [section]: data };
    saveContent(newContent);
  };

  const addItem = (section: 'services' | 'products' | 'testimonials', item: any) => {
    const newContent = {
      ...content,
      [section]: [...content[section], { ...item, id: Date.now().toString() }]
    };
    saveContent(newContent);
  };

  const updateItem = (section: 'services' | 'products' | 'testimonials', id: string, item: any) => {
    const newContent = {
      ...content,
      [section]: content[section].map((existing: any) => 
        existing.id === id ? { ...existing, ...item } : existing
      )
    };
    saveContent(newContent);
  };

  const deleteItem = (section: 'services' | 'products' | 'testimonials', id: string) => {
    const newContent = {
      ...content,
      [section]: content[section].filter((item: any) => item.id !== id)
    };
    saveContent(newContent);
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateContent,
      addItem,
      updateItem,
      deleteItem
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