import React from 'react';
import { RecommendationPlan } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  PlayCircle, 
  HelpCircle, 
  FileText, 
  ArrowRight,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface RecommendationCardProps {
  plan: RecommendationPlan;
  onStartTargetedPractice: () => void;
  onStartPyqPractice: () => void;
  onReadNotes: (noteId: string) => void;
  onWatchVideo: (videoId: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  plan,
  onStartTargetedPractice,
  onStartPyqPractice,
  onReadNotes,
  onWatchVideo
}) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              AI Recommendation Engine • Personalized Recovery Plan
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Targeted Remediation for: {plan.weakness.conceptName}
            </h3>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold uppercase tracking-wider">
          {plan.weakness.errorTypes.join(' + ')} Error Detected
        </span>
      </div>

      {/* 2-Minute Concept Summary Card (Stage 8 & 7) */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4" />
          <span>2-Minute Concept Summary (Must Remember Before Solving)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-line leading-relaxed pl-6">
          {plan.summaryText}
        </p>
      </div>

      {/* Recommended 4-Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pillar 1: Reading Material & PDF */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Recommended Notes & PDF</span>
          </div>
          {plan.notes[0] ? (
            <div className="space-y-1">
              <div className="text-sm font-semibold text-white line-clamp-1">{plan.notes[0].title}</div>
              <p className="text-xs text-slate-400 line-clamp-2">{plan.notes[0].description}</p>
              <button
                type="button"
                onClick={() => onReadNotes(plan.notes[0].id)}
                className="mt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
              >
                <span>Read Notes ({plan.notes[0].durationOrPages})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Notes available in Resource Hub.</p>
          )}
        </div>

        {/* Pillar 2: Visual Video Lecture */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase">
            <PlayCircle className="w-4 h-4 text-rose-400" />
            <span>Recommended Video Lecture</span>
          </div>
          {plan.videos[0] ? (
            <div className="space-y-1">
              <div className="text-sm font-semibold text-white line-clamp-1">{plan.videos[0].title}</div>
              <p className="text-xs text-slate-400 line-clamp-2">{plan.videos[0].description}</p>
              <button
                type="button"
                onClick={() => onWatchVideo(plan.videos[0].id)}
                className="mt-2 text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
              >
                <span>Watch Video ({plan.videos[0].durationOrPages})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Video tutorials available in Resource Hub.</p>
          )}
        </div>

      </div>

      {/* Targeted Action Steps: 5 Practice Qs + PYQs */}
      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-300 font-medium">
          Ready to verify if this weakness is resolved? Complete targeted practice to boost your mastery score.
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onStartTargetedPractice}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/30 transition"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Practice 5 Targeted Qs</span>
          </button>

          <button
            type="button"
            onClick={onStartPyqPractice}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Solve PYQs</span>
          </button>
        </div>
      </div>

    </div>
  );
};
