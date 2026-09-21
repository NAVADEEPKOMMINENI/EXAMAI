import React, { useState } from 'react';
import { ResourceItem } from '../types';
import { 
  X, 
  Play, 
  Clock, 
  ExternalLink, 
  Star, 
  Award, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';

interface VideoPlayerModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
  onPracticeConcept?: (conceptId: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  resource,
  onClose,
  onPracticeConcept
}) => {
  if (!resource) return null;

  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null);

  // Derive embed URL safely
  const embedUrl = resource.videoEmbedUrl || (
    resource.url.includes('youtube.com/watch?v=')
      ? resource.url.replace('watch?v=', 'embed/')
      : resource.url
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="video-player-modal"
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  Video Masterclass
                </span>
                {resource.examId && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {resource.examId}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base line-clamp-1 mt-0.5">
                {resource.title}
              </h3>
            </div>
          </div>
          <button
            id="close-video-modal-button"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative w-full bg-black aspect-video">
          <iframe
            className="w-full h-full"
            src={`${embedUrl}?autoplay=1&rel=0`}
            title={resource.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Details & Chapter Breakdown */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-1.5">
                {resource.authorOrInstructor && (
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    {resource.authorOrInstructor}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {resource.durationOrPages}
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {resource.rating} / 5.0
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {resource.description}
              </p>
            </div>

            {resource.contentSnippet && (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Key Conceptual Takeaway: </span>
                  {resource.contentSnippet}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              {resource.conceptId && onPracticeConcept && (
                <button
                  id="video-practice-concept-btn"
                  type="button"
                  onClick={() => {
                    onPracticeConcept(resource.conceptId!);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Practice Questions on this Topic
                </button>
              )}
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Source Video
              </a>
            </div>
          </div>

          {/* Chapters / Timestamps sidebar */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col h-full">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              <ListOrdered className="w-4 h-4 text-indigo-600" />
              Chapter Timestamps
            </div>

            {resource.keyTimestamps && resource.keyTimestamps.length > 0 ? (
              <div className="space-y-2 overflow-y-auto max-h-56 pr-1">
                {resource.keyTimestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTimestamp(ts.time)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-start gap-2.5 ${
                      activeTimestamp === ts.time
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold'
                        : 'bg-white border-slate-200/60 hover:bg-slate-100/70 text-slate-700'
                    }`}
                  >
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] shrink-0">
                      {ts.time}
                    </span>
                    <span className="line-clamp-2">{ts.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                Full walkthrough lecture without chapters
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
