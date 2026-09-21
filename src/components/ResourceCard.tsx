import React from 'react';
import { ResourceItem, ResourceType } from '../types';
import { 
  FileText, 
  PlayCircle, 
  BookOpen, 
  Award, 
  HelpCircle, 
  Star, 
  ExternalLink, 
  Sparkles,
  Download,
  Clock,
  UserCheck
} from 'lucide-react';

interface ResourceCardProps {
  resource: ResourceItem;
  onOpenResource: (resource: ResourceItem) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onOpenResource
}) => {
  const getTypeBadge = (type: ResourceType) => {
    switch (type) {
      case 'PDF':
        return {
          icon: FileText,
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          label: 'PDF Document'
        };
      case 'Video':
        return {
          icon: PlayCircle,
          bg: 'bg-red-50 text-red-700 border-red-200',
          label: 'Video Masterclass'
        };
      case 'Notes':
        return {
          icon: BookOpen,
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          label: 'Concept Notes'
        };
      case 'Previous Papers':
      case 'PYQ':
        return {
          icon: Award,
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          label: 'Official PYQ'
        };
      case 'MockExam':
        return {
          icon: HelpCircle,
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          label: 'Mock Test'
        };
      default:
        return {
          icon: FileText,
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          label: 'Study Material'
        };
    }
  };

  const typeMeta = getTypeBadge(resource.type);
  const Icon = typeMeta.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition flex flex-col justify-between space-y-4">
      
      {/* Header with Type & Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${typeMeta.bg}`}>
            <Icon className="w-3.5 h-3.5" />
            <span>{typeMeta.label}</span>
          </span>

          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>{resource.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
          {resource.title}
        </h4>

        {/* Syllabus Subject & Topic alignment */}
        {resource.subjectName && (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/70">
              {resource.subjectName}
            </span>
            {resource.topicName && (
              <span className="text-slate-500 font-medium text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[200px]">
                {resource.topicName}
              </span>
            )}
          </div>
        )}

        {/* Author / Source if available */}
        {resource.authorOrInstructor && (
          <div className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
            <UserCheck className="w-3 h-3 text-indigo-600 shrink-0" />
            <span className="truncate">{resource.authorOrInstructor}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {resource.description}
        </p>

        {/* Badges for timestamps or formulas */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {resource.keyTimestamps && resource.keyTimestamps.length > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-medium">
              {resource.keyTimestamps.length} Chapters Indexed
            </span>
          )}
          {resource.tableOfContents && resource.tableOfContents.length > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
              ToC + Formulas
            </span>
          )}
        </div>
      </div>

      {/* Footer with meta & launch button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <div className="text-slate-400 font-medium truncate">
          <span>{resource.durationOrPages}</span> • <span className="text-slate-600">{resource.sourceName}</span>
        </div>

        <button
          type="button"
          onClick={() => onOpenResource(resource)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
            resource.type === 'Video'
              ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
              : resource.type === 'PDF'
              ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {resource.type === 'Video' ? (
            <>
              <PlayCircle className="w-3.5 h-3.5 fill-current" />
              <span>Watch Video</span>
            </>
          ) : resource.type === 'PDF' ? (
            <>
              <FileText className="w-3.5 h-3.5" />
              <span>View PDF</span>
            </>
          ) : (
            <>
              <span>Open</span>
              <ExternalLink className="w-3 h-3" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
