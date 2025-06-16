import React, { useState, useEffect } from 'react'; // Added useEffect for potential future use
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { useContent, NewLeadData } from '../contexts/ContentContext'; // Import useContent and NewLeadData

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const { addLead } = useContent(); // Get addLead function
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'שלום! אני הבוט החכם של ירון פרסי מיזוג אוויר. איך אוכל לעזור לך היום?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // TODO: Store API Key securely, e.g., in environment variables
  // and access it via process.env.REACT_APP_AI_API_KEY
  const MOCK_API_KEY = 'YOUR_API_KEY';
  const API_ENDPOINT = 'https://api.example.com/chat_completion';

  const quickReplies = [
    'מחירון שירותים',
    'זמני הגעה',
    'שירות חירום',
    'אחריות',
    'אזורי שירות'
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsBotTyping(true);

    // Prepare messages for the API
    const apiMessages = messages
      .filter(msg => msg.isBot || msg.id === userMessage.id) // Include bot messages and the current user message
      .map(msg => ({
        role: msg.isBot ? 'assistant' : 'user',
        content: msg.text
      }));

    // Add the latest user message if it wasn't captured due to state update timing
    if (!apiMessages.find(msg => msg.content === userMessage.text && msg.role === 'user')) {
        apiMessages.push({ role: 'user', content: userMessage.text });
    }


    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${MOCK_API_KEY}` // Common practice for actual APIs
        },
        body: JSON.stringify({
          apiKey: MOCK_API_KEY, // As per mock API requirement
          messages: apiMessages
        })
      });

      if (!response.ok) {
        // This will likely be the case for a non-existent endpoint
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`API request failed with status ${response.status}`);
      }

      // const data = await response.json(); // If expecting JSON response
      // const botText = data.choices[0].message.content; // Example for OpenAI like structure

      // For this mock, we'll use a predefined success response as the API won't actually work
      const botText = "This is a mock AI response from the (simulated) successful API call."; // This will be the bot's actual response text

      const botResponseMessage = { // Renamed to avoid conflict
        id: messages.length + userMessage.id + 1, // Ensure unique ID
        text: botText,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponseMessage]);

      // Lead Capture Logic
      const leadKeywords = ["quote", "contact me", "call me", "הצעת מחיר", "צור קשר", "חזור אליי", "דבר איתי"];
      const userLower = userMessage.text.toLowerCase();
      const botLower = botText.toLowerCase();

      let leadDetected = false;
      for (const keyword of leadKeywords) {
        if (userLower.includes(keyword) || botLower.includes(keyword)) {
          leadDetected = true;
          break;
        }
      }

      if (leadDetected) {
        // Basic information extraction (very simplified)
        let name = "ChatBot Lead";
        let phone = "N/A";
        let email = "N/A";

        const phoneRegex = /\b\d{2,4}-?\d{7}\b|\b\d{10}\b/g;
        const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

        // Search in current user message
        let phoneMatch = userMessage.text.match(phoneRegex);
        if (phoneMatch) phone = phoneMatch[0];
        let emailMatch = userMessage.text.match(emailRegex);
        if (emailMatch) email = emailMatch[0];

        // If not found, search in last few messages (e.g., last 3 user messages)
        if (phone === "N/A" || email === "N/A") {
            const recentUserMessages = messages.filter(m => !m.isBot).slice(-3).map(m => m.text).join(' ');
            if (phone === "N/A") {
                phoneMatch = recentUserMessages.match(phoneRegex);
                if (phoneMatch) phone = phoneMatch[0];
            }
            if (email === "N/A") {
                emailMatch = recentUserMessages.match(emailRegex);
                if (emailMatch) email = emailMatch[0];
            }
        }

        const leadMessage = `User interaction: "${userMessage.text}". Bot response: "${botText}".`;

        const leadData: NewLeadData = {
          name,
          phone,
          email,
          message: leadMessage.substring(0, 500), // Limit message length
          source: 'ChatBot',
          residentialArea: "Unknown"
        };
        addLead(leadData);

        // Optionally inform the user
        const confirmationMessage = {
          id: Date.now() + 10, // Ensure unique ID
          text: "תודה! קיבלנו את פנייתך ונציג מטעמנו ייצור איתך קשר בהקדם.",
          isBot: true,
          timestamp: new Date()
        };
        setTimeout(() => setMessages(prev => [...prev, confirmationMessage]), 500); // Add slight delay
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      const errorResponse = {
        id: messages.length + userMessage.id +1, // Ensure unique ID
        text: "מצטער, אני מתקשה להתחבר כרגע. אנא נסה שוב מאוחר יותר.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    // Set input message and then call handleSendMessage
    // handleSendMessage will pick up the inputMessage value
    setInputMessage(reply);
    // We need to ensure inputMessage state is updated before handleSendMessage is called
    // A slight delay or useEffect could handle this, but for quick replies,
    // it might be better to pass the reply directly to handleSendMessage or adapt handleSendMessage.
    // For simplicity here, we'll rely on the state update being processed.
    // A more robust solution might involve:
    // 1. setInputMessage(reply);
    // 2. useEffect(() => { if (inputMessage === reply) handleSendMessage(); }, [inputMessage, reply]);
    // Or, modify handleSendMessage to accept an optional message string.

    // Current approach: set state and call. If issues arise, refine.
    // Create a temporary message object for the quick reply
    const quickReplyMessage = {
      id: messages.length + 1,
      text: reply,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, quickReplyMessage]);

    // Then simulate the bot's response process for this quick reply
    setIsBotTyping(true);
    // Mimic the API call structure for quick replies too
    const apiMessages = messages
      .filter(msg => msg.isBot)
      .map(msg => ({
        role: 'assistant' as 'assistant' | 'user',
        content: msg.text
      }));
    apiMessages.push({ role: 'user', content: reply });

    // Simulate API call for quick reply
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: MOCK_API_KEY, messages: apiMessages })
    })
    .then(response => {
      if (!response.ok) throw new Error('Quick reply mock API failed');
      // return response.json(); // if expecting a JSON response
      return "This is a mock AI response to your quick reply."; // Simulate success
    })
    .then(botText => {
      const botResponse = {
        id: messages.length + quickReplyMessage.id + 1,
        text: botText,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    })
    .catch(error => {
      console.error('Quick reply error:', error);
      const errorResponse = {
        id: messages.length + quickReplyMessage.id + 1,
        text: "מצטער, אני מתקשה להתחבר כרגע. אנא נסה שוב מאוחר יותר.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    })
    .finally(() => setIsBotTyping(false));
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
            {isBotTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2 rtl:space-x-reverse max-w-xs">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sky-100 text-sky-600">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-800">
                    <div className="text-sm italic">מקליד...</div>
                  </div>
                </div>
              </motion.div>
            )}
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