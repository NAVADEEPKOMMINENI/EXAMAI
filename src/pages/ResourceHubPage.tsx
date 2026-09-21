import React, { useState, useMemo, useEffect } from 'react';
import { ResourceItem, ResourceType, ExamType } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { apiService } from '../services/api';
import { SUBJECTS_DATA } from '../data/mockData';
import { 
  BookOpen, 
  Plus, 
  Search, 
  FileText, 
  PlayCircle, 
  Award, 
  HelpCircle, 
  Sparkles, 
  Loader2,
  FolderOpen,
  Layers,
  GraduationCap,
  ChevronRight,
  GitBranch,
  Video,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Clock,
  UserCheck,
  Star
} from 'lucide-react';

interface ResourceHubPageProps {
  resources: ResourceItem[];
  currentExam: ExamType;
  onAddResource: (newResource: ResourceItem) => void;
  onOpenResource: (resource: ResourceItem) => void;
}

export const ResourceHubPage: React.FC<ResourceHubPageProps> = ({
  resources,
  currentExam,
  onAddResource,
  onOpenResource
}) => {
  // Navigation & Filtering State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLayout, setViewLayout] = useState<'grid' | 'tree'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New resource modal state
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceNotes, setResourceNotes] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('PDF');
  const [modalSubjectId, setModalSubjectId] = useState<string>('');
  const [modalTopicId, setModalTopicId] = useState<string>('');
  const [isCategorizing, setIsCategorizing] = useState(false);

  // Synchronize filters when active exam domain changes
  useEffect(() => {
    setSelectedSubjectId('ALL');
    setSelectedTopicId('ALL');
    setSearchQuery('');
  }, [currentExam]);

  // When subject changes, reset topic filter
  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedTopicId('ALL');
  };

  // Get syllabus subjects for the active exam domain
  const examSubjects = useMemo(() => {
    return SUBJECTS_DATA[currentExam] || [];
  }, [currentExam]);

  // Filter study materials strictly mapped to active exam domain
  const domainResources = useMemo(() => {
    return resources.filter(res => !res.examId || res.examId === currentExam);
  }, [resources, currentExam]);

  // Selected subject details
  const activeSubject = useMemo(() => {
    if (selectedSubjectId === 'ALL') return null;
    return examSubjects.find(s => s.id === selectedSubjectId || s.name.toLowerCase() === selectedSubjectId.toLowerCase()) || null;
  }, [selectedSubjectId, examSubjects]);

  // Available topics for active subject
  const availableTopics = useMemo(() => {
    if (!activeSubject) return [];
    return activeSubject.topics || [];
  }, [activeSubject]);

  // Active topic details
  const activeTopic = useMemo(() => {
    if (selectedTopicId === 'ALL') return null;
    return availableTopics.find(t => t.id === selectedTopicId || t.name.toLowerCase() === selectedTopicId.toLowerCase()) || null;
  }, [selectedTopicId, availableTopics]);

  // Stats for active domain
  const domainStats = useMemo(() => {
    const total = domainResources.length;
    const pdfs = domainResources.filter(r => r.type === 'PDF').length;
    const videos = domainResources.filter(r => r.type === 'Video').length;
    const notes = domainResources.filter(r => r.type === 'Notes').length;
    const pyqs = domainResources.filter(r => r.type === 'Previous Papers' || r.type === 'PYQ').length;
    return { total, pdfs, videos, notes, pyqs };
  }, [domainResources]);

  // Resource types with dynamic counters
  const resourceTypes: Array<{ id: string; label: string; icon: any; count: number }> = useMemo(() => [
    { id: 'ALL', label: 'All Materials', icon: BookOpen, count: domainStats.total },
    { id: 'PDF', label: 'PDF Documents', icon: FileText, count: domainStats.pdfs },
    { id: 'Video', label: 'Video Masterclasses', icon: PlayCircle, count: domainStats.videos },
    { id: 'Notes', label: 'Concept Notes', icon: BookOpen, count: domainStats.notes },
    { id: 'Previous Papers', label: 'PYQ Papers', icon: Award, count: domainStats.pyqs }
  ], [domainStats]);

  // Filtering based on active syllabus subject, syllabus topic, format, and search
  const filteredResources = useMemo(() => {
    return domainResources.filter(res => {
      // 1. Syllabus Subject Match
      const matchesSubject = 
        selectedSubjectId === 'ALL' || 
        res.subjectId === selectedSubjectId ||
        (res.subjectName && activeSubject && res.subjectName.toLowerCase() === activeSubject.name.toLowerCase());

      // 2. Syllabus Topic Match
      const matchesTopic =
        selectedTopicId === 'ALL' ||
        res.topicId === selectedTopicId ||
        (res.topicName && activeTopic && res.topicName.toLowerCase() === activeTopic.name.toLowerCase());

      // 3. Format / Type Match
      const matchesType = 
        selectedType === 'ALL' || 
        res.type === selectedType || 
        (selectedType === 'Previous Papers' && res.type === 'PYQ');

      // 4. Search Query Match
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !query ||
        res.title.toLowerCase().includes(query) ||
        (res.description && res.description.toLowerCase().includes(query)) ||
        (res.sourceName && res.sourceName.toLowerCase().includes(query)) ||
        (res.authorOrInstructor && res.authorOrInstructor.toLowerCase().includes(query)) ||
        (res.subjectName && res.subjectName.toLowerCase().includes(query)) ||
        (res.topicName && res.topicName.toLowerCase().includes(query)) ||
        (res.conceptName && res.conceptName.toLowerCase().includes(query));

      return matchesSubject && matchesTopic && matchesType && matchesQuery;
    });
  }, [domainResources, selectedSubjectId, selectedTopicId, selectedType, searchQuery, activeSubject, activeTopic]);

  // Map resources grouped by syllabus subject & topic
  const syllabusTreeResources = useMemo(() => {
    return examSubjects.map(subject => {
      const subjectResources = domainResources.filter(
        r => r.subjectId === subject.id || (r.subjectName && r.subjectName.toLowerCase() === subject.name.toLowerCase())
      );

      const topicsWithResources = (subject.topics || []).map(topic => {
        const topicResources = subjectResources.filter(
          r => r.topicId === topic.id || (r.topicName && r.topicName.toLowerCase() === topic.name.toLowerCase())
        );

        return {
          topic,
          resources: topicResources,
          pdfs: topicResources.filter(r => r.type === 'PDF'),
          videos: topicResources.filter(r => r.type === 'Video')
        };
      });

      return {
        subject,
        subjectResources,
        topics: topicsWithResources
      };
    });
  }, [examSubjects, domainResources]);

  // Handle auto-categorizing and saving new study material
  const handleAutoCategorizeAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle.trim()) return;

    const chosenSubject = examSubjects.find(s => s.id === modalSubjectId) || examSubjects[0];
    const chosenTopic = chosenSubject?.topics?.find(t => t.id === modalTopicId) || chosenSubject?.topics?.[0];

    setIsCategorizing(true);
    try {
      const response = await apiService.categorizeResource(
        resourceTitle,
        resourceUrl,
        resourceNotes,
        currentExam
      );

      const cat = response.categorization;
      const newRes: ResourceItem = {
        id: `res-${Date.now()}`,
        title: resourceTitle,
        type: resourceType,
        examId: currentExam,
        subjectId: chosenSubject ? chosenSubject.id : `sub-${cat.detectedSubject.toLowerCase().replace(/\s+/g, '-')}`,
        subjectName: chosenSubject ? chosenSubject.name : cat.detectedSubject,
        topicId: chosenTopic ? chosenTopic.id : `top-${cat.detectedConcept.toLowerCase().replace(/\s+/g, '-')}`,
        topicName: chosenTopic ? chosenTopic.name : cat.detectedConcept,
        conceptId: `concept-${cat.detectedConcept.toLowerCase().replace(/\s+/g, '-')}`,
        conceptName: cat.detectedConcept,
        url: resourceUrl || 'https://gate.iitk.ac.in',
        pdfUrl: resourceType === 'PDF' ? (resourceUrl || 'https://examai.edu/sample.pdf') : undefined,
        videoEmbedUrl: resourceType === 'Video' ? resourceUrl : undefined,
        sourceName: 'Student Connected Material',
        durationOrPages: cat.estimatedPagesOrDuration || (resourceType === 'PDF' ? '16 Pages PDF' : '20 mins video'),
        rating: 4.9,
        description: cat.summary,
        keyFormulas: [cat.recommendedForWeakness]
      };

      onAddResource(newRes);
      setIsAddModalOpen(false);
      resetModalForm();
    } catch {
      // Fallback manual indexing
      const newRes: ResourceItem = {
        id: `res-${Date.now()}`,
        title: resourceTitle,
        type: resourceType,
        examId: currentExam,
        subjectId: chosenSubject ? chosenSubject.id : (examSubjects[0]?.id || 'sub-general'),
        subjectName: chosenSubject ? chosenSubject.name : (examSubjects[0]?.name || 'General'),
        topicId: chosenTopic ? chosenTopic.id : 'top-general',
        topicName: chosenTopic ? chosenTopic.name : 'Core Syllabus Concepts',
        conceptId: 'concept-general',
        url: resourceUrl || '#',
        pdfUrl: resourceType === 'PDF' ? resourceUrl : undefined,
        videoEmbedUrl: resourceType === 'Video' ? resourceUrl : undefined,
        sourceName: 'Student Connected Material',
        durationOrPages: resourceType === 'PDF' ? '12 Pages PDF' : '18 mins video',
        rating: 4.8,
        description: resourceNotes ? resourceNotes.slice(0, 140) : 'Study material indexed directly into the active syllabus tree.'
      };
      onAddResource(newRes);
      setIsAddModalOpen(false);
      resetModalForm();
    } finally {
      setIsCategorizing(false);
    }
  };

  const resetModalForm = () => {
    setResourceTitle('');
    setResourceUrl('');
    setResourceNotes('');
    setModalSubjectId('');
    setModalTopicId('');
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              Syllabus-Aligned Repository
            </span>
            <span className="text-xs text-slate-500 font-medium">{currentExam} Domain Tree</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Curated Syllabus Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            High-yield study materials (handwritten PDF formula summaries & video masterclasses) indexed strictly across the {currentExam} syllabus hierarchy.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            id="hub-connect-resource-btn"
            type="button"
            onClick={() => {
              setModalSubjectId(selectedSubjectId !== 'ALL' ? selectedSubjectId : (examSubjects[0]?.id || ''));
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-200 transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Study Material</span>
          </button>
        </div>
      </div>

      {/* 2. Fast Filter & Format Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setSelectedType('ALL')}
          className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
            selectedType === 'ALL'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <div className="text-[11px] font-medium opacity-80">All Materials</div>
            <div className="text-xl font-bold">{domainStats.total}</div>
          </div>
          <BookOpen className={`w-5 h-5 ${selectedType === 'ALL' ? 'text-indigo-300' : 'text-slate-400'}`} />
        </button>

        <button
          type="button"
          onClick={() => setSelectedType('PDF')}
          className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
            selectedType === 'PDF'
              ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
          }`}
        >
          <div>
            <div className="text-[11px] font-medium opacity-80">PDF Documents</div>
            <div className="text-xl font-bold">{domainStats.pdfs}</div>
          </div>
          <FileText className={`w-5 h-5 ${selectedType === 'PDF' ? 'text-rose-200' : 'text-rose-500'}`} />
        </button>

        <button
          type="button"
          onClick={() => setSelectedType('Video')}
          className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
            selectedType === 'Video'
              ? 'bg-red-700 text-white border-red-700 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'
          }`}
        >
          <div>
            <div className="text-[11px] font-medium opacity-80">Video Lectures</div>
            <div className="text-xl font-bold">{domainStats.videos}</div>
          </div>
          <PlayCircle className={`w-5 h-5 ${selectedType === 'Video' ? 'text-red-200' : 'text-red-500'}`} />
        </button>

        <button
          type="button"
          onClick={() => setSelectedType('Previous Papers')}
          className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
            selectedType === 'Previous Papers'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div>
            <div className="text-[11px] font-medium opacity-80">Official PYQs</div>
            <div className="text-xl font-bold">{domainStats.pyqs}</div>
          </div>
          <Award className={`w-5 h-5 ${selectedType === 'Previous Papers' ? 'text-amber-200' : 'text-amber-500'}`} />
        </button>
      </div>

      {/* 3. Syllabus Tree Navigation Controller */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        
        {/* Top Control Header: Tree vs Grid Toggle */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-indigo-600" />
            <span>Syllabus Hierarchy Filter ({currentExam})</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewLayout('grid')}
              className={`px-3 py-1.5 rounded-lg transition ${viewLayout === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Standard Grid
            </button>
            <button
              type="button"
              onClick={() => setViewLayout('tree')}
              className={`px-3 py-1.5 rounded-lg transition ${viewLayout === 'tree' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Syllabus Tree View
            </button>
          </div>
        </div>

        {/* Level 1: Syllabus Subjects */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            1. Select Syllabus Subject
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
            <button
              type="button"
              onClick={() => handleSelectSubject('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedSubjectId === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>All Subjects</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedSubjectId === 'ALL' ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {domainResources.length}
              </span>
            </button>

            {examSubjects.map(subject => {
              const isSelected = selectedSubjectId === subject.id;
              const count = domainResources.filter(
                r => r.subjectId === subject.id || (r.subjectName && r.subjectName.toLowerCase() === subject.name.toLowerCase())
              ).length;

              return (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => handleSelectSubject(subject.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs font-bold'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50/60 hover:text-indigo-900 hover:border-indigo-200'
                  }`}
                >
                  <span>{subject.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-indigo-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level 2: Syllabus Topics (Displayed if a specific subject is picked) */}
        {activeSubject && availableTopics.length > 0 && (
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
                <span>2. Filter by Topic in {activeSubject.name}</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {availableTopics.length} Topics
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <button
                type="button"
                onClick={() => setSelectedTopicId('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedTopicId === 'ALL'
                    ? 'bg-indigo-100 text-indigo-800 font-bold border border-indigo-300'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Topics ({activeSubject.name})
              </button>

              {availableTopics.map(topic => {
                const isSelected = selectedTopicId === topic.id;
                const topicCount = domainResources.filter(
                  r => r.topicId === topic.id || (r.topicName && r.topicName.toLowerCase() === topic.name.toLowerCase())
                ).length;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50'
                    }`}
                  >
                    <span>{topic.name}</span>
                    <span className={`text-[10px] px-1 py-0.2 rounded ${
                      isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {topicCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Search and Active Filter Indicator */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Active Breadcrumb indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <span className="font-bold text-slate-800">{currentExam}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={activeSubject ? 'font-semibold text-indigo-700' : 'text-slate-500'}>
            {activeSubject ? activeSubject.name : 'All Subjects'}
          </span>
          {activeTopic && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                {activeTopic.name}
              </span>
            </>
          )}
          {selectedType !== 'ALL' && (
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
              Format: {selectedType}
            </span>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            id="resource-hub-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeSubject ? activeSubject.name : currentExam} resources...`}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-xs sm:text-sm shadow-2xs"
          />
        </div>
      </div>

      {/* 5. Main Content: Syllabus Tree View vs Standard Grid */}
      {viewLayout === 'tree' ? (
        // Hierarchical Syllabus Tree View
        <div className="space-y-8">
          {syllabusTreeResources.map(({ subject, topics, subjectResources }) => {
            // Apply subject filter if selected
            if (selectedSubjectId !== 'ALL' && selectedSubjectId !== subject.id) {
              return null;
            }

            return (
              <div key={subject.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
                
                {/* Subject Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900">{subject.name}</h2>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                          {subjectResources.length} Materials
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{subject.description}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectSubject(subject.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-center"
                  >
                    <span>Focus on Subject</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Topics Branches */}
                <div className="space-y-6 pl-2 sm:pl-4 border-l-2 border-indigo-100">
                  {topics.map(({ topic, resources: topicRes, pdfs, videos }) => {
                    // Apply topic filter if selected
                    if (selectedTopicId !== 'ALL' && selectedTopicId !== topic.id) {
                      return null;
                    }

                    // Apply format filter
                    let displayedResources = topicRes;
                    if (selectedType === 'PDF') displayedResources = pdfs;
                    else if (selectedType === 'Video') displayedResources = videos;
                    else if (selectedType === 'Previous Papers') displayedResources = topicRes.filter(r => r.type === 'Previous Papers' || r.type === 'PYQ');

                    // Apply search query filter
                    if (searchQuery.trim()) {
                      const q = searchQuery.toLowerCase().trim();
                      displayedResources = displayedResources.filter(r => 
                        r.title.toLowerCase().includes(q) || 
                        r.description.toLowerCase().includes(q) ||
                        r.sourceName.toLowerCase().includes(q)
                      );
                    }

                    return (
                      <div key={topic.id} className="space-y-3">
                        
                        {/* Topic Node Label */}
                        <div className="flex items-center justify-between bg-slate-50/80 px-3.5 py-2 rounded-xl border border-slate-200/70">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <h3 className="text-xs font-bold text-slate-800">{topic.name}</h3>
                          </div>
                          
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                            <span className="flex items-center gap-1 text-rose-600">
                              <FileText className="w-3 h-3" />
                              {pdfs.length} PDFs
                            </span>
                            <span className="flex items-center gap-1 text-red-600">
                              <PlayCircle className="w-3 h-3" />
                              {videos.length} Videos
                            </span>
                          </div>
                        </div>

                        {/* Mapped Materials for this Topic */}
                        {displayedResources.length === 0 ? (
                          <div className="text-xs text-slate-400 italic py-2 pl-4 flex items-center justify-between">
                            <span>No materials currently match the selected format filter for this topic.</span>
                            <button
                              type="button"
                              onClick={() => {
                                setModalSubjectId(subject.id);
                                setModalTopicId(topic.id);
                                setIsAddModalOpen(true);
                              }}
                              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                            >
                              + Index Material
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                            {displayedResources.map(resource => (
                              <ResourceCard
                                key={resource.id}
                                resource={resource}
                                onOpenResource={onOpenResource}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Standard Filtered Grid View
        <>
          {filteredResources.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No resources found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No study materials match your syllabus filter criteria for {currentExam}. Try resetting your subject, topic, or format filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubjectId('ALL');
                  setSelectedTopicId('ALL');
                  setSelectedType('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onOpenResource={onOpenResource}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* 6. Connect / Upload Resource Modal with Syllabus Tree Alignment */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Connect Study Material</h3>
                <p className="text-xs text-slate-500">
                  Index notes, video links, or PDFs directly into the {currentExam} syllabus tree.
                </p>
              </div>
            </div>

            <form onSubmit={handleAutoCategorizeAndSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={resourceTitle}
                  onChange={e => setResourceTitle(e.target.value)}
                  placeholder="e.g. Chemical Thermodynamics Gibbs Free Energy Formulas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-xs sm:text-sm"
                />
              </div>

              {/* Format selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Study Material Format *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setResourceType('PDF')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                      resourceType === 'PDF'
                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-rose-600" />
                    <span>PDF Document</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setResourceType('Video')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                      resourceType === 'Video'
                        ? 'bg-red-50 border-red-300 text-red-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4 text-red-600" />
                    <span>YouTube Video</span>
                  </button>
                </div>
              </div>

              {/* Syllabus Subject & Topic Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Syllabus Subject
                  </label>
                  <select
                    value={modalSubjectId || examSubjects[0]?.id || ''}
                    onChange={e => {
                      setModalSubjectId(e.target.value);
                      const sub = examSubjects.find(s => s.id === e.target.value);
                      if (sub && sub.topics?.length) {
                        setModalTopicId(sub.topics[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs sm:text-sm bg-white"
                  >
                    {examSubjects.map(sub => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Syllabus Topic
                  </label>
                  <select
                    value={modalTopicId}
                    onChange={e => setModalTopicId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs sm:text-sm bg-white"
                  >
                    {(() => {
                      const curSub = examSubjects.find(s => s.id === (modalSubjectId || examSubjects[0]?.id)) || examSubjects[0];
                      const topics = curSub?.topics || [];
                      return topics.map(top => (
                        <option key={top.id} value={top.id}>
                          {top.name}
                        </option>
                      ));
                    })()}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Public URL or Lecture Link
                </label>
                <input
                  type="text"
                  value={resourceUrl}
                  onChange={e => setResourceUrl(e.target.value)}
                  placeholder={resourceType === 'Video' ? "https://youtube.com/watch?v=..." : "https://examai.edu/sample.pdf"}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic Excerpt or Formula Summary
                </label>
                <textarea
                  rows={3}
                  value={resourceNotes}
                  onChange={e => setResourceNotes(e.target.value)}
                  placeholder="Paste formula summary, key chapter notes, or syllabus takeaways..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm"
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                <strong>Syllabus Integration:</strong> The connected material will be mapped into the active {currentExam} syllabus branch, and recommended automatically on diagnostic tests for identified concept weaknesses.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCategorizing || !resourceTitle.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  {isCategorizing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Auto-Categorizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Index into Syllabus</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
