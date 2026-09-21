import React, { useState } from 'react';
import { WeaknessItem, ErrorType } from '../types';
import { WeaknessCard } from '../components/WeaknessCard';
import { 
  AlertTriangle, 
  HelpCircle, 
  BrainCircuit, 
  Filter, 
  Sparkles,
  BookOpen,
  PlayCircle,
  FileText
} from 'lucide-react';

interface WeaknessAnalysisPageProps {
  weaknesses: WeaknessItem[];
  onRemediate: (conceptId: string, isPyq?: boolean) => void;
  onOpenTutor: () => void;
}

export const WeaknessAnalysisPage: React.FC<WeaknessAnalysisPageProps> = ({
  weaknesses,
  onRemediate,
  onOpenTutor
}) => {
  const [selectedErrorType, setSelectedErrorType] = useState<string>('ALL');

  const errorTypeDescriptions: Record<ErrorType, { title: string; desc: string; iconBg: string }> = {
    Conceptual: {
      title: '1. Conceptual Weakness',
      desc: 'Student does not understand the fundamental concept, theoretical law, or core theorem.',
      iconBg: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    Procedural: {
      title: '2. Procedural Weakness',
      desc: 'Student knows the theory but applies an incorrect algorithmic order or misses intermediate steps.',
      iconBg: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    Calculation: {
      title: '3. Calculation Weakness',
      desc: 'Arithmetic, substitution, or unit formula mistakes during execution.',
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    Misreading: {
      title: '4. Misreading Weakness',
      desc: 'Student misunderstands the prompt, overlooks "NOT / EXCEPT" qualifiers or trap constraints.',
      iconBg: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    Recall: {
      title: '5. Recall Weakness',
      desc: 'Student cannot retrieve required constants, protocol headers, or syntax definitions from memory.',
      iconBg: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    Time: {
      title: '6. Time Weakness',
      desc: 'Student takes significantly longer than the benchmark threshold (>1.4x standard pacing).',
      iconBg: 'bg-orange-50 text-orange-700 border-orange-200'
    }
  };

  const filteredWeaknesses = selectedErrorType === 'ALL'
    ? weaknesses
    : weaknesses.filter(w => w.errorTypes.includes(selectedErrorType as ErrorType));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
              Stage 4 Diagnostic Core
            </span>
            <span className="text-xs text-slate-500 font-medium">Cognitive Learner Profiler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Weakness Detection Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Rather than simply noting that a subject is weak, ExamAI classifies your errors across 6 distinct cognitive vectors to prescribe exact surgical remedies.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenTutor}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AI Diagnostic Tutor</span>
        </button>
      </div>

      {/* The 6 Error Types Knowledge Reference Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            The 6 Cognitive Error Taxonomy
          </h3>
          <span className="text-xs text-slate-500">Filter weaknesses by selecting a category</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {(Object.keys(errorTypeDescriptions) as ErrorType[]).map(type => {
            const item = errorTypeDescriptions[type];
            const isSelected = selectedErrorType === type;
            const count = weaknesses.filter(w => w.errorTypes.includes(type)).length;

            return (
              <div
                key={type}
                onClick={() => setSelectedErrorType(isSelected ? 'ALL' : type)}
                className={`p-4 rounded-2xl border cursor-pointer transition select-none flex flex-col justify-between space-y-2 ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase border ${item.iconBg}`}>
                    {type}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    {count} {count === 1 ? 'Concept' : 'Concepts'}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900">{item.title}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Detected Weaknesses List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Identified Concept Weaknesses ({filteredWeaknesses.length})
            </h3>
            {selectedErrorType !== 'ALL' && (
              <button
                type="button"
                onClick={() => setSelectedErrorType('ALL')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                (Clear filter)
              </button>
            )}
          </div>
        </div>

        {filteredWeaknesses.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No active weaknesses found matching this specific error filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWeaknesses.map(w => (
              <WeaknessCard
                key={w.id}
                weakness={w}
                isDetailedView={true}
                onLearnConcept={() => onRemediate(w.conceptId, false)}
                onWatchVideo={() => onRemediate(w.conceptId, false)}
                onPracticeQuestions={() => onRemediate(w.conceptId, false)}
                onAttemptPyqs={() => onRemediate(w.conceptId, true)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
