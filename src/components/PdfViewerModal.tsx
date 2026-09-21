import React, { useState } from 'react';
import { ResourceItem, PreviousYearPaper } from '../types';
import { 
  X, 
  FileText, 
  Download, 
  ExternalLink, 
  Star, 
  BookOpen, 
  Sparkles,
  List,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface PdfViewerModalProps {
  resource?: ResourceItem | null;
  paper?: PreviousYearPaper | null;
  onClose: () => void;
  onPracticeConcept?: (conceptId: string) => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  resource,
  paper,
  onClose,
  onPracticeConcept
}) => {
  if (!resource && !paper) return null;

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activePage, setActivePage] = useState<number>(1);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const title = resource?.title || paper?.title || 'Document Viewer';
  const pdfUrl = resource?.pdfUrl || resource?.url || paper?.pdfUrl || 'https://examai.edu/docs/sample.pdf';
  const durationOrPages = resource?.durationOrPages || `${paper?.totalQuestions || 65} Questions (${paper?.totalMarks || 100} Marks)`;
  const authorOrSource = resource?.authorOrInstructor || resource?.sourceName || (paper ? `${paper.examId} Examination Authority` : 'ExamAI Library');
  const tableOfContents = resource?.tableOfContents || [
    'Section 1: General Aptitude & High-Yield Derivations',
    'Section 2: Core Theoretical Concept Questions (MCQ)',
    'Section 3: Multiple Select Conceptual Puzzles (MSQ)',
    'Section 4: Numerical Answer Type Computations (NAT)',
    'Section 5: Official Step-by-Step Answer Explanations'
  ];
  const keyFormulas = resource?.keyFormulas || (paper?.highlightTopics ? paper.highlightTopics.map(t => `Focus Concept: ${t}`) : []);

  const handleDownload = () => {
    // Open in new tab or trigger download
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="pdf-viewer-modal"
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100/70 text-indigo-700">
                  {paper ? 'Official Question Paper' : 'Smart PDF Document'}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {durationOrPages}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 text-xs text-slate-600">
              <button 
                type="button" 
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                className="hover:text-indigo-600 p-0.5"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 font-mono text-[11px]">{zoomLevel}%</span>
              <button 
                type="button" 
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="hover:text-indigo-600 p-0.5"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                isBookmarked 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Bookmark Document"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden md:inline">{isBookmarked ? 'Bookmarked' : 'Save'}</span>
            </button>

            {/* Download Button */}
            <button
              id="download-pdf-button"
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Close */}
            <button
              id="close-pdf-modal-button"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Document View + Right Table of Contents */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden bg-slate-100">
          
          {/* Main Document Reader Canvas */}
          <div className="lg:col-span-3 overflow-y-auto p-4 sm:p-6 flex justify-center">
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-2xl bg-white shadow-xl rounded-xl border border-slate-200/90 p-8 sm:p-12 space-y-6 transition-transform"
            >
              {/* Document Header */}
              <div className="border-b border-slate-200 pb-6 text-center space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                  {paper ? `${paper.examId} • Official Question Paper` : 'ExamAI Master Study Resource'}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {title}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Source: {authorOrSource} • Verified Reference Material
                </p>
              </div>

              {/* Document Highlights or Summary */}
              {resource?.contentSnippet && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs leading-relaxed space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Key Pedagogical Summary
                  </div>
                  <p>{resource.contentSnippet}</p>
                </div>
              )}

              {/* Formulas / Rules Section */}
              {keyFormulas.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Essential Formulas & Rules
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {keyFormulas.map((formula, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{formula}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample PDF Page Content Representation */}
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                  <span>Page {activePage} of 16</span>
                  <span>Confidential Student Copy</span>
                </div>
                <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-serif">
                  <p>
                    <strong>Detailed Derivations & Solutions:</strong> When solving questions under time constraints, always identify whether the problem requires closed-form analytical solutions or fast boundary-condition elimination.
                  </p>
                  <p>
                    In competitive examinations like GATE and JEE, numerical questions (NAT) contain zero negative markings. Always carry calculations to 3 decimal places before rounding off to the required precision to prevent rounding cascade errors.
                  </p>
                  <div className="p-3 bg-white rounded border border-slate-200 text-center font-mono text-indigo-700 text-sm">
                    {`f(x) = lim_{n -> inf} sum_{k=1}^n [ (k/n) * Delta_x ]`}
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Refer to the sidebar Table of Contents to navigate directly to individual subject modules.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Available offline when downloaded</span>
                </div>
                {resource?.conceptId && onPracticeConcept && (
                  <button
                    type="button"
                    onClick={() => {
                      onPracticeConcept(resource.conceptId!);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Practice Concept Questions
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Table of Contents & Metadata */}
          <div className="bg-white border-l border-slate-200 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                <List className="w-4 h-4 text-indigo-600" />
                Table of Contents
              </div>

              <div className="space-y-1.5">
                {tableOfContents.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePage(idx + 1)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-start gap-2.5 ${
                      activePage === idx + 1
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold shadow-xs'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="line-clamp-2">{item}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                type="button"
                onClick={handleDownload}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                Save PDF Locally
              </button>
              <p className="text-[11px] text-center text-slate-400">
                Free verified educational resource • ExamAI OS
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
