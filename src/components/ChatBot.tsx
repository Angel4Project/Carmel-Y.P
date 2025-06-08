import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'שלום! אני הבוט החכם של ירון פרסי מיזוג אוויר. איך אוכל לעזור לך היום?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    'מחירון שירותים',
    'זמני הגעה',
    'שירות חירום',
    'אחריות',
    'אזורי שירות'
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('מחיר') || lowerMessage.includes('עלות')) {
      return 'המחירים שלנו תחרותיים ומותאמים לכל תקציב. לקבלת הצעת מחיר מדויקת, אנא צור קשר בטלפון 054-9740791 או השאר פרטים וניצור קשר.';
    }
    
    if (lowerMessage.includes('זמן') || lowerMessage.includes('הגעה')) {
      return 'בדרך כלל אנו מגיעים תוך 2-4 שעות. בשירותי חירום - תוך שעה. הזמן תלוי במיקום ובעומס. שירות זמין ראשון-חמישי 08:00-20:00.';
    }
    
    if (lowerMessage.includes('חירום') || lowerMessage.includes('דחוף')) {
      return 'שירות חירום זמין ראשון-חמישי! התקשר עכשיו: 054-9740791 לשירות מיידי.';
    }
    
    if (lowerMessage.includes('אחריות')) {
      return 'אנו נותנים אחריות מלאה: 12 חודשים על התקנות חדשות, 6 חודשים על תיקונים, 3 חודשים על תחזוקה.';
    }
    
    if (lowerMessage.includes('אזור') || lowerMessage.includes('מיקום')) {
      return 'אנו משרתים את כל אזור המרכז והשרון: כפר סבא, רעננה, הרצליה, רמת השרון, גבעתיים, פתח תקווה ועוד.';
    }
    
    return 'תודה על הפנייה! לקבלת מענה מיידי, אנא התקשר: 054-9740791 או השאר הודעה בטופס הצור קשר באתר.';
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-24 left-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">בוט מיזוג אוויר</div>
                  <div className="text-sm opacity-90">מקוון עכשיו</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 rtl:space-x-reverse max-w-xs ${message.isBot ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isBot ? 'bg-sky-100 text-sky-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-sky-500 text-white'
                    }`}
                  >
                    <div className="text-sm">{message.text}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="כתוב הודעה..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;