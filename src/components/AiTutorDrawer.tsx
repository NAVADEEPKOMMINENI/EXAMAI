import React from 'react';
import { StudentProfile, RepeatedErrorRecord, ExamType } from '../types';
import { GeminiChatbot } from './GeminiChatbot';
import { X } from 'lucide-react';

interface AiTutorDrawerProps {
  studentProfile: StudentProfile;
  repeatedErrors: RepeatedErrorRecord[];
  onClose?: () => void;
}

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({
  studentProfile,
  repeatedErrors,
  onClose
}) => {
  return (
    <div className="relative">
      {onClose && (
        <div className="flex justify-end pb-2">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title="Close Tutor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      <GeminiChatbot
        currentExam={(studentProfile.targetExam as ExamType) || 'GATE'}
        studentProfile={studentProfile}
      />
    </div>
  );
};
