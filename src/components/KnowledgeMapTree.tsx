import React, { useState } from 'react';
import { ConceptMastery, Subject, MasteryStatus } from '../types';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Target, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface KnowledgeMapTreeProps {
  subjects: Subject[];
  masteryData: ConceptMastery[];
  onSelectConcept?: (conceptId: string) => void;
}

export const KnowledgeMapTree: React.FC<KnowledgeMapTreeProps> = ({
  subjects,
  masteryData,
  onSelectConcept
}) => {
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    'gate-cn': true,
    'gate-os': true,
    'gate-dbms': true,
    'gate-dsa': true
  });

  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    'gate-cn-transport': true,
    'gate-os-scheduling': true
  });

  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const toggleSubject = (subId: string) => {
    setExpandedSubjects(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  const toggleTopic = (topId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topId]: !prev[topId] }));
  };

  const getStatusBadge = (status: MasteryStatus, percentage: number) => {
    switch (status) {
      case 'Strong':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{percentage}% Strong</span>
          </span>
        );
      case 'Good':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{percentage}% Good</span>
          </span>
        );
      case 'Weak':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>{percentage}% Weak</span>
          </span>
        );
      case 'Critical':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-900 border border-red-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>{percentage}% Critical</span>
          </span>
        );
    }
  };

  // Calculate subject aggregate mastery
  const getSubjectMastery = (subjectId: string) => {
    const items = masteryData.filter(m => m.subjectId === subjectId);
    if (items.length === 0) return 50;
    const sum = items.reduce((acc, curr) => acc + curr.masteryPercentage, 0);
    return Math.round(sum / items.length);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Header with Filters */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Student Knowledge & Mastery Map</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hierarchical concept breakdown with real-time status indicators (🟢 Strong, 🟡 Good, 🔴 Weak, 🚨 Critical)
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200 text-xs">
          {['ALL', 'Critical', 'Weak', 'Good', 'Strong'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterStatus === status 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Hierarchical Tree Body */}
      <div className="divide-y divide-slate-100 p-2">
        {subjects.map(subject => {
          const isSubExpanded = expandedSubjects[subject.id] ?? false;
          const subMastery = getSubjectMastery(subject.id);
          const subStatus: MasteryStatus = 
            subMastery >= 75 ? 'Strong' : subMastery >= 50 ? 'Good' : subMastery >= 35 ? 'Weak' : 'Critical';

          return (
            <div key={subject.id} className="py-2">
              
              {/* Subject Row */}
              <div 
                onClick={() => toggleSubject(subject.id)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition select-none"
              >
                <div className="flex items-center gap-3">
                  <button type="button" className="p-1 rounded-md hover:bg-slate-200/60 text-slate-500">
                    {isSubExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  <span className="font-bold text-slate-900 text-sm">{subject.name}</span>
                  <span className="text-xs text-slate-400 font-medium">({subject.topics.length} Topics)</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-32 hidden sm:block bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        subMastery >= 75 ? 'bg-emerald-500' :
                        subMastery >= 50 ? 'bg-amber-500' :
                        subMastery >= 35 ? 'bg-rose-500' : 'bg-red-600'
                      }`}
                      style={{ width: `${subMastery}%` }}
                    ></div>
                  </div>
                  {getStatusBadge(subStatus, subMastery)}
                </div>
              </div>

              {/* Topics & Concepts Container */}
              {isSubExpanded && (
                <div className="pl-6 sm:pl-9 pr-2 space-y-2 mt-1 border-l-2 border-slate-100 ml-4">
                  {subject.topics.map(topic => {
                    const isTopExpanded = expandedTopics[topic.id] ?? false;

                    return (
                      <div key={topic.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                        
                        {/* Topic Row */}
                        <div 
                          onClick={() => toggleTopic(topic.id)}
                          className="flex items-center justify-between cursor-pointer py-1 text-xs select-none"
                        >
                          <div className="flex items-center gap-2">
                            {isTopExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                            <span className="font-semibold text-slate-800">{topic.name}</span>
                          </div>
                          <span className="text-slate-400 text-[11px]">
                            {topic.concepts.length} Concepts
                          </span>
                        </div>

                        {/* Concepts List */}
                        {isTopExpanded && (
                          <div className="mt-2 space-y-1.5 pl-5 border-l border-slate-200">
                            {topic.concepts.map(concept => {
                              const mastery = masteryData.find(m => m.conceptId === concept.id) || {
                                conceptId: concept.id,
                                conceptName: concept.name,
                                topicId: topic.id,
                                topicName: topic.name,
                                subjectId: subject.id,
                                subjectName: subject.name,
                                masteryPercentage: 50,
                                status: 'Good' as MasteryStatus,
                                totalAttempts: 0,
                                correctAttempts: 0,
                                avgTimeSeconds: 60,
                                lastTestedDate: 'Never'
                              };

                              if (filterStatus !== 'ALL' && mastery.status !== filterStatus) {
                                return null;
                              }

                              return (
                                <div 
                                  key={concept.id}
                                  onClick={() => onSelectConcept && onSelectConcept(concept.id)}
                                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs cursor-pointer transition text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    <span className="font-medium text-slate-800">{concept.name}</span>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                                      {mastery.correctAttempts}/{mastery.totalAttempts} correct ({mastery.avgTimeSeconds}s avg)
                                    </span>
                                    {getStatusBadge(mastery.status, mastery.masteryPercentage)}
                                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
