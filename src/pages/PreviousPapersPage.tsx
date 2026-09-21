import React, { useState } from 'react';
import { ExamType, PreviousYearPaper } from '../types';
import { PREVIOUS_YEAR_PAPERS } from '../data/previousYearPapers';
import { EXAMS_LIST } from '../data/mockData';
import { 
  FileText, 
  PlayCircle, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  Download, 
  ExternalLink, 
  Filter, 
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Layers,
  HelpCircle,
  Hash
} from 'lucide-react';

interface PreviousPapersPageProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  onOpenPdfModal: (paper: PreviousYearPaper) => void;
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
  onStartPaperTest: (paper: PreviousYearPaper) => void;
}

export const PreviousPapersPage: React.FC<PreviousPapersPageProps> = ({
  currentExam,
  onSelectExam,
  onOpenPdfModal,
  onOpenVideoModal,
  onStartPaperTest
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter papers by current active exam domain
  const domainPapers = PREVIOUS_YEAR_PAPERS.filter(p => p.examId === currentExam);

  // Apply filters
  const filteredPapers = domainPapers.filter(paper => {
    if (selectedYear !== 'all' && paper.year.toString() !== selectedYear) return false;
    if (selectedDifficulty !== 'all' && paper.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = paper.title.toLowerCase().includes(q);
      const matchTopics = paper.highlightTopics.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchTopics) return false;
    }
    return true;
  });

  const currentExamInfo = EXAMS_LIST.find(e => e.id === currentExam) || EXAMS_LIST[0];

  // Distinct available years for current exam
  const availableYears = Array.from(new Set(domainPapers.map(p => p.year.toString()))).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Domain Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Official Previous Year Question Papers (PYQs)
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Master {currentExamInfo.name} with Official Past Exam Papers
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Practice actual past papers formatted with exact real examination patterns—including Single Correct MCQs, Multiple Select MSQs, and Numerical Answer Types (NAT).
          </p>

          {/* Quick Domain Switcher Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Switch Exam Domain:</span>
            {EXAMS_LIST.map(exam => (
              <button
                key={exam.id}
                type="button"
                onClick={() => onSelectExam(exam.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  currentExam === exam.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                {exam.name}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Year Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Year:</span>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Years</option>
              {availableYears.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Difficulties</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
              <option value="Tough">Tough</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by topic or shift..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>
      </div>

      {/* Papers Grid */}
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map(paper => (
            <div
              key={paper.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                      {paper.year}
                    </span>
                    {paper.sessionOrShift && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                        {paper.sessionOrShift}
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    paper.difficulty === 'Tough'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : paper.difficulty === 'Challenging'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {paper.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {paper.title}
                </h3>

                {/* Key stats row */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="block text-xs text-slate-400 font-medium">Questions</span>
                    <span className="font-bold text-slate-800 text-sm">{paper.totalQuestions}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="block text-xs text-slate-400 font-medium">Duration</span>
                    <span className="font-bold text-slate-800 text-sm">{paper.durationMinutes} min</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="block text-xs text-slate-400 font-medium">Official Cutoff</span>
                    <span className="font-bold text-indigo-700 text-sm">{paper.cutoffMarks ?? '--'}</span>
                  </div>
                </div>

                {/* Question Pattern Breakdown Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Question Pattern Distribution:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                      MCQ: {paper.questionsCountByPattern.mcq}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-800 border border-violet-200 font-medium">
                      MSQ: {paper.questionsCountByPattern.msq}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                      NAT: {paper.questionsCountByPattern.nat}
                    </span>
                  </div>
                </div>

                {/* Highlight topics */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    High-Yield Tested Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {paper.highlightTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenPdfModal(paper)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                    title="View PDF with Question Paper & Keys"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>View PDF</span>
                  </button>

                  {paper.videoWalkthroughUrl && onOpenVideoModal && (
                    <button
                      type="button"
                      onClick={() => onOpenVideoModal(paper.videoWalkthroughUrl!, paper.title)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                      title="Watch Video Solutions"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-red-600" />
                      <span>Video Solution</span>
                    </button>
                  )}
                </div>

                {/* Primary: Start Simulated Test */}
                <button
                  type="button"
                  onClick={() => onStartPaperTest(paper)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
                >
                  <span>Solve Paper Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No previous papers match this filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your year or difficulty filter, or switch to another exam domain above to explore official papers.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedYear('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
