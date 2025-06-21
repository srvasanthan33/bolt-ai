import React, { createContext, useContext, useState } from 'react';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  completed: boolean;
  scheduledDate: string;
  timeSlot: string;
}

interface StudyStats {
  totalHours: number;
  accuracy: { [subject: string]: number };
  topicsCompleted: number;
  streak: number;
}

interface StudyContextType {
  sessions: StudySession[];
  stats: StudyStats;
  addSession: (session: Omit<StudySession, 'id'>) => void;
  updateSession: (id: string, updates: Partial<StudySession>) => void;
  deleteSession: (id: string) => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Physics',
      topic: 'Mechanics',
      duration: 120,
      completed: true,
      scheduledDate: '2025-01-20',
      timeSlot: '09:00-11:00'
    },
    {
      id: '2',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      duration: 90,
      completed: false,
      scheduledDate: '2025-01-20',
      timeSlot: '14:00-15:30'
    }
  ]);

  const [stats] = useState<StudyStats>({
    totalHours: 48.5,
    accuracy: {
      Physics: 85,
      Chemistry: 78,
      Mathematics: 92
    },
    topicsCompleted: 23,
    streak: 7
  });

  const addSession = (session: Omit<StudySession, 'id'>) => {
    const newSession = {
      ...session,
      id: Date.now().toString()
    };
    setSessions(prev => [...prev, newSession]);
  };

  const updateSession = (id: string, updates: Partial<StudySession>) => {
    setSessions(prev => prev.map(session => 
      session.id === id ? { ...session, ...updates } : session
    ));
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  return (
    <StudyContext.Provider value={{ sessions, stats, addSession, updateSession, deleteSession }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}