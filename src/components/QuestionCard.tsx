import React, { useState } from 'react';
import { Question, ErrorType, QuestionPattern } from '../types';
import { 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Hash, 
  CheckSquare, 
  Square,
  Sparkles,
  Delete
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer?: (answer: any) => void;
  isReviewMode?: boolean;
  timeSpentSeconds?: number;
  aiExplanation?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  timeSpentSeconds,
  aiExplanation
}) => {
  const pattern: QuestionPattern = question.pattern || 'MCQ';

  // For MSQ: parse selectedAnswer as comma-separated or JSON array if needed
  const selectedOptionsList: string[] = selectedAnswer 
    ? (selectedAnswer.includes(',') ? selectedAnswer.split(',').map(s => s.trim()) : [selectedAnswer])
    : [];

  const [natInput, setNatInput] = useState<string>(selectedAnswer || '');

  const options: Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }> = [
    { key: 'A', text: question.optionA || '' },
    { key: 'B', text: question.optionB || '' },
    { key: 'C', text: question.optionC || '' },
    { key: 'D', text: question.optionD || '' },
  ];

  // Correctness calculation based on pattern
  let isCorrect = false;
  if (pattern === 'NAT') {
    const val = parseFloat(selectedAnswer || '');
    if (!isNaN(val)) {
      if (question.numericalAnswerRange) {
        isCorrect = val >= question.numericalAnswerRange.min && val <= question.numericalAnswerRange.max;
      } else if (question.numericalAnswer !== undefined) {
        isCorrect = Math.abs(val - question.numericalAnswer) <= (question.numericalTolerance || 0.01);
      }
    }
  } else if (pattern === 'MSQ') {
    const correctArray = question.correctAnswers || [question.correctAnswer];
    const sortedUser = [...selectedOptionsList].sort();
    const sortedCorrect = [...correctArray].sort();
    isCorrect = sortedUser.length === sortedCorrect.length && sortedUser.every((val, i) => val === sortedCorrect[i]);
  } else {
    // MCQ & AssertionReason
    isCorrect = selectedAnswer === question.correctAnswer;
  }

  const distractor = selectedAnswer && !isCorrect && typeof selectedAnswer === 'string'
    ? question.errorDistractors?.[selectedAnswer as 'A' | 'B' | 'C' | 'D'] 
    : null;

  // Toggle option for MSQ
  const handleToggleMsqOption = (optKey: string) => {
    if (isReviewMode || !onSelectAnswer) return;
    let next: string[];
    if (selectedOptionsList.includes(optKey)) {
      next = selectedOptionsList.filter(o => o !== optKey);
    } else {
      next = [...selectedOptionsList, optKey].sort();
    }
    onSelectAnswer(next.join(','));
  };

  // Handle NAT input
  const handleKeypadPress = (char: string) => {
    if (isReviewMode) return;
    if (char === 'CLEAR') {
      setNatInput('');
      onSelectAnswer && onSelectAnswer('');
    } else if (char === 'BACKSPACE') {
      const next = natInput.slice(0, -1);
      setNatInput(next);
      onSelectAnswer && onSelectAnswer(next);
    } else {
      // Prevent multiple decimals or minus signs
      if (char === '.' && natInput.includes('.')) return;
      if (char === '-' && natInput.length > 0) return;
      const next = natInput + char;
      setNatInput(next);
      onSelectAnswer && onSelectAnswer(next);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      
      {/* Question Header & Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-sm border border-indigo-200/60">
            Q{questionNumber}
          </span>
          <span className="text-xs text-slate-400 font-medium">of {totalQuestions}</span>
          
          <div className="h-4 w-px bg-slate-200 mx-1"></div>
          
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
            {question.subjectName}
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            › {question.conceptName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pattern Badge */}
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
            pattern === 'MSQ' ? 'bg-violet-50 text-violet-700 border-violet-200' :
            pattern === 'NAT' ? 'bg-amber-50 text-amber-800 border-amber-200' :
            pattern === 'AssertionReason' ? 'bg-teal-50 text-teal-700 border-teal-200' :
            'bg-blue-50 text-blue-700 border-blue-200'
          }`}>
            {pattern === 'MSQ' ? 'MSQ (Multi-Select)' :
             pattern === 'NAT' ? 'NAT (Numerical)' :
             pattern === 'AssertionReason' ? 'Assertion-Reason' :
             'MCQ'}
          </span>

          {question.isPyq && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 flex items-center gap-1">
              <FileText className="w-3 h-3 text-amber-600" />
              <span>{question.source || `PYQ ${question.year}`}</span>
            </span>
          )}

          <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
            question.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
            question.difficulty === 'Medium' ? 'bg-sky-50 text-sky-700' :
            'bg-rose-50 text-rose-700'
          }`}>
            {question.difficulty}
          </span>

          {timeSpentSeconds !== undefined && (
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{timeSpentSeconds}s</span>
            </span>
          )}
        </div>
      </div>

      {/* Assertion & Reason Special Layout */}
      {pattern === 'AssertionReason' && question.assertionText && question.reasonText && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
              Assertion (A):
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {question.assertionText}
            </p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
              Reason (R):
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {question.reasonText}
            </p>
          </div>
        </div>
      )}

      {/* Question Text */}
      <div className="text-slate-900 text-base leading-relaxed font-medium">
        {question.questionText}
      </div>

      {/* Pattern Specific Option Instructions */}
      {pattern === 'MSQ' && !isReviewMode && (
        <div className="p-3 rounded-lg bg-violet-50 text-violet-900 border border-violet-200 text-xs font-medium flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-violet-600 shrink-0" />
          <span>
            <strong>Multiple Select Question:</strong> Select all correct options. No partial marking is awarded.
          </span>
        </div>
      )}

      {/* ================= PATTERN: MCQ & AssertionReason ================= */}
      {(pattern === 'MCQ' || pattern === 'AssertionReason') && (
        <div className="space-y-3">
          {options.map(opt => {
            const isSelected = selectedAnswer === opt.key;
            const isThisCorrect = question.correctAnswer === opt.key;

            let optionStyle = "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700";
            let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";

            if (isReviewMode) {
              if (isThisCorrect) {
                optionStyle = "border-emerald-500 bg-emerald-50/60 text-emerald-900 font-semibold ring-1 ring-emerald-400";
                badgeStyle = "bg-emerald-600 text-white border-emerald-600";
              } else if (isSelected && !isThisCorrect) {
                optionStyle = "border-rose-500 bg-rose-50/60 text-rose-900 font-semibold ring-1 ring-rose-400";
                badgeStyle = "bg-rose-600 text-white border-rose-600";
              } else {
                optionStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              optionStyle = "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold ring-1 ring-indigo-500";
              badgeStyle = "bg-indigo-600 text-white border-indigo-600";
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={isReviewMode}
                onClick={() => onSelectAnswer && onSelectAnswer(opt.key)}
                className={`w-full text-left p-4 rounded-xl border flex items-start gap-3.5 transition ${optionStyle}`}
              >
                <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${badgeStyle}`}>
                  {opt.key}
                </span>
                <span className="flex-1 text-sm pt-0.5 leading-snug">{opt.text}</span>

                {isReviewMode && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isReviewMode && isSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ================= PATTERN: MSQ (Multiple Select) ================= */}
      {pattern === 'MSQ' && (
        <div className="space-y-3">
          {options.map(opt => {
            const isSelected = selectedOptionsList.includes(opt.key);
            const correctList = question.correctAnswers || [question.correctAnswer];
            const isOptionCorrect = correctList.includes(opt.key);

            let optionStyle = "border-slate-200 hover:border-violet-200 hover:bg-slate-50/50 text-slate-700";
            let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";

            if (isReviewMode) {
              if (isOptionCorrect && isSelected) {
                optionStyle = "border-emerald-500 bg-emerald-50/60 text-emerald-900 font-semibold ring-1 ring-emerald-400";
                badgeStyle = "bg-emerald-600 text-white border-emerald-600";
              } else if (isOptionCorrect && !isSelected) {
                optionStyle = "border-amber-500 bg-amber-50/60 text-amber-900 font-medium border-dashed";
                badgeStyle = "bg-amber-600 text-white border-amber-600";
              } else if (!isOptionCorrect && isSelected) {
                optionStyle = "border-rose-500 bg-rose-50/60 text-rose-900 font-semibold ring-1 ring-rose-400";
                badgeStyle = "bg-rose-600 text-white border-rose-600";
              } else {
                optionStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              optionStyle = "border-violet-600 bg-violet-50/50 text-violet-950 font-semibold ring-1 ring-violet-500";
              badgeStyle = "bg-violet-600 text-white border-violet-600";
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={isReviewMode}
                onClick={() => handleToggleMsqOption(opt.key)}
                className={`w-full text-left p-4 rounded-xl border flex items-start gap-3.5 transition ${optionStyle}`}
              >
                <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${badgeStyle}`}>
                  {opt.key}
                </span>
                <span className="flex-1 text-sm pt-0.5 leading-snug">{opt.text}</span>

                <div className="shrink-0 mt-0.5">
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-violet-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ================= PATTERN: NAT (Numerical Answer Type) ================= */}
      {pattern === 'NAT' && (
        <div className="space-y-4">
          <div className="max-w-md space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Enter your numerical answer:
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                placeholder="Click keypad or type number"
                value={selectedAnswer || natInput}
                className="w-full text-lg font-mono font-bold px-4 py-3 rounded-xl border-2 border-slate-300 bg-slate-50 focus:bg-white text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>

            {/* Virtual Numerical Keypad */}
            {!isReviewMode && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  On-Screen Calculator Keypad:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {['7', '8', '9', 'BACKSPACE', '4', '5', '6', 'CLEAR', '1', '2', '3', '-', '0', '.'].map((keyVal) => (
                    <button
                      key={keyVal}
                      type="button"
                      onClick={() => handleKeypadPress(keyVal)}
                      className={`p-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                        keyVal === 'CLEAR'
                          ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 col-span-1'
                          : keyVal === 'BACKSPACE'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-white hover:bg-slate-200 border border-slate-200 text-slate-800 shadow-xs'
                      }`}
                    >
                      {keyVal === 'BACKSPACE' ? <Delete className="w-4 h-4" /> : keyVal}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Mode: Diagnostic & AI Explanation Accordion */}
      {isReviewMode && (
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
          
          {/* Quick Result Status banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
            )}
            <div className="text-sm">
              <div className="font-bold flex items-center gap-2">
                <span>{isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}</span>
                {!isCorrect && distractor && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-200/70 text-rose-800 font-bold uppercase tracking-wider">
                    {distractor.errorType} Error
                  </span>
                )}
              </div>
              
              <div className="mt-1 text-xs opacity-90">
                {pattern === 'NAT' ? (
                  <span>
                    Your Answer: <strong>{selectedAnswer || 'Not Entered'}</strong> | 
                    Accepted Range: <strong>{question.numericalAnswerRange ? `${question.numericalAnswerRange.min} to ${question.numericalAnswerRange.max}` : `${question.numericalAnswer}`}</strong>
                  </span>
                ) : pattern === 'MSQ' ? (
                  <span>
                    Your Selection: <strong>{selectedAnswer || 'None'}</strong> | 
                    Correct Options: <strong>{(question.correctAnswers || [question.correctAnswer]).join(', ')}</strong>
                  </span>
                ) : (
                  <span>
                    Your Answer: Option {selectedAnswer || 'None'} | Correct Answer: Option {question.correctAnswer}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Distractor / Confusion Analysis */}
          {!isCorrect && distractor && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1.5">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Why did you choose {selectedAnswer}?</span>
              </div>
              <p className="text-amber-900/90 leading-relaxed font-medium">
                {distractor.confusionNote}
              </p>
            </div>
          )}

          {/* Standard Academic Explanation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>Solution & Technical Explanation</span>
            </div>
            <div className="whitespace-pre-line leading-relaxed text-slate-600">
              {question.explanation}
            </div>
          </div>

          {/* Live AI Explanation */}
          {aiExplanation && (
            <div className="p-4 rounded-xl bg-violet-50/80 border border-violet-200 text-xs text-violet-950 space-y-2">
              <div className="font-bold text-violet-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                <span>AI Tutor Diagnostic Note</span>
              </div>
              <div className="whitespace-pre-line leading-relaxed text-violet-900/90">
                {aiExplanation}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
