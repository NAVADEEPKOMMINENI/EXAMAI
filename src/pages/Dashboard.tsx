import React from 'react';
import { 
  StudentProfile, 
  WeaknessItem, 
  ConceptMastery, 
  ExamType,
  ResourceItem 
} from '../types';
import { EXAMS_LIST, DOMAIN_DEFAULT_WEAKNESSES } from '../data/mockData';
import { WeaknessCard } from '../components/WeaknessCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { 
  Sparkles, 
  PlayCircle, 
  HelpCircle, 
  FileText, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Target,
  Clock,
  Award,
  Users,
  Compass,
  Terminal
} from 'lucide-react';
import { buildRecommendationPlan } from '../services/weaknessEngine';
import { ExamStrategyWidget } from '../components/ExamStrategyWidget';
import { DOMAIN_ROADMAPS } from '../data/roadmapData';

interface DashboardProps {
  studentProfile: StudentProfile;
  currentExam: ExamType;
  masteryData: ConceptMastery[];
  weaknesses: WeaknessItem[];
  onStartDiagnostic: () => void;
  onNavigateTab: (tab: any) => void;
  onSelectConceptForPractice: (conceptId: string, isPyq?: boolean) => void;
  onOpenResource: (resource: ResourceItem) => void;
  onSelectExam?: (exam: ExamType) => void;
  onOpenTutor?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  studentProfile,
  currentExam,
  masteryData,
  weaknesses,
  onStartDiagnostic,
  onNavigateTab,
  onSelectConceptForPractice,
  onOpenResource,
  onSelectExam,
  onOpenTutor
}) => {
  const currentExamInfo = EXAMS_LIST.find(e => e.id === currentExam) || EXAMS_LIST[0];
  const currentRoadmap = DOMAIN_ROADMAPS[currentExam] || DOMAIN_ROADMAPS.GATE;

  // Dynamically compute subject masteries for the CURRENT EXAM
  const getSubjectMastery = (subjectName: string) => {
    // 1. First search masteryData matching examId and subjectName
    const directMatches = masteryData.filter(m => 
      m.examId === currentExam && 
      (m.subjectName.toLowerCase().includes(subjectName.toLowerCase()) || subjectName.toLowerCase().includes(m.subjectName.toLowerCase()))
    );
    if (directMatches.length > 0) {
      const avg = directMatches.reduce((sum, curr) => sum + curr.masteryPercentage, 0) / directMatches.length;
      return Math.round(avg);
    }

    // 2. Search masteryData matching subjectName
    const nameMatches = masteryData.filter(m => 
      m.subjectName.toLowerCase().includes(subjectName.toLowerCase()) || 
      subjectName.toLowerCase().includes(m.subjectName.toLowerCase())
    );
    if (nameMatches.length > 0) {
      const avg = nameMatches.reduce((sum, curr) => sum + curr.masteryPercentage, 0) / nameMatches.length;
      return Math.round(avg);
    }

    // Default realistic baseline if not yet tested
    return 54;
  };

  const subjectStats = currentExamInfo.subjects.map((subName) => {
    const percentage = getSubjectMastery(subName);
    const status = 
      percentage >= 75 ? 'Strong' :
      percentage >= 60 ? 'Good' :
      percentage >= 45 ? 'Weak' : 'Critical';
    return {
      name: subName,
      percentage,
      status,
      badge: status
    };
  });

  // Dynamically identify the Primary Weakness for the active exam domain
  const domainWeaknesses = weaknesses.filter(w => 
    w.examId === currentExam || 
    currentExamInfo.subjects.some(s => 
      s.toLowerCase().includes(w.subjectName.toLowerCase()) || 
      w.subjectName.toLowerCase().includes(s.toLowerCase())
    )
  );

  const primaryWeakness = domainWeaknesses[0] || DOMAIN_DEFAULT_WEAKNESSES[currentExam] || weaknesses[0] || {
    id: 'w-default',
    conceptId: 'cn-tcp-congestion',
    conceptName: 'TCP Congestion Control',
    topicName: 'Transport Layer Protocols',
    subjectName: 'Computer Networks',
    examId: currentExam,
    errorTypes: ['Conceptual', 'Time'],
    accuracy: 30,
    avgTime: 95,
    benchmarkTime: 75,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 6,
    reason: '6 incorrect answers in recent attempts.',
    quickExplanation: 'Review core formulas and high-yield concepts for ' + currentExamInfo.name,
    recommendedAction: 'Practice targeted questions + PYQs.'
  };

  const recommendationPlan = buildRecommendationPlan(primaryWeakness);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Welcome Greeting Banner (Adapts dynamically to current domain) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {studentProfile.name} 👋
            </h1>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-600 text-white font-bold shadow-xs">
              {currentExamInfo.name}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200 hidden sm:inline-block">
              {currentExamInfo.fullName}
            </span>
          </div>
          
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            ExamAI is actively tracking your <strong className="text-slate-800 font-semibold">{currentExamInfo.name}</strong> cognitive accuracy across {currentExamInfo.subjects.length} core syllabus subjects ({currentExamInfo.subjects.slice(0, 3).join(', ')}{currentExamInfo.subjects.length > 3 ? '...' : ''}).
          </p>

          {/* Exam Meta Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              Total Marks: {currentExamInfo.totalMarks}
            </span>
            <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              Duration: {currentExamInfo.durationMinutes} mins
            </span>
            <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              {currentExamInfo.targetAspirants}
            </span>
          </div>
        </div>

        {/* Diagnostic Assessment CTA */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            id="dashboard-start-test-btn"
            type="button"
            onClick={onStartDiagnostic}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 transition"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Take {currentExam} Diagnostic</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Activity Feed & Right Exam Strategy Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Feed (Left 7-8 cols on large screens) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8 min-w-0">

          {/* Domain Preparation Roadmap & Scoring Strategy Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  Domain Strategic Blueprint
                </span>
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Scoring Playbook & Traps
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                {currentExamInfo.name} 4-Phase Roadmap & Exact Scoring Strategy
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Detailed subject weightages, guaranteed free-marks pools, 3-round exam pacing, and negative marking shield for {currentExamInfo.fullName}.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative z-10">
              <button
                type="button"
                onClick={() => onNavigateTab('roadmap')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>Explore {currentExam} Roadmap</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
          </div>

          {/* 2. Overall Mastery & Dynamic Subject Status Cards for current domain */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  {currentExamInfo.name} Syllabus Competency Breakdown
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {currentExamInfo.subjects.length} Active Subjects
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              
              {/* Dynamic Subject Cards for CURRENT EXAM */}
              {subjectStats.map(sub => {
                const badgeClass = 
                  sub.status === 'Strong' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                  sub.status === 'Good' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                  sub.status === 'Weak' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-rose-50 text-rose-800 border-rose-200';

                const barColor = 
                  sub.status === 'Strong' ? 'bg-emerald-500' :
                  sub.status === 'Good' ? 'bg-sky-500' :
                  sub.status === 'Weak' ? 'bg-amber-500' : 'bg-rose-500';

                return (
                  <div key={sub.name} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeClass}`}>
                        {sub.badge}
                      </span>
                      <span className="text-base font-bold text-slate-800 font-mono">{sub.percentage}%</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">{sub.name}</h4>
                    </div>

                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} rounded-full`} style={{ width: `${sub.percentage}%` }}></div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigateTab('resources')}
                      className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-between pt-1 group"
                    >
                      <span>Syllabus Resources</span>
                      <ArrowRight className="w-3 h-3 transition group-hover:translate-x-0.5" />
                    </button>
                  </div>
                );
              })}

            </div>
          </div>

          {/* 3. Highlighted Weakest Concept for CURRENT EXAM */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Primary Weakness Alert • {currentExamInfo.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('weaknesses')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition"
              >
                <span>View All Exam Errors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Primary Weakness Card with Action Buttons */}
            <WeaknessCard
              weakness={primaryWeakness}
              onLearnConcept={() => onNavigateTab('resources')}
              onWatchVideo={() => onNavigateTab('resources')}
              onPracticeQuestions={(cid) => onSelectConceptForPractice(cid, false)}
              onAttemptPyqs={(cid) => onSelectConceptForPractice(cid, true)}
            />
          </div>

          {/* 4. AI Recommendation Engine Box */}
          <RecommendationCard
            plan={recommendationPlan}
            onStartTargetedPractice={() => onSelectConceptForPractice(primaryWeakness.conceptId, false)}
            onStartPyqPractice={() => onSelectConceptForPractice(primaryWeakness.conceptId, true)}
            onReadNotes={(nid) => {
              const res = recommendationPlan.notes.find(n => n.id === nid) || recommendationPlan.notes[0];
              if (res) onOpenResource(res);
            }}
            onWatchVideo={(vid) => {
              const res = recommendationPlan.videos.find(v => v.id === vid) || recommendationPlan.videos[0];
              if (res) onOpenResource(res);
            }}
          />

          {/* 5. Quick Links to Knowledge Map, Resources, & AI Tutor */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => onNavigateTab('knowledge-map')}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">{currentExam} Knowledge Map</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explore syllabus nodes with color-coded masteries.
              </p>
            </div>

            <div 
              onClick={() => onNavigateTab('resources')}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">{currentExam} Resources</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lecture notes, YouTube masterclasses, and PYQs.
              </p>
            </div>

            <div 
              onClick={() => onNavigateTab('ai-tutor')}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-violet-300 hover:shadow-md cursor-pointer transition space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Personalized AI Tutor</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Chat with a tutor that understands your errors.
              </p>
            </div>
          </div>

          {/* 6. Local Setup & VS Code Development Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center shrink-0">
                <Terminal className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Run ExamAI Locally in VS Code</span>
                  <span className="text-[10px] uppercase font-bold bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 px-2 py-0.5 rounded-full">Dev Guide</span>
                </div>
                <p className="text-xs text-slate-300">
                  Terminal instructions, npm/yarn commands, environment setup, and recommended extensions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('setup-guide')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-xs"
            >
              <span>Open Setup Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Sidebar Column (Right 5 cols on lg / 4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 min-w-0 sticky top-4">
          
          {/* 1. The Context-Aware Exam Strategy Sidebar Widget */}
          <ExamStrategyWidget
            currentExam={currentExam}
            onNavigateTab={onNavigateTab}
            onSelectExam={onSelectExam}
            onPracticePyqs={() => onSelectConceptForPractice(primaryWeakness.conceptId, true)}
            onOpenTutor={onOpenTutor || (() => onNavigateTab('ai-tutor'))}
          />

          {/* 2. Official Exam Marking Scheme & Blueprint Snapshot */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {currentExamInfo.name} Marking Blueprint
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Official Rules
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Correct Answer</span>
                <span className="font-semibold text-emerald-700">{currentRoadmap.markingScheme.correct}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Negative Penalty</span>
                <span className="font-semibold text-rose-600">{currentRoadmap.markingScheme.incorrect}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Unattempted</span>
                <span className="font-semibold text-slate-700">{currentRoadmap.markingScheme.unattempted}</span>
              </div>
              {currentRoadmap.markingScheme.specialRules && (
                <div className="pt-1.5 text-[11px] text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70 leading-relaxed">
                  <strong>Special Strategy Rule:</strong> {currentRoadmap.markingScheme.specialRules}
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{currentExamInfo.durationMinutes} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span>{currentRoadmap.totalQuestions || 65} questions</span>
              </div>
              <div className="font-semibold text-indigo-600">
                ~{Math.round((currentExamInfo.durationMinutes / (currentRoadmap.totalQuestions || 65)) * 10) / 10}m / Q
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
