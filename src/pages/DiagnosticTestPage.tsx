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
  CheckCircle2
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

  const currentQuestion = questions[currentIndex];

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
          >
            <span>Finish & Diagnose</span>
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
              questionNumber={currentIndex + 1}
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
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs sm:text-sm font-semibold transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="text-xs text-slate-400 font-mono">
              Question {currentIndex + 1} of {questions.length}
            </div>

            <button
              id="test-next-btn"
              type="button"
              onClick={currentIndex === questions.length - 1 ? () => setIsConfirmSubmitOpen(true) : handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition"
            >
              <span>{currentIndex === questions.length - 1 ? 'Review & Submit' : 'Next Question'}</span>
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
                const isCurrent = idx === currentIndex;

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

      {/* Confirmation Modal */}
      {isConfirmSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Submit Diagnostic Assessment?</h3>
                <p className="text-xs text-slate-500">ExamAI will run the cognitive weakness engine on your results.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <strong>{questions.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Questions Answered:</span>
                <strong className="text-emerald-700">{answeredCount}</strong>
              </div>
              <div className="flex justify-between">
                <span>Unanswered:</span>
                <strong className="text-rose-600">{questions.length - answeredCount}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Continue Test
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsConfirmSubmitOpen(false);
                  handleSubmit();
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
              >
                Confirm & View Diagnosis
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
