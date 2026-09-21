import React, { useState } from 'react';
import { ExamType, StudentProfile } from '../types';
import { EXAMS_LIST } from '../data/mockData';
import { 
  GraduationCap, 
  Flame, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  PlayCircle,
  BrainCircuit,
  LogOut,
  User,
  ShieldCheck,
  Terminal
} from 'lucide-react';

interface NavbarProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  studentProfile: StudentProfile;
  onStartDiagnostic: () => void;
  onOpenTutor: () => void;
  onOpenSetupGuide?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentExam,
  onSelectExam,
  studentProfile,
  onStartDiagnostic,
  onOpenTutor,
  onOpenSetupGuide,
  onLogout
}) => {
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const currentExamInfo = EXAMS_LIST.find(e => e.id === currentExam) || EXAMS_LIST[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Exam Selector */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight">ExamAI</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Diagnostic OS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Adaptive Weakness Engine</p>
            </div>
          </div>

          {/* Exam Switcher Dropdown */}
          <div className="relative">
            <button
              id="exam-selector-button"
              type="button"
              onClick={() => setExamDropdownOpen(!examDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200 text-slate-800 text-sm font-semibold transition"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>{currentExamInfo.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${examDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {examDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setExamDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Select Examination
                </div>
                {EXAMS_LIST.map(exam => (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => onSelectExam(exam.id)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 hover:bg-slate-50 transition ${
                      currentExam === exam.id ? 'bg-indigo-50/70 text-indigo-900' : 'text-slate-700'
                    }`}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                      currentExam === exam.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {exam.id[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{exam.name}</span>
                        {currentExam === exam.id && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{exam.fullName}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center / Right: Action buttons & Student Status */}
        <div className="flex items-center gap-3">
          
          {/* Setup Guide Localhost CTA */}
          {onOpenSetupGuide && (
            <button
              id="nav-setup-guide-btn"
              type="button"
              onClick={onOpenSetupGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition"
              title="Run locally in VS Code"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden xl:inline">VS Code Setup</span>
            </button>
          )}

          {/* AI Tutor Quick Access */}
          <button
            id="nav-ai-tutor-btn"
            type="button"
            onClick={onOpenTutor}
            className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 transition"
          >
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="hidden sm:inline">Ask AI Tutor</span>
          </button>

          {/* Diagnostic Test Primary CTA */}
          <button
            id="nav-start-diagnostic-btn"
            type="button"
            onClick={onStartDiagnostic}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-300 transition"
          >
            <PlayCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Diagnostic Assessment</span>
            <span className="sm:hidden">Test</span>
          </button>

          {/* Streak Stats (Started with course enrollment) */}
          <div className="hidden md:flex items-center border-l border-slate-200 pl-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 shadow-2xs">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{studentProfile.streakDays} {studentProfile.streakDays === 1 ? 'Day' : 'Days'} Streak</span>
              <span className="text-[10px] text-amber-600/70 font-normal pl-1.5 border-l border-amber-200 hidden sm:inline">Course Start</span>
            </div>
          </div>

          {/* Student Profile (Clean initial avatar without photo) & Google SSO dropdown */}
          <div className="relative pl-2">
            <button
              type="button"
              id="navbar-profile-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer text-left"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white font-bold text-sm flex items-center justify-center ring-2 ring-white shadow-xs">
                  {studentProfile.name ? studentProfile.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div className="hidden lg:block">
                <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                  <span>{studentProfile.name}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">{studentProfile.targetExam} Aspirant</div>
              </div>
            </button>

            {/* Google Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 px-4 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setProfileDropdownOpen(false)}
              >
                {/* User Info Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
                    {studentProfile.name ? studentProfile.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm text-slate-900 truncate">{studentProfile.name}</div>
                    <div className="text-xs text-slate-500 font-mono truncate">{studentProfile.email}</div>
                    <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Google Account</span>
                    </div>
                  </div>
                </div>

                {/* Target & Streak stats */}
                <div className="py-2.5 space-y-1.5 text-xs text-slate-600 border-b border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Target Exam:</span>
                    <span className="font-bold text-indigo-700">{studentProfile.targetExam} ({studentProfile.targetYear})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Study Streak:</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {studentProfile.streakDays} {studentProfile.streakDays === 1 ? 'Day' : 'Days'} (From Start)
                    </span>
                  </div>
                </div>

                {/* Local Setup Option in Dropdown */}
                {onOpenSetupGuide && (
                  <div className="py-2 border-b border-slate-100">
                    <button
                      type="button"
                      id="navbar-profile-setup-guide-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfileDropdownOpen(false);
                        onOpenSetupGuide();
                      }}
                      className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 text-xs font-semibold transition text-left"
                    >
                      <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                      <span>VS Code Local Setup Guide</span>
                    </button>
                  </div>
                )}

                {/* Sign Out / Switch Account */}
                {onLogout && (
                  <div className="pt-2">
                    <button
                      type="button"
                      id="navbar-logout-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-semibold border border-slate-200 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Switch Account / Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
