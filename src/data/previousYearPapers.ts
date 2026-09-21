import { PreviousYearPaper, ExamType } from '../types';

export const PREVIOUS_YEAR_PAPERS: PreviousYearPaper[] = [
  // GATE CS & IT
  {
    id: 'pyq-gate-cs-2024',
    examId: 'GATE',
    year: 2024,
    sessionOrShift: 'Forenoon Session',
    title: 'GATE 2024 Computer Science & Information Technology (CS)',
    totalMarks: 100,
    durationMinutes: 180,
    totalQuestions: 65,
    pdfUrl: 'https://gate2024.iisc.ac.in/papers/cs_2024.pdf',
    solutionPdfUrl: 'https://gate2024.iisc.ac.in/solutions/cs_2024_solutions.pdf',
    officialAnswerKeyUrl: 'https://gate2024.iisc.ac.in/keys/cs_2024_key.pdf',
    videoWalkthroughUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    difficulty: 'Challenging',
    cutoffMarks: 27.6,
    highlightTopics: ['TCP Congestion Control', 'Virtual Memory Paging', 'B+ Tree Order', 'Graph Shortest Paths', 'Closure & 3NF'],
    questionsCountByPattern: {
      mcq: 35,
      msq: 15,
      nat: 15
    }
  },
  {
    id: 'pyq-gate-cs-2023',
    examId: 'GATE',
    year: 2023,
    sessionOrShift: 'Afternoon Session',
    title: 'GATE 2023 Computer Science & Information Technology (CS)',
    totalMarks: 100,
    durationMinutes: 180,
    totalQuestions: 65,
    pdfUrl: 'https://gate.iitk.ac.in/papers/cs_2023.pdf',
    solutionPdfUrl: 'https://gate.iitk.ac.in/solutions/cs_2023_sol.pdf',
    officialAnswerKeyUrl: 'https://gate.iitk.ac.in/keys/cs_2023_key.pdf',
    videoWalkthroughUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    difficulty: 'Moderate',
    cutoffMarks: 32.5,
    highlightTopics: ['CPU Scheduling Algorithms', 'IP Subnetting CIDR', 'AVL Tree Rotations', 'Pipelining Hazards'],
    questionsCountByPattern: {
      mcq: 38,
      msq: 12,
      nat: 15
    }
  },
  {
    id: 'pyq-gate-cs-2022',
    examId: 'GATE',
    year: 2022,
    sessionOrShift: 'Single Shift',
    title: 'GATE 2022 Computer Science & Information Technology (CS)',
    totalMarks: 100,
    durationMinutes: 180,
    totalQuestions: 65,
    pdfUrl: 'https://gate.iitkgp.ac.in/papers/cs_2022.pdf',
    solutionPdfUrl: 'https://gate.iitkgp.ac.in/solutions/cs_2022_sol.pdf',
    difficulty: 'Challenging',
    cutoffMarks: 25.0,
    highlightTopics: ['TCP Sliding Window', 'Deadlock Detection', 'Dynamic Programming', 'SQL Nested Queries'],
    questionsCountByPattern: {
      mcq: 34,
      msq: 16,
      nat: 15
    }
  },
  {
    id: 'pyq-gate-cs-2021',
    examId: 'GATE',
    year: 2021,
    sessionOrShift: 'Forenoon Shift 1',
    title: 'GATE 2021 Computer Science & Information Technology (CS)',
    totalMarks: 100,
    durationMinutes: 180,
    totalQuestions: 65,
    pdfUrl: 'https://gate.iitb.ac.in/papers/cs_2021.pdf',
    solutionPdfUrl: 'https://gate.iitb.ac.in/solutions/cs_2021_sol.pdf',
    difficulty: 'Moderate',
    cutoffMarks: 26.1,
    highlightTopics: ['First/Follow Grammar', 'Relational Algebra', 'Process Synchronization & Semaphores'],
    questionsCountByPattern: {
      mcq: 40,
      msq: 10,
      nat: 15
    }
  },

  // GATE ECE
  {
    id: 'pyq-gate-ece-2024',
    examId: 'GATE_ECE',
    year: 2024,
    sessionOrShift: 'Afternoon Session',
    title: 'GATE 2024 Electronics & Communication Engineering (EC)',
    totalMarks: 100,
    durationMinutes: 180,
    totalQuestions: 65,
    pdfUrl: 'https://gate2024.iisc.ac.in/papers/ec_2024.pdf',
    solutionPdfUrl: 'https://gate2024.iisc.ac.in/solutions/ec_2024_solutions.pdf',
    difficulty: 'Tough',
    cutoffMarks: 25.0,
    highlightTopics: ['Op-Amp Negative Feedback', 'Digital Modulation QAM', 'Nyquist Sampling', 'MOSFET Small Signal'],
    questionsCountByPattern: {
      mcq: 36,
      msq: 14,
      nat: 15
    }
  },

  // JEE Advanced / Main
  {
    id: 'pyq-jee-adv-2024',
    examId: 'JEE',
    year: 2024,
    sessionOrShift: 'Paper 1 & Paper 2',
    title: 'JEE Advanced 2024 Official Combined Exam Paper',
    totalMarks: 360,
    durationMinutes: 180,
    totalQuestions: 51,
    pdfUrl: 'https://jeeadv.ac.in/archive/jee2024_paper1.pdf',
    solutionPdfUrl: 'https://jeeadv.ac.in/archive/jee2024_solutions.pdf',
    difficulty: 'Tough',
    cutoffMarks: 109,
    highlightTopics: ['Electromagnetic Induction', 'Rotational Dynamics', 'Coordinate Geometry & Conics', 'Thermodynamics'],
    questionsCountByPattern: {
      mcq: 18,
      msq: 18,
      nat: 15
    }
  },
  {
    id: 'pyq-jee-adv-2023',
    examId: 'JEE',
    year: 2023,
    sessionOrShift: 'Paper 1',
    title: 'JEE Advanced 2023 Physics, Chemistry & Mathematics',
    totalMarks: 180,
    durationMinutes: 180,
    totalQuestions: 51,
    pdfUrl: 'https://jeeadv.ac.in/archive/jee2023_paper1.pdf',
    solutionPdfUrl: 'https://jeeadv.ac.in/archive/jee2023_sol.pdf',
    difficulty: 'Challenging',
    cutoffMarks: 86,
    highlightTopics: ['Wave Optics', 'Chemical Kinetics', 'Definite Integrals', 'Organic Reaction Mechanisms'],
    questionsCountByPattern: {
      mcq: 20,
      msq: 16,
      nat: 15
    }
  },

  // NEET UG
  {
    id: 'pyq-neet-2024',
    examId: 'NEET',
    year: 2024,
    sessionOrShift: 'Single Shift',
    title: 'NEET UG 2024 National Eligibility Entrance Paper',
    totalMarks: 720,
    durationMinutes: 200,
    totalQuestions: 200,
    pdfUrl: 'https://neet.nta.nic.in/archive/neet2024_paper.pdf',
    solutionPdfUrl: 'https://neet.nta.nic.in/archive/neet2024_solutions.pdf',
    difficulty: 'Moderate',
    cutoffMarks: 164,
    highlightTopics: ['Genetics & Evolution', 'Human Physiology', 'Electrostatics', 'Equilibrium & Acid-Base'],
    questionsCountByPattern: {
      mcq: 170,
      msq: 10,
      nat: 20
    }
  },

  // UPSC Civil Services
  {
    id: 'pyq-upsc-prelims-2024',
    examId: 'UPSC',
    year: 2024,
    sessionOrShift: 'GS Paper I',
    title: 'UPSC Civil Services Prelims 2024 General Studies I',
    totalMarks: 200,
    durationMinutes: 120,
    totalQuestions: 100,
    pdfUrl: 'https://upsc.gov.in/sites/default/files/CSP-2024-GS-I.pdf',
    solutionPdfUrl: 'https://upsc.gov.in/sites/default/files/CSP-2024-GS-I-Ans.pdf',
    difficulty: 'Challenging',
    cutoffMarks: 87.5,
    highlightTopics: ['Constitutional Amendments', 'Monetary Policy & Inflation', 'Biodiversity Hotspots', 'Ancient Indian Inscriptions'],
    questionsCountByPattern: {
      mcq: 85,
      msq: 0,
      nat: 15
    }
  },

  // CAT
  {
    id: 'pyq-cat-2024',
    examId: 'CAT',
    year: 2024,
    sessionOrShift: 'Slot 1 Morning',
    title: 'Common Admission Test (CAT 2024) Slot 1',
    totalMarks: 198,
    durationMinutes: 120,
    totalQuestions: 66,
    pdfUrl: 'https://iimcat.ac.in/cat2024_slot1.pdf',
    solutionPdfUrl: 'https://iimcat.ac.in/cat2024_slot1_solutions.pdf',
    difficulty: 'Challenging',
    cutoffMarks: 99.0,
    highlightTopics: ['Algebra & Quadratic Equations', 'Data Interpretation Matrix Sets', 'Reading Comprehension', 'Permutation & Probability'],
    questionsCountByPattern: {
      mcq: 48,
      msq: 0,
      nat: 18
    }
  },

  // Banking
  {
    id: 'pyq-sbi-po-2024',
    examId: 'Banking',
    year: 2024,
    sessionOrShift: 'Mains Examination',
    title: 'SBI PO Mains 2024 Data Analysis & Reasoning',
    totalMarks: 200,
    durationMinutes: 180,
    totalQuestions: 155,
    pdfUrl: 'https://sbi.co.in/careers/sbipo2024_mains.pdf',
    solutionPdfUrl: 'https://sbi.co.in/careers/sbipo2024_sol.pdf',
    difficulty: 'Challenging',
    cutoffMarks: 78.5,
    highlightTopics: ['Caselet Data Interpretation', 'Input-Output Machine Coding', 'Critical Reasoning', 'Banking Awareness'],
    questionsCountByPattern: {
      mcq: 125,
      msq: 0,
      nat: 30
    }
  }
];
