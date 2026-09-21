import React, { useState } from 'react';
import { Question, ErrorType, ConceptMastery, QuestionPattern } from '../types';
import { QuestionCard } from '../components/QuestionCard';
import { apiService } from '../services/api';
import { 
  Target, 
  Sparkles, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Lightbulb,
  Clock,
  RotateCcw,
  Layers,
  Send
} from 'lucide-react';

interface PracticePageProps {
  questions: Question[];
  selectedConceptId?: string;
  isPyqOnly?: boolean;
  onUpdateMastery: (conceptId: string, wasCorrect: boolean, timeSeconds: number) => void;
  onRetestDiagnostic: () => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  questions,
  selectedConceptId,
  isPyqOnly = false,
  onUpdateMastery,
  onRetestDiagnostic
}) => {
  const [filterConcept, setFilterConcept] = useState<string>(selectedConceptId || 'ALL');
  const [filterPyq, setFilterPyq] = useState<boolean>(isPyqOnly);
  const [filterPattern, setFilterPattern] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Track selected but unsubmitted input for MSQ / NAT
  const [currentInput, setCurrentInput] = useState<string>('');

  // Track submissions per question
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, string>>({});
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Filter practice questions
  const filteredQuestions = questions.filter(q => {
    const matchesConcept = filterConcept === 'ALL' || q.conceptId === filterConcept;
    const matchesPyq = !filterPyq || q.isPyq;
    const matchesPattern = filterPattern === 'ALL' || (q.pattern || 'MCQ') === filterPattern;
    return matchesConcept && matchesPyq && matchesPattern;
  });

  const activeQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  const hasSubmitted = activeQuestion && Boolean(submittedAnswers[activeQuestion.id]);

  // Handle option selection
  const handleSelectAnswer = (selected: string) => {
    if (!activeQuestion || hasSubmitted) return;
    setCurrentInput(selected);

    // For single-choice MCQ and AssertionReason, submit directly for fast flow
    const pat = activeQuestion.pattern || 'MCQ';
    if (pat === 'MCQ' || pat === 'AssertionReason') {
      submitAnswerFinal(selected);
    }
  };

  const submitAnswerFinal = async (answerValue: string) => {
    if (!activeQuestion || !answerValue) return;

    const timeSpent = Math.max(5, Math.round((Date.now() - questionStartTime) / 1000));
    const pat = activeQuestion.pattern || 'MCQ';

    let isCorrect = false;
    if (pat === 'NAT') {
      const val = parseFloat(answerValue);
      if (!isNaN(val)) {
        if (activeQuestion.numericalAnswerRange) {
          isCorrect = val >= activeQuestion.numericalAnswerRange.min && val <= activeQuestion.numericalAnswerRange.max;
        } else if (activeQuestion.numericalAnswer !== undefined) {
          isCorrect = Math.abs(val - activeQuestion.numericalAnswer) <= (activeQuestion.numericalTolerance || 0.01);
        }
      }
    } else if (pat === 'MSQ') {
      const userSelected = answerValue.split(',').map(s => s.trim()).sort();
      const expected = (activeQuestion.correctAnswers || [activeQuestion.correctAnswer]).sort();
      isCorrect = userSelected.length === expected.length && userSelected.every((v, i) => v === expected[i]);
    } else {
      isCorrect = answerValue === activeQuestion.correctAnswer;
    }

    setSubmittedAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: answerValue
    }));

    // Update real-time learner mastery model
    onUpdateMastery(activeQuestion.conceptId, isCorrect, timeSpent);

    // If incorrect, trigger Stage 8 AI Explanation System
    if (!isCorrect) {
      setIsLoadingAi(true);
      try {
        const res = await apiService.getAiExplanation(
          activeQuestion,
          answerValue,
          activeQuestion.correctAnswer
        );
        setAiExplanations(prev => ({
          ...prev,
          [activeQuestion.id]: res.explanation
        }));
      } catch {
        // Fallback already handled
      } finally {
        setIsLoadingAi(false);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentInput('');
      setQuestionStartTime(Date.now());
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentInput('');
      setQuestionStartTime(Date.now());
    }
  };

  // Distinct concepts in questions
  const distinctConcepts = Array.from(new Set(questions.map(q => JSON.stringify({ id: q.conceptId, name: q.conceptName }))))
    .map(s => JSON.parse(s));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              Targeted Practice Lab
            </span>
            <span className="text-xs text-slate-500 font-medium">Multi-Pattern Mastery (MCQ, MSQ, NAT, Assertion-Reason)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Targeted Questions & PYQ Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Practice isolated questions on your weakest topics across diverse question patterns. Every mistake triggers an immediate explanation mapping your exact confusion.
          </p>
        </div>

        <button
          type="button"
          onClick={onRetestDiagnostic}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Take Mini Reassessment</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Concept Focus */}
          <div>
            <label className="text-xs font-semibold text-slate-500 mr-2">Concept Focus:</label>
            <select
              value={filterConcept}
              onChange={e => {
                setFilterConcept(e.target.value);
                setCurrentIndex(0);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Concepts</option>
              {distinctConcepts.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Question Pattern Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-500 mr-2">Pattern:</label>
            <select
              value={filterPattern}
              onChange={e => {
                setFilterPattern(e.target.value);
                setCurrentIndex(0);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
            >
              <option value="ALL">All Patterns</option>
              <option value="MCQ">MCQ (Single Correct)</option>
              <option value="MSQ">MSQ (Multiple Select)</option>
              <option value="NAT">NAT (Numerical Answer)</option>
              <option value="AssertionReason">Assertion & Reason</option>
            </select>
          </div>

          {/* PYQ Toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterPyq}
              onChange={e => {
                setFilterPyq(e.target.checked);
                setCurrentIndex(0);
              }}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Official PYQs Only</span>
          </label>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Question {filteredQuestions.length > 0 ? currentIndex + 1 : 0} of {filteredQuestions.length}
        </div>
      </div>

      {/* Question Card Container */}
      {filteredQuestions.length > 0 && activeQuestion ? (
        <div className="space-y-4 max-w-4xl mx-auto">
          <QuestionCard
            question={activeQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={filteredQuestions.length}
            selectedAnswer={submittedAnswers[activeQuestion.id] || currentInput || null}
            onSelectAnswer={handleSelectAnswer}
            isReviewMode={hasSubmitted}
            aiExplanation={aiExplanations[activeQuestion.id]}
          />

          {/* Explicit Submit button for MSQ and NAT */}
          {!hasSubmitted && (activeQuestion.pattern === 'MSQ' || activeQuestion.pattern === 'NAT') && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {activeQuestion.pattern === 'MSQ' 
                  ? 'Confirm all chosen checkboxes before submitting.'
                  : 'Ensure your numerical value is verified before submitting.'}
              </span>
              <button
                type="button"
                disabled={!currentInput.trim()}
                onClick={() => submitAnswerFinal(currentInput)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
              >
                <span>Submit Answer</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Practice Stepper Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 transition"
            >
              Previous Question
            </button>

            <div className="text-xs text-slate-400">
              {hasSubmitted ? 'Review complete. Move to next question.' : 'Answer the question above to see diagnosis.'}
            </div>

            <button
              type="button"
              disabled={currentIndex === filteredQuestions.length - 1}
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-xs font-bold text-white shadow-xs transition"
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm space-y-2">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <p>No questions matched your current filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setFilterConcept('ALL');
              setFilterPyq(false);
              setFilterPattern('ALL');
            }}
            className="text-indigo-600 text-xs font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
