import React, { useState } from 'react';
import { Subject, ConceptMastery, ExamType } from '../types';
import { KnowledgeMapTree } from '../components/KnowledgeMapTree';
import { 
  Network, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface KnowledgeMapPageProps {
  subjects: Subject[];
  masteryData: ConceptMastery[];
  currentExam: ExamType;
  onSelectConcept: (conceptId: string) => void;
}

export const KnowledgeMapPage: React.FC<KnowledgeMapPageProps> = ({
  subjects,
  masteryData,
  currentExam,
  onSelectConcept
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConceptDetails, setSelectedConceptDetails] = useState<ConceptMastery | null>(null);

  // Filter subjects/concepts if search query exists
  const filteredSubjects = searchQuery.trim() === ''
    ? subjects
    : subjects.map(sub => ({
        ...sub,
        topics: sub.topics.map(top => ({
          ...top,
          concepts: top.concepts.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            top.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })).filter(top => top.concepts.length > 0)
      })).filter(sub => sub.topics.length > 0);

  const handleConceptClick = (conceptId: string) => {
    const item = masteryData.find(m => m.conceptId === conceptId);
    if (item) {
      setSelectedConceptDetails(item);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Stage 5 Knowledge Architecture
            </span>
            <span className="text-xs text-slate-500 font-medium">{currentExam} Syllabus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Curriculum Knowledge Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Your real-time visual mastery ontology. Every tested concept dynamically updates its health status (🟢 Strong ≥75%, 🟡 Good ≥50%, 🔴 Weak &lt;50%, 🚨 Critical &lt;35%).
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            id="knowledge-map-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search concepts or topics..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Main Hierarchical Tree */}
      <KnowledgeMapTree
        subjects={filteredSubjects}
        masteryData={masteryData}
        onSelectConcept={handleConceptClick}
      />

      {/* Selected Concept Deep Dive Modal/Drawer */}
      {selectedConceptDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {selectedConceptDetails.subjectName} › {selectedConceptDetails.topicName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedConceptDetails.conceptName}
                </h3>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                selectedConceptDetails.status === 'Strong' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                selectedConceptDetails.status === 'Good' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {selectedConceptDetails.status} ({selectedConceptDetails.masteryPercentage}%)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Accuracy</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">
                  {selectedConceptDetails.totalAttempts > 0 
                    ? Math.round((selectedConceptDetails.correctAttempts / selectedConceptDetails.totalAttempts) * 100) 
                    : 0}%
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Attempts</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">
                  {selectedConceptDetails.correctAttempts} / {selectedConceptDetails.totalAttempts}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Avg Time</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">
                  {selectedConceptDetails.avgTimeSeconds}s
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedConceptDetails(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const cid = selectedConceptDetails.conceptId;
                  setSelectedConceptDetails(null);
                  onSelectConcept(cid);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <span>Practice 5 Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
