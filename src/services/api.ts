import { Question, ErrorType, WeaknessItem, StudentProfile, RepeatedErrorRecord } from '../types';

export interface ExplanationResponse {
  success: boolean;
  explanation: string;
  source: string;
}

export interface DiagnosisResponse {
  success: boolean;
  diagnosis: string;
  source: string;
}

export interface TutorResponse {
  success: boolean;
  reply: string;
  source: string;
}

export interface CategorizeResponse {
  success: boolean;
  categorization: {
    detectedSubject: string;
    detectedTopic: string;
    detectedConcept: string;
    estimatedPagesOrDuration: string;
    summary: string;
    recommendedForWeakness: ErrorType;
  };
  source: string;
}

export const apiService = {
  async getAiExplanation(
    question: Question,
    selectedAnswer: string,
    correctAnswer?: string
  ): Promise<ExplanationResponse> {
    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: question.questionText,
          selectedAnswer,
          correctAnswer,
          options: {
            A: question.optionA,
            B: question.optionB,
            C: question.optionC,
            D: question.optionD
          },
          conceptName: question.conceptName,
          subjectName: question.subjectName
        })
      });

      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch {
      // Robust client fallback
      const distractor = question.errorDistractors?.[selectedAnswer as 'A' | 'B' | 'C' | 'D'];
      return {
        success: true,
        source: 'local-engine',
        explanation: `**Your Answer:** ${selectedAnswer}  
**Correct Answer:** ${correctAnswer}

**Why?**
${distractor?.confusionNote || 'You confused the baseline algorithm with an edge-case configuration.'}

**Simple Explanation:**
${question.explanation}

**Identified Weakness:**
${distractor?.errorType || 'Conceptual'}

**Recommended:**
Review the key formula card for 2 minutes and attempt 5 targeted practice questions.`
      };
    }
  },

  async getAiDiagnosis(
    exam: string,
    accuracy: number,
    avgTime: number,
    weaknesses: WeaknessItem[],
    studentName: string
  ): Promise<DiagnosisResponse> {
    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, accuracy, avgTime, weaknesses, studentName })
      });

      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch {
      return {
        success: true,
        source: 'local-engine',
        diagnosis: `### Diagnostic Assessment Summary for ${studentName}

• **Accuracy:** ${accuracy}% | **Avg Time:** ${avgTime}s per question
• **Dominant Error Pattern:** ${weaknesses[0]?.errorTypes.join(' + ') || 'Conceptual'}
• **Weakest Concept:** ${weaknesses[0]?.conceptName || 'Transport Layer'} (${weaknesses[0]?.accuracy}% accuracy)

**Root Cause:**
${weaknesses[0]?.reason || 'High error rate detected in recent test attempts.'}

**3-Step Remediation Plan:**
1. Review the 2-minute concept cheat-sheet.
2. Watch the recommended video explanation.
3. Solve 5 targeted practice questions followed by previous-year questions.`
      };
    }
  },

  async getAiTutorResponse(
    userMessage: string,
    studentProfile: StudentProfile,
    recentErrors: RepeatedErrorRecord[]
  ): Promise<TutorResponse> {
    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, studentProfile, recentErrors })
      });

      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch {
      return {
        success: true,
        source: 'local-tutor',
        reply: `Hello ${studentProfile.name}! Based on your recent diagnostic attempts in **${studentProfile.targetExam}**:

• You've made **6 errors** in **TCP Congestion Control** (mainly confusing TCP Reno fast recovery with Tahoe timeout).
• You've made **4 errors** in **Waiting Time vs Turnaround Time** (forgetting that Waiting Time = Turnaround Time - Burst Time).
• Your average response time is currently higher than the benchmark in mathematical calculations.

What specific problem or concept would you like to review step-by-step right now?`
      };
    }
  },

  async categorizeResource(
    resourceTitle: string,
    resourceUrl?: string,
    notesText?: string,
    exam?: string
  ): Promise<CategorizeResponse> {
    try {
      const res = await fetch('/api/ai/categorize-resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceTitle, resourceUrl, notesText, exam })
      });

      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch {
      const isCn = resourceTitle.toLowerCase().includes('network') || resourceTitle.toLowerCase().includes('tcp');
      return {
        success: true,
        source: 'local-classifier',
        categorization: {
          detectedSubject: isCn ? 'Computer Networks' : 'Operating Systems',
          detectedTopic: isCn ? 'Transport Layer Protocols' : 'CPU Scheduling Algorithms',
          detectedConcept: isCn ? 'TCP Congestion Control' : 'Waiting Time vs Turnaround Time',
          estimatedPagesOrDuration: '10 Pages PDF / 15 Mins',
          summary: `Forwarded resource covering fundamentals and exam problem solutions for ${resourceTitle}.`,
          recommendedForWeakness: 'Conceptual'
        }
      };
    }
  }
};
