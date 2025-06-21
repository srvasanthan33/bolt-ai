import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Book, Clock, Target, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const exams = [
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    description: 'Medical entrance examination for MBBS, BDS, and other medical courses',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    duration: '3 hours',
    questions: 180,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'jee',
    name: 'JEE',
    fullName: 'Joint Entrance Examination',
    description: 'Engineering entrance examination for IITs, NITs, and other engineering colleges',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    duration: '3 hours',
    questions: 90,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    description: 'Postgraduate engineering entrance examination',
    subjects: ['Engineering Mathematics', 'General Aptitude', 'Technical Subject'],
    duration: '3 hours',
    questions: 65,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission',
    description: 'Civil services examination for IAS, IPS, and other administrative services',
    subjects: ['General Studies', 'Optional Subject', 'Essay'],
    duration: 'Multiple phases',
    questions: 'Varies',
    color: 'from-orange-500 to-orange-600'
  }
];

const skillQuestions = [
  {
    id: 1,
    question: "What is the derivative of x² + 3x + 2?",
    options: ["2x + 3", "x² + 3", "2x + 2", "3x + 2"],
    correct: 0,
    subject: "Mathematics"
  },
  {
    id: 2,
    question: "Which of the following is a noble gas?",
    options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"],
    correct: 2,
    subject: "Chemistry"
  },
  {
    id: 3,
    question: "What is the unit of force in SI system?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correct: 1,
    subject: "Physics"
  },
  {
    id: 4,
    question: "Which organ is responsible for photosynthesis in plants?",
    options: ["Root", "Stem", "Leaves", "Flower"],
    correct: 2,
    subject: "Biology"
  },
  {
    id: 5,
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
    correct: 2,
    subject: "General Knowledge"
  }
];

export function ExamSelection() {
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const handleExamSelect = (examId: string) => {
    setSelectedExam(examId);
  };

  const startSkillCheck = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < skillQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeSkillCheck(newAnswers);
    }
  };

  const completeSkillCheck = (finalAnswers: number[]) => {
    const correctAnswers = finalAnswers.reduce((count, answer, index) => {
      return answer === skillQuestions[index].correct ? count + 1 : count;
    }, 0);
    
    const skillLevel = Math.round((correctAnswers / skillQuestions.length) * 100);
    
    updateUser({
      selectedExam,
      skillLevel,
      onboardingComplete: true
    });
    
    setQuizComplete(true);
  };

  const skipSkillCheck = () => {
    updateUser({
      selectedExam,
      skillLevel: 50, // Default skill level
      onboardingComplete: true
    });
    navigate('/schedule');
  };

  const continueToSchedule = () => {
    navigate('/schedule');
  };

  if (quizComplete) {
    const skillLevel = Math.round((answers.reduce((count, answer, index) => {
      return answer === skillQuestions[index].correct ? count + 1 : count;
    }, 0) / skillQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <Award className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Skill Assessment Complete!</h2>
              <p className="text-gray-600">Here are your results:</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{skillLevel}%</div>
              <div className="text-gray-600 mb-4">Current Skill Level</div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skillLevel}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600">
                {skillLevel >= 80 ? "Excellent! You're well-prepared." :
                 skillLevel >= 60 ? "Good foundation! Let's strengthen weak areas." :
                 skillLevel >= 40 ? "Decent start! Focus on building concepts." :
                 "Don't worry! We'll help you build strong fundamentals."}
              </p>
            </div>

            <button
              onClick={continueToSchedule}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue to Study Schedule
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    const question = skillQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / skillQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Skill Assessment</h2>
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1} of {skillQuestions.length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-4">
                  {question.subject}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <span className="font-medium text-gray-700">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Exam</h1>
          <p className="text-xl text-gray-600">
            Select the examination you're preparing for to get personalized study plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                selectedExam === exam.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleExamSelect(exam.id)}
            >
              <div className={`bg-gradient-to-r ${exam.color} h-2`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{exam.name}</h3>
                  {selectedExam === exam.id && (
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-700 mb-2">{exam.fullName}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{exam.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Book className="h-4 w-4 mr-2" />
                    <span>Subjects: {exam.subjects.join(', ')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Duration: {exam.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2" />
                    <span>Questions: {exam.questions}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedExam && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Great Choice! Let's Assess Your Current Level
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Take a quick 5-question skill check to help us create a personalized study plan. 
              This will only take 2-3 minutes and will significantly improve your learning experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startSkillCheck}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Take Skill Assessment
              </button>
              <button
                onClick={skipSkillCheck}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Skip for Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}