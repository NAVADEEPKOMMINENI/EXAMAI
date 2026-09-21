import React from 'react';
import { AccuracyTrend, RepeatedErrorRecord, ConceptMastery, StudentProfile } from '../types';
import { MasteryChart } from '../components/MasteryChart';
import { 
  TrendingUp, 
  Flame, 
  Calendar, 
  Award, 
  Target, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface ProgressPageProps {
  studentProfile: StudentProfile;
  accuracyTrends: AccuracyTrend[];
  repeatedErrors: RepeatedErrorRecord[];
  masteryData: ConceptMastery[];
  onRetestDiagnostic: () => void;
  onOpenTutor: () => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  studentProfile,
  accuracyTrends,
  repeatedErrors,
  masteryData,
  onRetestDiagnostic,
  onOpenTutor
}) => {
  // Aggregate subject mastery summaries
  const getSubjectMastery = (subjectName: string) => {
    const items = masteryData.filter(m => m.subjectName.toLowerCase().includes(subjectName.toLowerCase()));
    if (items.length === 0) return 50;
    const avg = items.reduce((sum, curr) => sum + curr.masteryPercentage, 0) / items.length;
    return Math.round(avg);
  };

  const subjectMasterySummary = [
    { name: 'Data Structures & Algorithms', percentage: getSubjectMastery('Data Structures'), status: 'Strong' as const },
    { name: 'Databases (DBMS)', percentage: getSubjectMastery('DBMS'), status: 'Good' as const },
    { name: 'Operating Systems', percentage: getSubjectMastery('Operating Systems'), status: 'Weak' as const },
    { name: 'Computer Networks', percentage: getSubjectMastery('Computer Networks'), status: 'Critical' as const }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Stage 14 Progress Tracking
            </span>
            <span className="text-xs text-slate-500 font-medium">{studentProfile.targetExam} Aspirant Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Learner Progression & Error Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            ExamAI monitors your long-term accuracy trendlines, tracks the eradication of recurring cognitive errors, and validates re-assessment gains.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRetestDiagnostic}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Mini Reassessment</span>
          </button>

          <button
            type="button"
            onClick={onOpenTutor}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-bold shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Error Diagnostic</span>
          </button>
        </div>
      </div>

      {/* High-level Learner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Study Streak</div>
          <div className="text-2xl font-bold text-slate-900 flex items-center gap-1.5 mt-1">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{studentProfile.streakDays} {studentProfile.streakDays === 1 ? 'Day' : 'Days'}</span>
          </div>
          <div className="text-[11px] text-slate-500">Started at course enrollment</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Questions Solved</div>
          <div className="text-2xl font-bold text-indigo-700 mt-1">
            {studentProfile.questionsAttempted}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Across all test sessions</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Diagnostic Tests</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">
            {studentProfile.testsCompleted}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Benchmarked evaluations</div>
        </div>
      </div>

      {/* Progress Charts & Repeated Errors History */}
      <MasteryChart
        accuracyTrends={accuracyTrends}
        repeatedErrors={repeatedErrors}
        subjectMasterySummary={subjectMasterySummary}
      />

    </div>
  );
};
