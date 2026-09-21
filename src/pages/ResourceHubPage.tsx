import React, { useState, useMemo } from 'react';
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
  ListFilter
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
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLayout, setViewLayout] = useState<'all' | 'by-subject'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New resource form state
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceNotes, setResourceNotes] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('Notes');
  const [modalSubjectId, setModalSubjectId] = useState<string>('');
  const [isCategorizing, setIsCategorizing] = useState(false);

  // Get syllabus subjects for the active exam domain
  const examSubjects = useMemo(() => {
    return SUBJECTS_DATA[currentExam] || [];
  }, [currentExam]);

  // Active domain resources
  const domainResources = useMemo(() => {
    return resources.filter(res => !res.examId || res.examId === currentExam);
  }, [resources, currentExam]);

  // Selected subject details
  const activeSubject = useMemo(() => {
    if (selectedSubjectId === 'ALL') return null;
    return examSubjects.find(s => s.id === selectedSubjectId || s.name === selectedSubjectId) || null;
  }, [selectedSubjectId, examSubjects]);

  const resourceTypes: Array<{ id: string; label: string; icon: any }> = [
    { id: 'ALL', label: 'All Formats', icon: BookOpen },
    { id: 'Notes', label: 'Concept Notes', icon: BookOpen },
    { id: 'PDF', label: 'PDF Documents', icon: FileText },
    { id: 'Video', label: 'YouTube Lectures', icon: PlayCircle },
    { id: 'Previous Papers', label: 'PYQs & Papers', icon: Award },
    { id: 'MockExam', label: 'Mock Tests', icon: HelpCircle }
  ];

  // Filtering based on subject, format, and search
  const filteredResources = useMemo(() => {
    return domainResources.filter(res => {
      // Syllabus subject match
      const matchesSubject = 
        selectedSubjectId === 'ALL' || 
        res.subjectId === selectedSubjectId ||
        (res.subjectName && activeSubject && res.subjectName.toLowerCase() === activeSubject.name.toLowerCase());

      // Format match
      const matchesType = 
        selectedType === 'ALL' || 
        res.type === selectedType || 
        (selectedType === 'Previous Papers' && res.type === 'PYQ');

      // Query match
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.sourceName.toLowerCase().includes(query) ||
        (res.subjectName && res.subjectName.toLowerCase().includes(query)) ||
        (res.topicName && res.topicName.toLowerCase().includes(query));

      return matchesSubject && matchesType && matchesQuery;
    });
  }, [domainResources, selectedSubjectId, selectedType, searchQuery, activeSubject]);

  // Map resources grouped by syllabus subject
  const resourcesBySubject = useMemo(() => {
    const map = new Map<string, ResourceItem[]>();
    
    // Initialize with known subjects
    examSubjects.forEach(sub => {
      map.set(sub.id, []);
    });

    // Bucket filtered resources
    filteredResources.forEach(res => {
      const match = examSubjects.find(
        sub => sub.id === res.subjectId || (res.subjectName && sub.name.toLowerCase() === res.subjectName.toLowerCase())
      );
      if (match) {
        const list = map.get(match.id) || [];
        list.push(res);
        map.set(match.id, list);
      } else {
        const otherList = map.get('other') || [];
        otherList.push(res);
        map.set('other', otherList);
      }
    });

    return map;
  }, [filteredResources, examSubjects]);

  const handleAutoCategorizeAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle.trim()) return;

    const chosenSubject = examSubjects.find(s => s.id === modalSubjectId) || examSubjects[0];

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
        topicId: `top-${cat.detectedConcept.toLowerCase().replace(/\s+/g, '-')}`,
        topicName: cat.detectedConcept,
        conceptId: `concept-${cat.detectedConcept.toLowerCase().replace(/\s+/g, '-')}`,
        conceptName: cat.detectedConcept,
        url: resourceUrl || 'https://gate.iitk.ac.in',
        sourceName: 'Student Connected Material',
        durationOrPages: cat.estimatedPagesOrDuration || '12 Pages Notes',
        rating: 4.9,
        description: cat.summary,
        keyFormulas: [cat.recommendedForWeakness]
      };

      onAddResource(newRes);
      setIsAddModalOpen(false);
      resetModalForm();
    } catch {
      // Fallback
      const newRes: ResourceItem = {
        id: `res-${Date.now()}`,
        title: resourceTitle,
        type: resourceType,
        examId: currentExam,
        subjectId: chosenSubject ? chosenSubject.id : (examSubjects[0]?.id || 'sub-general'),
        subjectName: chosenSubject ? chosenSubject.name : (examSubjects[0]?.name || 'General'),
        topicId: 'top-general',
        topicName: 'Core Syllabus Concepts',
        conceptId: 'concept-general',
        url: resourceUrl || '#',
        sourceName: 'Student Forwarded Notes',
        durationOrPages: '10 Pages Notes',
        rating: 4.8,
        description: resourceNotes ? resourceNotes.slice(0, 140) : 'Uploaded study material indexed to the active syllabus.'
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
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              Syllabus Aligned
            </span>
            <span className="text-xs text-slate-500 font-medium">{currentExam} Knowledge Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Curated Syllabus Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Verified lecture notes, YouTube walkthroughs, handwritten formula guides, and official previous papers organized strictly according to the {currentExam} syllabus.
          </p>
        </div>

        {/* Connect Study Material CTA */}
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

      {/* 1. Syllabus Subject Navigation Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Syllabus Subjects ({currentExam})</span>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewLayout('all')}
              className={`px-2.5 py-1 rounded-md transition ${viewLayout === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              All Items
            </button>
            <button
              type="button"
              onClick={() => setViewLayout('by-subject')}
              className={`px-2.5 py-1 rounded-md transition ${viewLayout === 'by-subject' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              By Syllabus Group
            </button>
          </div>
        </div>

        {/* Subject Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedSubjectId('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedSubjectId === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>All Syllabus</span>
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
                onClick={() => setSelectedSubjectId(subject.id)}
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

      {/* 2. Active Syllabus Subject Info Banner (if a specific subject is picked) */}
      {activeSubject && (
        <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50/30 rounded-2xl border border-indigo-200/80 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                Active Syllabus Module
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activeSubject.topics?.length || 0} Core Topics
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{activeSubject.name}</h3>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              {activeSubject.description}
            </p>
          </div>

          {/* Topics pill tags */}
          {activeSubject.topics && activeSubject.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 shrink-0 max-w-md">
              {activeSubject.topics.map(top => (
                <span key={top.id} className="text-[11px] font-medium bg-white border border-indigo-200 px-2.5 py-1 rounded-lg text-slate-700 shadow-2xs">
                  {top.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Format Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Format category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {resourceTypes.map(item => {
            const isSelected = selectedType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedType(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
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

      {/* 4. Resources Display: Standard Grid or Grouped by Syllabus */}
      {viewLayout === 'by-subject' && selectedSubjectId === 'ALL' ? (
        // Grouped by syllabus subject
        <div className="space-y-8">
          {examSubjects.map(sub => {
            const subResources = resourcesBySubject.get(sub.id) || [];
            if (subResources.length === 0) return null;

            return (
              <div key={sub.id} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{sub.name}</h3>
                      <p className="text-[11px] text-slate-500">{sub.topics?.length || 0} topics in syllabus</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSubjectId(sub.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition"
                  >
                    <span>Filter this Subject</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {subResources.map(resource => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onOpenResource={onOpenResource}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Standard Grid View
        <>
          {filteredResources.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No resources found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No syllabus resources match your current filter criteria for {currentExam}. Try clearing search terms or selecting another syllabus subject.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubjectId('ALL');
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

      {/* Connect/Upload Resource Modal with AI Classification & Syllabus Alignment */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Connect Study Material</h3>
                <p className="text-xs text-slate-500">
                  Index notes, video links, or PDFs directly into the {currentExam} syllabus.
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Syllabus Subject
                  </label>
                  <select
                    value={modalSubjectId}
                    onChange={e => setModalSubjectId(e.target.value)}
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
                    Resource Type
                  </label>
                  <select
                    value={resourceType}
                    onChange={e => setResourceType(e.target.value as ResourceType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs sm:text-sm bg-white"
                  >
                    <option value="Notes">Concept Notes</option>
                    <option value="PDF">PDF Document</option>
                    <option value="Video">YouTube Video</option>
                    <option value="PYQ">Previous Year Questions</option>
                    <option value="MockExam">Mock Exam</option>
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
                  placeholder="https://youtube.com/... or https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Forwarded Notes / Excerpt Text
                </label>
                <textarea
                  rows={3}
                  value={resourceNotes}
                  onChange={e => setResourceNotes(e.target.value)}
                  placeholder="Paste formula summary, chapter notes, or key takeaways..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm"
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                <strong>Syllabus Mapping:</strong> ExamAI automatically associates the study material with relevant concepts, formula cheat sheets, and diagnostic test recommendations.
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
