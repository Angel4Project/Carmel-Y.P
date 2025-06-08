import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Bot,
  X,
  Plus
} from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import ChatBot from './ChatBot';

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const { content } = useContent();

  const menuItems = [
    {
      icon: Phone,
      label: 'התקשר',
      action: () => window.open(`tel:${content.contact.phone}`, '_self'),
      color: 'bg-green-500 hover:bg-green-600',
      delay: 0.1
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      action: () => window.open(content.social.whatsapp, '_blank'),
      color: 'bg-green-600 hover:bg-green-700',
      delay: 0.2
    },
    {
      icon: Mail,
      label: 'אימייל',
      action: () => window.open(content.social.email, '_self'),
      color: 'bg-blue-500 hover:bg-blue-600',
      delay: 0.3
    },
    {
      icon: Instagram,
      label: 'אינסטגרם',
      action: () => window.open(content.social.instagram, '_blank'),
      color: 'bg-pink-500 hover:bg-pink-600',
      delay: 0.4
    },
    {
      icon: Facebook,
      label: 'פייסבוק',
      action: () => window.open(content.social.facebook, '_blank'),
      color: 'bg-blue-600 hover:bg-blue-700',
      delay: 0.5
    },
    {
      icon: Bot,
      label: 'צ\'אט בוט',
      action: () => setShowChatBot(true),
      color: 'bg-purple-500 hover:bg-purple-600',
      delay: 0.6
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 left-0 space-y-3"
            >
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: item.delay }}
                    onClick={item.action}
                    className={`group flex items-center space-x-3 rtl:space-x-reverse ${item.color} text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-0 group-hover:max-w-xs overflow-hidden">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-45' 
              : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <Plus className="w-7 h-7 text-white" />
          )}
        </motion.button>
      </div>

      {/* ChatBot Component */}
      <ChatBot isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
    </>
  );
};

export default FloatingMenu;