import React, { useState } from 'react';
import { DiagnosticAnalysisResult } from '../services/weaknessEngine';
import { QuestionAttempt, ExamType, ErrorType } from '../types';
import { QuestionCard } from '../components/QuestionCard';
import { WeaknessCard } from '../components/WeaknessCard';
import { 
  Trophy, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  HelpCircle,
  TrendingDown,
  Layers
} from 'lucide-react';

interface TestResultPageProps {
  analysis: DiagnosticAnalysisResult;
  attempts: QuestionAttempt[];
  currentExam: ExamType;
  onRetakeTest: () => void;
  onStartRemediation: (conceptId: string) => void;
  onOpenTutor: () => void;
}

export const TestResultPage: React.FC<TestResultPageProps> = ({
  analysis,
  attempts,
  currentExam,
  onRetakeTest,
  onStartRemediation,
  onOpenTutor
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary');
  const [filterIncorrectOnly, setFilterIncorrectOnly] = useState(true);

  const displayedAttempts = filterIncorrectOnly 
    ? attempts.filter(a => !a.isCorrect) 
    : attempts;

  const errorTypesList: ErrorType[] = [
    'Conceptual',
    'Procedural',
    'Calculation',
    'Misreading',
    'Recall',
    'Time'
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Score, Accuracy, Time */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              {currentExam} Diagnostic Completed
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Diagnostic Assessment Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            ExamAI has evaluated your question choices, distractor patterns, and response speeds to isolate your conceptual bottlenecks.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRetakeTest}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <button
            type="button"
            onClick={onOpenTutor}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-bold shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Tutor</span>
          </button>
        </div>
      </div>

      {/* 4 Score Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Accuracy</span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {analysis.accuracy}%
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {analysis.correctCount} of {analysis.totalQuestions} questions correct
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Time / Question</span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
            {analysis.avgTime}s
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Benchmark target: 75s
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Identified Weaknesses</span>
          <div className="text-3xl font-extrabold text-rose-600 tracking-tight">
            {analysis.identifiedWeaknesses.length}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Requiring immediate remediation
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dominant Error</span>
          <div className="text-xl font-extrabold text-indigo-700 tracking-tight mt-1 truncate">
            {analysis.primaryWeakness?.errorTypes[0] || 'Conceptual'}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Targeted in remediation plan
          </p>
        </div>

      </div>

      {/* Stage 4: The 6 Error Types Breakdown Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Cognitive Error Type Distribution (Stage 4 Diagnostic Engine)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Classified based on distractors chosen and time bottlenecks
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {errorTypesList.map(type => {
            const count = analysis.errorTypeBreakdown[type] || 0;
            return (
              <div 
                key={type} 
                className={`p-3.5 rounded-xl border text-center transition ${
                  count > 0 ? 'bg-rose-50/50 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-100 text-slate-500'
                }`}
              >
                <div className="text-xl font-bold font-mono">{count}</div>
                <div className="text-xs font-bold mt-1 uppercase tracking-tight">{type}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {type === 'Conceptual' ? 'Missing rule' :
                   type === 'Procedural' ? 'Wrong steps' :
                   type === 'Calculation' ? 'Formula error' :
                   type === 'Misreading' ? 'Overlooked trap' :
                   type === 'Recall' ? 'Memory gap' : 'Pacing issue'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs: Weaknesses vs Detailed Question Review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'summary'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Identified Weaknesses ({analysis.identifiedWeaknesses.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'review'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Detailed Question Review ({attempts.length})
            </button>
          </div>

          {activeTab === 'review' && (
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterIncorrectOnly}
                onChange={e => setFilterIncorrectOnly(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Show Incorrect Only ({analysis.incorrectCount})</span>
            </label>
          )}
        </div>

        {/* Tab 1: Weaknesses List with Action Buttons */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            {analysis.identifiedWeaknesses.length === 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-lg">No Critical Weaknesses Detected!</h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  You satisfied the accuracy and speed thresholds across all tested concepts. Keep practicing PYQs to maintain mastery.
                </p>
              </div>
            ) : (
              analysis.identifiedWeaknesses.map(weakness => (
                <WeaknessCard
                  key={weakness.id}
                  weakness={weakness}
                  onLearnConcept={() => onStartRemediation(weakness.conceptId)}
                  onWatchVideo={() => onStartRemediation(weakness.conceptId)}
                  onPracticeQuestions={() => onStartRemediation(weakness.conceptId)}
                  onAttemptPyqs={() => onStartRemediation(weakness.conceptId)}
                />
              ))
            )}
          </div>
        )}

        {/* Tab 2: Detailed Question Review with Distractor Feedback */}
        {activeTab === 'review' && (
          <div className="space-y-6">
            {displayedAttempts.map((attempt, idx) => (
              <QuestionCard
                key={attempt.questionId}
                question={attempt.question}
                questionNumber={idx + 1}
                totalQuestions={displayedAttempts.length}
                selectedAnswer={attempt.selectedAnswer}
                isReviewMode={true}
                timeSpentSeconds={attempt.timeTakenSeconds}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
