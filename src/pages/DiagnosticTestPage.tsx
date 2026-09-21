import React, { useState, useEffect } from 'react';
import { Question, QuestionAttempt, ExamType } from '../types';
import { QuestionCard } from '../components/QuestionCard';
import { TestTimer } from '../components/TestTimer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  AlertCircle, 
  HelpCircle,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowLeft,
  X
} from 'lucide-react';

interface DiagnosticTestPageProps {
  questions: Question[];
  currentExam: ExamType;
  onFinishTest: (attempts: QuestionAttempt[]) => void;
  onCancelTest: () => void;
}

export const DiagnosticTestPage: React.FC<DiagnosticTestPageProps> = ({
  questions,
  currentExam,
  onFinishTest,
  onCancelTest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const [totalSecondsRemaining, setTotalSecondsRemaining] = useState(900); // 15 mins
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

  // Reset test state when domain/exam switches
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setQuestionTimes({});
    setTotalSecondsRemaining(900);
  }, [currentExam]);

  const safeIndex = Math.min(currentIndex, Math.max(0, questions.length - 1));
  const currentQuestion = questions[safeIndex] || questions[0];

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSecondsRemaining(prev => Math.max(0, prev - 1));
      if (currentQuestion) {
        setQuestionTimes(prev => ({
          ...prev,
          [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  // Keyboard navigation (ArrowLeft for Previous, ArrowRight for Next, Escape to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isConfirmSubmitOpen && e.key === 'Escape') {
        setIsConfirmSubmitOpen(false);
        return;
      }
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, isConfirmSubmitOpen]);

  const handleSelectAnswer = (optionValue: string) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    const attempts: QuestionAttempt[] = questions.map(q => {
      const selected = answers[q.id] || null;
      let isCorrect = false;

      if (selected) {
        const pat = q.pattern || 'MCQ';
        if (pat === 'NAT') {
          const val = parseFloat(selected);
          if (!isNaN(val)) {
            if (q.numericalAnswerRange) {
              isCorrect = val >= q.numericalAnswerRange.min && val <= q.numericalAnswerRange.max;
            } else if (q.numericalAnswer !== undefined) {
              isCorrect = Math.abs(val - q.numericalAnswer) <= (q.numericalTolerance || 0.01);
            }
          }
        } else if (pat === 'MSQ') {
          const userOpts = selected.split(',').map(s => s.trim()).sort();
          const correctOpts = (q.correctAnswers || [q.correctAnswer]).sort();
          isCorrect = userOpts.length === correctOpts.length && userOpts.every((v, i) => v === correctOpts[i]);
        } else {
          isCorrect = selected === q.correctAnswer;
        }
      }

      const timeSpent = questionTimes[q.id] || 30;

      return {
        questionId: q.id,
        question: q,
        selectedAnswer: selected,
        isCorrect,
        timeTakenSeconds: timeSpent
      };
    });

    onFinishTest(attempts);
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = Math.max(0, questions.length - answeredCount);
  const unansweredQuestions = questions
    .map((q, idx) => ({ q, idx, isAnswered: Boolean(answers[q.id]) }))
    .filter(item => !item.isAnswered);

  const formattedTimeRemaining = `${Math.floor(totalSecondsRemaining / 60)}m ${(totalSecondsRemaining % 60).toString().padStart(2, '0')}s`;

  return (
    <div className="space-y-6">
      
      {/* Top Test Header with Timers & Submit button */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              {currentExam} Diagnostic
            </span>
            <span className="text-sm font-bold text-slate-800">
              Adaptive Cognitive Assessment
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Answered: <strong className="text-slate-800">{answeredCount}</strong> of {questions.length} questions
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TestTimer
            totalSecondsRemaining={totalSecondsRemaining}
            questionSecondsSpent={questionTimes[currentQuestion?.id] || 0}
            benchmarkSeconds={currentQuestion?.benchmarkTimeSeconds || 75}
          />

          <button
            id="test-submit-btn"
            type="button"
            onClick={() => setIsConfirmSubmitOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition"
            title="Finish and evaluate assessment"
          >
            <span>Finish Test</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Active Question Card + Question Navigation Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 cols: Question Card */}
        <div className="lg:col-span-3 space-y-4">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              questionNumber={safeIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentQuestion.id] || null}
              onSelectAnswer={handleSelectAnswer}
              timeSpentSeconds={questionTimes[currentQuestion.id] || 0}
            />
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              id="test-prev-btn"
              type="button"
              disabled={safeIndex === 0}
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 text-xs sm:text-sm font-semibold transition"
              title={safeIndex === 0 ? 'At the beginning of questions' : 'Previous question'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="text-xs text-slate-400 font-mono">
              Question {safeIndex + 1} of {questions.length}
            </div>

            <button
              id="test-next-btn"
              type="button"
              disabled={safeIndex === questions.length - 1}
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-xs transition"
              title={safeIndex === questions.length - 1 ? 'At the end of questions' : 'Next question'}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 1 col: Question Palette */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Question Palette</h3>
              <span className="text-[11px] font-mono text-slate-400">{answeredCount}/{questions.length}</span>
            </div>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isCurrent = idx === safeIndex;

                let btnClass = "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100";
                if (isCurrent) {
                  btnClass = "border-indigo-600 bg-indigo-600 text-white font-bold ring-2 ring-indigo-200";
                } else if (isAnswered) {
                  btnClass = "border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold";
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs flex items-center justify-center transition ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-indigo-600"></span>
                <span>Current Question</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-300"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-50 border border-slate-200"></span>
                <span>Unanswered</span>
              </div>
            </div>

            {/* Quit/Abort */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onCancelTest}
                className="w-full text-xs text-rose-600 hover:text-rose-800 font-semibold text-center py-2"
              >
                Abort Test & Return to Dashboard
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Persistent Horizontal Question Navigation Bar at the Bottom */}
      <div 
        id="persistent-assessment-nav-bar"
        className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-300/30 transition mt-6"
      >
        <div className="flex items-center justify-between gap-3 max-w-5xl mx-auto">
          
          {/* Persistent Previous Button (Disabled at start of question sequence) */}
          <button
            id="persistent-test-prev-btn"
            type="button"
            disabled={safeIndex === 0}
            onClick={handlePrev}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white text-slate-700 text-xs sm:text-sm font-bold transition shadow-2xs"
            title={safeIndex === 0 ? 'At the beginning of questions' : 'Previous question (Left Arrow ←)'}
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Previous Question</span>
            <span className="sm:hidden">Previous</span>
            <kbd className="hidden md:inline-block text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-mono">←</kbd>
          </button>

          {/* Center Info: Question Counter, Answered Status & Quick Progress Dots */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Question <span className="text-indigo-600 font-mono font-black">{safeIndex + 1}</span> of <span className="font-mono">{questions.length}</span>
              </span>
              {currentQuestion && answers[currentQuestion.id] ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Answered</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Unanswered
                </span>
              )}
            </div>

            {/* Micro Dot Map for Quick Reference */}
            <div className="hidden lg:flex items-center gap-1 max-w-xs overflow-x-auto py-1">
              {questions.map((q, idx) => {
                const isAns = Boolean(answers[q.id]);
                const isCur = idx === safeIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      isCur ? 'bg-indigo-600 ring-2 ring-indigo-200 scale-125' :
                      isAns ? 'bg-emerald-500 hover:scale-110' :
                      'bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Question ${idx + 1} (${isAns ? 'Answered' : 'Unanswered'})`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Controls: Finish Test & Persistent Next Button (Disabled at end of question sequence) */}
          <div className="flex items-center gap-2">
            <button
              id="persistent-finish-test-btn"
              type="button"
              onClick={() => setIsConfirmSubmitOpen(true)}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold transition shadow-2xs"
              title="Finish test & review answers"
            >
              <Send className="w-3.5 h-3.5 text-emerald-700" />
              <span>Finish Test</span>
            </button>

            <button
              id="persistent-test-next-btn"
              type="button"
              disabled={safeIndex === questions.length - 1}
              onClick={handleNext}
              className="flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-200 transition"
              title={safeIndex === questions.length - 1 ? 'At the end of questions' : 'Next question (Right Arrow →)'}
            >
              <span className="hidden sm:inline">Next Question</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
              <kbd className="hidden md:inline-block text-[10px] bg-indigo-500/40 text-indigo-100 px-1.5 py-0.5 rounded font-mono">→</kbd>
            </button>
          </div>

        </div>
      </div>

      {/* Enhanced Confirmation Modal */}
      {isConfirmSubmitOpen && (
        <div 
          id="finish-test-modal-backdrop"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsConfirmSubmitOpen(false);
          }}
        >
          <div 
            id="finish-test-modal"
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
            aria-labelledby="finish-test-modal-title"
          >
            {/* Header & Close Button */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  unansweredCount > 0 
                    ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}>
                  {unansweredCount > 0 ? (
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  )}
                </div>
                <div>
                  <h3 id="finish-test-modal-title" className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                    {unansweredCount > 0 ? 'Finish Assessment with Unanswered Questions?' : 'Ready to Submit Diagnostic Assessment?'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentExam} Diagnostic Assessment • {questions.length} Total Questions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Warning Banner if Unanswered */}
            {unansweredCount > 0 ? (
              <div id="unanswered-warning-banner" className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950 space-y-1">
                    <p className="font-bold text-amber-950">
                      Warning: You have {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      Questions left blank will be scored as <strong>0 marks</strong> and marked as foundational deficiencies in your cognitive diagnosis report.
                    </p>
                  </div>
                </div>

                {/* Quick Jump Links to Unanswered Questions */}
                <div className="pt-2 border-t border-amber-200/70">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1.5">
                    Click to jump and answer:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {unansweredQuestions.map(({ idx, q }) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentIndex(idx);
                          setIsConfirmSubmitOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                        title={`Jump directly to question ${idx + 1}`}
                      >
                        <span>Q{idx + 1}</span>
                        <span className="text-[10px] text-amber-800 font-normal max-w-[110px] truncate hidden sm:inline">
                          ({q.subjectName || q.topicName})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-1">
                  <p className="font-bold text-emerald-950">
                    All questions attempted!
                  </p>
                  <p className="text-emerald-800 leading-relaxed">
                    You have answered all {questions.length} questions. ExamAI's cognitive engine is ready to compute your accuracy, speed benchmark, and concept mastery roadmap.
                  </p>
                </div>
              </div>
            )}

            {/* Assessment Progress Breakdown Stats */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Answered</div>
                <div className="text-base font-mono font-bold text-emerald-700 mt-0.5">{answeredCount}</div>
                <div className="text-[10px] text-slate-400 font-medium">{Math.round((answeredCount / questions.length) * 100)}% complete</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Unanswered</div>
                <div className={`text-base font-mono font-bold mt-0.5 ${unansweredCount > 0 ? 'text-amber-600' : 'text-slate-500'}`}>
                  {unansweredCount}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{unansweredCount === 0 ? 'All done' : 'questions blank'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Time Left</div>
                <div className="text-base font-mono font-bold text-indigo-700 mt-0.5">{formattedTimeRemaining}</div>
                <div className="text-[10px] text-slate-400 font-medium">on timer</div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
              {unansweredCount > 0 ? (
                <>
                  <button
                    id="modal-submit-anyway-btn"
                    type="button"
                    onClick={() => {
                      setIsConfirmSubmitOpen(false);
                      handleSubmit();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-rose-600 hover:text-rose-700 text-xs sm:text-sm font-bold transition"
                  >
                    Submit Anyway ({answeredCount}/{questions.length})
                  </button>
                  <button
                    id="modal-continue-test-btn"
                    type="button"
                    onClick={() => setIsConfirmSubmitOpen(false)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-200 transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return & Answer Questions</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    id="modal-review-answers-btn"
                    type="button"
                    onClick={() => setIsConfirmSubmitOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                  >
                    Review Answers
                  </button>
                  <button
                    id="modal-confirm-submit-btn"
                    type="button"
                    onClick={() => {
                      setIsConfirmSubmitOpen(false);
                      handleSubmit();
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-200 transition"
                  >
                    <span>Confirm & View Diagnosis</span>
                    <Send className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
