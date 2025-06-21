import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, TrendingUp, Clock, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStudy } from '../contexts/StudyContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  resources?: Array<{
    title: string;
    type: 'pdf' | 'video' | 'link';
    url: string;
  }>;
}

const aiResponses = {
  greeting: "Hello! I'm your AI Study Coach from Unnal Mudiyum 💪. I'm here to help you with your studies, answer your doubts, and provide personalized feedback. How can I assist you today?",
  physics: "Great question about Physics! Let me help you understand this concept better. Physics is all about understanding the fundamental laws that govern our universe. What specific topic would you like to explore?",
  chemistry: "Chemistry can be fascinating once you understand the patterns! Let me break this down for you. Which area of chemistry are you working on - organic, inorganic, or physical chemistry?",
  mathematics: "Mathematics is the language of science! I can help you solve problems step by step. What mathematical concept are you working on today?",
  biology: "Biology is the study of life itself! It's amazing how complex yet organized living systems are. Which biological process or system would you like to understand better?",
  study_tips: "Here are some proven study techniques that can boost your performance: 1) Use active recall instead of passive reading, 2) Practice spaced repetition, 3) Try the Feynman technique - explain concepts in simple terms, 4) Take regular breaks using the Pomodoro technique. Which of these would you like to learn more about?",
  performance: "Based on your recent activity, I can see you're making good progress! Your consistency in Physics is excellent, but let's focus a bit more on Chemistry. Would you like me to suggest some targeted practice questions?",
  motivation: "Remember, every expert was once a beginner! You're on a great path, and consistent effort will definitely pay off. Your recent study streak shows your dedication. Keep going! 🌟"
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: aiResponses.greeting,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { stats } = useStudy();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let response = '';
    let resources: Array<{ title: string; type: 'pdf' | 'video' | 'link'; url: string }> = [];

    if (message.includes('physics')) {
      response = aiResponses.physics;
      resources = [
        { title: 'Physics Fundamentals Guide', type: 'pdf', url: '#' },
        { title: 'Physics Problem Solving Video', type: 'video', url: '#' }
      ];
    } else if (message.includes('chemistry')) {
      response = aiResponses.chemistry;
      resources = [
        { title: 'Chemistry Reactions Cheat Sheet', type: 'pdf', url: '#' },
        { title: 'Organic Chemistry Made Simple', type: 'link', url: '#' }
      ];
    } else if (message.includes('math') || message.includes('mathematics')) {
      response = aiResponses.mathematics;
      resources = [
        { title: 'Math Formula Collection', type: 'pdf', url: '#' },
        { title: 'Step-by-step Problem Solutions', type: 'link', url: '#' }
      ];
    } else if (message.includes('biology')) {
      response = aiResponses.biology;
      resources = [
        { title: 'Biology Diagrams & Charts', type: 'pdf', url: '#' },
        { title: 'Cell Biology Animation', type: 'video', url: '#' }
      ];
    } else if (message.includes('study') || message.includes('tips') || message.includes('method')) {
      response = aiResponses.study_tips;
    } else if (message.includes('performance') || message.includes('progress') || message.includes('score')) {
      response = `${aiResponses.performance} Your current accuracy: Physics ${stats.accuracy.Physics}%, Chemistry ${stats.accuracy.Chemistry}%, Mathematics ${stats.accuracy.Mathematics}%.`;
    } else if (message.includes('motivat') || message.includes('encourage') || message.includes('help')) {
      response = aiResponses.motivation;
    } else {
      response = "I understand you're asking about that topic. Let me help you break it down step by step. Could you be more specific about what you'd like to learn or what's confusing you?";
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      resources: resources.length > 0 ? resources : undefined
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "Explain Newton's laws of motion",
    "Help me with organic chemistry reactions",
    "What are good study techniques?",
    "How to solve quadratic equations?",
    "Show my performance analysis"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Unnal Mudiyum AI Coach 💪</h2>
                    <p className="text-sm text-green-600">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`p-4 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {message.resources && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs opacity-75 font-medium">Helpful Resources:</p>
                            {message.resources.map((resource, index) => (
                              <a
                                key={index}
                                href={resource.url}
                                className="flex items-center space-x-2 text-xs bg-white bg-opacity-20 p-2 rounded hover:bg-opacity-30 transition-colors"
                              >
                                <BookOpen className="h-3 w-3" />
                                <span>{resource.title}</span>
                                <span className="text-xs opacity-50">({resource.type})</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center mt-1 space-x-2 text-xs text-gray-500 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <Bot className="h-3 w-3" />
                        )}
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="bg-gray-100 text-gray-900 p-4 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                {/* Quick Prompts */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Quick prompts:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(prompt)}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <div className="text-2xl font-bold text-green-600">{stats.streak}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Study Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Study Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Hours Today</span>
                  <span className="font-medium">3.5h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-medium">{stats.totalHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Topics Completed</span>
                  <span className="font-medium">{stats.topicsCompleted}</span>
                </div>
              </div>
            </div>

            {/* Subject Accuracy */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-600" />
                Subject Accuracy
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.accuracy).map(([subject, accuracy]) => (
                  <div key={subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject}</span>
                      <span className={`font-medium ${
                        accuracy >= 80 ? 'text-green-600' : 
                        accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {accuracy}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          accuracy >= 80 ? 'bg-green-500' : 
                          accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 AI Tip</h3>
              <p className="text-sm text-gray-700">
                Based on your performance, I recommend focusing more on Chemistry concepts. 
                Try practicing 30 minutes daily with active recall techniques!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}