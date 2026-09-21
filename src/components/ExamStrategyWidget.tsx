import React, { useState, useEffect } from 'react';
import { 
  ExamType, 
  ActiveTab, 
  ExamRoadmap 
} from '../types';
import { DOMAIN_ROADMAPS } from '../data/roadmapData';
import { EXAMS_LIST } from '../data/mockData';
import { 
  Compass, 
  Target, 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Award, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  Check, 
  BookOpen, 
  Lightbulb, 
  CheckSquare, 
  Square, 
  RotateCcw,
  Bot,
  HelpCircle,
  BarChart2
} from 'lucide-react';

interface ExamStrategyWidgetProps {
  currentExam: ExamType;
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectExam?: (exam: ExamType) => void;
  onPracticePyqs?: () => void;
  onOpenTutor?: () => void;
  className?: string;
}

// Domain-tailored tactical "How-to-get-marks" fast insights
interface DomainTacticalHighlight {
  goldenRule: string;
  targetScore: string;
  targetPercentileOrRank: string;
  quickHacks: {
    title: string;
    marksImpact: string;
    description: string;
    tag: string;
  }[];
  checklist: {
    id: string;
    label: string;
    tip: string;
  }[];
}

const DOMAIN_TACTICAL_HIGHLIGHTS: Record<ExamType, DomainTacticalHighlight> = {
  GATE: {
    goldenRule: "Bank the 28-Mark Foundation (General Aptitude 15 + Engg Math 13) in the first 45 mins. Exploit ZERO negative marks in NAT and MSQ questions to build an unassailable score buffer.",
    targetScore: "65+ Marks",
    targetPercentileOrRank: "AIR < 500 (Top 7 IITs / PSUs)",
    quickHacks: [
      {
        title: "The 28-Mark Predictable Vault",
        marksImpact: "+25 to 28 Marks",
        description: "Aptitude and Linear Algebra/Discrete Math have virtually zero ambiguity. Never start with tricky COA/TOC questions before locking these in.",
        tag: "Core Vault"
      },
      {
        title: "Zero-Negative NAT Policy",
        marksImpact: "+10 to 18 Marks",
        description: "NAT questions have 0 negative marking. Calculate plausible bounds and enter your best numeric value—never submit with empty NATs.",
        tag: "Zero Risk"
      },
      {
        title: "The 60-Second Triage Rule",
        marksImpact: "+6 to 9 Marks Saved",
        description: "If an equation or algorithm does not form within 60 seconds of reading, flag for Round 2. Ego-battling costs 10+ mins and creates end-of-test panic.",
        tag: "Time Defense"
      },
      {
        title: "Scratchpad Unit Underlining",
        marksImpact: "Saves -4 to -6 Marks",
        description: "Bits vs Bytes, milliseconds vs nanoseconds, and round-off to 2 decimal places are where 30% of NAT marks are lost.",
        tag: "Trap Defense"
      }
    ],
    checklist: [
      { id: 'gate-apt', label: 'Solve 15-mark Aptitude in opening 25 mins', tip: 'Fresh mind = zero silly reading errors' },
      { id: 'gate-nat', label: 'Enter calculated estimates for every single NAT', tip: 'Zero negative marking = pure upside' },
      { id: 'gate-msq', label: 'Verify each MSQ option individually with counterexamples', tip: 'All correct options must be selected' },
      { id: 'gate-unit', label: 'Underline requested units (Bytes vs bits, ms vs ns)', tip: 'Prevents 10^3 or factor of 8 errors' },
      { id: 'gate-skip', label: 'Skip any question exceeding 3 minutes without a solution', tip: 'Preserves time for easy 2-mark numericals' }
    ]
  },
  GATE_ECE: {
    goldenRule: "Aptitude + Math (28m) paired with Signals & Systems (Z-transform, Nyquist) and Digital Circuits (K-maps, counters) delivers 52+ marks without taking high-risk gambles on EM Waves.",
    targetScore: "60+ Marks",
    targetPercentileOrRank: "AIR < 300 (Top VLSI / Microelectronics)",
    quickHacks: [
      {
        title: "Digital Logic + Signals Speed-Run",
        marksImpact: "+20 to 24 Marks",
        description: "K-maps, flip-flop state transitions, and standard Fourier/Laplace/Z pairs have the highest formula-to-marks conversion ratio in ECE.",
        tag: "High Yield"
      },
      {
        title: "Virtual Calculator Radian Check",
        marksImpact: "Saves -3 to -5 Marks",
        description: "Ensure the virtual calculator mode is set to Radians for sinusoidal phase angles and Degrees for geometric coordinate transforms.",
        tag: "Calculator Trap"
      },
      {
        title: "Op-Amp Virtual Ground Verification",
        marksImpact: "+4 to 6 Marks",
        description: "Always verify negative feedback before assuming V+ = V-. If positive feedback is present, it acts as a Schmitt trigger.",
        tag: "Circuit Trap"
      },
      {
        title: "No-Negative NAT Range Input",
        marksImpact: "+8 to 12 Marks",
        description: "ECE NATs often carry a tolerance range (e.g., 2.45 to 2.55). Double check resistor scale (kΩ vs Ω) and mA vs μA.",
        tag: "Zero Risk"
      }
    ],
    checklist: [
      { id: 'ece-apt', label: 'Lock in 22+ marks from Aptitude & Engineering Math', tip: 'Matrix rank, eigenvalues & probability are deterministic' },
      { id: 'ece-units', label: 'Check mA vs μA and kHz vs MHz on schematic diagrams', tip: 'Scale factors of 1000 are the #1 mistake' },
      { id: 'ece-opamp', label: 'Verify feedback polarity (positive vs negative feedback)', tip: 'Prevents treating comparators as linear amplifiers' },
      { id: 'ece-calc', label: 'Check Deg vs Rad mode on the virtual calculator', tip: 'Phase and trigonometry questions' }
    ]
  },
  JEE: {
    goldenRule: "Execute Chemistry First (35-40 mins for 65+ marks). In Section B (Numericals), scan all 10 questions first and cherry-pick the easiest 5 to maximize raw conversion.",
    targetScore: "190 - 220 Marks",
    targetPercentileOrRank: "99.2+ Percentile (Top NIT CSE / IIT Qualified)",
    quickHacks: [
      {
        title: "Chemistry Speed-First Strategy",
        marksImpact: "+65 to 75 Marks in 40m",
        description: "Inorganic NCERT reactions and direct Organic named mechanisms are solved in 30-45 seconds per question. Banks huge time for Math.",
        tag: "Speed Engine"
      },
      {
        title: "Section B Choice Optimization",
        marksImpact: "+12 to 16 Marks",
        description: "You only need to attempt 5 out of 10 numerical questions. Do not attempt in sequence—solve the 5 easiest one-step formula questions!",
        tag: "Smart Selection"
      },
      {
        title: "Mathematics Quality over Quantity",
        marksImpact: "+40 to 50 Marks",
        description: "JEE Math is intentionally lengthy. Solving 12-14 questions with 95% accuracy beats rushing 22 questions and taking negative penalties.",
        tag: "Accuracy Shield"
      },
      {
        title: "Dimensional Analysis Elimination",
        marksImpact: "+4 to 8 Free Marks",
        description: "In Physics, checking dimensions of the 4 options eliminates 2 choices in 15 seconds without solving the entire integral.",
        tag: "Option Hack"
      }
    ],
    checklist: [
      { id: 'jee-chem', label: 'Complete Chemistry within 40 minutes', tip: 'Leaves 70m for Physics and 70m for Mathematics' },
      { id: 'jee-secb', label: 'Scan all 10 numericals in Sec B before solving any', tip: 'Pick the 5 shortest calculation questions' },
      { id: 'jee-units', label: 'Double check SI units (cm to m, grams to kg, Joules to eV)', tip: 'Physics numericals frequently mix units' },
      { id: 'jee-math', label: 'Target 12-14 high-confidence Math questions', tip: 'Avoid multi-page coordinate geometry sinks early' }
    ]
  },
  NEET: {
    goldenRule: "Biology 360/360 in 45-50 minutes is non-negotiable. With -1 penalty on 4-mark questions, a single wild guess causes a 5-mark swing (20% loss). Zero 50/50 guessing without elimination.",
    targetScore: "650+ Marks",
    targetPercentileOrRank: "AIR < 5,000 (Top Govt Medical College MBBS)",
    quickHacks: [
      {
        title: "The 360/360 Biology Sprint",
        marksImpact: "330 - 360 Marks in 50m",
        description: "100% of Biology questions are verbatim NCERT. Solve at a steady 30 seconds per question to liberate 110 minutes for Physics & Chemistry.",
        tag: "Foundation"
      },
      {
        title: "Severe -1 Penalty Shield",
        marksImpact: "Saves -15 to -25 Marks",
        description: "Incorrect answer loses the +4 plus gets -1, causing a 5-mark swing. In NEET, missing 5 marks drops your rank by 1,500 places!",
        tag: "Crucial Rule"
      },
      {
        title: "Chemistry NCERT Line Coverage",
        marksImpact: "+140 to 155 Marks",
        description: "Physical Chemistry formula direct application + NCERT Organic/Inorganic tables gives 35+ questions with 90%+ hit-rate.",
        tag: "High Yield"
      },
      {
        title: "Physics 1-Minute Calculation Limit",
        marksImpact: "+120 to 140 Marks",
        description: "Solve kinematics, modern physics, and current electricity first. Skip lengthy circuit symmetry grids until round 2.",
        tag: "Time Pacing"
      }
    ],
    checklist: [
      { id: 'neet-bio', label: 'Finish Biology (Botany + Zoology) in under 50 minutes', tip: 'Enables peaceful calculation pacing for Physics' },
      { id: 'neet-noguess', label: 'Refuse all blind 50/50 guesses', tip: '5-mark penalty swing severely damages MBBS rank' },
      { id: 'neet-omr', label: 'Bubble OMR in batches of 15-20 questions', tip: 'Prevents last-minute panic misalignment' },
      { id: 'neet-chem', label: 'Target 35+ direct NCERT questions in Chemistry', tip: 'Inorganic exceptions & Organic reagents' }
    ]
  },
  UPSC: {
    goldenRule: "Prelims is a test of elimination and risk management, not exhaustive recall. Attempting 80-85 questions with 75%+ accuracy guarantees clearing the ~90-mark cutoff. Never leave CSAT to chance.",
    targetScore: "95 - 105 Marks (Paper 1)",
    targetPercentileOrRank: "Cleared Prelims for IAS / IPS / IFS",
    quickHacks: [
      {
        title: "Static Polity & Modern History First",
        marksImpact: "+45 to 55 Marks",
        description: "Laxmikanth and Spectrum questions have standard factual answers. Lock these 25 questions in Round 1 with minimal risk.",
        tag: "Static Anchor"
      },
      {
        title: "Extreme Word Alert ('Always', 'Drastically')",
        marksImpact: "Saves -6 to -10 Marks",
        description: "Statements with extreme absolutes ('only', 'entirely', 'never', 'all') in UPSC are historically false ~80% of the time.",
        tag: "Elimination"
      },
      {
        title: "The 80-85 Optimal Attempt Window",
        marksImpact: "Guarantees Cutoff Safety",
        description: "Attempting <70 leaves no safety margin against negative marks. Attempting >92 introduces fatal wild guessing.",
        tag: "Probability"
      },
      {
        title: "CSAT Paper-2 Safe Buffer",
        marksImpact: "Qualifying 66.7 Marks",
        description: "Solve 45 high-confidence questions in CSAT (Comprehension + Quant basics) to avoid disqualification on Paper-2.",
        tag: "Qualifying"
      }
    ],
    checklist: [
      { id: 'upsc-p1', label: 'Lock in 35+ direct Static questions in Round 1', tip: 'Polity articles, Fundamental Rights & Modern History' },
      { id: 'upsc-elim', label: 'Eliminate extreme words (always, only, never) methodically', tip: 'UPSC statement verification rule' },
      { id: 'upsc-attempt', label: 'Keep attempts strictly between 80 and 86 questions', tip: 'Balances net score against 0.66 penalty' },
      { id: 'upsc-csat', label: 'Solve 40+ confident questions in CSAT Paper-2', tip: 'Never underestimate the 33% qualifying cutoff' }
    ]
  },
  CAT: {
    goldenRule: "CAT is the ultimate game of question rejection. Scoring 99+ percentile requires solving only 50% of the paper with >90% accuracy! Commit to the cleanest DILR sets and take full advantage of zero-penalty TITA questions.",
    targetScore: "85 - 95 Raw Marks",
    targetPercentileOrRank: "99.2+ Percentile (IIM A/B/C Shortlist)",
    quickHacks: [
      {
        title: "The 5-Minute DILR Set Audit",
        marksImpact: "+24 to 30 Marks",
        description: "Spend the first 5 minutes reading all 4 sets without writing equations. Pick the 2 cleanest sets and crack 8-10 questions with 100% accuracy.",
        tag: "Set Selection"
      },
      {
        title: "TITA (Type in the Answer) Free Shots",
        marksImpact: "+6 to 9 Marks",
        description: "TITA questions carry NO negative marking (-0). Never submit a section leaving a TITA blank—compute the closest integer!",
        tag: "Zero Negative"
      },
      {
        title: "QA Low-Hanging Fruit Sweep",
        marksImpact: "+30 to 36 Marks",
        description: "Solve Arithmetic (Percentages, Ratios, TSD, Time-Work) and basic Algebra first. 10-12 correct questions in QA secures 99%ile.",
        tag: "High Yield"
      },
      {
        title: "VARC Main Idea Alignment",
        marksImpact: "+30 to 36 Marks",
        description: "Eliminate options that are 'Out of Scope' or 'Too Extreme'. 3 RCs + ParaJumbles/Summary gives 14-16 solid attempts.",
        tag: "Reading Hack"
      }
    ],
    checklist: [
      { id: 'cat-dilr', label: 'Audit all 4 DILR sets before solving (pick best 2)', tip: 'Solving 2 full sets with 100% accuracy gives 98%ile' },
      { id: 'cat-tita', label: 'Fill in estimated answers for every single TITA question', tip: 'Zero penalty = risk-free score boost' },
      { id: 'cat-qa', label: 'Identify and solve 10 easiest Arithmetic/Algebra questions', tip: '11 correct in QA reaches 99th percentile' },
      { id: 'cat-skip', label: 'Drop any RC passage or QA problem after 2 minutes of confusion', tip: 'Time discipline is paramount' }
    ]
  },
  Banking: {
    goldenRule: "Prelims is a 60-minute, 100-question speed sprint. You cannot borrow time across sections (strict 20-min clock). Bank 15 marks in Quant in the first 8 minutes using Speed Math, and never guess on -0.25 penalty.",
    targetScore: "68 - 74 Marks",
    targetPercentileOrRank: "Cleared Prelims for SBI PO / IBPS PO",
    quickHacks: [
      {
        title: "Quant Speed Math Sprint (First 8 Mins)",
        marksImpact: "+15 Marks in 8m",
        description: "Solve Simplification (5 Qs), Wrong/Missing Number Series (5 Qs), and Quadratic Equations (5 Qs) first before looking at Word Problems.",
        tag: "Speed Engine"
      },
      {
        title: "Reasoning Miscellaneous First",
        marksImpact: "+15 Marks in 8m",
        description: "Solve Syllogisms, Inequalities, Coding-Decoding, and Direction Sense first. Only attempt circular/floor puzzles in the remaining 12 mins.",
        tag: "Safe Strategy"
      },
      {
        title: "No Variable-Heavy Puzzle Traps",
        marksImpact: "Saves 7-10 Mins",
        description: "If a puzzle has 3+ variables (e.g. 8 people + 8 colors + 8 cities), skip it immediately in Prelims. Stick to 1-variable puzzles.",
        tag: "Puzzle Defense"
      },
      {
        title: "English Speed Grammar Sweep",
        marksImpact: "+18 to 22 Marks",
        description: "Error detection, Cloze test, and Fillers are executed in 10 minutes. Read the RC story passage in the final 8 minutes.",
        tag: "Sectional Win"
      }
    ],
    checklist: [
      { id: 'bank-quant', label: 'Execute Simplification + Quadratic + Series in first 8 mins', tip: 'Banks 15 quick marks before lengthy DI' },
      { id: 'bank-reason', label: 'Solve Syllogisms & Inequalities before touching puzzles', tip: 'Prevents getting trapped in deadlock cases' },
      { id: 'bank-puzzle', label: 'Skip 3-variable puzzles immediately in Prelims', tip: 'Stick to single/two-variable arrangements' },
      { id: 'bank-timer', label: 'Observe 20-minute hard stop per section', tip: 'Cannot transfer leftover time to next section' }
    ]
  }
};

export const ExamStrategyWidget: React.FC<ExamStrategyWidgetProps> = ({
  currentExam,
  onNavigateTab,
  onSelectExam,
  onPracticePyqs,
  onOpenTutor,
  className = ''
}) => {
  const currentExamInfo = EXAMS_LIST.find(e => e.id === currentExam) || EXAMS_LIST[0];
  const roadmapData: ExamRoadmap = DOMAIN_ROADMAPS[currentExam] || DOMAIN_ROADMAPS.GATE;
  const tactics = DOMAIN_TACTICAL_HIGHLIGHTS[currentExam] || DOMAIN_TACTICAL_HIGHLIGHTS.GATE;

  // Active sub-tab in the widget: 'hacks' | 'rounds' | 'traps' | 'checklist'
  const [activeTab, setActiveTab] = useState<'hacks' | 'rounds' | 'traps' | 'checklist'>('hacks');

  // Interactive Checklist state stored in localStorage per exam
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`examai_strategy_checklist_${currentExam}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Keep checklist synced when exam changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`examai_strategy_checklist_${currentExam}`);
      setCheckedItems(saved ? JSON.parse(saved) : {});
    } catch {
      setCheckedItems({});
    }
  }, [currentExam]);

  const toggleChecklistItem = (id: string) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(`examai_strategy_checklist_${currentExam}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem(`examai_strategy_checklist_${currentExam}`);
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = tactics.checklist.filter(item => checkedItems[item.id]).length;
  const checklistPercent = tactics.checklist.length > 0 
    ? Math.round((completedCount / tactics.checklist.length) * 100) 
    : 0;

  return (
    <div 
      id="exam-strategy-sidebar-widget"
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col transition-all ${className}`}
    >
      {/* Widget Header with Domain Badge & Quick Switcher */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/60 border border-indigo-400/30 flex items-center justify-center text-amber-300 shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 block">
                  Exam Strategy Widget
                </span>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                  {currentExamInfo.name} Scoring Playbook
                </h3>
              </div>
            </div>

            {/* Target Score Pill */}
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0 flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-400" />
              {tactics.targetScore}
            </span>
          </div>

          {/* Quick Domain Selector Dropdown / Pills */}
          {onSelectExam && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none text-[11px]">
              <span className="text-slate-400 shrink-0 font-medium text-[10px]">Domain:</span>
              {EXAMS_LIST.map(exam => (
                <button
                  key={exam.id}
                  id={`strategy-pill-${exam.id}`}
                  type="button"
                  onClick={() => onSelectExam(exam.id)}
                  className={`px-2 py-0.5 rounded-lg font-semibold transition whitespace-nowrap ${
                    currentExam === exam.id
                      ? 'bg-indigo-500 text-white font-bold shadow-xs'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {exam.id === 'GATE_ECE' ? 'ECE' : exam.name.split(' ')[0]}
                </button>
              ))}
            </div>
          )}

          {/* Golden Rule Summary */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>How to Get Marks in {currentExamInfo.name}</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {tactics.goldenRule}
            </p>
          </div>

          {/* Target Tier Benchmark */}
          <div className="flex items-center justify-between text-[11px] text-slate-300 pt-0.5">
            <span className="text-slate-400">Competitive Goal:</span>
            <span className="font-semibold text-indigo-200">{tactics.targetPercentileOrRank}</span>
          </div>
        </div>
      </div>

      {/* Strategy Navigation Tabs */}
      <div className="flex items-center border-b border-slate-200 bg-slate-50/70 px-3 py-1.5 gap-1 text-xs overflow-x-auto scrollbar-none">
        <button
          type="button"
          id="strategy-tab-hacks"
          onClick={() => setActiveTab('hacks')}
          className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'hacks'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Marks Hacks</span>
        </button>

        <button
          type="button"
          id="strategy-tab-rounds"
          onClick={() => setActiveTab('rounds')}
          className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'rounds'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          <span>3-Round Pacing</span>
        </button>

        <button
          type="button"
          id="strategy-tab-traps"
          onClick={() => setActiveTab('traps')}
          className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'traps'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
          <span>Trap Defense</span>
        </button>

        <button
          type="button"
          id="strategy-tab-checklist"
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
          <span>Checklist</span>
          {completedCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {completedCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content Container */}
      <div className="p-4 sm:p-5 flex-1 space-y-4">

        {/* 1. MARKS HACKS TAB */}
        {activeTab === 'hacks' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Guaranteed Scoring Levers</span>
              <span className="text-[11px] font-mono text-indigo-600">4 Tactics</span>
            </div>

            <div className="space-y-2.5">
              {tactics.quickHacks.map((hack, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/20 transition space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{hack.title}</span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-200/60">
                        {hack.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0 font-mono">
                      {hack.marksImpact}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hack.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Link to Guaranteed Marks Bucket in Roadmap */}
            {roadmapData.guaranteedMarksBucket && roadmapData.guaranteedMarksBucket.length > 0 && (
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{roadmapData.guaranteedMarksBucket[0].categoryTitle}</span>
                </div>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  {roadmapData.guaranteedMarksBucket[0].tacticalTip}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 2. THREE-ROUND PACING TAB */}
        {activeTab === 'rounds' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Exam Hall Time Window Allocation</span>
              <span className="text-[11px] text-slate-500 font-mono">{currentExamInfo.durationMinutes} mins total</span>
            </div>

            <div className="space-y-3">
              {roadmapData.scoringRounds && roadmapData.scoringRounds.map((round) => {
                const roundColors = 
                  round.roundNumber === 1 ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950' :
                  round.roundNumber === 2 ? 'border-indigo-200 bg-indigo-50/40 text-indigo-950' :
                  'border-violet-200 bg-violet-50/40 text-violet-950';

                const badgeBg = 
                  round.roundNumber === 1 ? 'bg-emerald-600 text-white' :
                  round.roundNumber === 2 ? 'bg-indigo-600 text-white' :
                  'bg-violet-600 text-white';

                return (
                  <div 
                    key={round.roundNumber} 
                    className={`p-3.5 rounded-2xl border ${roundColors} space-y-2`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${badgeBg}`}>
                          {round.roundNumber}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{round.roundName}</div>
                          <div className="text-[11px] font-mono text-slate-500">{round.timeWindow}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shrink-0">
                        {round.targetHitRate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {round.strategy}
                    </p>

                    <div className="text-[11px] text-slate-500 bg-white/70 p-2 rounded-xl border border-slate-200/50">
                      <strong>Selection criteria:</strong> {round.selectionCriteria}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. TRAP SHIELD TAB */}
        {activeTab === 'traps' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Top Negative Marking Traps</span>
              <span className="text-[11px] text-rose-600 font-bold">Avoid Marks Bleed</span>
            </div>

            <div className="space-y-2.5">
              {roadmapData.topNegativeMarkingTraps && roadmapData.topNegativeMarkingTraps.slice(0, 4).map((trap, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{trap.trapName}</span>
                    </span>
                    <span className="text-[10px] font-bold text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200 shrink-0 font-mono">
                      -{trap.marksLostAvg}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-emerald-700 font-semibold">How to prevent:</strong> {trap.howToPrevent}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TACTICS CHECKLIST TAB */}
        {activeTab === 'checklist' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Exam Strategy Readiness</span>
                <span className="text-[11px] text-slate-500">{completedCount} of {tactics.checklist.length} tactics applied</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-indigo-700">{checklistPercent}%</span>
                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={resetChecklist}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition"
                    title="Reset Checklist"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${checklistPercent}%` }}
              ></div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-1">
              {tactics.checklist.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                        : 'bg-slate-50/80 border-slate-200/80 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-slate-400">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className={`text-xs font-semibold leading-snug ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-normal">
                        {item.tip}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Widget Footer Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2 shrink-0">
        <button
          type="button"
          id="strategy-open-roadmap-btn"
          onClick={() => onNavigateTab('roadmap')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition group"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-200" />
            <span>Open Complete {currentExamInfo.name} Roadmap</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          {onPracticePyqs && (
            <button
              type="button"
              id="strategy-practice-pyq-btn"
              onClick={onPracticePyqs}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>High-Yield PYQs</span>
            </button>
          )}

          {onOpenTutor && (
            <button
              type="button"
              id="strategy-tutor-query-btn"
              onClick={onOpenTutor}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ask AI Coach</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
