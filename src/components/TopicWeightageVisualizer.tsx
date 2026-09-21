import React, { useState, useEffect, useMemo } from 'react';
import { ExamType, TopicYieldItem, YieldTier } from '../types';
import { getTopicYieldsByExam, getTopicYieldSummary } from '../data/topicWeightagesData';
import { 
  Flame, 
  Sparkles, 
  Layers, 
  Search, 
  SlidersHorizontal, 
  Clock, 
  Target, 
  Award, 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  Circle, 
  HelpCircle,
  TrendingUp,
  BarChart3,
  ListFilter,
  ArrowRight,
  Filter,
  Info,
  Calendar,
  Zap,
  Check
} from 'lucide-react';

interface TopicWeightageVisualizerProps {
  currentExam: ExamType;
  onNavigateTab: (tab: any) => void;
  onSelectConceptForPractice?: (conceptId: string, isPyq?: boolean) => void;
  onOpenResource?: (resource: any) => void;
  onOpenTutor?: (topicName?: string) => void;
}

type ViewMode = 'matrix' | 'chart' | 'planner' | 'table';
type SortOption = 'priority' | 'marks-desc' | 'hours-asc' | 'recurrence-desc';
type TopicStatus = 'not-started' | 'in-progress' | 'mastered';

export const TopicWeightageVisualizer: React.FC<TopicWeightageVisualizerProps> = ({
  currentExam,
  onNavigateTab,
  onSelectConceptForPractice,
  onOpenTutor
}) => {
  // View states
  const [viewMode, setViewMode] = useState<ViewMode>('matrix');
  const [selectedTier, setSelectedTier] = useState<'all' | YieldTier>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('priority');

  // Interactive Planner state: available study hours
  const [availableHours, setAvailableHours] = useState<number>(80);

  // Local storage persistence for user topic mastery status
  const [topicStatus, setTopicStatus] = useState<Record<string, TopicStatus>>(() => {
    try {
      const saved = localStorage.getItem(`examai_topic_status_${currentExam}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Re-load on exam change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`examai_topic_status_${currentExam}`);
      setTopicStatus(saved ? JSON.parse(saved) : {});
    } catch {
      setTopicStatus({});
    }
  }, [currentExam]);

  // Toggle or cycle status
  const cycleTopicStatus = (topicId: string) => {
    setTopicStatus(prev => {
      const current = prev[topicId] || 'not-started';
      const next: TopicStatus = 
        current === 'not-started' ? 'in-progress' :
        current === 'in-progress' ? 'mastered' : 'not-started';
      
      const updated = { ...prev, [topicId]: next };
      try {
        localStorage.setItem(`examai_topic_status_${currentExam}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Get raw data and summary
  const allTopics = useMemo(() => getTopicYieldsByExam(currentExam), [currentExam]);
  const summary = useMemo(() => getTopicYieldSummary(currentExam), [currentExam]);

  // Unique subjects for filtering
  const subjectsList = useMemo(() => {
    const set = new Set<string>();
    allTopics.forEach(t => set.add(t.subjectName));
    return Array.from(set);
  }, [allTopics]);

  // Filtered & Sorted Topics
  const filteredTopics = useMemo(() => {
    return allTopics
      .filter(topic => {
        // Tier filter
        if (selectedTier !== 'all' && topic.yieldTier !== selectedTier) return false;
        // Subject filter
        if (selectedSubject !== 'all' && topic.subjectName !== selectedSubject) return false;
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = topic.topicName.toLowerCase().includes(q);
          const matchSub = topic.subjectName.toLowerCase().includes(q);
          const matchNote = topic.tacticalNote.toLowerCase().includes(q);
          if (!matchTitle && !matchSub && !matchNote) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'marks-desc') {
          return b.marksContribution - a.marksContribution;
        }
        if (sortOption === 'hours-asc') {
          return a.avgStudyHours - b.avgStudyHours;
        }
        if (sortOption === 'recurrence-desc') {
          return b.pyqRecurrencePercent - a.pyqRecurrencePercent;
        }
        // default priority
        const tierOrder: Record<YieldTier, number> = {
          'high-yield': 1,
          'medium-yield': 2,
          'low-yield': 3
        };
        if (tierOrder[a.yieldTier] !== tierOrder[b.yieldTier]) {
          return tierOrder[a.yieldTier] - tierOrder[b.yieldTier];
        }
        return b.marksContribution - a.marksContribution;
      });
  }, [allTopics, selectedTier, selectedSubject, searchQuery, sortOption]);

  // Mastery statistics for current user
  const userMasteryStats = useMemo(() => {
    const highYields = allTopics.filter(t => t.yieldTier === 'high-yield');
    const masteredHigh = highYields.filter(t => topicStatus[t.id] === 'mastered').length;
    const inProgressHigh = highYields.filter(t => topicStatus[t.id] === 'in-progress').length;

    const totalMastered = allTopics.filter(t => topicStatus[t.id] === 'mastered').length;
    const marksSecuredEstimate = allTopics
      .filter(t => topicStatus[t.id] === 'mastered')
      .reduce((sum, t) => sum + t.marksContribution, 0);

    return {
      masteredHigh,
      highTotal: highYields.length,
      highPercent: highYields.length > 0 ? Math.round((masteredHigh / highYields.length) * 100) : 0,
      inProgressHigh,
      totalMastered,
      marksSecuredEstimate
    };
  }, [allTopics, topicStatus]);

  // Planner recommendations based on availableHours
  const plannerSchedule = useMemo(() => {
    // Sort topics by efficiency: marks per hour
    const sortedByROI = [...allTopics].sort((a, b) => {
      const roiA = a.marksContribution / Math.max(a.avgStudyHours, 1);
      const roiB = b.marksContribution / Math.max(b.avgStudyHours, 1);
      return roiB - roiA;
    });

    let cumulativeHours = 0;
    const recommended: TopicYieldItem[] = [];
    const dePrioritized: TopicYieldItem[] = [];

    for (const t of sortedByROI) {
      if (cumulativeHours + t.avgStudyHours <= availableHours) {
        cumulativeHours += t.avgStudyHours;
        recommended.push(t);
      } else {
        dePrioritized.push(t);
      }
    }

    const marksExpected = recommended.reduce((sum, t) => sum + t.marksContribution, 0);

    return {
      recommended,
      dePrioritized,
      usedHours: cumulativeHours,
      marksExpected
    };
  }, [allTopics, availableHours]);

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Topic Weightage Matrix
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                High-Yield Prioritization
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentExam} Curriculum Analysis
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Color-Coded Topic Weightage & Marks ROI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
              Every topic is categorized as <strong className="text-rose-600 font-bold">High-Yield</strong> (maximum score per hour), <strong className="text-amber-600 font-bold">Medium-Yield</strong> (stable core), or <strong className="text-slate-600 font-bold">Low-Yield</strong> (diminishing return). Focus your study hours where marks are guaranteed.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'matrix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Priority Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('chart')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'chart' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Yield Chart</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('planner')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'planner' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Study Hours Planner</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Detailed Table</span>
            </button>
          </div>
        </div>

        {/* 2. Pareto 80/20 Rule Distribution Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              <span className="font-bold text-sm text-white">The 80/20 Yield Distribution in {currentExam}</span>
            </div>
            <span className="text-slate-300 font-mono text-[11px]">
              Total Tracked Blueprint: ~{summary.totalTrackedMarks} Marks across {summary.totalTopics} Key Topics
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              <div 
                className="h-full bg-rose-500 hover:bg-rose-400 transition cursor-help relative group" 
                style={{ width: `${summary.highYieldMarksPercent}%` }}
                title={`High-Yield: ${summary.highMarks} Marks (${summary.highYieldMarksPercent}%)`}
              ></div>
              <div 
                className="h-full bg-amber-400 hover:bg-amber-300 transition cursor-help" 
                style={{ width: `${summary.totalTrackedMarks > 0 ? (summary.medMarks / summary.totalTrackedMarks) * 100 : 0}%` }}
                title={`Medium-Yield: ${summary.medMarks} Marks`}
              ></div>
              <div 
                className="h-full bg-slate-500 hover:bg-slate-400 transition cursor-help" 
                style={{ width: `${summary.totalTrackedMarks > 0 ? (summary.lowMarks / summary.totalTrackedMarks) * 100 : 0}%` }}
                title={`Low-Yield: ${summary.lowMarks} Marks`}
              ></div>
            </div>

            {/* Bar Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-rose-500 inline-block shrink-0"></span>
                <span className="font-bold text-rose-300">High-Yield Topics:</span>
                <span className="text-white font-mono font-bold">{summary.highMarks} Marks ({summary.highYieldMarksPercent}%)</span>
                <span className="text-slate-400">({summary.highYieldCount} topics)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-amber-400 inline-block shrink-0"></span>
                <span className="font-bold text-amber-300">Medium-Yield:</span>
                <span className="text-white font-mono font-bold">{summary.medMarks} Marks</span>
                <span className="text-slate-400">({summary.mediumYieldCount} topics)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-500 inline-block shrink-0"></span>
                <span className="font-bold text-slate-300">Low-Yield / Edge:</span>
                <span className="text-white font-mono font-bold">{summary.lowMarks} Marks</span>
                <span className="text-slate-400">({summary.lowYieldCount} topics)</span>
              </div>
            </div>
          </div>

          {/* User Progress Tracker Bar */}
          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-200">
                Your High-Yield Progress: <strong className="text-white font-bold">{userMasteryStats.masteredHigh} of {userMasteryStats.highTotal}</strong> topics mastered ({userMasteryStats.highPercent}%)
              </span>
            </div>
            <div className="text-emerald-300 font-mono text-xs">
              Estimated ~{userMasteryStats.marksSecuredEstimate} Marks Secured in Bank
            </div>
          </div>
        </div>

        {/* 3. Filter, Search, and Sort Control Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          {/* Yield Tier Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedTier('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedTier === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Topics ({allTopics.length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedTier('high-yield')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTier === 'high-yield'
                  ? 'bg-rose-600 text-white shadow-xs shadow-rose-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>High-Yield Only ({summary.highYieldCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTier('medium-yield')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTier === 'medium-yield'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Medium-Yield ({summary.mediumYieldCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTier('low-yield')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedTier === 'low-yield'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Low-Yield ({summary.lowYieldCount})
            </button>
          </div>

          {/* Right Controls: Subject Dropdown, Search, and Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Subject Dropdown */}
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Subjects ({subjectsList.length})</option>
              {subjectsList.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search topics or tricks..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44 sm:w-52"
              />
            </div>

            {/* Sort Selector */}
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value as SortOption)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="priority">Sort: Priority / Yield</option>
              <option value="marks-desc">Sort: Highest Marks First</option>
              <option value="hours-asc">Sort: Quick Wins (Lowest Hours)</option>
              <option value="recurrence-desc">Sort: Past 10-Yr Recurrence</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. VIEW MODE 1: PRIORITY MATRIX / VISUAL CARDS */}
      {viewMode === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map(topic => {
            const status = topicStatus[topic.id] || 'not-started';
            const isHigh = topic.yieldTier === 'high-yield';
            const isMed = topic.yieldTier === 'medium-yield';

            const cardBorder = 
              isHigh ? 'border-rose-200 hover:border-rose-300 bg-white hover:shadow-md' :
              isMed ? 'border-amber-200 hover:border-amber-300 bg-white hover:shadow-sm' :
              'border-slate-200 hover:border-slate-300 bg-slate-50/70';

            const badgeStyle = 
              isHigh ? 'bg-rose-50 text-rose-700 border-rose-200' :
              isMed ? 'bg-amber-50 text-amber-800 border-amber-200' :
              'bg-slate-100 text-slate-600 border-slate-200';

            const markBarWidth = Math.min(100, Math.round((topic.marksContribution / 12) * 100));

            return (
              <div 
                key={topic.id}
                className={`rounded-3xl border ${cardBorder} p-5 flex flex-col justify-between space-y-4 transition relative overflow-hidden`}
              >
                {/* Top Accent Strip */}
                {isHigh && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500"></div>
                )}

                {/* Header: Badges & Checkbox */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${badgeStyle} flex items-center gap-1`}>
                        {isHigh && <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />}
                        {isMed && <Sparkles className="w-3 h-3 text-amber-500" />}
                        <span>{topic.yieldTier.replace('-', ' ')}</span>
                      </span>

                      <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[130px]" title={topic.subjectName}>
                        {topic.subjectName}
                      </span>
                    </div>

                    {/* Interactive Completion Toggle */}
                    <button
                      type="button"
                      onClick={() => cycleTopicStatus(topic.id)}
                      className={`px-2 py-1 rounded-xl text-[10px] font-bold transition flex items-center gap-1 ${
                        status === 'mastered' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : status === 'in-progress'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                      title="Click to cycle status: Not Started -> In Progress -> Mastered"
                    >
                      {status === 'mastered' && <Check className="w-3 h-3 text-emerald-600" />}
                      {status === 'in-progress' && <Clock className="w-3 h-3 text-indigo-600" />}
                      {status === 'not-started' && <Circle className="w-3 h-3 text-slate-400" />}
                      <span className="capitalize">{status.replace('-', ' ')}</span>
                    </button>
                  </div>

                  {/* Topic Title */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {topic.topicName}
                  </h3>
                </div>

                {/* Visual Meters: Marks & Recurrence */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Exam Weightage:</span>
                    </span>
                    <span className="font-extrabold text-indigo-950 font-mono">
                      {topic.marksRange}
                    </span>
                  </div>

                  {/* Micro Bar */}
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-slate-400'}`}
                      style={{ width: `${markBarWidth}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Prep: ~{topic.avgStudyHours} hrs</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 justify-end">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span className="font-medium text-emerald-700">{topic.pyqRecurrencePercent}% PYQ freq</span>
                    </div>
                  </div>
                </div>

                {/* Tactical Scoring Advice */}
                <div className="text-xs text-slate-600 leading-relaxed bg-white/80 rounded-xl p-2 border border-slate-100/80">
                  <strong className="text-slate-900 font-semibold block text-[11px] mb-0.5">Tactical Play:</strong>
                  {topic.tacticalNote}
                </div>

                {/* Action Links */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md border border-indigo-100">
                    ROI: {topic.roiRating}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectConceptForPractice ? onSelectConceptForPractice(topic.relatedConceptId || 'c1', true) : onNavigateTab('practice')}
                      className="px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-2xs"
                    >
                      <span>Drill PYQs</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    {onOpenTutor && (
                      <button
                        type="button"
                        onClick={() => onOpenTutor(topic.topicName)}
                        className="p-1 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                        title="Ask AI Coach about this topic"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTopics.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No topics match your filters</h4>
              <p className="text-xs text-slate-400">Try clearing your search query or selecting "All Topics".</p>
              <button
                type="button"
                onClick={() => { setSelectedTier('all'); setSelectedSubject('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. VIEW MODE 2: COMPARATIVE YIELD CHART & SPECTRUM */}
      {viewMode === 'chart' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>Comparative Yield & Marks Contribution Spectrum</span>
            </h3>
            <p className="text-xs text-slate-500">
              Horizontal visual ranking of topics sorted by marks impact and past 10-year question recurrence in {currentExam}.
            </p>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            {filteredTopics.map((topic, idx) => {
              const isHigh = topic.yieldTier === 'high-yield';
              const isMed = topic.yieldTier === 'medium-yield';
              const maxMarks = 16;
              const barWidthPercent = Math.min(100, Math.max(10, Math.round((topic.marksContribution / maxMarks) * 100)));

              return (
                <div key={topic.id} className="pt-3 first:pt-0 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400 text-[10px] w-5">#{idx + 1}</span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{topic.topicName}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {topic.subjectName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto text-xs font-mono">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isHigh ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        isMed ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {topic.yieldTier.toUpperCase()}
                      </span>
                      <span className="font-extrabold text-indigo-900">{topic.marksRange}</span>
                      <span className="text-slate-400 text-[11px]">(~{topic.avgStudyHours}h study)</span>
                    </div>
                  </div>

                  {/* Chart Bar */}
                  <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                    <div 
                      className={`h-full rounded-lg transition flex items-center justify-end px-2 text-[10px] font-bold text-white ${
                        isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${barWidthPercent}%` }}
                    >
                      {topic.marksContribution}m
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. VIEW MODE 3: STUDY TIME PRIORITIZER / ALLOCATION PLANNER */}
      {viewMode === 'planner' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-7">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200">
                Algorithm-Guided Time Budgeting
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Targeted Score Maximizer
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Exam Countdown: Study Time Prioritizer
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Slide to your available study hours until exam day. The engine automatically cherry-picks the highest-yield topics to maximize your score and tells you which low-return topics to safely skip.
            </p>
          </div>

          {/* Interactive Hours Slider */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Your Available Study Hours:</span>
              </span>
              <span className="text-lg font-black text-indigo-700 font-mono">
                {availableHours} Hours (~{Math.round(availableHours / 15)} Weeks at 15h/wk)
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="250"
              step="10"
              value={availableHours}
              onChange={e => setAvailableHours(Number(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>20 hrs (Sprint Revision)</span>
              <span>80 hrs (Targeted Prep)</span>
              <span>150 hrs (Standard Cycle)</span>
              <span>250 hrs (Full Mastery)</span>
            </div>

            {/* Projected Outcome Badge */}
            <div className="p-4 rounded-xl bg-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-300">Projected Marks Captured</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ~{plannerSchedule.marksExpected} Marks
                </div>
                <span className="text-xs text-slate-300">
                  from {plannerSchedule.recommended.length} high-efficiency topics using {plannerSchedule.usedHours} of your {availableHours} available hours.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('practice')}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Start Priority Drill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side-by-Side Topics: Study First vs Skip If Time is Short */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. MUST-STUDY TOPICS (IN THE BUDGET) */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Top Priority Topics to Master ({plannerSchedule.recommended.length})</span>
                </h4>
                <span className="text-xs font-bold text-emerald-700">
                  {plannerSchedule.usedHours} hrs total
                </span>
              </div>

              <div className="space-y-2">
                {plannerSchedule.recommended.map((t, idx) => (
                  <div key={t.id} className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{idx + 1}. {t.topicName}</span>
                      <span className="text-xs font-extrabold text-emerald-700 font-mono whitespace-nowrap">+{t.marksContribution}m</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{t.subjectName}</span>
                      <span>Requires ~{t.avgStudyHours} hrs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. TOPICS TO DE-PRIORITIZE / SKIP IF TIME CRUNCH */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>De-Prioritize / Study Only If Surplus Time ({plannerSchedule.dePrioritized.length})</span>
                </h4>
                <span className="text-xs text-slate-400">Diminishing ROI</span>
              </div>

              <div className="space-y-2">
                {plannerSchedule.dePrioritized.map(t => (
                  <div key={t.id} className="p-3 rounded-xl bg-white border border-slate-200 opacity-80 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-slate-700 line-through-none">{t.topicName}</span>
                      <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{t.marksContribution}m</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{t.subjectName}</span>
                      <span>High prep cost: ~{t.avgStudyHours} hrs</span>
                    </div>
                  </div>
                ))}
                {plannerSchedule.dePrioritized.length === 0 && (
                  <div className="text-xs text-emerald-700 font-medium py-6 text-center">
                    Awesome! With {availableHours} hours, you have enough bandwidth to cover all major exam topics!
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 7. VIEW MODE 4: DETAILED TOPIC TABLE */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-indigo-600" />
              <span>Full Curriculum Weightage Matrix</span>
            </h3>
            <p className="text-xs text-slate-500">
              Granular topic metadata, past 10-year question frequency, expected marks, and direct drill actions.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Topic & Subject</th>
                  <th className="py-3 px-4">Yield Tier</th>
                  <th className="py-3 px-4">Typical Weightage</th>
                  <th className="py-3 px-4">Questions</th>
                  <th className="py-3 px-4">Prep Hours</th>
                  <th className="py-3 px-4">PYQ Frequency</th>
                  <th className="py-3 px-4">Tactical Note</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTopics.map((topic) => {
                  const status = topicStatus[topic.id] || 'not-started';
                  const isHigh = topic.yieldTier === 'high-yield';
                  const isMed = topic.yieldTier === 'medium-yield';

                  return (
                    <tr key={topic.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => cycleTopicStatus(topic.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                            status === 'mastered' 
                              ? 'bg-emerald-500 text-white' 
                              : status === 'in-progress'
                              ? 'bg-indigo-500 text-white'
                              : 'border border-slate-300 text-transparent hover:border-indigo-400'
                          }`}
                          title="Click to toggle status"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{topic.topicName}</div>
                        <div className="text-[10px] text-slate-400">{topic.subjectName}</div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isHigh ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          isMed ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {topic.yieldTier.replace('-', ' ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-extrabold text-indigo-700 whitespace-nowrap font-mono">
                        {topic.marksRange}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                        {topic.expectedQuestions}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        ~{topic.avgStudyHours} hrs
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-semibold text-emerald-700 font-mono">{topic.pyqRecurrencePercent}%</span>
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-slate-600 max-w-xs">
                        {topic.tacticalNote}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onSelectConceptForPractice ? onSelectConceptForPractice(topic.relatedConceptId || 'c1', true) : onNavigateTab('practice')}
                          className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                        >
                          Drill
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
