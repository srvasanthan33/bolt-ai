import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, BookOpen, Target } from 'lucide-react';
import { useStudy } from '../contexts/StudyContext';

const timeSlots = [
  '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00',
  '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
  '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00',
  '21:00-22:00', '22:00-23:00'
];

const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function Schedule() {
  const { sessions, stats, addSession, updateSession, deleteSession } = useStudy();
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [newSession, setNewSession] = useState({
    subject: '',
    topic: '',
    duration: 60,
    scheduledDate: '',
    timeSlot: ''
  });

  const currentWeek = getWeekDates();

  function getWeekDates() {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date.toISOString().split('T')[0];
    });
  }

  const getSessionsForDay = (date: string) => {
    return sessions.filter(session => session.scheduledDate === date);
  };

  const handleAddSession = () => {
    if (newSession.subject && newSession.topic && newSession.timeSlot) {
      addSession({
        ...newSession,
        scheduledDate: currentWeek[selectedDay],
        completed: false
      });
      setNewSession({
        subject: '',
        topic: '',
        duration: 60,
        scheduledDate: '',
        timeSlot: ''
      });
      setShowAddModal(false);
    }
  };

  const handleEditSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setNewSession({
        subject: session.subject,
        topic: session.topic,
        duration: session.duration,
        scheduledDate: session.scheduledDate,
        timeSlot: session.timeSlot
      });
      setEditingSession(sessionId);
      setShowAddModal(true);
    }
  };

  const handleUpdateSession = () => {
    if (editingSession && newSession.subject && newSession.topic && newSession.timeSlot) {
      updateSession(editingSession, {
        ...newSession,
        scheduledDate: currentWeek[selectedDay]
      });
      setNewSession({
        subject: '',
        topic: '',
        duration: 60,
        scheduledDate: '',
        timeSlot: ''
      });
      setEditingSession(null);
      setShowAddModal(false);
    }
  };

  const toggleSessionComplete = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      updateSession(sessionId, { completed: !session.completed });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Schedule</h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalHours}h</div>
                <div className="text-sm text-gray-600">Total Study Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.topicsCompleted}</div>
                <div className="text-sm text-gray-600">Topics Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(Object.values(stats.accuracy).reduce((a, b) => a + b, 0) / Object.values(stats.accuracy).length)}%
                </div>
                <div className="text-sm text-gray-600">Avg Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Week Navigator */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex overflow-x-auto">
            {weekDays.map((day, index) => {
              const date = new Date(currentWeek[index]);
              const isToday = currentWeek[index] === new Date().toISOString().split('T')[0];
              const isSelected = selectedDay === index;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`flex-1 min-w-0 p-4 text-center border-b-2 transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm font-medium">
                    {day}
                    {isToday && <span className="ml-1 text-xs bg-blue-600 text-white px-1 rounded">Today</span>}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {date.getDate()}/{date.getMonth() + 1}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Time Slots */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {weekDays[selectedDay]} Schedule
                  </h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-2">
                  {timeSlots.map((slot) => {
                    const sessionInSlot = getSessionsForDay(currentWeek[selectedDay]).find(
                      session => session.timeSlot === slot
                    );

                    return (
                      <div key={slot} className="flex items-center border border-gray-200 rounded-lg">
                        <div className="w-24 p-3 text-sm text-gray-600 border-r border-gray-200">
                          {slot}
                        </div>
                        <div className="flex-1 p-3">
                          {sessionInSlot ? (
                            <div className={`flex items-center justify-between p-3 rounded ${
                              sessionInSlot.completed ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
                            }`}>
                              <div className="flex items-center">
                                <div
                                  className={`w-3 h-3 rounded-full mr-3 ${
                                    sessionInSlot.completed ? 'bg-green-500' : 'bg-blue-500'
                                  }`}
                                ></div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {sessionInSlot.subject} - {sessionInSlot.topic}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {sessionInSlot.duration} minutes
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => toggleSessionComplete(sessionInSlot.id)}
                                  className={`p-1 rounded hover:bg-opacity-20 ${
                                    sessionInSlot.completed ? 'hover:bg-green-500' : 'hover:bg-blue-500'
                                  }`}
                                >
                                  <Target className={`h-4 w-4 ${
                                    sessionInSlot.completed ? 'text-green-600' : 'text-blue-600'
                                  }`} />
                                </button>
                                <button
                                  onClick={() => handleEditSession(sessionInSlot.id)}
                                  className="p-1 rounded hover:bg-gray-200"
                                >
                                  <Edit className="h-4 w-4 text-gray-600" />
                                </button>
                                <button
                                  onClick={() => deleteSession(sessionInSlot.id)}
                                  className="p-1 rounded hover:bg-red-100"
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm">Free time</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subject Progress */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Progress</h3>
              <div className="space-y-4">
                {Object.entries(stats.accuracy).map(([subject, accuracy]) => (
                  <div key={subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{subject}</span>
                      <span className="text-gray-600">{accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Sync to Google Calendar</span>
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BookOpen className="h-5 w-5 text-green-600 mr-3" />
                  <span>View Study Materials</span>
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Target className="h-5 w-5 text-purple-600 mr-3" />
                  <span>Set Weekly Goals</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Session Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {editingSession ? 'Edit Study Session' : 'Add Study Session'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    value={newSession.subject}
                    onChange={(e) => setNewSession(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                  <input
                    type="text"
                    value={newSession.topic}
                    onChange={(e) => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter topic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="15"
                    max="180"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                  <select
                    value={newSession.timeSlot}
                    onChange={(e) => setNewSession(prev => ({ ...prev, timeSlot: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingSession(null);
                    setNewSession({
                      subject: '',
                      topic: '',
                      duration: 60,
                      scheduledDate: '',
                      timeSlot: ''
                    });
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingSession ? handleUpdateSession : handleAddSession}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingSession ? 'Update' : 'Add'} Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}