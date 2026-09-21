export type ExamType = 'GATE' | 'GATE_ECE' | 'JEE' | 'NEET' | 'UPSC' | 'CAT' | 'Banking';

export type ActiveTab = 
  | 'dashboard'
  | 'diagnostic'
  | 'result'
  | 'roadmap'
  | 'weaknesses'
  | 'knowledge-map'
  | 'previous-papers'
  | 'resources'
  | 'practice'
  | 'progress'
  | 'ai-tutor';

export type QuestionPattern = 'MCQ' | 'MSQ' | 'NAT' | 'AssertionReason' | 'MatchMatrix';

export type ErrorType = 
  | 'Conceptual' 
  | 'Procedural' 
  | 'Calculation' 
  | 'Misreading' 
  | 'Recall' 
  | 'Time';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type MasteryStatus = 'Strong' | 'Good' | 'Weak' | 'Critical';

export interface Concept {
  id: string;
  name: string;
  topicId: string;
  description?: string;
  keyFormulaOrRule?: string;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
  concepts: Concept[];
}

export interface Subject {
  id: string;
  name: string;
  examId: ExamType;
  iconName: string;
  description: string;
  topics: Topic[];
}

export interface ExamInfo {
  id: ExamType;
  name: string;
  fullName: string;
  description: string;
  targetAspirants: string;
  totalMarks: number;
  durationMinutes: number;
  subjects: string[];
}

export interface Question {
  id: string;
  examId: ExamType;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  conceptId: string;
  conceptName: string;
  pattern?: QuestionPattern;
  questionText: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctAnswer?: 'A' | 'B' | 'C' | 'D';
  correctAnswers?: ('A' | 'B' | 'C' | 'D')[]; // For MSQ
  numericalAnswer?: number; // For NAT
  numericalAnswerRange?: { min: number; max: number }; // For NAT Range
  numericalTolerance?: number; // For NAT (e.g. +/- 0.1)
  assertionText?: string; // For Assertion-Reason
  reasonText?: string; // For Assertion-Reason
  matchLeft?: { id: string; label: string }[]; // For Match Matrix
  matchRight?: { id: string; label: string }[];
  difficulty: DifficultyLevel;
  explanation: string;
  isPyq: boolean;
  year?: number;
  source?: string;
  benchmarkTimeSeconds: number; // expected seconds
  keyFormulaOrRule?: string;
  errorDistractors?: {
    A?: { errorType: ErrorType; confusionNote: string };
    B?: { errorType: ErrorType; confusionNote: string };
    C?: { errorType: ErrorType; confusionNote: string };
    D?: { errorType: ErrorType; confusionNote: string };
  };
}

export interface QuestionAttempt {
  questionId: string;
  question: Question;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | string | null;
  selectedAnswers?: ('A' | 'B' | 'C' | 'D' | string)[]; // For MSQ
  enteredNumerical?: string; // For NAT
  isCorrect: boolean;
  timeTakenSeconds: number;
  detectedErrorTypes?: ErrorType[];
  confusionReason?: string;
}

export interface PreviousYearPaper {
  id: string;
  examId: ExamType;
  year: number;
  sessionOrShift?: string;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  totalQuestions: number;
  pdfUrl?: string;
  solutionPdfUrl?: string;
  officialAnswerKeyUrl?: string;
  videoWalkthroughUrl?: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Tough';
  cutoffMarks?: number;
  highlightTopics: string[];
  questionsCountByPattern: {
    mcq: number;
    msq: number;
    nat: number;
  };
}

export interface DiagnosticTest {
  id: string;
  title: string;
  examId: ExamType;
  subjectId?: string;
  topicId?: string;
  totalQuestions: number;
  durationMinutes: number;
  questions: Question[];
}

export interface TestResult {
  id: string;
  testTitle: string;
  examId: ExamType;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  accuracyPercentage: number;
  totalTimeSeconds: number;
  avgTimeSeconds: number;
  completedAt: string;
  attempts: QuestionAttempt[];
  weaknessesDetected: WeaknessItem[];
}

export interface WeaknessItem {
  id: string;
  conceptId: string;
  conceptName: string;
  topicName: string;
  subjectName: string;
  examId?: ExamType;
  errorTypes: ErrorType[];
  accuracy: number;
  avgTime: number;
  benchmarkTime: number;
  severity: 'High' | 'Medium' | 'Low';
  priority: 'High' | 'Medium' | 'Low';
  recentIncorrectCount: number;
  reason: string;
  quickExplanation: string;
  recommendedAction: string;
}

export interface ConceptMastery {
  conceptId: string;
  conceptName: string;
  topicId: string;
  topicName: string;
  subjectId: string;
  subjectName: string;
  examId?: ExamType;
  masteryPercentage: number;
  status: MasteryStatus;
  totalAttempts: number;
  correctAttempts: number;
  avgTimeSeconds: number;
  lastTestedDate: string;
}

export type ResourceType = 'PDF' | 'Notes' | 'Video' | 'PYQ' | 'Previous Papers' | 'MockExam' | 'ExamInfo';

export interface ResourceItem {
  id: string;
  title: string;
  type: ResourceType;
  examId?: ExamType;
  subjectId: string;
  subjectName?: string;
  topicId?: string;
  topicName?: string;
  conceptId?: string;
  conceptName?: string;
  url: string;
  description: string;
  durationOrPages: string;
  rating: number;
  sourceName: string;
  isForwardedOrUploaded?: boolean;
  uploadedAt?: string;
  contentSnippet?: string;
  keyFormulas?: string[];
  videoEmbedUrl?: string; // YouTube / video embed URL
  pdfUrl?: string; // downloadable / embedded PDF link
  authorOrInstructor?: string;
  keyTimestamps?: { time: string; label: string }[];
  tableOfContents?: string[];
}

export type GeminiModelId = 'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview';

export type TutorPersona = 'mentor' | 'problem_solver' | 'diagnosis_coach';

export interface GroundingSource {
  title: string;
  url: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
  groundingSources?: GroundingSource[];
  isStreaming?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  targetExam: ExamType;
  targetYear: string;
  avatarUrl: string;
  streakDays: number;
  testsCompleted: number;
  overallMastery: number;
  questionsAttempted?: number;
  provider?: 'google' | 'guest';
}

export interface AccuracyTrend {
  week: string;
  accuracy: number;
}

export interface RepeatedErrorRecord {
  conceptName: string;
  topicName: string;
  subjectName: string;
  errorCount: number;
  primaryErrorType: ErrorType;
  lastEncountered: string;
  status: 'Critical' | 'Improving' | 'Resolved';
}

export interface RecommendationPlan {
  weakness: WeaknessItem;
  notes: ResourceItem[];
  videos: ResourceItem[];
  summaryText: string;
  practiceQuestions: Question[];
  pyqQuestions: Question[];
}

export interface RoadmapMilestone {
  weekOrMonth: string;
  title: string;
  deliverables: string[];
  recommendedHoursPerWeek: number;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  duration: string;
  focusGoal: string;
  keyActionItems: string[];
  highWeightageFocus: string[];
  doAndDont: { do: string; dont: string };
  milestoneCheck: string;
}

export interface SubjectWeightage {
  subjectName: string;
  typicalMarks: string;
  priority: 'Highest' | 'High' | 'Medium';
  expectedQuestions: string;
  keyScoringTopics: string[];
  difficultyTrend: 'Predictable / Scoring' | 'Conceptual / Moderate' | 'Variable / High Variance';
}

export interface ScoringRoundStrategy {
  roundNumber: number;
  roundName: string;
  timeWindow: string;
  strategy: string;
  targetHitRate: string;
  selectionCriteria: string;
}

export interface ScoreBenchmark {
  targetTier: string;
  targetMarks: string;
  targetPercentile: string;
  expectedAttemptRate: string;
  accuracyRequired: string;
}

export interface ExamRoadmap {
  examId: ExamType;
  examFullName: string;
  totalMarks: number;
  totalQuestions: number;
  durationMinutes: number;
  markingScheme: {
    correct: string;
    incorrect: string;
    unattempted: string;
    specialRules?: string;
  };
  executiveSummary: string;
  phases: RoadmapPhase[];
  subjectWeightages: SubjectWeightage[];
  guaranteedMarksBucket: {
    categoryTitle: string;
    potentialMarks: string;
    description: string;
    topics: string[];
    tacticalTip: string;
  }[];
  scoringRounds: ScoringRoundStrategy[];
  topNegativeMarkingTraps: {
    trapName: string;
    marksLostAvg: string;
    howToPrevent: string;
  }[];
  scoreBenchmarks: ScoreBenchmark[];
  dailyScheduleSuggestion: {
    slot: string;
    focus: string;
    duration: string;
  }[];
}
