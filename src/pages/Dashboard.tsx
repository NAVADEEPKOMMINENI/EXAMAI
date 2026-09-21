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
  Compass
} from 'lucide-react';
import { buildRecommendationPlan } from '../services/weaknessEngine';

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
  onSelectExam
}) => {
  const currentExamInfo = EXAMS_LIST.find(e => e.id === currentExam) || EXAMS_LIST[0];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div 
          onClick={() => onNavigateTab('knowledge-map')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition space-y-2"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Target className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">{currentExam} Knowledge Map</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Explore your complete {currentExamInfo.name} syllabus tree with color-coded nodes (🟢 Strong, 🟡 Good, 🔴 Weak).
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('resources')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition space-y-2"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">{currentExam} Curated Resources</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Access verified lecture notes, YouTube masterclasses, and official previous papers for {currentExamInfo.name}.
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
            Chat with a diagnostic tutor that understands exactly why you missed recent {currentExam} questions.
          </p>
        </div>
      </div>

    </div>
  );
};
