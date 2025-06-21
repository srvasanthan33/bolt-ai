import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Calendar, MessageSquare, Star, Users, Clock, Award } from 'lucide-react';
import { AuthModal } from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';

export function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const testimonials = [
    {
      name: "Priya Sharma",
      exam: "NEET 2024",
      score: "650/720",
      text: "Unnal Mudiyum helped me identify my weak areas and create a personalized study plan. The AI tutor was like having a mentor available 24/7.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Rahul Kumar",
      exam: "JEE Main 2024",
      score: "97.8 percentile",
      text: "The adaptive feedback system was game-changing. It knew exactly when I was struggling and provided targeted practice questions.",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Ananya Patel",
      exam: "GATE 2024",
      score: "AIR 156",
      text: "The scheduling feature kept me disciplined, and the AI chat helped me solve doubts instantly. Highly recommend!",
      avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Students", value: "25,000+" },
    { icon: Award, label: "Success Rate", value: "94%" },
    { icon: Clock, label: "Study Hours", value: "1M+" },
    { icon: Star, label: "Average Rating", value: "4.9/5" }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized tutoring that adapts to your learning style and pace"
    },
    {
      icon: Target,
      title: "Exam-Specific Content",
      description: "Tailored content for NEET, JEE, GATE, and other competitive exams"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent study plans that optimize your preparation timeline"
    },
    {
      icon: MessageSquare,
      title: "24/7 AI Support",
      description: "Get instant answers to your doubts with contextual explanations"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Personal{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Tutor
                  </span>{' '}
                  for Success
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Master NEET, JEE, GATE and other competitive exams with AI-powered personalized learning, 
                  smart scheduling, and 24/7 doubt resolution.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link
                    to="/exam-selection"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/exam-selection"
                      className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      Choose Your Exam
                    </Link>
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                    >
                      Sign In / Sign Up
                    </button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-24 w-24 text-blue-600" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">AI Learning Active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-600 rounded-full w-3/4"></div>
                    </div>
                    <div className="text-xs text-gray-500">Physics: 75% Complete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Unnal Mudiyum 💪?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced AI technology meets proven learning methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:bg-blue-50 p-6 rounded-lg transition-all duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of students who achieved their dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="text-sm text-gray-600">{testimonial.exam}</div>
                    <div className="text-sm font-medium text-green-600">{testimonial.score}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful students and start your personalized learning journey today.
          </p>
          {!user && (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </button>
          )}
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}