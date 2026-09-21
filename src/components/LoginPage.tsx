import React, { useState } from 'react';
import { ExamType, StudentProfile } from '../types';
import { EXAMS_LIST } from '../data/mockData';
import { 
  BrainCircuit, 
  Flame, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  ArrowRight,
  UserCheck,
  Building2,
  Clock
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (profile: Partial<StudentProfile>) => void;
  defaultExam?: ExamType;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  defaultExam = 'GATE'
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamType>(defaultExam);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedExamInfo = EXAMS_LIST.find(e => e.id === selectedExam) || EXAMS_LIST[0];

  const handleGoogleSignIn = (name: string, email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: `usr-${email.split('@')[0]}`,
        name: name || 'Navadeep',
        email: email || '23eg106b31@anurag.edu.in',
        targetExam: selectedExam,
        targetYear: '2027',
        avatarUrl: '',
        streakDays: 1, // Starts with 1 day streak upon course start
        testsCompleted: 1,
        questionsAttempted: 10,
        overallMastery: 64,
        provider: 'google'
      });
    }, 650);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="max-w-md w-full text-center space-y-3 mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white shadow-lg shadow-indigo-200">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">ExamAI</h1>
          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
            Diagnostic OS
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Cognitive Weakness Analysis & Targeted Remediation System
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Top Highlight Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Starts with 1 Day Study Streak</span>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
            Google SSO
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Select Target Exam Domain */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Step 1: Choose Your Examination Domain</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EXAMS_LIST.map(exam => (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => setSelectedExam(exam.id)}
                  className={`p-2.5 rounded-xl border text-left transition text-xs font-semibold flex flex-col justify-between ${
                    selectedExam === exam.id
                      ? 'bg-indigo-50/80 border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{exam.id}</span>
                    {selectedExam === exam.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <span className="text-[10px] text-slate-500 truncate mt-1">{exam.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Domain Preview */}
            <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">{selectedExamInfo.name}: </span>
                <span>Includes {selectedExamInfo.subjects.slice(0, 4).join(', ')}{selectedExamInfo.subjects.length > 4 ? ` + ${selectedExamInfo.subjects.length - 4} more` : ''}.</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 my-4"></div>

          {/* Step 2: Sign In with Google */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 2: Authenticate with Google
              </label>
              <button
                type="button"
                onClick={() => setShowManualInput(!showManualInput)}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                {showManualInput ? 'Use University 1-Tap' : 'Enter Different Google Account'}
              </button>
            </div>

            {!showManualInput ? (
              /* One-Tap University Google Account Card */
              <div 
                onClick={() => !isLoading && handleGoogleSignIn('Navadeep', '23eg106b31@anurag.edu.in')}
                className="p-4 rounded-2xl border-2 border-indigo-100 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50/80 cursor-pointer transition flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white font-bold text-lg flex items-center justify-center border-2 border-indigo-400 shadow-sm">
                      N
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center p-0.5 border border-slate-200">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900">Navadeep</span>
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-sm flex items-center gap-1">
                        <Building2 className="w-2.5 h-2.5" /> Anurag Univ
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-mono">23eg106b31@anurag.edu.in</p>
                    <p className="text-[11px] text-indigo-600 font-medium mt-0.5">Click for 1-Tap Google Sign-In</p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ) : (
              /* Custom Google Email Form */
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Navadeep"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Google Email Address</label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="name@gmail.com or @college.edu.in"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Official Sign in with Google Button */}
            <button
              id="google-signin-btn"
              type="button"
              disabled={isLoading}
              onClick={() => {
                const name = showManualInput && customName ? customName : 'Navadeep';
                const email = showManualInput && customEmail ? customEmail : '23eg106b31@anurag.edu.in';
                handleGoogleSignIn(name, email);
              }}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm shadow-sm transition flex items-center justify-center gap-3 active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 text-indigo-600">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting to Google Accounts...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

          </div>

          {/* Feature Badges */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google Identity Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>1 Day Streak on Course Start</span>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-md w-full text-center mt-6 text-xs text-slate-400">
        <p>ExamAI Diagnostic OS • Single Sign-On powered by Google</p>
      </div>

    </div>
  );
};
