import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { ExamSelection } from './pages/ExamSelection';
import { Schedule } from './pages/Schedule';
import { Chat } from './pages/Chat';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/exam-selection" element={user ? <ExamSelection /> : <LandingPage />} />
        <Route path="/schedule" element={user ? <Schedule /> : <LandingPage />} />
        <Route path="/chat" element={user ? <Chat /> : <LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;