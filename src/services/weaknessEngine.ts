import { Question, QuestionAttempt, WeaknessItem, ErrorType, ResourceItem, RecommendationPlan, ConceptMastery, MasteryStatus } from '../types';
import { INITIAL_RESOURCES, INITIAL_QUESTIONS } from '../data/mockData';

export interface DiagnosticAnalysisResult {
  accuracy: number;
  avgTime: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  identifiedWeaknesses: WeaknessItem[];
  errorTypeBreakdown: Record<ErrorType, number>;
  primaryWeakness?: WeaknessItem;
}

/**
 * Analyzes question attempts to detect error types, conceptual confusion, and time bottlenecks.
 */
export function analyzeTestAttempts(attempts: QuestionAttempt[]): DiagnosticAnalysisResult {
  const totalQuestions = attempts.length;
  if (totalQuestions === 0) {
    return {
      accuracy: 0,
      avgTime: 0,
      totalQuestions: 0,
      correctCount: 0,
      incorrectCount: 0,
      identifiedWeaknesses: [],
      errorTypeBreakdown: {
        Conceptual: 0,
        Procedural: 0,
        Calculation: 0,
        Misreading: 0,
        Recall: 0,
        Time: 0
      }
    };
  }

  const correctAttempts = attempts.filter(a => a.isCorrect);
  const correctCount = correctAttempts.length;
  const incorrectCount = totalQuestions - correctCount;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const totalTime = attempts.reduce((acc, a) => acc + a.timeTakenSeconds, 0);
  const avgTime = Math.round(totalTime / totalQuestions);

  // Group attempts by Concept
  const conceptGroups: Record<string, {
    conceptId: string;
    conceptName: string;
    topicName: string;
    subjectName: string;
    attempts: QuestionAttempt[];
  }> = {};

  const errorTypeBreakdown: Record<ErrorType, number> = {
    Conceptual: 0,
    Procedural: 0,
    Calculation: 0,
    Misreading: 0,
    Recall: 0,
    Time: 0
  };

  attempts.forEach(attempt => {
    const cid = attempt.question.conceptId;
    if (!conceptGroups[cid]) {
      conceptGroups[cid] = {
        conceptId: cid,
        conceptName: attempt.question.conceptName,
        topicName: attempt.question.topicName,
        subjectName: attempt.question.subjectName,
        attempts: []
      };
    }
    conceptGroups[cid].attempts.push(attempt);

    // Classify attempt error type if incorrect
    if (!attempt.isCorrect && attempt.selectedAnswer) {
      const distractor = attempt.question.errorDistractors?.[attempt.selectedAnswer as 'A' | 'B' | 'C' | 'D'];
      const errorsForThisAttempt: ErrorType[] = [];

      if (distractor?.errorType) {
        const errType: ErrorType = distractor.errorType;
        errorsForThisAttempt.push(errType);
        errorTypeBreakdown[errType] = (errorTypeBreakdown[errType] || 0) + 1;
      } else {
        // Default classification if distractor not explicitly tagged
        errorsForThisAttempt.push('Conceptual');
        errorTypeBreakdown.Conceptual++;
      }

      // Check Time bottleneck (taking 1.4x longer than benchmark)
      if (attempt.timeTakenSeconds > attempt.question.benchmarkTimeSeconds * 1.4) {
        errorsForThisAttempt.push('Time');
        errorTypeBreakdown.Time++;
      }

      attempt.detectedErrorTypes = errorsForThisAttempt;
      attempt.confusionReason = distractor?.confusionNote || 'Selected answer deviates from expected core principles.';
    }
  });

  // Identify Weaknesses per concept
  const identifiedWeaknesses: WeaknessItem[] = [];

  Object.values(conceptGroups).forEach(group => {
    const groupTotal = group.attempts.length;
    const groupCorrect = group.attempts.filter(a => a.isCorrect).length;
    const groupAccuracy = Math.round((groupCorrect / groupTotal) * 100);
    const groupTotalTime = group.attempts.reduce((sum, a) => sum + a.timeTakenSeconds, 0);
    const groupAvgTime = Math.round(groupTotalTime / groupTotal);
    const benchmarkAvg = group.attempts.reduce((sum, a) => sum + a.question.benchmarkTimeSeconds, 0) / groupTotal;

    const groupErrors: ErrorType[] = [];
    const reasons: string[] = [];

    group.attempts.filter(a => !a.isCorrect).forEach(a => {
      if (a.detectedErrorTypes) {
        a.detectedErrorTypes.forEach(err => {
          if (!groupErrors.includes(err)) groupErrors.push(err);
        });
      }
      if (a.confusionReason && !reasons.includes(a.confusionReason)) {
        reasons.push(a.confusionReason);
      }
    });

    // Check if concept qualifies as a weakness (Accuracy < 60% or Time bottleneck)
    if (groupAccuracy < 60 || groupAvgTime > benchmarkAvg * 1.3) {
      if (groupAvgTime > benchmarkAvg * 1.3 && !groupErrors.includes('Time')) {
        groupErrors.push('Time');
      }

      const severity: 'High' | 'Medium' | 'Low' = 
        groupAccuracy < 40 ? 'High' : groupAccuracy < 60 ? 'Medium' : 'Low';
      const priority: 'High' | 'Medium' | 'Low' = 
        severity === 'High' || groupErrors.includes('Conceptual') ? 'High' : 'Medium';

      const quickExplanation = group.attempts[0]?.question.keyFormulaOrRule || 
        'Review the mathematical and algorithmic relationships before re-attempting.';

      identifiedWeaknesses.push({
        id: `weakness-${group.conceptId}`,
        conceptId: group.conceptId,
        conceptName: group.conceptName,
        topicName: group.topicName,
        subjectName: group.subjectName,
        errorTypes: groupErrors.length > 0 ? groupErrors : ['Conceptual'],
        accuracy: groupAccuracy,
        avgTime: groupAvgTime,
        benchmarkTime: Math.round(benchmarkAvg),
        severity,
        priority,
        recentIncorrectCount: groupTotal - groupCorrect,
        reason: reasons.length > 0 ? reasons.join('; ') : 'Accuracy fell below benchmark threshold in diagnostic test.',
        quickExplanation,
        recommendedAction: `Focus on ${group.conceptName} fundamentals, study 2-minute review formulas, and solve 5 targeted diagnostic questions.`
      });
    }
  });

  // Sort weaknesses: High priority first, then lowest accuracy
  identifiedWeaknesses.sort((a, b) => {
    if (a.priority === 'High' && b.priority !== 'High') return -1;
    if (b.priority === 'High' && a.priority !== 'High') return 1;
    return a.accuracy - b.accuracy;
  });

  return {
    accuracy,
    avgTime,
    totalQuestions,
    correctCount,
    incorrectCount,
    identifiedWeaknesses,
    errorTypeBreakdown,
    primaryWeakness: identifiedWeaknesses[0]
  };
}

/**
 * Builds the AI Recommendation Engine plan for a given weak concept
 */
export function buildRecommendationPlan(
  weakness: WeaknessItem,
  allResources: ResourceItem[] = INITIAL_RESOURCES,
  allQuestions: Question[] = INITIAL_QUESTIONS
): RecommendationPlan {
  // Find matching resources
  const matchingNotes = allResources.filter(r => 
    (r.type === 'Notes' || r.type === 'PDF') && 
    (r.conceptId === weakness.conceptId || r.subjectId.toLowerCase().includes(weakness.subjectName.toLowerCase().substring(0, 4)))
  );

  const matchingVideos = allResources.filter(r => 
    r.type === 'Video' && 
    (r.conceptId === weakness.conceptId || r.subjectId.toLowerCase().includes(weakness.subjectName.toLowerCase().substring(0, 4)))
  );

  // Find 5 targeted practice questions
  let practiceQuestions = allQuestions.filter(q => q.conceptId === weakness.conceptId);
  if (practiceQuestions.length < 5) {
    const additional = allQuestions.filter(q => q.subjectName === weakness.subjectName && !practiceQuestions.some(p => p.id === q.id));
    practiceQuestions = [...practiceQuestions, ...additional].slice(0, 5);
  } else {
    practiceQuestions = practiceQuestions.slice(0, 5);
  }

  // Find 5 PYQ questions
  const pyqQuestions = allQuestions.filter(q => q.isPyq && (q.conceptId === weakness.conceptId || q.subjectName === weakness.subjectName)).slice(0, 5);

  let summaryText = weakness.quickExplanation;
  if (weakness.conceptId === 'cn-tcp-congestion') {
    summaryText = `TCP Congestion Control Core Summary:
• Slow Start: cwnd doubles every RTT (exponential).
• Congestion Avoidance: cwnd grows by 1 MSS every RTT (additive).
• On 3 Duplicate ACKs (Reno): ssthresh = cwnd / 2; cwnd = ssthresh + 3 MSS (Fast Recovery).
• On Timeout: ssthresh = cwnd / 2; cwnd resets to 1 MSS (Tahoe behavior).`;
  } else if (weakness.conceptId === 'os-turnaround-waiting') {
    summaryText = `CPU Scheduling Core Formulas:
• Turnaround Time (TAT) = Completion Time - Arrival Time.
• Waiting Time (WT) = Turnaround Time - Burst Time.
• Convoy Effect occurs when short processes wait behind long CPU-bound processes.
• Remember: Waiting time NEVER includes the process's own burst execution time!`;
  }

  return {
    weakness,
    notes: matchingNotes.length > 0 ? matchingNotes : INITIAL_RESOURCES.filter(r => r.type === 'PDF' || r.type === 'Notes'),
    videos: matchingVideos.length > 0 ? matchingVideos : INITIAL_RESOURCES.filter(r => r.type === 'Video'),
    summaryText,
    practiceQuestions,
    pyqQuestions
  };
}

/**
 * Updates concept mastery status based on percentage
 */
export function calculateMasteryStatus(percentage: number): MasteryStatus {
  if (percentage >= 75) return 'Strong';
  if (percentage >= 50) return 'Good';
  if (percentage >= 35) return 'Weak';
  return 'Critical';
}

/**
 * Re-evaluates student mastery after a test or practice attempt
 */
export function updateConceptMastery(
  currentMastery: ConceptMastery[],
  conceptId: string,
  wasCorrect: boolean,
  timeTakenSeconds: number
): ConceptMastery[] {
  return currentMastery.map(item => {
    if (item.conceptId !== conceptId) return item;

    const newTotal = item.totalAttempts + 1;
    const newCorrect = wasCorrect ? item.correctAttempts + 1 : item.correctAttempts;
    
    // Weighted update: recent attempts influence score dynamically
    const rawAccuracy = (newCorrect / newTotal) * 100;
    const timePenalty = timeTakenSeconds > item.avgTimeSeconds * 1.3 ? -5 : 2;
    const delta = wasCorrect ? 8 : -10;
    const newPercentage = Math.min(100, Math.max(10, Math.round(item.masteryPercentage + delta + timePenalty)));

    return {
      ...item,
      totalAttempts: newTotal,
      correctAttempts: newCorrect,
      masteryPercentage: newPercentage,
      status: calculateMasteryStatus(newPercentage),
      lastTestedDate: new Date().toISOString().split('T')[0]
    };
  });
}
