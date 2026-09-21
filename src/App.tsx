import React, { useState } from 'react';
import { 
  ExamType, 
  StudentProfile, 
  Question, 
  QuestionAttempt, 
  ResourceItem, 
  WeaknessItem, 
  ConceptMastery,
  PreviousYearPaper
} from './types';
import { 
  INITIAL_STUDENT, 
  INITIAL_QUESTIONS, 
  INITIAL_RESOURCES, 
  INITIAL_WEAKNESSES, 
  INITIAL_MASTERY,
  SYLLABUS_DATA,
  WEEKLY_ACCURACY_TRENDS,
  REPEATED_ERRORS_HISTORY,
  DOMAIN_DIAGNOSTIC_QUESTIONS
} from './data/mockData';
import { analyzeTestAttempts, updateConceptMastery, DiagnosticAnalysisResult } from './services/weaknessEngine';

import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { AiTutorDrawer } from './components/AiTutorDrawer';
import { GeminiChatbot } from './components/GeminiChatbot';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { LoginPage } from './components/LoginPage';

import { Dashboard } from './pages/Dashboard';
import { DiagnosticTestPage } from './pages/DiagnosticTestPage';
import { TestResultPage } from './pages/TestResultPage';
import { WeaknessAnalysisPage } from './pages/WeaknessAnalysisPage';
import { KnowledgeMapPage } from './pages/KnowledgeMapPage';
import { ResourceHubPage } from './pages/ResourceHubPage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { PreviousPapersPage } from './pages/PreviousPapersPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { SetupGuidePage } from './pages/SetupGuidePage';
import { SetupGuideModal } from './components/SetupGuideModal';

import { 
  FileText, 
  PlayCircle, 
  BookOpen, 
  ExternalLink, 
  X, 
  Sparkles,
  Bot
} from 'lucide-react';

export function App() {
  const [currentExam, setCurrentExam] = useState<ExamType>('GATE');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT);
  const [masteryData, setMasteryData] = useState<ConceptMastery[]>(INITIAL_MASTERY);
  const [weaknesses, setWeaknesses] = useState<WeaknessItem[]>(INITIAL_WEAKNESSES);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);

  // Authentication state for Google Login
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('examai_logged_in');
    return saved === 'true';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [lastAnalysis, setLastAnalysis] = useState<DiagnosticAnalysisResult | null>(null);
  const [lastAttempts, setLastAttempts] = useState<QuestionAttempt[]>([]);

  // Practice targeting
  const [practiceConceptId, setPracticeConceptId] = useState<string | undefined>(undefined);
  const [practiceIsPyq, setPracticeIsPyq] = useState<boolean>(false);

  // Modal states for media & viewer
  const [videoModalResource, setVideoModalResource] = useState<ResourceItem | null>(null);
  const [pdfModalResource, setPdfModalResource] = useState<ResourceItem | null>(null);
  const [pdfModalPaper, setPdfModalPaper] = useState<PreviousYearPaper | null>(null);
  const [selectedGenericResource, setSelectedGenericResource] = useState<ResourceItem | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [isSetupGuideModalOpen, setIsSetupGuideModalOpen] = useState<boolean>(false);

  // Handle Google Login
  const handleLogin = (profile: Partial<StudentProfile>) => {
    setStudentProfile(prev => ({
      ...prev,
      ...profile,
      streakDays: 1, // Starts strictly with 1 Day Streak
      provider: 'google'
    }));
    if (profile.targetExam) {
      setCurrentExam(profile.targetExam);
    }
    setIsAuthenticated(true);
    localStorage.setItem('examai_logged_in', 'true');
  };

  // Handle Google Sign Out
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('examai_logged_in');
  };

  // Active questions tailored specifically according to each domain
  const activeQuestionsList = DOMAIN_DIAGNOSTIC_QUESTIONS[currentExam] || questions.filter(q => q.examId === currentExam);

  // Filter current syllabus subjects by current exam
  const currentSubjects = SYLLABUS_DATA[currentExam] || SYLLABUS_DATA['GATE'];

  // Handle Exam Switching
  const handleSelectExam = (exam: ExamType) => {
    setCurrentExam(exam);
    setStudentProfile(prev => ({
      ...prev,
      targetExam: exam
    }));
  };

  // Start Diagnostic Test
  const handleStartDiagnostic = () => {
    setActiveTab('diagnostic');
  };

  // Start Official Paper Simulation
  const handleStartPaperTest = (paper: PreviousYearPaper) => {
    // Switch to diagnostic tab with paper context
    setActiveTab('diagnostic');
  };

  // Smart Resource Opener (opens video modal or PDF modal depending on type)
  const handleOpenResource = (res: ResourceItem) => {
    if (res.type === 'Video') {
      setVideoModalResource(res);
    } else if (res.type === 'PDF' || res.type === 'Previous Papers') {
      setPdfModalResource(res);
    } else {
      setSelectedGenericResource(res);
    }
  };

  // Finish Diagnostic Test & Run Weakness Engine
  const handleFinishTest = (attempts: QuestionAttempt[]) => {
    const analysis = analyzeTestAttempts(attempts);
    setLastAnalysis(analysis);
    setLastAttempts(attempts);

    // If new weaknesses detected, merge them into state
    if (analysis.identifiedWeaknesses.length > 0) {
      setWeaknesses(prev => {
        const merged = [...analysis.identifiedWeaknesses];
        prev.forEach(p => {
          if (!merged.some(m => m.conceptId === p.conceptId)) {
            merged.push(p);
          }
        });
        return merged;
      });
    }

    // Update student profile stats
    setStudentProfile(prev => ({
      ...prev,
      testsCompleted: prev.testsCompleted + 1,
      questionsAttempted: (prev.questionsAttempted || 0) + attempts.length,
      overallMastery: Math.round((prev.overallMastery * 3 + analysis.accuracy) / 4)
    }));

    setActiveTab('result');
  };

  // Handle practice concept selection
  const handleSelectConceptForPractice = (conceptId: string, isPyq = false) => {
    setPracticeConceptId(conceptId);
    setPracticeIsPyq(isPyq);
    setActiveTab('practice');
  };

  // Update learner mastery state during practice
  const handleUpdateMastery = (conceptId: string, wasCorrect: boolean, timeSeconds: number) => {
    setMasteryData(prev => updateConceptMastery(prev, conceptId, wasCorrect, timeSeconds));
  };

  // Add new study material to Resource Hub
  const handleAddResource = (newRes: ResourceItem) => {
    setResources(prev => [newRes, ...prev]);
  };

  // If user is logged out, present the Google Login Page
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        defaultExam={currentExam} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Navbar with Google SSO Profile & Streak */}
      <Navbar
        currentExam={currentExam}
        onSelectExam={handleSelectExam}
        studentProfile={studentProfile}
        onStartDiagnostic={handleStartDiagnostic}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenSetupGuide={() => setIsSetupGuideModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasRecentResult={lastAnalysis !== null}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* Active Tab Views */}
          {activeTab === 'dashboard' && (
            <Dashboard
              studentProfile={studentProfile}
              currentExam={currentExam}
              masteryData={masteryData}
              weaknesses={weaknesses}
              onStartDiagnostic={handleStartDiagnostic}
              onNavigateTab={setActiveTab}
              onSelectConceptForPractice={handleSelectConceptForPractice}
              onOpenResource={handleOpenResource}
              onSelectExam={handleSelectExam}
              onOpenTutor={() => setIsTutorOpen(true)}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapPage
              currentExam={currentExam}
              onSelectExam={handleSelectExam}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectConceptForPractice={handleSelectConceptForPractice}
              onOpenTutor={() => setIsTutorOpen(true)}
            />
          )}

          {activeTab === 'diagnostic' && (
            <DiagnosticTestPage
              questions={activeQuestionsList}
              currentExam={currentExam}
              onFinishTest={handleFinishTest}
              onCancelTest={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'result' && lastAnalysis && (
            <TestResultPage
              analysis={lastAnalysis}
              attempts={lastAttempts}
              currentExam={currentExam}
              onRetakeTest={handleStartDiagnostic}
              onStartRemediation={(cid) => handleSelectConceptForPractice(cid, false)}
              onOpenTutor={() => setIsTutorOpen(true)}
            />
          )}

          {activeTab === 'previous-papers' && (
            <PreviousPapersPage
              currentExam={currentExam}
              onSelectExam={handleSelectExam}
              onOpenPdfModal={(paper) => setPdfModalPaper(paper)}
              onOpenVideoModal={(videoUrl, title) => {
                setVideoModalResource({
                  id: `pyq-vid-${Date.now()}`,
                  title,
                  type: 'Video',
                  subjectId: 'pyq-all',
                  conceptId: 'pyq-solutions',
                  url: videoUrl,
                  videoEmbedUrl: videoUrl,
                  description: 'Complete video solutions and walkthrough by exam toppers & faculty.',
                  durationOrPages: 'Video Solution',
                  rating: 5.0,
                  sourceName: 'Official PYQ Series'
                });
              }}
              onStartPaperTest={handleStartPaperTest}
            />
          )}

          {activeTab === 'weaknesses' && (
            <WeaknessAnalysisPage
              weaknesses={weaknesses}
              onRemediate={handleSelectConceptForPractice}
              onOpenTutor={() => setIsTutorOpen(true)}
            />
          )}

          {activeTab === 'knowledge-map' && (
            <KnowledgeMapPage
              subjects={currentSubjects}
              masteryData={masteryData}
              currentExam={currentExam}
              onSelectConcept={(cid) => handleSelectConceptForPractice(cid, false)}
            />
          )}

          {activeTab === 'resources' && (
            <ResourceHubPage
              resources={resources}
              currentExam={currentExam}
              onAddResource={handleAddResource}
              onOpenResource={handleOpenResource}
            />
          )}

          {activeTab === 'practice' && (
            <PracticePage
              questions={activeQuestionsList}
              selectedConceptId={practiceConceptId}
              isPyqOnly={practiceIsPyq}
              onUpdateMastery={handleUpdateMastery}
              onRetestDiagnostic={handleStartDiagnostic}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressPage
              studentProfile={studentProfile}
              accuracyTrends={WEEKLY_ACCURACY_TRENDS}
              repeatedErrors={REPEATED_ERRORS_HISTORY}
              masteryData={masteryData}
              onRetestDiagnostic={handleStartDiagnostic}
              onOpenTutor={() => setIsTutorOpen(true)}
            />
          )}

          {activeTab === 'ai-tutor' && (
            <div className="space-y-4">
              <GeminiChatbot
                currentExam={currentExam}
                studentProfile={studentProfile}
              />
            </div>
          )}

          {activeTab === 'setup-guide' && (
            <SetupGuidePage />
          )}

        </main>
      </div>

      {/* Floating AI Tutor Button on Mobile */}
      <div className={`fixed ${activeTab === 'diagnostic' ? 'bottom-24 right-5' : 'bottom-6 right-6'} md:hidden z-40 transition-all duration-200`}>
        <button
          id="mobile-tutor-fab"
          type="button"
          onClick={() => setIsTutorOpen(true)}
          className="w-14 h-14 rounded-full bg-indigo-600 text-white shadow-xl flex items-center justify-center hover:bg-indigo-700 transition"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>

      {/* Modal: AI Tutor Drawer Overlay */}
      {isTutorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="max-w-4xl w-full">
            <AiTutorDrawer
              studentProfile={studentProfile}
              repeatedErrors={REPEATED_ERRORS_HISTORY}
              onClose={() => setIsTutorOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal: Interactive Video Player */}
      <VideoPlayerModal
        resource={videoModalResource}
        onClose={() => setVideoModalResource(null)}
        onPracticeConcept={(cid) => handleSelectConceptForPractice(cid, false)}
      />

      {/* Modal: Interactive PDF Document Viewer */}
      <PdfViewerModal
        resource={pdfModalResource}
        paper={pdfModalPaper}
        onClose={() => {
          setPdfModalResource(null);
          setPdfModalPaper(null);
        }}
        onPracticeConcept={(cid) => handleSelectConceptForPractice(cid, false)}
      />

      {/* Modal: Generic Resource Preview */}
      {selectedGenericResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                  {selectedGenericResource.type} Resource
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {selectedGenericResource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGenericResource(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700 leading-relaxed">
              <div className="font-bold text-slate-900">Resource Overview & Concept Focus:</div>
              <p>{selectedGenericResource.description}</p>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Duration/Length: {selectedGenericResource.durationOrPages} • Source: {selectedGenericResource.sourceName} • Rating: ★ {selectedGenericResource.rating}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedGenericResource(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close Preview
              </button>

              <button
                type="button"
                onClick={() => {
                  const cid = selectedGenericResource.conceptId;
                  setSelectedGenericResource(null);
                  if (cid) handleSelectConceptForPractice(cid, false);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <span>Practice Questions on this Concept</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: VS Code Local Setup Guide Overlay */}
      <SetupGuideModal
        isOpen={isSetupGuideModalOpen}
        onClose={() => setIsSetupGuideModalOpen(false)}
        onViewFullscreenPage={() => setActiveTab('setup-guide')}
      />

    </div>
  );
}

export default App;
