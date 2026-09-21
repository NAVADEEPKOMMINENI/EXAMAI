import React from 'react';
import { WeaknessItem, ErrorType } from '../types';
import { 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  PlayCircle, 
  HelpCircle, 
  FileText, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface WeaknessCardProps {
  weakness: WeaknessItem;
  onLearnConcept?: (conceptId: string) => void;
  onWatchVideo?: (conceptId: string) => void;
  onPracticeQuestions?: (conceptId: string) => void;
  onAttemptPyqs?: (conceptId: string) => void;
  isDetailedView?: boolean;
}

export const WeaknessCard: React.FC<WeaknessCardProps> = ({
  weakness,
  onLearnConcept,
  onWatchVideo,
  onPracticeQuestions,
  onAttemptPyqs,
  isDetailedView = false
}) => {
  const getSeverityBadge = (severity: 'High' | 'Medium' | 'Low') => {
    switch (severity) {
      case 'High':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getErrorTypeTag = (errorType: ErrorType) => {
    switch (errorType) {
      case 'Conceptual':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Procedural':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Calculation':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Misreading':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Recall':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Time':
        return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 transition hover:border-slate-300">
      
      {/* Header with Title & Severity */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {weakness.subjectName} › {weakness.topicName}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {weakness.conceptName}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${getSeverityBadge(weakness.severity)}`}>
            {weakness.priority} Priority
          </span>
        </div>
      </div>

      {/* Metrics Row: Accuracy, Error Types, Time */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Concept Accuracy</div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-rose-600">{weakness.accuracy}%</span>
            <span className="text-xs text-slate-400">({weakness.recentIncorrectCount} recent errors)</span>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Average Time</div>
          <div className="flex items-baseline gap-1.5 mt-0.5 text-slate-700 font-mono text-sm font-semibold">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{weakness.avgTime}s <span className="text-xs text-slate-400 font-sans font-normal">(Target: {weakness.benchmarkTime}s)</span></span>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Detected Error Types</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {weakness.errorTypes.map(err => (
              <span key={err} className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase border ${getErrorTypeTag(err)}`}>
                {err}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Why you're struggling section */}
      <div className="space-y-1.5 text-xs">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Why you're struggling:</span>
        </div>
        <p className="text-slate-600 leading-relaxed pl-5 font-medium">
          {weakness.reason}
        </p>
      </div>

      {/* Formula / Rule Pill */}
      {weakness.quickExplanation && (
        <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed">
          <span className="font-bold text-indigo-900 block mb-1">Key Diagnostic Rule to Master:</span>
          {weakness.quickExplanation}
        </div>
      )}

      {/* 4 Recommended Action Buttons (Exact user prompt requirement) */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onLearnConcept && onLearnConcept(weakness.conceptId)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 transition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Learn Concept</span>
        </button>

        <button
          type="button"
          onClick={() => onWatchVideo && onWatchVideo(weakness.conceptId)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 transition"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>Watch Video</span>
        </button>

        <button
          type="button"
          onClick={() => onPracticeQuestions && onPracticeQuestions(weakness.conceptId)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 transition"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Practice 5 Questions</span>
        </button>

        <button
          type="button"
          onClick={() => onAttemptPyqs && onAttemptPyqs(weakness.conceptId)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 transition"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Attempt PYQs</span>
        </button>
      </div>

    </div>
  );
};
