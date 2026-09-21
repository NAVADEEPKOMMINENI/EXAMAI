import { ExamRoadmap, ExamType } from '../types';

export const DOMAIN_ROADMAPS: Record<ExamType, ExamRoadmap> = {
  // ==========================================
  // 1. GATE COMPUTER SCIENCE (CS)
  // ==========================================
  GATE: {
    examId: 'GATE',
    examFullName: 'GATE Computer Science & Information Technology (CS)',
    totalMarks: 100,
    totalQuestions: 65,
    durationMinutes: 180,
    markingScheme: {
      correct: '+1 mark (for 1-mark Qs) or +2 marks (for 2-mark Qs)',
      incorrect: '-1/3 mark for 1-mark MCQ, -2/3 mark for 2-mark MCQ. ZERO negative for MSQ and NAT!',
      unattempted: '0 marks',
      specialRules: 'NAT (Numerical Answer Type) and MSQ (Multiple Select) carry NO negative marks. Never leave a NAT unattempted if you have an estimated range!'
    },
    executiveSummary: 'Scoring 65+ marks in GATE CS guarantees an M.Tech seat in the top 7 IITs or PSU shortlists. The secret is that 28 marks (General Aptitude 15 + Engineering Math 13) are mathematically predictable. Combining that with high-weightage core subjects (DSA, OS, DBMS, CN) delivers 55+ marks before touching niche theoretical edge cases.',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Syllabus Mastery & Concept Foundation',
        duration: 'Month 1 - Month 3 (12 Weeks)',
        focusGoal: 'Complete 100% core theory with self-written formula and proof summaries. Solve end-of-chapter standard questions.',
        keyActionItems: [
          'Study subjects in complementary pairs (e.g. C Programming + Data Structures alongside Discrete Math).',
          'Make a 1-page condensed cheat sheet for every single chapter.',
          'Build intuition for algorithms and mathematical proofs rather than memorizing pseudocode.',
          'Solve 25-30 fundamental textbook problems after each chapter.'
        ],
        highWeightageFocus: [
          'General Aptitude (Spatial, Numerical, Verbal)',
          'Engineering Mathematics (Linear Algebra, Calculus, Discrete Math)',
          'Data Structures & Algorithms (Trees, Graphs, Asymptotic Notation, Dynamic Programming)',
          'Operating Systems (CPU Scheduling, Paging, Virtual Memory, Deadlocks)'
        ],
        doAndDont: {
          do: 'Write handwritten short notes with corner cases (e.g., empty graph, non-preemptive scheduling arrival = 0).',
          dont: 'Do not watch 80-hour video playlists passively without writing code and solving numericals with pen and paper.'
        },
        milestoneCheck: 'Complete 6 out of 10 syllabus subjects with short notes prepared.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: 25-Year PYQ Deep Dive & Pattern Identification',
        duration: 'Month 4 - Month 5 (8 Weeks)',
        focusGoal: 'Solve all GATE CS questions from 2000 to 2024 at least twice. Understand the exact traps IIT professors set.',
        keyActionItems: [
          'Subject-wise PYQ solving: Aim for 40-50 questions per day.',
          'Categorize every mistake into: Concept gap, Calculation error, or Question misreading.',
          'Master the virtual calculator on PC (do not use phone calculators or physical scientific calculators).',
          'Track repeated questions in DBMS (Normal Forms, B+ Trees) and CN (Subnetting, TCP Congestion).'
        ],
        highWeightageFocus: [
          'Computer Networks (CIDR, TCP Congestion Window, Sliding Window throughput)',
          'DBMS (Transaction Serializability, 3NF vs BCNF Decomposition, SQL Joins)',
          'Theory of Computation (Closure Properties, Decidability Table, DFA minimization)',
          'Computer Organization (Cache Mapping, Pipeline Hazards & CPI)'
        ],
        doAndDont: {
          do: 'Re-attempt incorrectly answered PYQs 3 days later without seeing the solution.',
          dont: 'Do not just read the solution key and assume you know how to derive it under exam pressure.'
        },
        milestoneCheck: 'Achieve >75% first-attempt accuracy across last 10 years GATE papers.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Topic & Subject-Level Timed Tests',
        duration: 'Month 6 (4 Weeks)',
        focusGoal: 'Condition your mind to solve mixed-pattern questions (MCQ, MSQ, NAT) under strict time pressure.',
        keyActionItems: [
          'Take 20-30 subject tests (45 mins each, 15-25 questions).',
          'Practice MSQs actively — verify each option individually without guessing.',
          'Audit virtual calculator usage to prevent floating-point rounding mistakes in NAT questions.',
          'Fix recurring weak concepts detected by the ExamAI Weakness Engine.'
        ],
        highWeightageFocus: [
          'Compiler Design (LL(1) parsing table, LR(0)/LALR items, DAG generation)',
          'Engineering Math (Eigenvalues, Probability distributions, Graph Theory isomorphism)'
        ],
        doAndDont: {
          do: 'Maintain an Error Log notebook and review it every Sunday morning.',
          dont: 'Do not start new reference textbooks at this stage; stick to your core notes.'
        },
        milestoneCheck: 'Subject test scores consistently above 70% in all subjects.'
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Full-Length Mocks & Exam Simulation (3-Round Strategy)',
        duration: 'Month 7 - Exam Day (6 Weeks)',
        focusGoal: 'Take 12-15 full-length 3-hour mocks at the exact time slot of your GATE exam (9:30 AM or 2:30 PM).',
        keyActionItems: [
          'Execute the 3-Round Strategy religiously: Round 1 (0-60m), Round 2 (60-140m), Round 3 (140-180m).',
          'Zero-risk NAT attempts: Since NAT has no negative penalty, formulate systematic bounds.',
          'Strict 1-minute question triage: If an approach is not clear within 60 seconds, flag and skip.',
          'Last 10 days: Pure revision of short notes and formula cards.'
        ],
        highWeightageFocus: [
          'Full paper endurance, time allocation, psychological resilience against difficult opening questions.'
        ],
        doAndDont: {
          do: 'Spend at least 3 hours analyzing each mock test (twice the time of the test itself).',
          dont: 'Do not take a mock test 48 hours before the real exam; rest and preserve mental sharpness.'
        },
        milestoneCheck: 'Mock scores stabilizing at 65-75 marks with <5 negative marks total.'
      }
    ],
    subjectWeightages: [
      {
        subjectName: 'General Aptitude',
        typicalMarks: '15 Marks (Fixed)',
        priority: 'Highest',
        expectedQuestions: '10 Questions (5 x 1-mark, 5 x 2-mark)',
        keyScoringTopics: ['Spatial Aptitude (fold/rotate)', 'Numerical Reasoning & Percentages', 'Data Interpretation', 'Vocabulary & Grammar'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Engineering Mathematics & Discrete Math',
        typicalMarks: '13 - 15 Marks',
        priority: 'Highest',
        expectedQuestions: '8 - 10 Questions',
        keyScoringTopics: ['Linear Algebra (Eigenvalues & Rank)', 'Discrete Math (Graph Theory, Propositional Logic, Combinatorics)', 'Probability (Bayes Theorem & Expectation)'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Programming & Data Structures',
        typicalMarks: '10 - 12 Marks',
        priority: 'Highest',
        expectedQuestions: '6 - 8 Questions',
        keyScoringTopics: ['Recursion & Pointers in C', 'Binary Search Trees & AVL', 'Heaps & Priority Queues', 'Stack & Queue Applications'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Algorithms',
        typicalMarks: '8 - 10 Marks',
        priority: 'Highest',
        expectedQuestions: '5 - 7 Questions',
        keyScoringTopics: ['Asymptotic Complexity & Master Theorem', 'Dynamic Programming (0/1 Knapsack, LCS)', 'Graph Algorithms (Dijkstra, Bellman-Ford, Kruskal/Prim)'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'Operating Systems',
        typicalMarks: '8 - 10 Marks',
        priority: 'High',
        expectedQuestions: '5 - 7 Questions',
        keyScoringTopics: ['CPU Scheduling (SJF, SRTF, RR)', 'Paging & TLB Hit Ratio', 'Deadlock Banker Algorithm', 'Synchronization with Semaphores'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Computer Networks',
        typicalMarks: '7 - 9 Marks',
        priority: 'High',
        expectedQuestions: '5 - 6 Questions',
        keyScoringTopics: ['Subnetting & CIDR Address Allocation', 'TCP Congestion Control & AIMD', 'Sliding Window (Go-Back-N, Selective Repeat)'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'Database Management Systems (DBMS)',
        typicalMarks: '7 - 9 Marks',
        priority: 'High',
        expectedQuestions: '4 - 6 Questions',
        keyScoringTopics: ['Functional Dependencies & Normal Forms (3NF/BCNF)', 'Conflict Serializability & 2PL', 'SQL Queries & Relational Algebra', 'B+ Tree Order & Fanout'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Theory of Computation (TOC)',
        typicalMarks: '7 - 9 Marks',
        priority: 'High',
        expectedQuestions: '4 - 6 Questions',
        keyScoringTopics: ['DFA / NFA State Minimization', 'Closure Properties of Language Classes', 'Decidability & Halting Problem', 'Regular Expressions'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'Computer Organization & Architecture (COA)',
        typicalMarks: '7 - 9 Marks',
        priority: 'Medium',
        expectedQuestions: '4 - 6 Questions',
        keyScoringTopics: ['Cache Memory (Direct, Set-Associative, Hit/Miss)', 'Pipelining & Speedup with Branch Hazards', 'IEEE 754 Floating Point Representation'],
        difficultyTrend: 'Variable / High Variance'
      },
      {
        subjectName: 'Compiler Design',
        typicalMarks: '4 - 6 Marks',
        priority: 'Medium',
        expectedQuestions: '3 - 4 Questions',
        keyScoringTopics: ['Lexical Analysis & Token Counting', 'LL(1) First and Follow Sets', 'LR Parser Conflicts (Shift-Reduce)', 'L-attributed vs S-attributed SDD'],
        difficultyTrend: 'Predictable / Scoring'
      }
    ],
    guaranteedMarksBucket: [
      {
        categoryTitle: 'The 28-Mark Foundation (Aptitude + Engg Math)',
        potentialMarks: '25 - 28 Marks',
        description: 'General Aptitude and Linear Algebra/Discrete Math are mathematically strict with zero ambiguity. Toppers aim for 25+ out of 28 here.',
        topics: ['Eigenvalues & System of Equations', 'Spatial Rotation & Sequence Puzzles', 'Graph Theory Degree Sum Theorem & Trees', 'Bayes Probability'],
        tacticalTip: 'Dedicate the first 25 minutes of the exam to General Aptitude while your mind is freshest. Scoring 13-15 marks early builds massive confidence.'
      },
      {
        categoryTitle: 'The Zero-Negative NAT Free Pool',
        potentialMarks: '25 - 35 Marks in typical paper',
        description: 'Between 22 and 30 questions in GATE are NAT. Since there is 0 negative marking, every accurate calculation is pure upside.',
        topics: ['Cache hit times & effective memory access time', 'Subnet usable hosts calculation', 'Pipeline throughput & speedup', 'Normal form candidate key counts'],
        tacticalTip: 'Always check decimal rounding requirements: if asked "round off to 2 decimal places", input 12.34 and double-check units (bits vs Bytes, ms vs ns).'
      },
      {
        categoryTitle: 'The Algorithm & DS Direct Mechanics',
        potentialMarks: '16 - 20 Marks',
        description: 'C output tracing, tree traversals, and standard complexity questions are practically 100% repetitive from previous papers.',
        topics: ['Postorder/Preorder unique binary tree construction', 'Binary search comparisons', 'Min/Max heap insertions', 'Dijkstra shortest path steps'],
        tacticalTip: 'Draw dry-run call stacks cleanly on scribble pads for recursive functions. Never simulate recursion in your head.'
      }
    ],
    scoringRounds: [
      {
        roundNumber: 1,
        roundName: 'Round 1: Rapid Fire Low-Hanging Fruit',
        timeWindow: '0:00 - 0:55 (First 55 minutes)',
        strategy: 'Attempt all 1-mark Aptitude, Math, and direct theoretical MCQs. If a question requires more than 2 minutes of calculation, bookmark and skip.',
        targetHitRate: '95%+ Accuracy',
        selectionCriteria: 'Direct formula questions, definition-based TOC/OS/DBMS questions, Aptitude verbal/spatial.'
      },
      {
        roundNumber: 2,
        roundName: 'Round 2: Core 2-Mark & Algorithmic Numericals',
        timeWindow: '0:55 - 2:15 (80 minutes)',
        strategy: 'Solve standard 2-mark questions in DSA, OS scheduling, Subnetting, and Cache Memory. Work through calculations calmly on the scribble pad.',
        targetHitRate: '85%+ Accuracy',
        selectionCriteria: 'Standard numericals where the algorithm is known, medium-length C code snippets, discrete math proofs.'
      },
      {
        roundNumber: 3,
        roundName: 'Round 3: Complex Multi-Step, MSQ Audits & Zero-Risk NATs',
        timeWindow: '2:15 - 3:00 (Final 45 minutes)',
        strategy: 'Tackle the 8-10 hardest questions. Audit all MSQ choices against counterexamples. Ensure every single NAT question has an entered value.',
        targetHitRate: '75%+ Accuracy',
        selectionCriteria: 'Tricky MSQs with negative traps, multi-level paging calculations, edge-case compiler grammar questions.'
      }
    ],
    topNegativeMarkingTraps: [
      {
        trapName: 'Unit Mismatch (Bits vs Bytes, Milliseconds vs Nanoseconds)',
        marksLostAvg: '3 - 6 Marks',
        howToPrevent: 'Underline the exact unit requested in the final answer box before typing into NAT.'
      },
      {
        trapName: 'Misreading "Which of the following is NOT correct?"',
        marksLostAvg: '2 - 4 Marks',
        howToPrevent: 'Circle NOT/INCORRECT on your scratch pad; evaluate True/False for each option explicitly.'
      },
      {
        trapName: 'Ego-battling with a 2-mark question for 10+ minutes',
        marksLostAvg: '5 - 8 Marks (due to time panic at the end)',
        howToPrevent: 'Set a hard 3-minute stopwatch alarm in your head. If no clear equation emerges by 3 minutes, click "Mark for Review" and move on.'
      },
      {
        trapName: 'Prematurely guessing on 2-mark MCQs',
        marksLostAvg: '4 - 7 Marks penalty (-0.67 each)',
        howToPrevent: 'Only attempt an MCQ if you have ruled out at least 2 incorrect options with mathematical justification.'
      }
    ],
    scoreBenchmarks: [
      {
        targetTier: 'AIR < 100 (Top IIT CSE Direct M.Tech & PSU Top List)',
        targetMarks: '72 - 82 Marks',
        targetPercentile: '99.85+ Percentile',
        expectedAttemptRate: '58 - 62 out of 65 questions',
        accuracyRequired: '90%+ Accuracy (< 4 incorrect MCQs)'
      },
      {
        targetTier: 'AIR < 500 (Old IITs - Bombay, Delhi, Madras, IISc, Kanpur)',
        targetMarks: '63 - 71 Marks',
        targetPercentile: '99.2+ Percentile',
        expectedAttemptRate: '52 - 58 questions',
        accuracyRequired: '85%+ Accuracy'
      },
      {
        targetTier: 'AIR < 1500 (Top NITs - Trichy, Surathkal, Warangal, IIIT Hyderabad)',
        targetMarks: '52 - 62 Marks',
        targetPercentile: '97.5+ Percentile',
        expectedAttemptRate: '46 - 52 questions',
        accuracyRequired: '82%+ Accuracy'
      },
      {
        targetTier: 'Safe Cutoff Qualification',
        targetMarks: '26 - 32 Marks (varies by year)',
        targetPercentile: '85+ Percentile',
        expectedAttemptRate: '35 - 40 questions',
        accuracyRequired: '75%+ Accuracy'
      }
    ],
    dailyScheduleSuggestion: [
      { slot: 'Morning (7:00 AM - 10:00 AM)', focus: 'High-focus Core Theory & Mathematical Derivations', duration: '3 Hours' },
      { slot: 'Midday (11:30 AM - 1:30 PM)', focus: 'PYQ Problem Solving with Virtual Calculator', duration: '2 Hours' },
      { slot: 'Afternoon (3:00 PM - 5:00 PM)', focus: 'Timed Subject Tests & Diagnostic Error Remediation', duration: '2 Hours' },
      { slot: 'Evening (7:30 PM - 9:00 PM)', focus: 'Formula Flashcards, Short Notes Review & Sunday Mock Analysis', duration: '1.5 Hours' }
    ]
  },

  // ==========================================
  // 2. JEE (MAIN & ADVANCED)
  // ==========================================
  JEE: {
    examId: 'JEE',
    examFullName: 'Joint Entrance Examination (JEE Main & JEE Advanced)',
    totalMarks: 300,
    totalQuestions: 75,
    durationMinutes: 180,
    markingScheme: {
      correct: '+4 marks per correct question',
      incorrect: '-1 mark penalty for incorrect MCQ and Numerical questions',
      unattempted: '0 marks',
      specialRules: 'In Section B (Numericals), you only need to attempt 5 out of 10 questions! Pick the 5 easiest numericals to secure 20 guaranteed marks.'
    },
    executiveSummary: 'To achieve a 99+ Percentile in JEE Main (approx 185-210 marks), Chemistry is your primary score accelerator: 75+ marks can be secured in under 40 minutes because NCERT lines are asked directly. Physics follows with formula application (70+ marks), allowing you to allocate a generous 75 minutes to Mathematics (45-55 marks).',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: NCERT Memorization & Core Problem Mechanics',
        duration: '16 Weeks',
        focusGoal: 'Complete line-by-line reading of NCERT for Chemistry and master fundamental derivations in Mechanics and Calculus.',
        keyActionItems: [
          'Chemistry: Read Inorganic NCERT every single morning for 45 minutes.',
          'Physics: Derive all formulas from first principles (Kinematics, Newton Laws, Work-Energy).',
          'Mathematics: Solve 50 varied questions per topic in Algebra and Coordinate Geometry.',
          'Create a 1-notebook "Mistake Dairy" to record calculation blunders.'
        ],
        highWeightageFocus: [
          'Modern Physics & Semiconductors',
          'Coordination Compounds & Chemical Bonding',
          'Coordinate Geometry (Conics) & Vectors 3D',
          'Electrostatics & Current Electricity'
        ],
        doAndDont: {
          do: 'Memorize all NCERT periodic tables, trends, exceptions, and laboratory tests.',
          dont: 'Do not jump to multi-concept Irodov/Pathfinder problems before solving standard JEE Main questions.'
        },
        milestoneCheck: 'Score >65% on chapter-wise tests across PCM.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Last 5 Years JEE Main PYQ Mastery (2019-2024)',
        duration: '10 Weeks',
        focusGoal: 'Solve all questions from 100+ recent shift papers. JEE repeats exact question templates with changed values.',
        keyActionItems: [
          'Solve PYQs under 45-minute timed sprint sessions (15 questions per sprint).',
          'Identify Section B (Numerical) selection tactics: scan all 10 before starting.',
          'Focus on organic reaction mechanisms (SN1, SN2, named reactions, electrophilic addition).',
          'Practice vector and 3D geometry shortcut formulas (shortest distance, image in plane).'
        ],
        highWeightageFocus: [
          'Definite Integration (King Property)',
          'Thermodynamics (Physics + Chemistry overlap)',
          'Current Electricity (Potentiometer, Meter Bridge, Resistor Symmetries)'
        ],
        doAndDont: {
          do: 'Simulate the exact choice of 5 numericals out of 10 every single time.',
          dont: 'Do not waste time re-solving questions you got right effortlessly; focus on 2nd attempt of failed ones.'
        },
        milestoneCheck: 'Attain 160+ marks on previous shift papers taken as timed tests.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Speed, Accuracy & Sectional Time Management',
        duration: '6 Weeks',
        focusGoal: 'Lock in the 40-50-70 time allocation rule: 40m Chemistry, 50m Physics, 70m Mathematics, 20m Buffer.',
        keyActionItems: [
          'Execute 3 full 3-hour tests every week in the 9:00 AM - 12:00 PM slot.',
          'Track unforced errors: negative marks must be constrained under -15 marks per test.',
          'Refine option elimination in Physics via dimensional analysis and limit checking.',
          'Drill high-yield small topics: Magnetism and Matter, EM Waves, Optical Instruments.'
        ],
        highWeightageFocus: [
          'Vectors and 3D (guaranteed 3-4 questions = 12-16 marks)',
          'Modern Physics (guaranteed 3-4 questions = 12-16 marks)',
          'Coordination Compounds (guaranteed 2-3 questions = 8-12 marks)'
        ],
        doAndDont: {
          do: 'Skip questions that do not yield an algebraic trajectory in 90 seconds.',
          dont: 'Do not let a lengthy Math integration question swallow 8 minutes of exam time.'
        },
        milestoneCheck: 'Negative marks drop below 12 marks; raw score reaches 190+.'
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Final Peak Calibration & Error Elimination',
        duration: '3 Weeks',
        focusGoal: 'Calibrate biological clock, revise NCERT chemistry tables, and maintain peak mental confidence.',
        keyActionItems: [
          'Daily revision of formula book (2 hours every morning).',
          'Review all marked questions from your Mistake Diary.',
          'No new mock test in the last 4 days before exam.',
          'Practice calm breathing techniques for the first 5 minutes in the examination hall.'
        ],
        highWeightageFocus: ['NCERT Chemistry tables', 'Physics constants and units', 'Calculus Kings property formulas'],
        doAndDont: {
          do: 'Sleep 8 hours nightly to ensure peak neurological processing speed.',
          dont: 'Do not discuss difficulty rumours or cutoff speculations on social media.'
        },
        milestoneCheck: 'Confidence in answering 45+ questions with 90%+ certainty.'
      }
    ],
    subjectWeightages: [
      {
        subjectName: 'Chemistry (Inorganic + Organic + Physical)',
        typicalMarks: '100 Marks (25 Qs)',
        priority: 'Highest',
        expectedQuestions: '25 Questions (20 MCQ + 5 of 10 Numerical)',
        keyScoringTopics: ['Coordination Chemistry (Isomerism & CFT)', 'Chemical Bonding (VSEPR, Hybridization)', 'Organic Reaction Mechanisms & Reagents', 'Thermodynamics & Equilibrium'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Physics (Mechanics, Electrodynamics, Modern)',
        typicalMarks: '100 Marks (25 Qs)',
        priority: 'Highest',
        expectedQuestions: '25 Questions (20 MCQ + 5 of 10 Numerical)',
        keyScoringTopics: ['Modern Physics (Photoelectric, Bohr, De Broglie)', 'Current Electricity & Circuits', 'Semiconductors & Logic Gates', 'Rotational Dynamics & IAOR'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Mathematics (Calculus, Algebra, Coordinate)',
        typicalMarks: '100 Marks (25 Qs)',
        priority: 'High',
        expectedQuestions: '25 Questions (20 MCQ + 5 of 10 Numerical)',
        keyScoringTopics: ['Vectors & 3D Geometry (Shortest Distance, Planes)', 'Definite Integrals & Area Under Curve', 'Matrices & Determinants', 'Differential Equations'],
        difficultyTrend: 'Variable / High Variance'
      }
    ],
    guaranteedMarksBucket: [
      {
        categoryTitle: 'The "Low-Hanging Fruit" 80-Mark Foundation',
        potentialMarks: '80 - 95 Marks',
        description: 'Small chapters with direct formula application that appear in every shift without fail.',
        topics: ['Modern Physics (De Broglie, Photoelectric, Hydrogen spectrum)', 'Semiconductors (Logic gates, Zener diode)', 'Biomolecules & Polymers (NCERT tables)', 'Vectors and 3D lines & planes', 'Mathematical Reasoning & Statistics'],
        tacticalTip: 'Master these 6 topics first: they take only 15% of your total preparation time but account for nearly 30% of the entire paper.'
      },
      {
        categoryTitle: 'Section B Numerical Selective 20 Marks',
        potentialMarks: '20 Marks (5 Qs x 4)',
        description: 'You get 10 questions and only need to solve 5. Never start question 1 directly; spend 90 seconds surveying all 10.',
        topics: ['Direct Faraday Law flux rate', 'Stoichiometry & Molarity formulas', 'Kinematics 1D equations', 'Matrix trace and determinant properties'],
        tacticalTip: 'Pick questions with whole numbers and integer answers to prevent rounding slips.'
      }
    ],
    scoringRounds: [
      {
        roundNumber: 1,
        roundName: 'Round 1: The Rapid Chemistry & Formula Sweep',
        timeWindow: '0:00 - 0:45 (First 45 mins)',
        strategy: 'Attempt 18-22 questions in Chemistry (Inorganic + direct Organic + formula Physical). Sweep 5-8 obvious Physics formula questions.',
        targetHitRate: '92%+ Accuracy',
        selectionCriteria: 'Fact-based questions requiring zero calculation or single-step multiplication.'
      },
      {
        roundNumber: 2,
        roundName: 'Round 2: Core Physics & Manageable Mathematics',
        timeWindow: '0:45 - 2:00 (75 mins)',
        strategy: 'Solve 14-16 Physics questions and 8-12 standard Math questions (Vectors, Matrices, Area).',
        targetHitRate: '85%+ Accuracy',
        selectionCriteria: 'Standard 2-3 step algebraic problems where equations can be set up immediately.'
      },
      {
        roundNumber: 3,
        roundName: 'Round 3: High-Complexity Maths & Verification',
        timeWindow: '2:00 - 3:00 (Final 60 mins)',
        strategy: 'Solve remaining numericals, review 4-5 lengthy calculus problems, and verify calculations against sign mistakes.',
        targetHitRate: '80%+ Accuracy',
        selectionCriteria: 'Multi-concept questions and high-weightage geometry problems.'
      }
    ],
    topNegativeMarkingTraps: [
      {
        trapName: 'Sign Flips in Work-Energy / Optics Sign Convention',
        marksLostAvg: '8 - 12 Marks',
        howToPrevent: 'Draw the ray diagram or coordinate axes explicitly; always write +/- signs before plugging in values.'
      },
      {
        trapName: 'Misidentifying Oxidation State or Formal Charge in Chemistry',
        marksLostAvg: '4 - 8 Marks',
        howToPrevent: 'Draw the Lewis structure instead of relying purely on algebraic oxidation formulas for peroxides.'
      },
      {
        trapName: 'Random Guessing on 50/50 options in Mathematics',
        marksLostAvg: '5 - 10 Marks',
        howToPrevent: 'If an option cannot be eliminated analytically, leave it blank. A blank question gives 0; a wrong guess gives -1.'
      }
    ],
    scoreBenchmarks: [
      {
        targetTier: '99.5+ Percentile (Top NIT CSE / IIIT Allahabad / DTU)',
        targetMarks: '210 - 235 Marks',
        targetPercentile: '99.5+ Percentile',
        expectedAttemptRate: '58 - 65 Questions',
        accuracyRequired: '88%+ Accuracy'
      },
      {
        targetTier: '99.0 Percentile (Premier NITs & Top Engineering Colleges)',
        targetMarks: '185 - 205 Marks',
        targetPercentile: '99.0 Percentile',
        expectedAttemptRate: '52 - 58 Questions',
        accuracyRequired: '85%+ Accuracy'
      },
      {
        targetTier: '97.0 Percentile (Good Regional NITs / State Government Seats)',
        targetMarks: '145 - 165 Marks',
        targetPercentile: '97.0 Percentile',
        expectedAttemptRate: '42 - 48 Questions',
        accuracyRequired: '82%+ Accuracy'
      },
      {
        targetTier: 'JEE Advanced Qualification Cutoff',
        targetMarks: '85 - 100 Marks (General Category)',
        targetPercentile: '90 - 92 Percentile',
        expectedAttemptRate: '28 - 35 Questions',
        accuracyRequired: '78%+ Accuracy'
      }
    ],
    dailyScheduleSuggestion: [
      { slot: 'Morning (6:30 AM - 9:00 AM)', focus: 'NCERT Chemistry line-by-line reading & Inorganic Flashcards', duration: '2.5 Hours' },
      { slot: 'Midday (10:00 AM - 1:00 PM)', focus: 'Physics Conceptual Problem Solving & PYQ Numericals', duration: '3 Hours' },
      { slot: 'Afternoon (2:30 PM - 5:30 PM)', focus: 'Mathematics Calculus & Algebra Speed Drills', duration: '3 Hours' },
      { slot: 'Night (7:30 PM - 9:30 PM)', focus: 'Mistake Diary Review & ExamAI Diagnostic Remediation', duration: '2 Hours' }
    ]
  },

  // ==========================================
  // 3. NEET (UG MEDICAL ENTRANCE)
  // ==========================================
  NEET: {
    examId: 'NEET',
    examFullName: 'National Eligibility cum Entrance Test (NEET UG)',
    totalMarks: 720,
    totalQuestions: 180,
    durationMinutes: 200,
    markingScheme: {
      correct: '+4 marks per question',
      incorrect: '-1 mark penalty for wrong MCQ',
      unattempted: '0 marks',
      specialRules: 'Biology (Botany + Zoology) carries 360 out of 720 marks (exactly 50% of the entire exam). Scoring 340+ in Biology is mandatory for a Government Medical College.'
    },
    executiveSummary: 'Securing 650+ marks for a government MBBS seat requires a strict priority hierarchy: Biology must score 340-355 in under 45 minutes using pure NCERT recall. Chemistry must score 150-165 in 50 minutes. This leaves a comfortable 80 minutes for Physics (140-160 marks), turning what many consider their biggest hurdle into an easy calculation game.',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: NCERT 100% Line Memorization & Diagram Drills',
        duration: '14 Weeks',
        focusGoal: 'Read Class 11 and 12 NCERT Biology at least 3 times. Highlight every scientist name, year, and diagram label.',
        keyActionItems: [
          'Read 2 NCERT chapters every single day with active recall.',
          'Practice drawing and labeling diagrams (Heart, Nephron, Flower anatomy, DNA replication fork).',
          'Solve 100 NCERT-extracted MCQs after reading each chapter.',
          'Master Physics unit conversions and formula derivations.'
        ],
        highWeightageFocus: [
          'Genetics & Molecular Basis of Inheritance',
          'Human Physiology (Endocrine, Neural, Excretory, Circulatory)',
          'Ecology & Biodiversity (Guaranteed 10-12 questions)',
          'Coordination Compounds & Organic Reaction Mechanisms'
        ],
        doAndDont: {
          do: 'Treat NCERT as the sacred boundary; 98% of Biology MCQs come verbatim from NCERT sentences.',
          dont: 'Do not study obscure M.Sc-level medical textbooks; out-of-syllabus questions are virtually zero.'
        },
        milestoneCheck: 'Achieve >320/360 in Biology unit tests.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Speed Building & Assertion-Reason Mastery',
        duration: '10 Weeks',
        focusGoal: 'Reduce Biology completion time from 70 minutes down to 45 minutes while conquering Assertion-Reason questions.',
        keyActionItems: [
          'Practice 200 questions daily in strict 3-hour blocks with OMR bubbling practice.',
          'Solve all NEET PYQs from 2013 to 2024 (including AIPMT questions).',
          'Solve 50 Assertion-Reason questions daily: verify if Reason explains Assertion or is just a true statement.',
          'Memorize organic reagents and inorganic color precipitates.'
        ],
        highWeightageFocus: [
          'Cell Cycle and Cell Division',
          'Plant Physiology (Photosynthesis, Respiration)',
          'Optics and Modern Physics',
          'Thermodynamics and Chemical Kinetics'
        ],
        doAndDont: {
          do: 'Practice filling real paper OMR sheets with a black ballpoint pen; OMR errors cost 20-30 marks annually.',
          dont: 'Do not leave Physics questions without reading; at least 30 out of 45 Physics questions are direct formula substitutions.'
        },
        milestoneCheck: 'Consistent 600+ scores in 3-hour full syllabus tests.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: 200-Minute Full Exam Simulation',
        duration: '6 Weeks',
        focusGoal: 'Simulate the 2:00 PM to 5:20 PM exam window under hot/room temperature conditions without air conditioning.',
        keyActionItems: [
          'Take 2 full mock exams every week with real OMR bubbling.',
          'Strict order of attempt: Biology (Botany + Zoology) -> Chemistry -> Physics.',
          'Keep a buffer of 15 minutes at the end for OMR re-check and unmarked questions.',
          'Remediate calculation slips in Physics through dimensional analysis.'
        ],
        highWeightageFocus: ['Mock analysis', 'High-yield formula flashcards', 'Assertion-Reason drills'],
        doAndDont: {
          do: 'Analyze every question you guessed correctly—treat lucky guesses as mistakes in your notes.',
          dont: 'Do not change your order of attempt in the final 3 weeks.'
        },
        milestoneCheck: 'Target score of 650-680 stabilized across 5 consecutive mocks.'
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Mental Composure & Error Eradication Sprint',
        duration: '2 Weeks',
        focusGoal: 'Eliminate negative marking by practicing strict discipline in skipping doubtful questions.',
        keyActionItems: [
          'Review NCERT Biology summary pages and scientist introductions.',
          'Revise Physics formula sheets twice daily.',
          'Practice 15 minutes of mindfulness or light physical exercise daily.',
          'Zero screen time after 9:30 PM to optimize sleep architecture.'
        ],
        highWeightageFocus: ['NCERT summaries', 'Physics formula cards', 'Inorganic reactions'],
        doAndDont: {
          do: 'Read the question stem twice before looking at the 4 options to avoid falling into distractor traps.',
          dont: 'Do not discuss preparation status with peer groups; focus on your own rhythm.'
        },
        milestoneCheck: 'Zero hesitation on 160+ questions out of 180.'
      }
    ],
    subjectWeightages: [
      {
        subjectName: 'Biology (Botany + Zoology)',
        typicalMarks: '360 Marks (90 Qs)',
        priority: 'Highest',
        expectedQuestions: '90 Questions (45 Botany + 45 Zoology)',
        keyScoringTopics: ['Genetics & Evolution (15-18 Qs)', 'Human Physiology (12-15 Qs)', 'Ecology & Environment (10-12 Qs)', 'Biotechnology (6-8 Qs)', 'Cell Biology (8-10 Qs)'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Chemistry (Organic + Inorganic + Physical)',
        typicalMarks: '180 Marks (45 Qs)',
        priority: 'Highest',
        expectedQuestions: '45 Questions',
        keyScoringTopics: ['Coordination Compounds & p-Block', 'Chemical Bonding & Periodic Table', 'Hydrocarbons & Carbonyl Compounds', 'Solutions & Electrochemistry'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Physics (Mechanics, Electromagnetism, Modern)',
        typicalMarks: '180 Marks (45 Qs)',
        priority: 'High',
        expectedQuestions: '45 Questions',
        keyScoringTopics: ['Modern Physics & Semiconductors (8-10 Qs)', 'Current Electricity & Magnetism (6-8 Qs)', 'Ray & Wave Optics (5-6 Qs)', 'Thermodynamics & Kinetic Theory (4-5 Qs)'],
        difficultyTrend: 'Conceptual / Moderate'
      }
    ],
    guaranteedMarksBucket: [
      {
        categoryTitle: 'The 340-Mark Pure NCERT Biology Vault',
        potentialMarks: '330 - 355 Marks',
        description: 'Direct sentence extracts from Class 11 and Class 12 NCERT Biology.',
        topics: ['Mendelian Ratios & Dihybrid Cross', 'Replication, Transcription & Translation enzymes', 'Lac Operon & PCR Steps', 'Hormone functions (Adrenal, Thyroid, Pituitary)'],
        tacticalTip: 'Complete Biology in 45 minutes flat. Never re-read a question more than twice in the first pass; mark and move.'
      },
      {
        categoryTitle: 'Modern Physics + Semiconductors Free 40 Marks',
        potentialMarks: '36 - 44 Marks (9-11 Qs x 4)',
        description: 'Single-formula calculations in Physics where questions are 90% identical to previous year papers.',
        topics: ['Photoelectric equation: E = h*nu - W', 'De Broglie wavelength: lambda = h / sqrt(2mqV)', 'Logic gates truth tables', 'Radioactive decay law & half life'],
        tacticalTip: 'Memorize common values like h*c = 1240 eV.nm and 1/(4*pi*eps0) = 9 x 10^9 to save 45 seconds per question.'
      }
    ],
    scoringRounds: [
      {
        roundNumber: 1,
        roundName: 'Round 1: Rapid Biology & Inorganic Sweep',
        timeWindow: '0:00 - 0:50 (First 50 mins)',
        strategy: 'Attempt all 90 Biology questions and direct Inorganic Chemistry questions. Bubble OMR as you complete each section.',
        targetHitRate: '95%+ Accuracy',
        selectionCriteria: 'Fact-based questions answered within 25 seconds each.'
      },
      {
        roundNumber: 2,
        roundName: 'Round 2: Organic, Physical Chemistry & Direct Physics',
        timeWindow: '0:50 - 2:10 (80 mins)',
        strategy: 'Solve the remaining Chemistry numericals and 25-30 straightforward Physics questions.',
        targetHitRate: '88%+ Accuracy',
        selectionCriteria: 'Standard formula applications with 1-2 calculation steps.'
      },
      {
        roundNumber: 3,
        roundName: 'Round 3: Multi-step Physics & Tricky Assertion-Reasons',
        timeWindow: '2:10 - 3:10 (60 mins + 10 min buffer)',
        strategy: 'Tackle the 15-20 most complex Physics and Chemistry problems. Review bubbled responses and verify question numbers.',
        targetHitRate: '80%+ Accuracy',
        selectionCriteria: 'Lengthier calculations and challenging mechanics/thermodynamics questions.'
      }
    ],
    topNegativeMarkingTraps: [
      {
        trapName: 'OMR Shifting (Bubbling Answer 42 in Row 43)',
        marksLostAvg: '20 - 45 Marks (disastrous ripple effect)',
        howToPrevent: 'Bubble after every 10 questions or after every single page. Say the question number in your head as you bubble.'
      },
      {
        trapName: 'Misreading "Incorrect", "Except", or "Not True"',
        marksLostAvg: '8 - 16 Marks',
        howToPrevent: 'Underline "INCORRECT" with your pen on the question booklet immediately upon encountering it.'
      },
      {
        trapName: 'Guesstimating on Physics Numerical Answers',
        marksLostAvg: '10 - 15 Marks',
        howToPrevent: 'If the units or mathematical value do not match within 2% of an option, leave it blank rather than picking the nearest neighbor.'
      }
    ],
    scoreBenchmarks: [
      {
        targetTier: 'All India Top Medical Colleges (AIIMS Delhi, MAMC, JIPMER)',
        targetMarks: '700 - 715 Marks',
        targetPercentile: '99.98+ Percentile',
        expectedAttemptRate: '178 - 180 Questions',
        accuracyRequired: '96%+ Accuracy'
      },
      {
        targetTier: 'Top State Government Medical College (MBBS Seat)',
        targetMarks: '650 - 685 Marks',
        targetPercentile: '99.0+ Percentile',
        expectedAttemptRate: '168 - 174 Questions',
        accuracyRequired: '92%+ Accuracy'
      },
      {
        targetTier: 'Safe Government Seat (All India Quota 15%)',
        targetMarks: '615 - 645 Marks',
        targetPercentile: '97.5+ Percentile',
        expectedAttemptRate: '158 - 165 Questions',
        accuracyRequired: '88%+ Accuracy'
      },
      {
        targetTier: 'NEET Qualifying Cutoff',
        targetMarks: '135 - 150 Marks',
        targetPercentile: '50th Percentile',
        expectedAttemptRate: '50 - 60 Questions',
        accuracyRequired: '75%+ Accuracy'
      }
    ],
    dailyScheduleSuggestion: [
      { slot: 'Morning (6:00 AM - 9:00 AM)', focus: 'NCERT Biology Active Recall & Diagram Labeling', duration: '3 Hours' },
      { slot: 'Midday (10:00 AM - 1:00 PM)', focus: 'Physics Problem Solving & Numerical Practice', duration: '3 Hours' },
      { slot: 'Afternoon (2:00 PM - 5:20 PM)', focus: 'NEET 200-Minute Full Mock Test with OMR Sheet', duration: '3.3 Hours' },
      { slot: 'Evening (6:30 PM - 8:30 PM)', focus: 'Chemistry Inorganic Flashcards & Organic Mechanisms', duration: '2 Hours' },
      { slot: 'Night (9:00 PM - 10:00 PM)', focus: 'Daily Error Log Review & Relaxed Revision', duration: '1 Hour' }
    ]
  },

  // ==========================================
  // 4. UPSC (CIVIL SERVICES EXAMINATION)
  // ==========================================
  UPSC: {
    examId: 'UPSC',
    examFullName: 'UPSC Civil Services Examination (CSE Prelims & Mains)',
    totalMarks: 200,
    totalQuestions: 100,
    durationMinutes: 120,
    markingScheme: {
      correct: '+2 marks per correct question in GS Paper 1',
      incorrect: '-0.66 marks (1/3rd penalty) for incorrect responses',
      unattempted: '0 marks',
      specialRules: 'CSAT (Paper 2) requires 33% (66/200 marks) for qualification. GS Paper 1 decides your Prelims cutoff rank! A score of 95-105 is typically sufficient for General Category.'
    },
    executiveSummary: 'In UPSC CSE Prelims, attempts define your success: candidates attempting fewer than 75 questions almost never clear the cutoff due to unpredictable questions. Top scorers aim for 82-88 questions attempted. Secure 65+ marks from the "Static Core" (Polity 15-18 Qs, Modern History 12-14 Qs, Economy 14-16 Qs) where accuracy is high, then apply intelligent 50-50 elimination to reach 100+ marks.',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Foundation Building with Standard Reference Books',
        duration: '18 Weeks',
        focusGoal: 'Master standard texts: Laxmikanth (Polity), Spectrum (Modern History), Ramesh Singh/Mrunal (Economy), NCERTs 11-12 (Geography).',
        keyActionItems: [
          'Complete M. Laxmikanth line-by-line with sticky notes on Articles and exceptions.',
          'Read The Hindu / Indian Express daily with an editorial notebook for Mains value-addition.',
          'Solve previous 10 years Prelims questions alongside each completed chapter.',
          'Complete CSAT basic quant and reasoning fundamentals 2 days a week.'
        ],
        highWeightageFocus: [
          'Indian Polity (Articles 12-51A, Parliament, Judiciary, Constitutional Bodies)',
          'Modern Indian History (1857-1947, Gandhian Phase, Acts of 1909/1919/1935)',
          'Macroeconomics & Banking (Inflation, Monetary Policy, BoP, Budget)',
          'Environment & Ecology (National Parks, IUCN status, Environmental conventions)'
        ],
        doAndDont: {
          do: 'Map current affairs events back to their static constitutional or economic foundation.',
          dont: 'Do not collect hundreds of monthly compilations; stick to ONE reliable source and revise 5 times.'
        },
        milestoneCheck: 'Score >60% on static subject-wise tests.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: 12-Year PYQ Decoding & Elimination Techniques',
        duration: '10 Weeks',
        focusGoal: 'Analyze 2011 to 2024 UPSC Prelims papers. Notice phrasing patterns: "only", "all", "drastically", "consistently increased".',
        keyActionItems: [
          'Deconstruct every option in every PYQ: why were options A, B, and D chosen as distractors?',
          'Practice pair-based questions ("How many of the above pairs are correctly matched?").',
          'Map national parks, wetlands, and biosphere reserves on physical blank maps.',
          'Take weekly sectional tests and log reasons for wrong attempts.'
        ],
        highWeightageFocus: [
          'Environmental Legislations (WPA 1972, EPA 1986, Forest Rights Act)',
          'Science & Tech (Biotech, AI, Space missions, Nanotech applications)',
          'International Bodies & Reports (UNFCCC, WTO, IMF, World Bank)'
        ],
        doAndDont: {
          do: 'Master intelligent elimination: extreme statements with words like "strictly" or "prohibits entirely" are often false in UPSC.',
          dont: 'Do not ignore CSAT; an increasing number of engineers fail Prelims solely due to CSAT Paper 2.'
        },
        milestoneCheck: 'Solve last 5 years UPSC papers achieving 100+ raw marks.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Full-Length Mocks & CSAT Calibration',
        duration: '6 Weeks',
        focusGoal: 'Take 20 full-length GS Paper 1 mocks and 8 CSAT mocks. Calibrate your optimal attempt number (usually 82-88 questions).',
        keyActionItems: [
          'Attempt 82-88 questions in GS: 40 sure-shot (Round 1) + 30 50/50 eliminations (Round 2) + 15 educated deductions (Round 3).',
          'Practice CSAT 2:30 PM to 4:30 PM slot: aim for 50+ questions with 85% accuracy.',
          'Consolidate government schemes and flagship initiatives from Budget & Economic Survey.',
          'Review mapping locations: West Asia, Red Sea, Mediterranean, Indian river tributaries.'
        ],
        highWeightageFocus: ['Mock analysis', 'Current affairs consolidation', 'CSAT comprehension and quantitative shortcuts'],
        doAndDont: {
          do: 'Attempt questions where you can eliminate 2 out of 4 options—probability is heavily in your favor.',
          dont: 'Do not attempt blind guesses where you have zero knowledge of all 4 options.'
        },
        milestoneCheck: 'Mocks consistently yielding 98-115 marks.'
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Final Revision Sprint & Mental Equanimity',
        duration: '2 Weeks',
        focusGoal: 'Revise Polity articles, Economy inflation/banking formulas, and international conventions.',
        keyActionItems: [
          'Quick scan of Laxmikanth tables and constitutional amendments.',
          'Review species IUCN statuses and protected area maps.',
          'Reflect on exam temperament: accept that 30 questions in UPSC will be completely new to everyone.',
          'Rest properly before exam day.'
        ],
        highWeightageFocus: ['Polity articles', 'Maps and locations', 'Economic terms (CPI, WPI, Real vs Nominal GDP)'],
        doAndDont: {
          do: 'Stay calm when encountering 5 bizarre questions in a row; everyone is facing the same paper.',
          dont: 'Do not attempt to read new current affairs booklets in the last 7 days.'
        },
        milestoneCheck: 'Calm, confident mindset ready for 85+ balanced attempts.'
      }
    ],
    subjectWeightages: [
      {
        subjectName: 'Indian Polity & Governance',
        typicalMarks: '30 - 36 Marks (15-18 Qs)',
        priority: 'Highest',
        expectedQuestions: '15 - 18 Questions',
        keyScoringTopics: ['Fundamental Rights & DPSP (Art 12-51A)', 'Parliament & Legislative Procedures', 'Judiciary & Judicial Review', 'Preamble & Basic Structure'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Indian Economy & Banking',
        typicalMarks: '28 - 34 Marks (14-17 Qs)',
        priority: 'Highest',
        expectedQuestions: '14 - 17 Questions',
        keyScoringTopics: ['Monetary Policy & Inflation Targeting', 'Balance of Payments & Forex Reserves', 'Fiscal Policy & Government Budgeting', 'Financial Inclusions & Digital Currency'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Environment, Ecology & Geography',
        typicalMarks: '35 - 45 Marks (18-22 Qs)',
        priority: 'Highest',
        expectedQuestions: '18 - 22 Questions',
        keyScoringTopics: ['National Parks, Wetlands & Tiger Reserves', 'Climate Change Protocols (COP summits)', 'Monsoon Mechanism & Ocean Currents', 'Agricultural Practices & Crops'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'History & Art & Culture',
        typicalMarks: '24 - 30 Marks (12-15 Qs)',
        priority: 'High',
        expectedQuestions: '12 - 15 Questions',
        keyScoringTopics: ['Freedom Struggle (1919-1947)', 'Buddhism, Jainism & Bhakti Movements', 'Temple Architecture & Classical Dances', 'Mughal & Vijayanagara Admin Terms'],
        difficultyTrend: 'Variable / High Variance'
      },
      {
        subjectName: 'Science & Technology and Current Events',
        typicalMarks: '24 - 30 Marks (12-15 Qs)',
        priority: 'Medium',
        expectedQuestions: '12 - 15 Questions',
        keyScoringTopics: ['Space Missions & Satellites', 'Biotechnology & Gene Editing (CRISPR)', 'Renewable Energy & Battery Technology', 'Geopolitics & Bilateral Treaties'],
        difficultyTrend: 'Variable / High Variance'
      }
    ],
    guaranteedMarksBucket: [
      {
        categoryTitle: 'The 60-Mark Static Polity & Economy Backbone',
        potentialMarks: '55 - 65 Marks',
        description: 'Questions from Laxmikanth and core Macroeconomics have virtually 0 ambiguity. Getting 85% of these right sets the foundation.',
        topics: ['Money Bill vs Ordinary Bill', 'Writ jurisdiction under Art 32 & 226', 'Repo Rate & Cash Reserve Ratio impact on money supply', 'Capital Account vs Current Account transactions'],
        tacticalTip: 'Re-read Lakshmikanth chapters on Parliament, President, and Judiciary three times in the last month.'
      },
      {
        categoryTitle: 'Buddhism, Jainism & Temple Architecture',
        potentialMarks: '10 - 16 Marks (5-8 Qs)',
        description: 'Appears every single year without fail since 2013.',
        topics: ['Boddhisattvas & Theravada vs Mahayana', 'Jain Tirthankaras & Doctrines', 'Nagara vs Dravida vs Vesara features', 'UNESCO World Heritage Sites in India'],
        tacticalTip: 'Create a comparative 2-page table of Hinayana, Mahayana, and Vajrayana concepts.'
      }
    ],
    scoringRounds: [
      {
        roundNumber: 1,
        roundName: 'Round 1: The 100% Certainty Wave',
        timeWindow: '0:00 - 0:45 (First 45 mins)',
        strategy: 'Scan all 100 questions. Solve only the 35-42 questions where you are 100% certain of the answer. Bubble them immediately on the OMR.',
        targetHitRate: '95%+ Accuracy',
        selectionCriteria: 'Direct factual and static constitutional/economic questions.'
      },
      {
        roundNumber: 2,
        roundName: 'Round 2: The 50/50 Elimination Drive',
        timeWindow: '0:45 - 1:35 (50 mins)',
        strategy: 'Attempt 30-35 questions where you have successfully eliminated 2 wrong options. Mark the most logically justified answer.',
        targetHitRate: '70%+ Accuracy',
        selectionCriteria: 'Questions where 2 options are definitely ruled out through fact or extreme word filtering.'
      },
      {
        roundNumber: 3,
        roundName: 'Round 3: Final Calculated Attempts & CSAT Prep',
        timeWindow: '1:35 - 2:00 (Final 25 mins)',
        strategy: 'Push total attempts to between 82 and 88 questions. Never leave attempts below 75. Ensure all OMR bubbles are filled cleanly.',
        targetHitRate: '60%+ Accuracy',
        selectionCriteria: 'Carefully chosen questions with strong context clues.'
      }
    ],
    topNegativeMarkingTraps: [
      {
        trapName: 'Under-Attempting (Attempting only 60-65 questions)',
        marksLostAvg: '15 - 25 Marks (guaranteed disqualification)',
        howToPrevent: 'Set a mandatory floor of 80 attempts. In UPSC, negative penalty (-0.66) is mathematically overwhelmed by +2 for correct eliminations.'
      },
      {
        trapName: 'Falling for "Only" vs "Generally" subtleties',
        marksLostAvg: '6 - 10 Marks',
        howToPrevent: 'Notice extreme words. Statements asserting universal absolutes in biodiversity or science are almost always false.'
      },
      {
        trapName: 'Panicking when first 10 questions are unseen or difficult',
        marksLostAvg: '8 - 14 Marks',
        howToPrevent: 'UPSC scrambles booklets into sets A, B, C, D. If your booklet opens with bizarre questions, skip ahead to question 40 and build momentum.'
      }
    ],
    scoreBenchmarks: [
      {
        targetTier: 'Safe IFS (Forest Service) Cutoff (Highest Cutoff Tier)',
        targetMarks: '108 - 118 Marks',
        targetPercentile: 'Top 0.5% Candidates',
        expectedAttemptRate: '86 - 92 Questions',
        accuracyRequired: '75%+ Accuracy'
      },
      {
        targetTier: 'Safe IAS / IPS / IRS Prelims Qualification',
        targetMarks: '95 - 105 Marks',
        targetPercentile: 'Top 1.5% Candidates',
        expectedAttemptRate: '82 - 88 Questions',
        accuracyRequired: '70%+ Accuracy'
      },
      {
        targetTier: 'Borderline Range (Vulnerable to final answer key shifts)',
        targetMarks: '85 - 92 Marks',
        targetPercentile: 'Top 2.5% Candidates',
        expectedAttemptRate: '75 - 80 Questions',
        accuracyRequired: '68%+ Accuracy'
      },
      {
        targetTier: 'CSAT Paper 2 Qualifying Target',
        targetMarks: '85+ Marks (Safe buffer over 66.6 required)',
        targetPercentile: 'Mandatory Qualifying Filter',
        expectedAttemptRate: '45 - 55 Questions',
        accuracyRequired: '85%+ Accuracy'
      }
    ],
    dailyScheduleSuggestion: [
      { slot: 'Morning (6:30 AM - 9:00 AM)', focus: 'The Hindu/Indian Express Editorial Notes & Static Mapping', duration: '2.5 Hours' },
      { slot: 'Midday (10:00 AM - 1:00 PM)', focus: 'Polity & Economy Deep Text Reading with Articles Table', duration: '3 Hours' },
      { slot: 'Afternoon (2:30 PM - 5:00 PM)', focus: 'Environment & History Standard Reference Revision', duration: '2.5 Hours' },
      { slot: 'Evening (6:00 PM - 8:00 PM)', focus: '50 MCQs Daily Sprint & CSAT Quantitative Reasoning', duration: '2 Hours' },
      { slot: 'Night (9:00 PM - 10:00 PM)', focus: 'Current Affairs Consolidation & Flashcard Drills', duration: '1 Hour' }
    ]
  },

  // ==========================================
  // 5. GATE ECE (ELECTRONICS & COMMUNICATION)
  // ==========================================
  GATE_ECE: {
    examId: 'GATE_ECE',
    examFullName: 'GATE Electronics & Communication Engineering (ECE)',
    totalMarks: 100,
    totalQuestions: 65,
    durationMinutes: 180,
    markingScheme: {
      correct: '+1 mark or +2 marks',
      incorrect: '-1/3 for 1-mark MCQ, -2/3 for 2-mark MCQ. ZERO negative for MSQ and NAT!',
      unattempted: '0 marks',
      specialRules: 'Signals & Systems, Control Systems, and Networks provide high-yield mathematical certainty with fewer ambiguities than Electronic Devices.'
    },
    executiveSummary: 'Scoring 60+ marks in GATE ECE guarantees top IIT admissions and prestigious PSU interviews (ISRO, DRDO, BEL). Focus heavily on the "Mathematical Trio": Network Theory (8-10m), Signals & Systems (8-10m), and Control Systems (8-10m) combined with Engineering Math (13m) and Aptitude (15m). This block alone delivers 55 marks with high mathematical predictability.',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Circuit Foundations & Transform Mechanics',
        duration: '12 Weeks',
        focusGoal: 'Master KCL/KVL, Laplace/Fourier/Z-transforms, and semiconductor physics equations from first principles.',
        keyActionItems: [
          'Derive all standard theorems in Network Theory (Thevenin, Norton, Maximum Power Transfer).',
          'Build clear geometric intuition for pole-zero plots and ROC properties in Signals.',
          'Solve 30 problems per topic using pen, paper, and the virtual calculator.'
        ],
        highWeightageFocus: ['Network Theory', 'Signals & Systems', 'Control Systems', 'Engineering Mathematics'],
        doAndDont: {
          do: 'Master state-space equations and Bode plot asymptotic approximations.',
          dont: 'Do not memorize complex circuit formulas without understanding the nodal analysis derivation.'
        },
        milestoneCheck: 'Score >75% on Network and Signal subject tests.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Core Electronics & Analog/Digital Deep Dive',
        duration: '10 Weeks',
        focusGoal: 'Master Op-Amps, BJT/MOSFET small signal models, and digital state machines.',
        keyActionItems: [
          'Practice Op-Amp configurations with non-ideal characteristics (slew rate, input offset voltage).',
          'Solve MOSFET drain current equations in saturation vs triode regions.',
          'Analyze 25 years of GATE ECE PYQs.'
        ],
        highWeightageFocus: ['Analog Circuits', 'Digital Circuits', 'Electronic Devices (EDC)', 'Communications'],
        doAndDont: {
          do: 'Write a dedicated formula book for noise figures, antenna parameters, and transmission line reflection coefficients.',
          dont: 'Do not skip Communications (PCM, PSK, QAM, matched filters) as it separates top 500 ranks from the rest.'
        },
        milestoneCheck: 'Complete all ECE PYQs with >70% accuracy.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Timed Subject Tests & Virtual Calculator Mastery',
        duration: '6 Weeks',
        focusGoal: 'Eliminate calculation slips and master the virtual calculator on desktop.',
        keyActionItems: [
          'Take 20 subject tests under 45-minute strict timers.',
          'Zero-risk NAT drills: practice decimal rounding and unit scaling.',
          'Fix recurring weak areas via the ExamAI Weakness Engine.'
        ],
        highWeightageFocus: ['Electromagnetics (Smith charts, wave propagation)', 'Communication Systems (BER calculations)'],
        doAndDont: {
          do: 'Review error log every weekend.',
          dont: 'Do not use scientific calculators on your phone or desk.'
        },
        milestoneCheck: 'Subject test scores consistently above 65%.'
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Full 3-Hour Mocks & 3-Round Strategy',
        duration: '4 Weeks',
        focusGoal: 'Execute 12 full-length mocks at official exam timings (9:30 AM or 2:30 PM).',
        keyActionItems: [
          'Execute Round 1 (0-55m), Round 2 (55-135m), Round 3 (135-180m).',
          'Attempt all NAT questions using boundary estimations.',
          'Consolidate formula sheets for last 3 days.'
        ],
        highWeightageFocus: ['Full exam endurance and psychological resilience'],
        doAndDont: {
          do: 'Spend 3 hours thoroughly analyzing every mock test.',
          dont: 'Do not take mocks within 48 hours of the real GATE exam.'
        },
        milestoneCheck: 'Mocks stabilizing at 60-72 marks.'
      }
    ],
    subjectWeightages: [
      {
        subjectName: 'General Aptitude',
        typicalMarks: '15 Marks (Fixed)',
        priority: 'Highest',
        expectedQuestions: '10 Questions',
        keyScoringTopics: ['Numerical Reasoning', 'Spatial & Geometric Puzzles', 'Verbal Logic'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Engineering Mathematics',
        typicalMarks: '13 Marks (Fixed)',
        priority: 'Highest',
        expectedQuestions: '8 - 9 Questions',
        keyScoringTopics: ['Linear Algebra (Rank, Eigenvalues)', 'Calculus & Vector Integrals', 'Complex Variables & Residues', 'Probability (Gaussian, Poisson)'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Signals & Systems',
        typicalMarks: '8 - 10 Marks',
        priority: 'Highest',
        expectedQuestions: '5 - 7 Questions',
        keyScoringTopics: ['LTI Systems & Convolution', 'Fourier Transform & Sampling Theorem', 'Z-Transform & ROC Properties', 'DFT & FFT'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Control Systems',
        typicalMarks: '8 - 10 Marks',
        priority: 'Highest',
        expectedQuestions: '5 - 7 Questions',
        keyScoringTopics: ['Routh-Hurwitz & Root Locus', 'Bode Plots & Gain/Phase Margin', 'Nyquist Stability Criterion', 'State Space Modeling'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Network Theory',
        typicalMarks: '8 - 10 Marks',
        priority: 'Highest',
        expectedQuestions: '5 - 7 Questions',
        keyScoringTopics: ['Transients (RL, RC, RLC circuits)', 'Sinusoidal Steady State & Resonance', 'Two-Port Parameters (Z, Y, h, ABCD)', 'Thevenin / Norton Equivalence'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Analog Circuits',
        typicalMarks: '9 - 11 Marks',
        priority: 'High',
        expectedQuestions: '6 - 7 Questions',
        keyScoringTopics: ['Op-Amp Inverting/Non-Inverting & Slew Rate', 'BJT & MOSFET Biasing', 'Feedback Amplifiers & Oscillators', 'Active Filters'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'Electronic Devices (EDC)',
        typicalMarks: '8 - 10 Marks',
        priority: 'High',
        expectedQuestions: '5 - 7 Questions',
        keyScoringTopics: ['Semiconductor Band Theory & Fermi Levels', 'PN Junction Diode Current Equations', 'MOS Capacitor & Threshold Voltage', 'Continuity Equation'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'Communication Systems',
        typicalMarks: '8 - 11 Marks',
        priority: 'High',
        expectedQuestions: '5 - 8 Questions',
        keyScoringTopics: ['Digital Modulation (BPSK, QPSK, QAM)', 'Matched Filter & Bit Error Rate (BER)', 'Random Process & PSD through LTI', 'AM / FM Modulation Index & Bandwidth'],
        difficultyTrend: 'Variable / High Variance'
      },
      {
        subjectName: 'Electromagnetics (EMTL)',
        typicalMarks: '7 - 9 Marks',
        priority: 'Medium',
        expectedQuestions: '4 - 6 Questions',
        keyScoringTopics: ['Transmission Lines & Reflection Coefficient', 'Smith Chart Applications', 'Waveguides & Cutoff Frequencies', 'Maxwells Equations & Poynting Vector'],
        difficultyTrend: 'Variable / High Variance'
      },
      {
        subjectName: 'Digital Circuits',
        typicalMarks: '5 - 7 Marks',
        priority: 'High',
        expectedQuestions: '3 - 5 Questions',
        keyScoringTopics: ['K-Maps & Logic Minimization', 'Flip-Flops, Counters & Registers', 'Finite State Machines (Moore & Mealy)', 'ADC & DAC Resolution & Conversion Time'],
        difficultyTrend: 'Predictable / Scoring'
      }
    ],
    guaranteedMarksBucket: [
      {
        categoryTitle: 'The 40-Mark Linear Math & Systems Core',
        potentialMarks: '36 - 42 Marks',
        description: 'Engineering Math, General Aptitude, Network Theory, and Control Systems are algebraically well-defined.',
        topics: ['Eigenvalues & Matrix diagonalization', 'Second order system damping ratio and settling time', 'Resonant frequency in RLC tanks', 'Bode plot gain and phase margin calculations'],
        tacticalTip: 'Master these four subjects first: they guarantee more than the qualification mark before touching semiconductors.'
      }
    ],
    scoringRounds: [
      {
        roundNumber: 1,
        roundName: 'Round 1: Rapid Aptitude, Math & Direct Circuits',
        timeWindow: '0:00 - 0:50 (50 mins)',
        strategy: 'Attempt all Aptitude, linear algebra, simple KCL/KVL networks, and direct control systems formulas.',
        targetHitRate: '95%+ Accuracy',
        selectionCriteria: 'Standard formula applications with minimal calculation.'
      },
      {
        roundNumber: 2,
        roundName: 'Round 2: Core Analog, Signals, Digital & Communications',
        timeWindow: '0:50 - 2:10 (80 mins)',
        strategy: 'Solve standard 2-mark Op-Amps, Z-transforms, BER calculations, and MOSFET circuits.',
        targetHitRate: '85%+ Accuracy',
        selectionCriteria: 'Multi-step circuit analyses where equations are clear.'
      },
      {
        roundNumber: 3,
        roundName: 'Round 3: Tricky EMTL, EDC Fermi Levels & Zero-Risk NATs',
        timeWindow: '2:10 - 3:00 (50 mins)',
        strategy: 'Tackle complex transmission lines, wave equations, and verify all NAT entries.',
        targetHitRate: '75%+ Accuracy',
        selectionCriteria: 'Challenging boundary value and electromagnetic problems.'
      }
    ],
    topNegativeMarkingTraps: [
      {
        trapName: 'Radians/sec vs Hertz Frequency Mismatch',
        marksLostAvg: '4 - 8 Marks',
        howToPrevent: 'Check whether omega (rad/s) or f (Hz) is requested. Remember omega = 2 * pi * f.'
      },
      {
        trapName: 'Sign error in inverting Op-Amp feedback',
        marksLostAvg: '3 - 6 Marks',
        howToPrevent: 'Verify virtual ground condition (V+ = V-) before writing nodal equations.'
      }
    ],
    scoreBenchmarks: [
      {
        targetTier: 'AIR < 100 (Top IIT Microelectronics/VLSI & PSU Interviews)',
        targetMarks: '68 - 78 Marks',
        targetPercentile: '99.8+ Percentile',
        expectedAttemptRate: '56 - 62 Questions',
        accuracyRequired: '88%+ Accuracy'
      },
      {
        targetTier: 'AIR < 500 (Old IITs - IISc, Kharagpur, Delhi, Madras)',
        targetMarks: '58 - 66 Marks',
        targetPercentile: '99.0+ Percentile',
        expectedAttemptRate: '50 - 55 Questions',
        accuracyRequired: '84%+ Accuracy'
      },
      {
        targetTier: 'Safe Cutoff Qualification',
        targetMarks: '25 - 28 Marks',
        targetPercentile: '85th Percentile',
        expectedAttemptRate: '32 - 38 Questions',
        accuracyRequired: '75%+ Accuracy'
      }
    ],
    dailyScheduleSuggestion: [
      { slot: 'Morning (7:00 AM - 10:00 AM)', focus: 'Circuit Analysis & Transform Derivations', duration: '3 Hours' },
      { slot: 'Midday (11:30 AM - 1:30 PM)', focus: 'PYQ Problem Solving with Virtual Calculator', duration: '2 Hours' },
      { slot: 'Afternoon (3:00 PM - 5:30 PM)', focus: 'Analog & Semiconductor Physics Problem Sets', duration: '2.5 Hours' },
      { slot: 'Evening (7:30 PM - 9:00 PM)', focus: 'Formula Sheet Review & Error Log Audit', duration: '1.5 Hours' }
    ]
  },

  // ==========================================
  // 6. CAT (COMMON ADMISSION TEST - IIMs)
  // ==========================================
  CAT: {
    examId: 'CAT',
    examFullName: 'Common Admission Test (CAT for IIMs)',
    totalMarks: 198,
    totalQuestions: 66,
    durationMinutes: 120,
    markingScheme: {
      correct: '+3 marks per correct question',
      incorrect: '-1 mark penalty for MCQs. ZERO negative marks for TITA (Type in The Answer)!',
      unattempted: '0 marks',
      specialRules: 'Strict 40-minute sectional timer for each of the 3 sections (VARC -> DILR -> QA). You cannot switch back and forth between sections!'
    },
    executiveSummary: 'In CAT, raw marks required for a 99th percentile (approx 85-95 out of 198) represent just 45% of the total paper! You do NOT need to solve everything; question selection is 80% of the game. Solving 10-12 questions in VARC, 8-10 questions in DILR (2 full sets), and 12-14 questions in QA with 85%+ accuracy comfortably guarantees calls from the top IIMs (BLACKI).',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Arithmetic & Reading Speed Foundation',
        duration: '12 Weeks',
        focusGoal: 'Read diverse long-form articles (Aeon, The Guardian, Project Syndicate) and master Arithmetic shortcuts.',
        keyActionItems: [
          'Read 2 Aeon essays every day to train endurance on dense philosophy and sociology RC passages.',
          'Master percentages, ratios, profit/loss, and time-speed-distance using mental math.',
          'Solve 30 arrangement and matrix puzzle sets in DILR.'
        ],
        highWeightageFocus: ['Arithmetic (40% of QA)', 'Reading Comprehension tone & inference', 'Linear & circular arrangements in DILR'],
        doAndDont: {
          do: 'Eliminate calculation steps by working with fractions (1/7 = 14.28%, 1/8 = 12.5%).',
          dont: 'Do not use algebraic formulas where options can be back-solved in 30 seconds.'
        },
        milestoneCheck: 'Read a 1000-word RC in 3.5 minutes with >80% question accuracy.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: DILR Set Selection & Algebra Expansion',
        duration: '8 Weeks',
        focusGoal: 'Learn how to evaluate and pick the 2 easiest DILR sets within the first 5 minutes.',
        keyActionItems: [
          'Practice scanning all 4 DILR sets in minutes 0-5. Categorize into Easy, Medium, and Trap.',
          'Master Algebra: quadratic equations, inequalities, logarithms, and progressions.',
          'Solve last 7 years CAT papers (2017-2023) across all slots.'
        ],
        highWeightageFocus: ['Algebra (30% of QA)', 'Games & Tournaments, Venn Diagrams in DILR', 'Para Jumbles & Summary questions (TITA)'],
        doAndDont: {
          do: 'Attempt all TITA (Type In The Answer) questions since they carry ZERO negative marks.',
          dont: 'Do not stay stuck on a DILR set beyond 10 minutes without making definite table entries.'
        },
        milestoneCheck: 'Crack 2 full DILR sets (8-10 questions) in 40 minutes.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: 40-Minute Sectional Timed Sprints & Full Mocks',
        duration: '8 Weeks',
        focusGoal: 'Take 25-30 full CAT mocks under simulated exam conditions.',
        keyActionItems: [
          'Strict 40-minute discipline per section.',
          'VARC Strategy: 3 RCs (12 Qs) in 28 mins + 5 Verbal Ability in 12 mins.',
          'DILR Strategy: 5 mins selection + 16 mins Set 1 + 16 mins Set 2 + 3 mins TITA guesses.',
          'QA Strategy: Round 1 (10 easy arithmetic Qs in 20 mins) + Round 2 (5 algebra/geo Qs in 20 mins).'
        ],
        highWeightageFocus: ['Mock analysis and percentile tracking'],
        doAndDont: {
          do: 'Analyze why your RC inference was too extreme or distorted compared to the author intention.',
          dont: 'Do not get emotionally attached to your favorite subject during QA.'
        },
        milestoneCheck: 'Mock scores crossing 85+ raw marks (98+ percentile).'
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Mental Calm & Accuracy Calibration',
        duration: '2 Weeks',
        focusGoal: 'Focus on 100% accuracy rather than inflated attempts.',
        keyActionItems: [
          'Review formula cheat sheet for Geometry and Number Systems.',
          'Read 1 light essay daily to keep reading muscles primed.',
          'Get 8 hours of sleep and align wake-up times to your exam slot.'
        ],
        highWeightageFocus: ['Formula review and mental freshness'],
        doAndDont: {
          do: 'Enter the exam hall ready to skip 40% of the questions with total peace of mind.',
          dont: 'Do not start any new topic or puzzle type in the final 10 days.'
        },
        milestoneCheck: 'Calm execution with zero panic during difficult sections.'
      }
    ],
    subjectWeightages: [
      {
        subjectName: 'Verbal Ability & Reading Comprehension (VARC)',
        typicalMarks: '72 Marks (24 Qs in 40 mins)',
        priority: 'Highest',
        expectedQuestions: '24 Questions (16 RC across 4 passages + 8 VA)',
        keyScoringTopics: ['Reading Comprehension (Inference, Central Idea, Tone)', 'Para Summaries', 'Para Jumbles (TITA)', 'Odd Sentence Out'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'Data Interpretation & Logical Reasoning (DILR)',
        typicalMarks: '60 Marks (20 Qs in 40 mins)',
        priority: 'Highest',
        expectedQuestions: '20 Questions (4 sets of 5 Qs each)',
        keyScoringTopics: ['Matrix Arrangements & Puzzles', 'Games & Tournaments', 'Venn Diagrams & Set Theory', 'Quant-based Reasoning & Max/Min'],
        difficultyTrend: 'Variable / High Variance'
      },
      {
        subjectName: 'Quantitative Aptitude (QA)',
        typicalMarks: '66 Marks (22 Qs in 40 mins)',
        priority: 'Highest',
        expectedQuestions: '22 Questions',
        keyScoringTopics: ['Arithmetic (Percentages, TSD, Time & Work, Averages, Profit/Loss - 8-10 Qs)', 'Algebra (Logarithms, Quadratics, Modulus, Series - 6-8 Qs)', 'Geometry & Mensuration (3-4 Qs)', 'Modern Math & Combinatorics (2-3 Qs)'],
        difficultyTrend: 'Predictable / Scoring'
      }
    ],
    guaranteedMarksBucket: [
      {
        categoryTitle: 'The 30-Mark Pure Arithmetic QA Goldmine',
        potentialMarks: '27 - 33 Marks',
        description: 'Arithmetic makes up 40% of the QA section (8-10 questions out of 22). Master this and QA is secured.',
        topics: ['Percentages & successive changes', 'Time, Speed and Distance (relative speed & races)', 'Work & Pipes equivalence', 'Simple & Compound Interest'],
        tacticalTip: 'Solve all Arithmetic questions first. You can achieve 90th percentile in QA solely through Arithmetic!'
      },
      {
        categoryTitle: 'The TITA (Zero-Negative) Safety Net',
        potentialMarks: '15 - 24 Marks in total paper',
        description: 'TITA questions carry NO negative penalty.',
        topics: ['Para Jumbles in VARC', 'Numerical answers in QA', 'Missing entries in DILR'],
        tacticalTip: 'Never leave any TITA question unsubmitted. Enter your best estimate before the 40-minute timer expires.'
      }
    ],
    scoringRounds: [
      {
        roundNumber: 1,
        roundName: 'Round 1: First-Pass Easy Harvest',
        timeWindow: 'Minute 0 - 20 (First half of each section)',
        strategy: 'Scan and solve only obvious questions: 2 direct RCs in VARC, the easiest DILR set, and 6-7 easy Arithmetic questions in QA.',
        targetHitRate: '92%+ Accuracy',
        selectionCriteria: 'Questions where the answer is immediately clear.'
      },
      {
        roundNumber: 2,
        roundName: 'Round 2: Solid Problem Solving',
        timeWindow: 'Minute 20 - 37 (Second half of each section)',
        strategy: 'Solve the second DILR set, tackle Algebra questions in QA, and complete Para Summaries in VARC.',
        targetHitRate: '85%+ Accuracy',
        selectionCriteria: 'Structured multi-step questions with reliable deductions.'
      },
      {
        roundNumber: 3,
        roundName: 'Round 3: TITA Guesses & Clean Wrap-up',
        timeWindow: 'Minute 37 - 40 (Final 3 minutes of section)',
        strategy: 'Input numbers for all remaining TITA questions. Ensure no unsubmitted inputs.',
        targetHitRate: 'N/A (Free attempt)',
        selectionCriteria: 'All unanswered TITA questions.'
      }
    ],
    topNegativeMarkingTraps: [
      {
        trapName: 'Sunk Cost Fallacy in DILR (Spending 22 minutes on a broken set)',
        marksLostAvg: '15 - 25 Marks (ruins the entire section)',
        howToPrevent: 'If no row/column is confirmed by minute 8, abandon the set immediately and move to another.'
      },
      {
        trapName: 'Over-Attempting in VARC based on Gut Feelings',
        marksLostAvg: '8 - 14 Marks penalty',
        howToPrevent: 'Select an RC option only if you can point to the specific line in the passage that supports it.'
      }
    ],
    scoreBenchmarks: [
      {
        targetTier: '99.5+ Percentile (IIM Ahmedabad, Bangalore, Calcutta Calls)',
        targetMarks: '95 - 110 Marks',
        targetPercentile: '99.5+ Percentile',
        expectedAttemptRate: '38 - 45 Questions',
        accuracyRequired: '88%+ Accuracy'
      },
      {
        targetTier: '99.0 Percentile (IIM Lucknow, Kozhikode, Indore, FMS Delhi)',
        targetMarks: '82 - 94 Marks',
        targetPercentile: '99.0 Percentile',
        expectedAttemptRate: '33 - 38 Questions',
        accuracyRequired: '85%+ Accuracy'
      },
      {
        targetTier: '95.0 Percentile (New IIMs, MDI Gurgaon, SPJIMR)',
        targetMarks: '62 - 75 Marks',
        targetPercentile: '95.0 Percentile',
        expectedAttemptRate: '26 - 32 Questions',
        accuracyRequired: '82%+ Accuracy'
      },
      {
        targetTier: '90.0 Percentile (Baby IIMs & Top Tier-2 Institutes)',
        targetMarks: '48 - 58 Marks',
        targetPercentile: '90.0 Percentile',
        expectedAttemptRate: '20 - 25 Questions',
        accuracyRequired: '80%+ Accuracy'
      }
    ],
    dailyScheduleSuggestion: [
      { slot: 'Morning (6:30 AM - 8:30 AM)', focus: '2 Aeon Essays + 3 RC Passages with detailed analysis', duration: '2 Hours' },
      { slot: 'Midday (10:30 AM - 1:00 PM)', focus: 'Arithmetic & Algebra Speed drills (25 Qs)', duration: '2.5 Hours' },
      { slot: 'Afternoon (3:00 PM - 5:00 PM)', focus: '4 DILR Puzzle sets with timer', duration: '2 Hours' },
      { slot: 'Night (8:00 PM - 9:30 PM)', focus: 'Sectional 40-minute Mock Sprint & Error Logging', duration: '1.5 Hours' }
    ]
  },

  // ==========================================
  // 7. BANKING (SBI PO / IBPS PO)
  // ==========================================
  Banking: {
    examId: 'Banking',
    examFullName: 'Banking Exams (SBI PO & IBPS PO Prelims + Mains)',
    totalMarks: 100,
    totalQuestions: 100,
    durationMinutes: 60,
    markingScheme: {
      correct: '+1 mark per question in Prelims',
      incorrect: '-0.25 marks (1/4th penalty) for incorrect responses',
      unattempted: '0 marks',
      specialRules: 'Strict 20-minute sectional timing for each of the 3 sections in Prelims (English: 30 Qs / 20 mins; Quant: 35 Qs / 20 mins; Reasoning: 35 Qs / 20 mins).'
    },
    executiveSummary: 'Banking Prelims is a pure speed-and-selection sprint: you must solve 65-75 questions in 60 minutes with 90%+ accuracy. The secret is knowing what to skip: avoid variable-heavy floor puzzles or complex arithmetic word problems in the first 10 minutes. Bank on Speed Math (Simplification, Series, Quadratic) and Syllogisms/Inequalities first to bank 40 marks in 25 minutes.',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Speed Calculation & Syllogism Foundations',
        duration: '8 Weeks',
        focusGoal: 'Eliminate rough-sheet calculation overhead through mental speed math tables (squares up to 50, cubes up to 30, fractions).',
        keyActionItems: [
          'Practice 30 minutes of speed math every morning (Vedic multiplication, percentage conversions).',
          'Master Syllogisms (Only a Few, Some Not, Possibility cases) using Venn diagrams.',
          'Solve 50 coding-decoding and inequality problems daily.'
        ],
        highWeightageFocus: ['Simplification & Approximation', 'Number Series (Missing & Wrong)', 'Quadratic Equations', 'Syllogisms & Inequalities'],
        doAndDont: {
          do: 'Memorize multiplication tables up to 30.',
          dont: 'Do not attempt lengthier 3-variable puzzles before mastering simple single-variable circular arrangements.'
        },
        milestoneCheck: 'Solve 15 simplification questions in under 4 minutes.'
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Puzzle Mastery & Data Interpretation Speed',
        duration: '8 Weeks',
        focusGoal: 'Solve 4-5 puzzles and 3 DI sets daily under 2.5 minutes per set.',
        keyActionItems: [
          'Master the 2-case branch method for floor and box puzzles.',
          'Solve Table, Bar, Line, and Pie Chart DIs with ratio and percentage shortcuts.',
          'Read English editorials daily for vocabulary and Cloze test context.'
        ],
        highWeightageFocus: ['Puzzles & Seating Arrangements (20 Qs in Reasoning)', 'Data Interpretation (15 Qs in Quant)', 'Reading Comprehension & Error Detection in English'],
        doAndDont: {
          do: 'Draw two parallel possibilities immediately when a condition branches.',
          dont: 'Do not read the entire puzzle stem without making simultaneous pencil sketches.'
        },
        milestoneCheck: 'Solve a 5-question puzzle set in under 3 minutes with 100% accuracy.'
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: 60-Minute Daily Mock Drills',
        duration: '6 Weeks',
        focusGoal: 'Take 1 full 60-minute Prelims mock test every single day.',
        keyActionItems: [
          'Execute the 2-Pass Strategy within each 20-minute section.',
          'Quant: Pass 1 (Simplification + Quadratic + Number Series in 8 mins) -> Pass 2 (DI + Easy Arithmetic in 12 mins).',
          'Reasoning: Pass 1 (Syllogisms + Inequalities + Blood Relations in 7 mins) -> Pass 2 (3 Puzzles in 13 mins).',
          'English: Error detection + Fillers in 8 mins -> RC in 12 mins.'
        ],
        highWeightageFocus: ['Speed and question skipping reflexes'],
        doAndDont: {
          do: 'Skip any puzzle that looks ambiguous in the first 15 seconds.',
          dont: 'Do not guess in Banking; 0.25 penalty across 8 wrong guesses destroys your sectional cutoff.'
        },
        milestoneCheck: 'Prelims mock scores consistently between 68 and 78 marks.'
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Mains Transition & Banking Awareness',
        duration: '4 Weeks',
        focusGoal: 'Transition to High-Level Mains DIs, Critical Reasoning, and Current Banking Affairs.',
        keyActionItems: [
          'Revise last 6 months of Banking & Financial Awareness (RBI Circulars, Basel norms, PSL).',
          'Practice high-level caselet DIs and missing table DIs for PO Mains.',
          'Practice descriptive writing: formal letters and 250-word essays.'
        ],
        highWeightageFocus: ['General & Banking Awareness', 'Mains High-Level Puzzles', 'Descriptive Paper'],
        doAndDont: {
          do: 'Revise current affairs monthly capsules 3 times.',
          dont: 'Do not neglect the descriptive English section; it carries 25 marks in PO Mains.'
        },
        milestoneCheck: 'Score comfortably above both sectional and overall Mains cutoffs.'
      }
    ],
    subjectWeightages: [
      {
        subjectName: 'Reasoning Ability (Prelims: 35 Qs / 20 mins)',
        typicalMarks: '35 Marks (Prelims)',
        priority: 'Highest',
        expectedQuestions: '35 Questions',
        keyScoringTopics: ['Puzzles & Seating Arrangements (20 Qs - Floor, Box, Linear, Circular)', 'Syllogisms & Reverse Syllogisms (5 Qs)', 'Inequalities (5 Qs)', 'Blood Relations & Direction Sense (5 Qs)'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'Quantitative Aptitude (Prelims: 35 Qs / 20 mins)',
        typicalMarks: '35 Marks (Prelims)',
        priority: 'Highest',
        expectedQuestions: '35 Questions',
        keyScoringTopics: ['Simplification & Approximation (5-10 Qs)', 'Data Interpretation (10-15 Qs - Table, Bar, Pie)', 'Quadratic Equations (5 Qs)', 'Number Series (5 Qs)', 'Arithmetic Word Problems (8-10 Qs)'],
        difficultyTrend: 'Predictable / Scoring'
      },
      {
        subjectName: 'English Language (Prelims: 30 Qs / 20 mins)',
        typicalMarks: '30 Marks (Prelims)',
        priority: 'High',
        expectedQuestions: '30 Questions',
        keyScoringTopics: ['Reading Comprehension (8-10 Qs)', 'Cloze Test & Fillers (5-7 Qs)', 'Error Spotting & Sentence Correction (5 Qs)', 'Para Jumbles / Sentence Rearrangement (5 Qs)'],
        difficultyTrend: 'Conceptual / Moderate'
      },
      {
        subjectName: 'General & Banking Awareness (Mains Focus)',
        typicalMarks: '50 - 60 Marks (Mains)',
        priority: 'Highest',
        expectedQuestions: '50 Questions',
        keyScoringTopics: ['RBI Guidelines & Monetary Policy', 'Priority Sector Lending & NPA Rules', 'Last 6 Months Current Financial Affairs', 'Union Budget & Economic Survey'],
        difficultyTrend: 'Predictable / Scoring'
      }
    ],
    guaranteedMarksBucket: [
      {
        categoryTitle: 'The 35-Mark "Speed Engine" (12 Minutes)',
        potentialMarks: '32 - 35 Marks',
        description: 'These topics have zero ambiguity and can be solved in 20-30 seconds each.',
        topics: ['Simplification & Approximation (5 Qs)', 'Quadratic Equation factorization tricks (5 Qs)', 'Inequalities (5 Qs)', 'Syllogisms (5 Qs)', 'Coding-Decoding & Direction Sense (5 Qs)'],
        tacticalTip: 'Complete these 25 questions in the first 10 minutes of your Quant and Reasoning sections. This gives you peace of mind to solve puzzles and DIs.'
      }
    ],
    scoringRounds: [
      {
        roundNumber: 1,
        roundName: 'Round 1: The Non-Puzzle / Speed Math Sweep',
        timeWindow: 'Minute 0 - 8 (First 8 minutes of each 20m section)',
        strategy: 'Solve all Speed Math (Quant), Syllogisms/Inequalities (Reasoning), and Error Spotting (English). Avoid touching puzzles or DI tables in Round 1.',
        targetHitRate: '95%+ Accuracy',
        selectionCriteria: 'Single-statement independent questions.'
      },
      {
        roundNumber: 2,
        roundName: 'Round 2: The Structured Sets (Puzzles & DIs)',
        timeWindow: 'Minute 8 - 18 (Next 10 minutes)',
        strategy: 'Solve 3 chosen puzzles in Reasoning and 2 direct DI sets in Quant. Draw parallel cases smoothly.',
        targetHitRate: '90%+ Accuracy',
        selectionCriteria: 'Puzzles with definite starting positions and clear constraints.'
      },
      {
        roundNumber: 3,
        roundName: 'Round 3: Quick Buffer & Leftovers',
        timeWindow: 'Minute 18 - 20 (Final 2 minutes)',
        strategy: 'Pick 2 fast Arithmetic word problems or single English vocab questions. Do not start a new puzzle in the final 2 minutes!',
        targetHitRate: '85%+ Accuracy',
        selectionCriteria: 'Short, isolated problems.'
      }
    ],
    topNegativeMarkingTraps: [
      {
        trapName: 'Starting a complex puzzle at Minute 17 with 3 minutes left',
        marksLostAvg: '5 - 10 Marks (unattempted questions + panic)',
        howToPrevent: 'Never start a new puzzle with less than 3.5 minutes on the clock. Solve 2-3 single arithmetic or vocab questions instead.'
      },
      {
        trapName: 'Wrong Number Series Rabbit Hole',
        marksLostAvg: '3 - 5 Marks',
        howToPrevent: 'If the pattern does not emerge within 35 seconds, skip the number series question immediately.'
      }
    ],
    scoreBenchmarks: [
      {
        targetTier: 'SBI PO Prelims Top Bracket (Safe All-India Clear)',
        targetMarks: '68 - 74 Marks',
        targetPercentile: 'Top 1% Applicants',
        expectedAttemptRate: '75 - 82 Questions',
        accuracyRequired: '90%+ Accuracy'
      },
      {
        targetTier: 'IBPS PO Prelims Cutoff Clear',
        targetMarks: '55 - 62 Marks',
        targetPercentile: 'Top 5% Applicants',
        expectedAttemptRate: '65 - 72 Questions',
        accuracyRequired: '88%+ Accuracy'
      },
      {
        targetTier: 'Sectional Cutoff Clearance (per section)',
        targetMarks: '10 - 14 Marks per section',
        targetPercentile: 'Mandatory Sectional Filter',
        expectedAttemptRate: '15+ Questions per section',
        accuracyRequired: '85%+ Accuracy'
      }
    ],
    dailyScheduleSuggestion: [
      { slot: 'Morning (6:30 AM - 8:30 AM)', focus: '30 Mins Speed Math + 5 Puzzles & 3 DI Sets', duration: '2 Hours' },
      { slot: 'Midday (10:30 AM - 12:30 PM)', focus: '60-Minute Full Prelims Mock Test with Analysis', duration: '2 Hours' },
      { slot: 'Afternoon (2:30 PM - 4:30 PM)', focus: 'English Editorial Reading, Vocab & Grammar Rules', duration: '2 Hours' },
      { slot: 'Night (7:30 PM - 9:30 PM)', focus: 'Banking & Financial Awareness Current Affairs Flashcards', duration: '2 Hours' }
    ]
  }
};
