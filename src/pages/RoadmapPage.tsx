import React, { useState, useMemo } from 'react';
import { ExamType, ActiveTab } from '../types';
import { DOMAIN_ROADMAPS } from '../data/roadmapData';
import { 
  Compass, 
  Target, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  TrendingUp, 
  Sparkles, 
  Calculator, 
  Layers, 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Zap, 
  Check, 
  Flame,
  AlertTriangle,
  Lightbulb,
  Crosshair,
  BadgePercent
} from 'lucide-react';

interface RoadmapPageProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  currentExam,
  onSelectExam,
  onNavigateTab
}) => {
  const [activeSubView, setActiveSubView] = useState<'roadmap' | 'scoring' | 'calculator'>('roadmap');
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number>(1);

  // Marks Calculator State
  const roadmap = useMemo(() => {
    return DOMAIN_ROADMAPS[currentExam] || DOMAIN_ROADMAPS.GATE;
  }, [currentExam]);

  const [simAttempts, setSimAttempts] = useState<number>(Math.round(roadmap.totalQuestions * 0.8));
  const [simAccuracy, setSimAccuracy] = useState<number>(88);

  const availableExams: Array<{ id: ExamType; label: string; short: string }> = [
    { id: 'GATE', label: 'GATE CS', short: 'GATE CS' },
    { id: 'GATE_ECE', label: 'GATE ECE', short: 'GATE ECE' },
    { id: 'JEE', label: 'JEE Main & Adv', short: 'JEE' },
    { id: 'NEET', label: 'NEET Medical', short: 'NEET' },
    { id: 'UPSC', label: 'UPSC Civil Services', short: 'UPSC' },
    { id: 'CAT', label: 'CAT (IIMs)', short: 'CAT' },
    { id: 'Banking', label: 'Banking (SBI/IBPS)', short: 'Banking' }
  ];

  // Calculated simulation estimates
  const simResults = useMemo(() => {
    const correctCount = Math.round((simAttempts * simAccuracy) / 100);
    const incorrectCount = simAttempts - correctCount;

    let avgMarkPerQ = roadmap.totalMarks / roadmap.totalQuestions;
    let penaltyFraction = 0.33;

    if (currentExam === 'JEE' || currentExam === 'NEET') {
      avgMarkPerQ = 4;
      penaltyFraction = 0.25; // 1 mark lost on 4 marks
    } else if (currentExam === 'CAT') {
      avgMarkPerQ = 3;
      penaltyFraction = 0.33; // 1 mark on 3
    } else if (currentExam === 'Banking') {
      avgMarkPerQ = 1;
      penaltyFraction = 0.25;
    } else if (currentExam === 'UPSC') {
      avgMarkPerQ = 2;
      penaltyFraction = 0.33;
    }

    const marksEarned = correctCount * avgMarkPerQ;
    const marksLost = incorrectCount * (avgMarkPerQ * penaltyFraction);
    const estimatedRawMarks = Math.max(0, Math.round((marksEarned - marksLost) * 10) / 10);
    const percentage = Math.round((estimatedRawMarks / roadmap.totalMarks) * 100);

    return {
      correctCount,
      incorrectCount,
      estimatedRawMarks,
      percentage
    };
  }, [simAttempts, simAccuracy, roadmap, currentExam]);

  return (
    <div className="space-y-7 animate-in fade-in duration-300">

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-50/70 via-blue-50/40 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Strategic Blueprint
              </span>
              <span className="text-xs text-slate-500 font-medium">Domain-Specific Mastery</span>
            </div>

            {/* Exam domain selector pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {availableExams.map(ex => (
                <button
                  key={ex.id}
                  id={`roadmap-exam-pill-${ex.id}`}
                  type="button"
                  onClick={() => {
                    onSelectExam(ex.id);
                    setSelectedPhaseNum(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    currentExam === ex.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {ex.short}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span>{roadmap.examFullName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {roadmap.executiveSummary}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Marks</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">{roadmap.totalMarks} Marks</div>
              <div className="text-[10px] text-slate-500">{roadmap.totalQuestions} Questions</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Exam Duration</div>
              <div className="text-lg sm:text-xl font-extrabold text-indigo-700 mt-0.5">{roadmap.durationMinutes} Minutes</div>
              <div className="text-[10px] text-slate-500">{(roadmap.durationMinutes / 60).toFixed(1)} Hours Total</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Top 1% AIR Target</div>
              <div className="text-lg sm:text-xl font-extrabold text-emerald-700 mt-0.5">
                {roadmap.scoreBenchmarks[0]?.targetMarks || 'Top Tier'}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold">{roadmap.scoreBenchmarks[0]?.targetPercentile}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Marking Protocol</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 truncate">{roadmap.markingScheme.correct}</div>
              <div className="text-[10px] text-rose-600 font-medium truncate">{roadmap.markingScheme.incorrect}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="roadmap-subtab-phases"
            onClick={() => setActiveSubView('roadmap')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubView === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Preparation Roadmap (4 Phases)</span>
          </button>

          <button
            type="button"
            id="roadmap-subtab-scoring"
            onClick={() => setActiveSubView('scoring')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubView === 'scoring'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>Exactly How to Get Marks</span>
          </button>

          <button
            type="button"
            id="roadmap-subtab-calc"
            onClick={() => setActiveSubView('calculator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubView === 'calculator'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Target Marks Simulator</span>
          </button>
        </div>

        {/* Quick Action to Diagnostic Test */}
        <button
          type="button"
          onClick={() => onNavigateTab('diagnostic')}
          className="hidden md:flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
        >
          <span>Run Diagnostic Assessment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* VIEW 1: PREPARATION ROADMAP (PHASE-BY-PHASE) */}
      {activeSubView === 'roadmap' && (
        <div className="space-y-6">

          {/* Phase Selector Stepper */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {roadmap.phases.map(phase => {
              const isSelected = selectedPhaseNum === phase.phaseNumber;
              return (
                <button
                  key={phase.phaseNumber}
                  type="button"
                  id={`phase-step-${phase.phaseNumber}`}
                  onClick={() => setSelectedPhaseNum(phase.phaseNumber)}
                  className={`p-4 rounded-2xl text-left border transition relative ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-100'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-indigo-700/80 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Phase {phase.phaseNumber}
                    </span>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {phase.duration.split('(')[0]}
                    </span>
                  </div>
                  <div className="font-bold text-xs sm:text-sm line-clamp-1">
                    {phase.title.replace(/Phase \d+:\s*/, '')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Phase Card */}
          {(() => {
            const currentPhase = roadmap.phases.find(p => p.phaseNumber === selectedPhaseNum) || roadmap.phases[0];
            return (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                        {currentPhase.duration}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Stage {currentPhase.phaseNumber} of 4</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {currentPhase.title}
                    </h2>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 max-w-md">
                    <div className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Phase Objective</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                      {currentPhase.focusGoal}
                    </p>
                  </div>
                </div>

                {/* Key Action Items Checklist */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Non-Negotiable Deliverables & Action Items</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentPhase.keyActionItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-slate-800 leading-relaxed font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* High Weightage Focus Topics in this phase */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>High-Weightage Syllabus Focus Topics</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentPhase.highWeightageFocus.map((focusItem, idx) => (
                      <span key={idx} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-amber-600" />
                        <span>{focusItem}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Do vs Don't Protocol Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Recommended Best Practice (DO)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentPhase.doAndDont.do}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1.5">
                    <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Deadly Preparation Trap (DON'T)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentPhase.doAndDont.dont}
                    </p>
                  </div>
                </div>

                {/* Milestone Check Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Gatekeeper Milestone to Clear Before Next Phase</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">
                      {currentPhase.milestoneCheck}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (selectedPhaseNum < roadmap.phases.length) {
                        setSelectedPhaseNum(selectedPhaseNum + 1);
                      } else {
                        setActiveSubView('scoring');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold shadow-xs transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                  >
                    <span>{selectedPhaseNum < roadmap.phases.length ? 'Next Phase' : 'View Scoring Tactics'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Daily Schedule Blueprint for this domain */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Optimal Daily Schedule Blueprint ({currentExam})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Time-blocked biological conditioning recommended by previous all-India toppers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {roadmap.dailyScheduleSuggestion.map((sched, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Slot {idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-bold">{sched.duration}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">{sched.slot}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{sched.focus}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: EXACTLY HOW TO GET MARKS (SCORING BLUEPRINT) */}
      {activeSubView === 'scoring' && (
        <div className="space-y-7">

          {/* 1. Low Hanging Fruit / Guaranteed Marks Buckets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>The Guaranteed Free Marks Pools (First 35% of Cutoff)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Topics where questions are mathematically formulaic and carry near-zero ambiguity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roadmap.guaranteedMarksBucket.map((bucket, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        High Yield
                      </span>
                      <span className="text-xs font-extrabold text-indigo-700">{bucket.potentialMarks}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm">{bucket.categoryTitle}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{bucket.description}</p>

                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Scoring Topics:</div>
                      <div className="flex flex-wrap gap-1">
                        {bucket.topics.map((t, tidx) => (
                          <span key={tidx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed font-medium">
                    <strong>Tactical Tip:</strong> {bucket.tacticalTip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. The 3-Round Examination Execution Blueprint */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Time-Partitioned Exam Strategy</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                The 3-Round Paper Triage Strategy
              </h3>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                Exam toppers never attempt a question paper linearly from Question 1 to 65. Divide your {roadmap.durationMinutes} minutes into three distinct strategic passes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roadmap.scoringRounds.map((round) => (
                <div key={round.roundNumber} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                      Round {round.roundNumber}
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-700">{round.timeWindow}</span>
                  </div>

                  <div className="font-bold text-slate-900 text-sm">{round.roundName}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{round.strategy}</p>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Target Accuracy:</span>
                      <span className="font-bold text-emerald-700">{round.targetHitRate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Criteria: </span>
                      <span className="text-slate-700 font-medium">{round.selectionCriteria}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Subject-by-Subject Weightage Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Subject Mark Distribution & High-Yield Topics</span>
              </h3>
              <p className="text-xs text-slate-500">
                Prioritize your revision time in strict proportion to actual marks awarded in previous official papers.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Subject Name</th>
                    <th className="py-3 px-4">Typical Weightage</th>
                    <th className="py-3 px-4">Expected Questions</th>
                    <th className="py-3 px-4">Priority Tier</th>
                    <th className="py-3 px-4">Predictability Trend</th>
                    <th className="py-3 px-4">Key Scoring Concepts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {roadmap.subjectWeightages.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{sub.subjectName}</td>
                      <td className="py-3.5 px-4 font-extrabold text-indigo-700 whitespace-nowrap">{sub.typicalMarks}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">{sub.expectedQuestions}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          sub.priority === 'Highest'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : sub.priority === 'High'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {sub.priority} Priority
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`text-[11px] font-medium ${
                          sub.difficultyTrend.includes('Predictable')
                            ? 'text-emerald-700 font-semibold'
                            : sub.difficultyTrend.includes('Conceptual')
                            ? 'text-indigo-700'
                            : 'text-amber-700'
                        }`}>
                          {sub.difficultyTrend}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-600">
                        {sub.keyScoringTopics.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Top Negative Marking Traps Shield */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Score Protection Protocol</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Top Negative Marking Traps & How to Avoid Them
              </h3>
              <p className="text-xs text-slate-500">
                Students lose an average of 12-25 marks to these 4 preventable psychological and calculation blunders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmap.topNegativeMarkingTraps.map((trap, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900">{trap.trapName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-mono">
                      Bleeds: {trap.marksLostAvg}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-rose-100 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-emerald-700">How to Prevent:</strong> {trap.howToPrevent}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Score vs Rank Target Benchmarks */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BadgePercent className="w-5 h-5 text-indigo-600" />
                <span>Score vs Target Percentile & Institute Benchmarks</span>
              </h3>
              <p className="text-xs text-slate-500">
                Calibrate your target attempts and accuracy threshold based on your dream institution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roadmap.scoreBenchmarks.map((bench, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border space-y-2.5 ${
                  idx === 0 
                    ? 'bg-gradient-to-b from-indigo-50/80 to-white border-indigo-200 shadow-xs' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {idx === 0 ? '🏆 Dream Benchmark' : `Tier ${idx + 1}`}
                  </div>
                  <div className="font-bold text-xs text-slate-900 line-clamp-2 min-h-[32px]">
                    {bench.targetTier}
                  </div>

                  <div className="pt-1 border-t border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Target Marks:</span>
                      <span className="font-extrabold text-indigo-700">{bench.targetMarks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Percentile:</span>
                      <span className="font-bold text-emerald-700">{bench.targetPercentile}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Attempts:</span>
                      <span className="font-medium text-slate-800">{bench.expectedAttemptRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Min Accuracy:</span>
                      <span className="font-bold text-slate-800">{bench.accuracyRequired}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: TARGET MARKS SIMULATOR */}
      {activeSubView === 'calculator' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-7">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <span>Interactive Target Marks & Attempt Simulator ({currentExam})</span>
            </h2>
            <p className="text-xs text-slate-500">
              Adjust your planned question attempts and expected accuracy to immediately simulate your raw score and negative penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="space-y-6">
              {/* Attempt Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Planned Question Attempts:
                  </label>
                  <span className="text-sm font-extrabold text-indigo-700 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200">
                    {simAttempts} / {roadmap.totalQuestions} Questions
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(roadmap.totalQuestions * 0.2)}
                  max={roadmap.totalQuestions}
                  value={simAttempts}
                  onChange={e => setSimAttempts(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Conservative ({Math.round(roadmap.totalQuestions * 0.4)})</span>
                  <span>Balanced ({Math.round(roadmap.totalQuestions * 0.75)})</span>
                  <span>Aggressive ({roadmap.totalQuestions})</span>
                </div>
              </div>

              {/* Accuracy Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Estimated Solution Accuracy:
                  </label>
                  <span className="text-sm font-extrabold text-emerald-700 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                    {simAccuracy}% Accuracy
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={simAccuracy}
                  onChange={e => setSimAccuracy(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Risky (60%)</span>
                  <span>Solid Standard (85%)</span>
                  <span>Mastery (95%+)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>The Accuracy Golden Rule</span>
                </div>
                <p className="leading-relaxed">
                  In negative-marking exams like {currentExam}, raising accuracy from 75% to 88% on fewer attempts almost always yields a higher net score than blindly attempting 10 extra doubtful questions!
                </p>
              </div>
            </div>

            {/* Right Simulation Gauge Output */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Simulated Outcome</span>
                <span className="text-xs font-semibold text-slate-400">{roadmap.markingScheme.correct.split('(')[0]}</span>
              </div>

              <div className="text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {simResults.estimatedRawMarks}
                  <span className="text-base text-slate-400 font-normal"> / {roadmap.totalMarks}</span>
                </div>
                <div className="text-xs font-bold text-indigo-300">
                  Approx. {simResults.percentage}% of Maximum Marks
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Correct Answers</div>
                  <div className="text-lg font-bold text-white mt-0.5">{simResults.correctCount} Qs</div>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Incorrect (Penalized)</div>
                  <div className="text-lg font-bold text-white mt-0.5">{simResults.incorrectCount} Qs</div>
                </div>
              </div>

              {/* Benchmarking match */}
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs space-y-1">
                <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  Target Tier Assessment:
                </div>
                <div className="text-slate-200 font-medium">
                  {simResults.estimatedRawMarks >= (roadmap.totalMarks * 0.7) ? (
                    <span className="text-emerald-300 font-bold">✨ Top 1% Tier / Premier Institution Direct Admission</span>
                  ) : simResults.estimatedRawMarks >= (roadmap.totalMarks * 0.5) ? (
                    <span className="text-amber-300 font-bold">🎯 Strong Safe Qualification / High Probability Category</span>
                  ) : (
                    <span className="text-rose-300 font-bold">⚠️ Below Premier Threshold — Increase Accuracy or attempts</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Bottom Floating Navigation Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl border border-indigo-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-slate-900 text-sm">Ready to put your roadmap into action?</h4>
          <p className="text-xs text-slate-600">
            Take an adaptive 10-question diagnostic test to let ExamAI detect your exact knowledge gaps against the syllabus.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('resources')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition"
          >
            Syllabus Resources
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('diagnostic')}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <span>Take Diagnostic Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
