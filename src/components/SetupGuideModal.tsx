import React from 'react';
import { X, ExternalLink, Terminal } from 'lucide-react';
import { SetupGuidePage } from '../pages/SetupGuidePage';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFullscreenPage?: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({
  isOpen,
  onClose,
  onViewFullscreenPage
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-50 border border-slate-200 rounded-3xl max-w-5xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                ExamAI Localhost Setup Overlay
              </h2>
              <p className="text-[11px] text-slate-500">Run locally with VS Code, Node.js, and npm/yarn</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onViewFullscreenPage && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewFullscreenPage();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition border border-indigo-200/80"
              >
                <span>Full Page View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              id="setup-guide-modal-close-btn"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              aria-label="Close setup guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <SetupGuidePage isModal={true} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
