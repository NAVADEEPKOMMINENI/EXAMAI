import { ExamInfo, Subject, Question, ResourceItem, ConceptMastery, StudentProfile, RepeatedErrorRecord, AccuracyTrend, WeaknessItem } from '../types';
import { SYLLABUS_RESOURCES } from './syllabusResources';
import { ALL_DOMAINS_QUESTIONS, DOMAIN_DIAGNOSTIC_QUESTIONS } from './domainQuestionsData';

export const EXAMS_LIST: ExamInfo[] = [
  {
    id: 'GATE',
    name: 'GATE CS & IT',
    fullName: 'Graduate Aptitude Test in Engineering (Computer Science & IT)',
    description: 'National entrance exam for Master programs and Public Sector Undertakings (PSUs) recruitment.',
    targetAspirants: 'Engineering Graduates / Master candidates',
    totalMarks: 100,
    durationMinutes: 180,
    subjects: ['Computer Networks', 'Operating Systems', 'Databases (DBMS)', 'Data Structures & Algorithms', 'Theory of Computation', 'Digital Logic']
  },
  {
    id: 'GATE_ECE',
    name: 'GATE ECE',
    fullName: 'Graduate Aptitude Test in Engineering (Electronics & Communication)',
    description: 'Premier technical entrance for ECE, VLSI, Embedded Systems, and Core PSU recruitments.',
    targetAspirants: 'Electronics & Electrical Engineering Graduates',
    totalMarks: 100,
    durationMinutes: 180,
    subjects: ['Signals & Systems', 'Electronic Devices & Circuits (EDC)', 'Analog Circuits', 'Digital Circuits', 'Communications', 'Electromagnetics']
  },
  {
    id: 'JEE',
    name: 'JEE Adv & Main',
    fullName: 'Joint Entrance Examination (Main & Advanced)',
    description: 'Premier national entrance exam for admission to IITs, NITs, and premier engineering institutes.',
    targetAspirants: 'Class 11/12 Science & Engineering aspirants',
    totalMarks: 300,
    durationMinutes: 180,
    subjects: ['Physics', 'Chemistry', 'Mathematics']
  },
  {
    id: 'NEET',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    description: 'All-India single window entrance test for admission to MBBS, BDS, and premier medical colleges.',
    targetAspirants: 'Pre-Medical Science Aspirants (10+2)',
    totalMarks: 720,
    durationMinutes: 200,
    subjects: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)']
  },
  {
    id: 'UPSC',
    name: 'UPSC CSE',
    fullName: 'Civil Services Examination (IAS / IPS / IFS)',
    description: 'Civil services competitive exam for prestigious administrative positions in India.',
    targetAspirants: 'Graduates aiming for Administrative Services',
    totalMarks: 200,
    durationMinutes: 120,
    subjects: ['Indian Polity & Governance', 'Economy & Development', 'Modern History', 'Geography & Environment']
  },
  {
    id: 'CAT',
    name: 'CAT (IIMs)',
    fullName: 'Common Admission Test for Indian Institutes of Management',
    description: 'Premier national computer-based test for entrance into IIMs and top business schools.',
    targetAspirants: 'Graduates aiming for Top Management Programs',
    totalMarks: 198,
    durationMinutes: 120,
    subjects: ['Quantitative Aptitude (QA)', 'Data Interpretation & Logical Reasoning (DILR)', 'Verbal Ability & Reading Comprehension (VARC)']
  },
  {
    id: 'Banking',
    name: 'Banking (IBPS/SBI)',
    fullName: 'Probationary Officer & Clerk Common Written Exam',
    description: 'National recruitment exam for managerial cadres in Public Sector and Commercial Banks.',
    targetAspirants: 'Graduates seeking Banking & Finance careers',
    totalMarks: 100,
    durationMinutes: 60,
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'General & Banking Awareness']
  }
];

export const SUBJECTS_DATA: Record<string, Subject[]> = {
  GATE: [
    {
      id: 'gate-cn',
      name: 'Computer Networks',
      examId: 'GATE',
      iconName: 'Network',
      description: 'Physical to Application layers, Flow & Error Control, TCP/IP, Congestion Control, Routing Algorithms.',
      topics: [
        {
          id: 'gate-cn-transport',
          name: 'Transport Layer Protocols',
          subjectId: 'gate-cn',
          concepts: [
            {
              id: 'cn-tcp-congestion',
              name: 'TCP Congestion Control',
              topicId: 'gate-cn-transport',
              description: 'Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery (Tahoe vs Reno).',
              keyFormulaOrRule: 'AIMD: In Slow Start, cwnd doubles each RTT (exponential). In Congestion Avoidance, cwnd increases by 1 MSS each RTT (additive). On 3 duplicate ACKs (Reno): ssthresh = cwnd / 2, cwnd = ssthresh + 3 MSS.'
            },
            {
              id: 'cn-tcp-flow-control',
              name: 'TCP Sliding Window & Flow Control',
              topicId: 'gate-cn-transport',
              description: 'Sender window size, Receiver Advertised Window (rwnd), Stop-and-Wait efficiency.',
              keyFormulaOrRule: 'Efficiency = 1 / (1 + 2a) where a = Propagation Delay (Tp) / Transmission Delay (Tt).'
            },
            {
              id: 'cn-udp-sockets',
              name: 'UDP & Port Multiplexing',
              topicId: 'gate-cn-transport',
              description: 'Connectionless datagrams, well-known port numbers, checksum verification.'
            }
          ]
        },
        {
          id: 'gate-cn-network',
          name: 'Network Layer & Addressing',
          subjectId: 'gate-cn',
          concepts: [
            {
              id: 'cn-ip-subnetting',
              name: 'IP Addressing & Subnetting (CIDR)',
              topicId: 'gate-cn-network',
              description: 'Classless Inter-Domain Routing, prefix matching, subnet mask calculation.',
              keyFormulaOrRule: 'Host capacity = 2^(32 - prefix) - 2 (subtracting network and broadcast IDs).'
            },
            {
              id: 'cn-routing-algo',
              name: 'Distance Vector & Link State Routing',
              topicId: 'gate-cn-network',
              description: 'Bellman-Ford count-to-infinity problem and Dijkstra SPF algorithm.'
            }
          ]
        }
      ]
    },
    {
      id: 'gate-os',
      name: 'Operating Systems',
      examId: 'GATE',
      iconName: 'Cpu',
      description: 'Processes, CPU Scheduling, Deadlocks, Memory Management, Virtual Memory, and File Systems.',
      topics: [
        {
          id: 'gate-os-scheduling',
          name: 'CPU Scheduling Algorithms',
          subjectId: 'gate-os',
          concepts: [
            {
              id: 'os-turnaround-waiting',
              name: 'Waiting Time vs Turnaround Time',
              topicId: 'gate-os-scheduling',
              description: 'Distinguishing turnaround time from waiting time and response time in preemptive & non-preemptive scheduling.',
              keyFormulaOrRule: 'Turnaround Time (TAT) = Completion Time - Arrival Time. Waiting Time (WT) = Turnaround Time - Burst Time.'
            },
            {
              id: 'os-round-robin',
              name: 'Round Robin & Time Quantum',
              topicId: 'gate-os-scheduling',
              description: 'Context switch overhead vs starvation prevention with variable time quantum.'
            },
            {
              id: 'os-fcfs-sjf',
              name: 'Shortest Job First (SJF / SRTF)',
              topicId: 'gate-os-scheduling',
              description: 'Optimal average waiting time and convoy effect analysis.'
            }
          ]
        },
        {
          id: 'gate-os-concurrency',
          name: 'Synchronization & Deadlocks',
          subjectId: 'gate-os',
          concepts: [
            {
              id: 'os-bankers-algo',
              name: "Banker's Algorithm & Safe States",
              topicId: 'gate-os-concurrency',
              description: 'Deadlock avoidance using resource allocation graph and safe sequence computation.',
              keyFormulaOrRule: 'Need[i, j] = Max[i, j] - Allocation[i, j]. Condition to allocate: Need[i] <= Available.'
            },
            {
              id: 'os-semaphores',
              name: 'Semaphores & Classical IPC',
              topicId: 'gate-os-concurrency',
              description: 'Binary vs Counting semaphores, Producer-Consumer, and Dining Philosophers.'
            }
          ]
        },
        {
          id: 'gate-os-memory',
          name: 'Memory Management & Paging',
          subjectId: 'gate-os',
          concepts: [
            {
              id: 'os-virtual-memory',
              name: 'Page Tables & Effective Access Time',
              topicId: 'gate-os-memory',
              description: 'TLB hit/miss ratio, multi-level paging overhead, and page replacement policies.',
              keyFormulaOrRule: 'EAT = (Hit Ratio * (TLB + Memory)) + ((1 - Hit Ratio) * (TLB + 2 * Memory)).'
            }
          ]
        }
      ]
    },
    {
      id: 'gate-dbms',
      name: 'Databases (DBMS)',
      examId: 'GATE',
      iconName: 'Database',
      description: 'ER Model, Relational Algebra, SQL, Normalization (1NF to BCNF), and Transaction Concurrency.',
      topics: [
        {
          id: 'gate-dbms-normalization',
          name: 'Relational Design & Normalization',
          subjectId: 'gate-dbms',
          concepts: [
            {
              id: 'dbms-normal-forms',
              name: '3NF vs BCNF Decomposition',
              topicId: 'gate-dbms-normalization',
              description: 'Candidate key identification, prime attributes, and dependency preservation test.',
              keyFormulaOrRule: 'In BCNF, for every non-trivial FD X -> Y, X must be a superkey. In 3NF, Y can also be a prime attribute.'
            }
          ]
        },
        {
          id: 'gate-dbms-indexing',
          name: 'Storage & Indexing',
          subjectId: 'gate-dbms',
          concepts: [
            {
              id: 'dbms-bplus-trees',
              name: 'B+ Tree Order & Search Cost',
              topicId: 'gate-dbms-indexing',
              description: 'Internal node order p, leaf node capacity, record pointers vs block pointers.',
              keyFormulaOrRule: 'p * BlockPointer + (p - 1) * KeySize <= BlockSize.'
            }
          ]
        }
      ]
    },
    {
      id: 'gate-dsa',
      name: 'Algorithms & Data Structures',
      examId: 'GATE',
      iconName: 'Code',
      description: 'Asymptotic Analysis, Trees, Heaps, Graphs, Dynamic Programming, and Greedy Algorithms.',
      topics: [
        {
          id: 'gate-dsa-trees',
          name: 'Trees & Balanced Search Trees',
          subjectId: 'gate-dsa',
          concepts: [
            {
              id: 'dsa-avl-trees',
              name: 'AVL Rotations & Height Balance',
              topicId: 'gate-dsa-trees',
              description: 'LL, RR, LR, and RL rotations; balance factor maintainence.',
              keyFormulaOrRule: 'Balance Factor = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, 1}.'
            }
          ]
        },
        {
          id: 'gate-algo-dp',
          name: 'Dynamic Programming',
          subjectId: 'gate-dsa',
          concepts: [
            {
              id: 'algo-dp-recurrence',
              name: 'Recurrence Relations & Optimal Substructure',
              topicId: 'gate-algo-dp',
              description: 'Overlapping subproblems, state compression, memoization to tabulation.',
              keyFormulaOrRule: '0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]]).'
            }
          ]
        }
      ]
    },
    {
      id: 'gate-toc',
      name: 'Theory of Computation',
      examId: 'GATE',
      iconName: 'Cpu',
      description: 'Regular Languages, Finite Automata, Context-Free Grammars, Turing Machines, and Decidability.',
      topics: [
        {
          id: 'gate-toc-decidability',
          name: 'Decidability & Complexity',
          subjectId: 'gate-toc',
          concepts: [
            {
              id: 'toc-halting-problem',
              name: 'Halting Problem & Rices Theorem',
              topicId: 'gate-toc-decidability',
              description: 'Undecidability of halting problem, non-trivial semantic properties of RE languages.',
              keyFormulaOrRule: "Rice's Theorem: Any non-trivial property of the language recognized by a Turing machine is undecidable."
            }
          ]
        }
      ]
    }
  ],
  JEE: [
    {
      id: 'jee-phys',
      name: 'Physics',
      examId: 'JEE',
      iconName: 'Compass',
      description: 'Mechanics, Electrodynamics, Optics, Thermodynamics, Modern Physics.',
      topics: [
        {
          id: 'jee-mechanics',
          name: 'Rotational Motion & Mechanics',
          subjectId: 'jee-phys',
          concepts: [
            {
              id: 'jee-rotational-torque',
              name: 'Torque & Angular Momentum',
              topicId: 'jee-mechanics',
              description: 'Torque equations, instantaneous axis of rotation (IAOR), angular momentum conservation.',
              keyFormulaOrRule: 'tau = I * alpha = dL / dt; Total Kinetic Energy K = 0.5 * m * v_cm^2 + 0.5 * I_cm * omega^2.'
            },
            {
              id: 'jee-projectile',
              name: 'Projectile Motion & Trajectory',
              topicId: 'jee-mechanics',
              description: 'Horizontal range, maximum height, trajectory equation under gravity.',
              keyFormulaOrRule: 'Range R = (u^2 * sin(2θ)) / g; H_max = (u^2 * sin^2(θ)) / (2g).'
            }
          ]
        },
        {
          id: 'jee-optics',
          name: 'Wave Optics',
          subjectId: 'jee-phys',
          concepts: [
            {
              id: 'jee-wave-interference',
              name: 'YDSE Fringe Width & Phase Difference',
              topicId: 'jee-optics',
              description: 'Path difference with glass slabs, intensity distribution, and diffraction patterns.',
              keyFormulaOrRule: 'Fringe Width beta = (lambda * D) / d; Optical path shift Delta x = (mu - 1) * t.'
            }
          ]
        }
      ]
    },
    {
      id: 'jee-chem',
      name: 'Chemistry',
      examId: 'JEE',
      iconName: 'FlaskConical',
      description: 'Physical Chemistry, Organic Reaction Mechanisms, Chemical Bonding, Coordination Compounds.',
      topics: [
        {
          id: 'jee-phys-chem',
          name: 'Physical Chemistry & Thermodynamics',
          subjectId: 'jee-chem',
          concepts: [
            {
              id: 'jee-thermo-first-law',
              name: 'First & Second Laws, Gibbs Free Energy',
              topicId: 'jee-phys-chem',
              description: 'Reversible vs irreversible work, Hess Law, spontaneity criteria.',
              keyFormulaOrRule: 'Delta G = Delta H - T * Delta S; w_rev = -2.303 * nRT * log(V2 / V1).'
            }
          ]
        },
        {
          id: 'jee-org-chem',
          name: 'Organic Reaction Mechanisms',
          subjectId: 'jee-chem',
          concepts: [
            {
              id: 'jee-substitution-elimination',
              name: 'SN1, SN2, E1, E2 Reaction Matrix',
              topicId: 'jee-org-chem',
              description: 'Substrate sterics, solvent effects, Walden inversion vs racemization.',
              keyFormulaOrRule: 'SN2 favored by polar aprotic solvents (DMSO/DMF); E2 favored by strong bulky bases and heat.'
            }
          ]
        }
      ]
    },
    {
      id: 'jee-math',
      name: 'Mathematics',
      examId: 'JEE',
      iconName: 'FunctionSquare',
      description: 'Calculus, Vectors & 3D, Coordinate Geometry, Algebra, Probability.',
      topics: [
        {
          id: 'jee-calculus',
          name: 'Integral Calculus',
          subjectId: 'jee-math',
          concepts: [
            {
              id: 'jee-definite-integrals',
              name: 'Kings Property & Periodic Functions',
              topicId: 'jee-calculus',
              description: 'Definite integral symmetry rules, Leibniz rule for differentiation under integral sign.',
              keyFormulaOrRule: '∫_a^b f(x) dx = ∫_a^b f(a+b-x) dx.'
            },
            {
              id: 'jee-integration-parts',
              name: 'Integration by Parts',
              topicId: 'jee-calculus',
              description: 'ILATE priority sequence and reduction formulas.',
              keyFormulaOrRule: '∫ u v dx = u ∫ v dx - ∫ (u\' ∫ v dx) dx.'
            }
          ]
        },
        {
          id: 'jee-vectors-3d',
          name: 'Vectors & 3D Coordinate Geometry',
          subjectId: 'jee-math',
          concepts: [
            {
              id: 'jee-3d-lines-planes',
              name: 'Skew Lines & Vector Triple Products',
              topicId: 'jee-vectors-3d',
              description: 'Scalar triple product box rules, shortest distance between skew lines, intersection of planes.',
              keyFormulaOrRule: 'Shortest Distance d = |(b1 x b2) . (a2 - a1)| / |b1 x b2|.'
            }
          ]
        }
      ]
    }
  ],
  UPSC: [
    {
      id: 'upsc-polity',
      name: 'Indian Polity & Governance',
      examId: 'UPSC',
      iconName: 'Landmark',
      description: 'Constitutional framework, Fundamental Rights, Parliament, Judiciary, Statutory Bodies.',
      topics: [
        {
          id: 'upsc-constitution',
          name: 'Constitutional Framework',
          subjectId: 'upsc-polity',
          concepts: [
            {
              id: 'upsc-fundamental-rights',
              name: 'Articles 14, 19, 21 and Writs',
              topicId: 'upsc-constitution',
              description: 'Articles 12-35, Golden Triangle (14, 19, 21), Article 32 vs Article 226 writ jurisdiction.',
              keyFormulaOrRule: 'Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto.'
            }
          ]
        },
        {
          id: 'upsc-parliament',
          name: 'Union Legislature & Executive',
          subjectId: 'upsc-polity',
          concepts: [
            {
              id: 'upsc-parliamentary-bills',
              name: 'Ordinary, Money and Constitutional Amendment Bills',
              topicId: 'upsc-parliament',
              description: 'Article 110 Money Bills, Joint Sittings (Art. 108), Censure vs No-Confidence motions.',
              keyFormulaOrRule: 'Money Bills cannot be amended or rejected by Rajya Sabha; no joint sitting allowed for Money Bills.'
            }
          ]
        }
      ]
    },
    {
      id: 'upsc-econ',
      name: 'Indian Economy',
      examId: 'UPSC',
      iconName: 'TrendingUp',
      description: 'Macroeconomics, Monetary Policy, Fiscal Policy, External Sector, and Inflation.',
      topics: [
        {
          id: 'upsc-banking-finance',
          name: 'Monetary Policy & Banking System',
          subjectId: 'upsc-econ',
          concepts: [
            {
              id: 'upsc-rbi-monetary-tools',
              name: 'Repo Rate, SDF, CRR, and Open Market Operations',
              topicId: 'upsc-banking-finance',
              description: 'Liquidity adjustment facility, Standing Deposit Facility, inflation targeting band.',
              keyFormulaOrRule: 'Money Multiplier = 1 / CRR; RBI Inflation target: 4% (+/- 2%) CPI-C.'
            }
          ]
        }
      ]
    },
    {
      id: 'upsc-hist',
      name: 'Modern Indian History',
      examId: 'UPSC',
      iconName: 'BookOpen',
      description: 'Advent of Europeans, Freedom Struggle (1857-1947), Socio-Religious Reform Movements.',
      topics: [
        {
          id: 'upsc-freedom-struggle',
          name: 'Indian National Movement (1885-1947)',
          subjectId: 'upsc-hist',
          concepts: [
            {
              id: 'upsc-gandhian-phase',
              name: 'Non-Cooperation, Civil Disobedience & Quit India',
              topicId: 'upsc-freedom-struggle',
              description: 'Chronology of Gandhian mass movements, Government of India Acts 1919 and 1935.',
              keyFormulaOrRule: 'Timeline: NCM (1920-22), CDM (1930-34), Quit India (1942).'
            }
          ]
        }
      ]
    },
    {
      id: 'upsc-geo',
      name: 'Geography & Environment',
      examId: 'UPSC',
      iconName: 'Globe',
      description: 'Physical Geography, Climatology, Oceanography, Indian Monsoon, Biogeography.',
      topics: [
        {
          id: 'upsc-climatology',
          name: 'Physical & Indian Geography',
          subjectId: 'upsc-geo',
          concepts: [
            {
              id: 'upsc-monsoon-mechanism',
              name: 'ITCZ Shift, Jet Streams & Mascarene High',
              topicId: 'upsc-climatology',
              description: 'Thermal contrast, Somali Jet, Tropical Easterly Jet, ENSO, and Indian Ocean Dipole.',
              keyFormulaOrRule: 'Positive IOD & La Niña favor robust Indian Monsoon rainfall.'
            }
          ]
        }
      ]
    }
  ],
  Banking: [
    {
      id: 'bank-qa',
      name: 'Quantitative Aptitude',
      examId: 'Banking',
      iconName: 'Calculator',
      description: 'Data Interpretation, Arithmetic Word Problems, Number Series, Simplification.',
      topics: [
        {
          id: 'bank-di',
          name: 'Data Interpretation',
          subjectId: 'bank-qa',
          concepts: [
            {
              id: 'bank-caselet-di',
              name: 'Venn Diagram & Missing Table DI',
              topicId: 'bank-di',
              description: 'Speed math calculation tricks, percentage-to-fraction conversions, ratio balancing.',
              keyFormulaOrRule: 'Percentage change = [(Final - Initial) / Initial] * 100.'
            }
          ]
        },
        {
          id: 'bank-arithmetic',
          name: 'Commercial Mathematics',
          subjectId: 'bank-qa',
          concepts: [
            {
              id: 'bank-ci-si',
              name: 'Compound Interest vs Simple Interest',
              topicId: 'bank-arithmetic',
              description: 'Effective rate of interest, 2-year and 3-year difference formulas.',
              keyFormulaOrRule: 'Difference for 2 years: D = P * (R/100)^2.'
            }
          ]
        }
      ]
    },
    {
      id: 'bank-reasoning',
      name: 'Reasoning Ability',
      examId: 'Banking',
      iconName: 'Layers',
      description: 'Puzzles, Seating Arrangement, Syllogisms, Input-Output, Blood Relations, Coding-Decoding.',
      topics: [
        {
          id: 'bank-puzzles',
          name: 'Seating & Floor Puzzles',
          subjectId: 'bank-reasoning',
          concepts: [
            {
              id: 'bank-floor-flat-puzzles',
              name: 'Multi-Case Elimination Technique',
              topicId: 'bank-puzzles',
              description: 'Mastering 2-case branch method to solve floor & flat puzzles with relations in under 4 mins.',
              keyFormulaOrRule: 'Set up parallel assumption threads; eliminate immediately on contradiction.'
            }
          ]
        }
      ]
    },
    {
      id: 'bank-ga',
      name: 'Banking & Financial Awareness',
      examId: 'Banking',
      iconName: 'Landmark',
      description: 'RBI Regulations, Banking Fundamentals, Priority Sector Lending, Monetary Policies, Financial Terms.',
      topics: [
        {
          id: 'bank-awareness',
          name: 'RBI Regulations & Banking Fundamentals',
          subjectId: 'bank-ga',
          concepts: [
            {
              id: 'bank-rbi-regulations',
              name: 'Priority Sector Lending & Basel III Norms',
              topicId: 'bank-awareness',
              description: 'NPA classifications (SMA-0, SMA-1, SMA-2), PSL targets (40% for domestic banks), UPI/NEFT/RTGS.',
              keyFormulaOrRule: 'Substandard asset: NPA for period <= 12 months; Doubtful asset: NPA > 12 months.'
            }
          ]
        }
      ]
    }
  ],
  GATE_ECE: [
    {
      id: 'ece-signals',
      name: 'Signals & Systems',
      examId: 'GATE_ECE',
      iconName: 'Activity',
      description: 'Continuous and Discrete-time signals, LTI systems, Fourier Transform, Z-Transform, Laplace Transform.',
      topics: [
        {
          id: 'ece-signals-lti',
          name: 'LTI Systems & Convolution',
          subjectId: 'ece-signals',
          concepts: [
            {
              id: 'ece-stability-causality',
              name: 'BIBO Stability & Causality of LTI Systems',
              topicId: 'ece-signals-lti',
              description: 'Impulse response absolute summability condition for stability.',
              keyFormulaOrRule: 'Continuous system is BIBO stable iff integral |h(t)| dt < infinity.'
            }
          ]
        },
        {
          id: 'ece-transforms',
          name: 'Transform Domain Analysis',
          subjectId: 'ece-signals',
          concepts: [
            {
              id: 'ece-z-transform-roc',
              name: 'Z-Transform & ROC Properties',
              topicId: 'ece-transforms',
              description: 'Region of Convergence properties, causality vs stability, initial and final value theorems.',
              keyFormulaOrRule: 'LTI System is stable iff ROC of H(z) includes the unit circle |z| = 1.'
            }
          ]
        }
      ]
    },
    {
      id: 'ece-analog',
      name: 'Analog Circuits',
      examId: 'GATE_ECE',
      iconName: 'Cpu',
      description: 'BJT & MOSFET amplifiers, Op-Amp ideal and non-ideal characteristics, Feedback oscillators.',
      topics: [
        {
          id: 'ece-opamp-circuits',
          name: 'Operational Amplifiers & Negative Feedback',
          subjectId: 'ece-analog',
          concepts: [
            {
              id: 'ece-virtual-ground',
              name: 'Virtual Ground & Slew Rate Limitations',
              topicId: 'ece-opamp-circuits',
              description: 'Virtual short condition holds strictly under negative feedback when output is not saturated.',
              keyFormulaOrRule: 'Slew Rate SR = max|dv_out / dt| = 2 * pi * f * V_peak.'
            }
          ]
        }
      ]
    },
    {
      id: 'ece-control',
      name: 'Control Systems',
      examId: 'GATE_ECE',
      iconName: 'TrendingUp',
      description: 'Transfer functions, Block diagram reduction, Routh-Hurwitz, Root Locus, Bode plots, Nyquist criterion.',
      topics: [
        {
          id: 'ece-frequency-response',
          name: 'Frequency Domain Analysis',
          subjectId: 'ece-control',
          concepts: [
            {
              id: 'ece-nyquist-criterion',
              name: 'Gain Margin & Phase Margin',
              topicId: 'ece-frequency-response',
              description: 'Encirclements of (-1, j0) point, mapping of contours, and stability determination.',
              keyFormulaOrRule: 'Nyquist Rule: N = P - Z (where N = number of clockwise encirclements).'
            }
          ]
        }
      ]
    }
  ],
  NEET: [
    {
      id: 'neet-bio',
      name: 'Biology',
      examId: 'NEET',
      iconName: 'Dna',
      description: 'Human Physiology, Genetics and Evolution, Cell Structure, Plant Physiology, Ecology.',
      topics: [
        {
          id: 'neet-genetics',
          name: 'Genetics & Molecular Biology',
          subjectId: 'neet-bio',
          concepts: [
            {
              id: 'neet-dna-replication',
              name: 'Semi-Conservative DNA Replication & Enzymes',
              topicId: 'neet-genetics',
              description: 'Meselson-Stahl experiment, DNA Polymerase III proofreading, Okazaki fragments.',
              keyFormulaOrRule: "DNA Polymerase synthesizes strictly in 5' to 3' direction."
            }
          ]
        },
        {
          id: 'neet-physiology',
          name: 'Human Physiology',
          subjectId: 'neet-bio',
          concepts: [
            {
              id: 'neet-cardiac-cycle',
              name: 'Cardiac Cycle & Heart Sounds',
              topicId: 'neet-physiology',
              description: 'Atrial systole, ventricular systole, joint diastole, ECG waves, regulation of cardiac activity.',
              keyFormulaOrRule: 'Stroke Volume = 70 mL; Cardiac Output = Stroke Volume * Heart Rate (~5 L/min).'
            }
          ]
        }
      ]
    },
    {
      id: 'neet-chem',
      name: 'Chemistry',
      examId: 'NEET',
      iconName: 'FlaskConical',
      description: 'Physical Chemistry, Organic reaction mechanisms, Chemical Bonding, Coordination Compounds, Biomolecules.',
      topics: [
        {
          id: 'neet-org-chem',
          name: 'Organic & Inorganic Chemistry',
          subjectId: 'neet-chem',
          concepts: [
            {
              id: 'neet-biomolecules-amino',
              name: 'Amino Acids & Zwitterions',
              topicId: 'neet-org-chem',
              description: 'Essential vs Non-essential amino acids, peptide linkages, primary/secondary/tertiary structures.',
              keyFormulaOrRule: 'Isoelectric point pI = (pK1 + pK2) / 2.'
            }
          ]
        },
        {
          id: 'neet-equilibrium',
          name: 'Chemical & Ionic Equilibrium',
          subjectId: 'neet-chem',
          concepts: [
            {
              id: 'neet-buffer-solutions',
              name: 'Henderson-Hasselbalch Equation & Buffer Capacity',
              topicId: 'neet-equilibrium',
              description: 'pH calculations for acidic and basic buffers.',
              keyFormulaOrRule: 'pH = pKa + log([Conjugate Base] / [Acid]).'
            }
          ]
        }
      ]
    },
    {
      id: 'neet-phys',
      name: 'Physics',
      examId: 'NEET',
      iconName: 'Compass',
      description: 'Mechanics, Current Electricity, Magnetism, Optics, Modern Physics.',
      topics: [
        {
          id: 'neet-electricity',
          name: 'Current Electricity',
          subjectId: 'neet-phys',
          concepts: [
            {
              id: 'neet-kirchhoff-rules',
              name: 'Kirchhoff Current & Voltage Laws',
              topicId: 'neet-electricity',
              description: 'Junction rule (charge conservation), loop rule (energy conservation), Wheatstone bridge.',
              keyFormulaOrRule: 'Wheatstone Bridge balance condition: R1 / R2 = R3 / R4.'
            }
          ]
        }
      ]
    }
  ],
  CAT: [
    {
      id: 'cat-qa',
      name: 'Quantitative Aptitude',
      examId: 'CAT',
      iconName: 'Sigma',
      description: 'Arithmetic, Algebra, Geometry & Mensuration, Modern Math, Number Systems.',
      topics: [
        {
          id: 'cat-number-systems',
          name: 'Number Systems & Properties',
          subjectId: 'cat-qa',
          concepts: [
            {
              id: 'cat-remainder-theorems',
              name: 'Euler Totient, Fermat and Wilson Theorems',
              topicId: 'cat-number-systems',
              description: 'Unit digit cyclicity, power cycle shortcuts, highest power of primes in factorials.',
              keyFormulaOrRule: 'Euler Theorem: a^phi(n) = 1 (mod n) when gcd(a,n) = 1.'
            }
          ]
        },
        {
          id: 'cat-algebra',
          name: 'Quadratic Equations & Polynomials',
          subjectId: 'cat-qa',
          concepts: [
            {
              id: 'cat-roots-coefficients',
              name: 'Roots, Discriminant & Vieta’s Relations',
              topicId: 'cat-algebra',
              description: 'Sum and product of roots, nature of roots, common roots condition.',
              keyFormulaOrRule: 'For ax^2 + bx + c = 0, sum = -b/a, product = c/a.'
            }
          ]
        }
      ]
    },
    {
      id: 'cat-dilr',
      name: 'Data Interpretation & Logical Reasoning',
      examId: 'CAT',
      iconName: 'BarChart2',
      description: 'Matrix Arrangements, Games & Tournaments, Venn Diagrams, Binary Logic.',
      topics: [
        {
          id: 'cat-arrangements',
          name: 'Logical Deductions & Grids',
          subjectId: 'cat-dilr',
          concepts: [
            {
              id: 'cat-matrix-puzzles',
              name: 'Binary Grids & Elimination Tables',
              topicId: 'cat-arrangements',
              description: 'Cross-grid multi-variable table elimination without trial and error.',
              keyFormulaOrRule: 'Fill direct facts first, establish conditional bridges, eliminate contradictions.'
            }
          ]
        }
      ]
    },
    {
      id: 'cat-varc',
      name: 'Verbal Ability & Reading Comprehension',
      examId: 'CAT',
      iconName: 'BookOpen',
      description: 'Reading Comprehension, Para Jumbles, Para Summary, Odd One Out.',
      topics: [
        {
          id: 'cat-rc-passages',
          name: 'Reading Comprehension',
          subjectId: 'cat-varc',
          concepts: [
            {
              id: 'cat-rc-inference',
              name: 'Author Tone & Elimination of Extreme Options',
              topicId: 'cat-rc-passages',
              description: 'Critical reasoning assumptions, author tone identification, distractor elimination.',
              keyFormulaOrRule: 'Eliminate out-of-scope, distorted, and extreme (always/never) answer options.'
            }
          ]
        }
      ]
    }
  ]
};

export { DOMAIN_DIAGNOSTIC_QUESTIONS };
export const INITIAL_QUESTIONS: Question[] = ALL_DOMAINS_QUESTIONS;

export const LEGACY_QUESTIONS: Question[] = [
  // 1. TCP Congestion Control (GATE PYQ 2024 - Classic)
  {
    id: 'q-cn-01',
    examId: 'GATE',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    topicId: 'gate-cn-transport',
    topicName: 'Transport Layer Protocols',
    conceptId: 'cn-tcp-congestion',
    conceptName: 'TCP Congestion Control',
    questionText: 'A TCP connection uses the Reno congestion control algorithm. The current congestion window (cwnd) is 32 KB and the slow start threshold (ssthresh) is 16 KB. At this point, the sender receives 3 duplicate ACKs. What will be the new values of ssthresh and cwnd immediately after fast retransmit?',
    optionA: 'ssthresh = 16 KB, cwnd = 1 KB',
    optionB: 'ssthresh = 16 KB, cwnd = 19 KB',
    optionC: 'ssthresh = 8 KB, cwnd = 1 KB',
    optionD: 'ssthresh = 32 KB, cwnd = 16 KB',
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'In TCP Reno, when 3 duplicate ACKs occur (indicating packet loss without complete timeout):\n1. ssthresh is updated to cwnd / 2 = 32 / 2 = 16 KB.\n2. In Fast Recovery, the cwnd is set to ssthresh + 3 MSS (or in simple notation, 16 KB + 3 KB = 19 KB to account for the 3 packets that left the pipe and triggered the duplicate ACKs).\nSetting cwnd = 1 KB is what happens in TCP Tahoe (or on a retransmission timeout), not in TCP Reno fast recovery.',
    isPyq: true,
    year: 2024,
    source: 'GATE CS 2024 Set-1',
    benchmarkTimeSeconds: 75,
    errorDistractors: {
      A: { errorType: 'Conceptual', confusionNote: 'Confused TCP Reno with TCP Tahoe (which resets cwnd down to 1 MSS on 3 dup ACKs).' },
      C: { errorType: 'Calculation', confusionNote: 'Halved ssthresh twice or divided by 4 instead of 2.' },
      D: { errorType: 'Procedural', confusionNote: 'Did not halve ssthresh; inverted threshold and window assignments.' }
    }
  },

  // 2. TCP Congestion Window Calculation (Tahoe vs Reno)
  {
    id: 'q-cn-02',
    examId: 'GATE',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    topicId: 'gate-cn-transport',
    topicName: 'Transport Layer Protocols',
    conceptId: 'cn-tcp-congestion',
    conceptName: 'TCP Congestion Control',
    questionText: 'Consider a TCP sender using Slow Start with Maximum Segment Size (MSS) of 2 KB. The initial cwnd is 2 KB and ssthresh is 32 KB. Assuming every transmitted segment is acknowledged individually and no losses occur, how many RTTs will it take for the cwnd to reach 32 KB?',
    optionA: '4 RTTs',
    optionB: '5 RTTs',
    optionC: '15 RTTs',
    optionD: '16 RTTs',
    correctAnswer: 'A',
    difficulty: 'Easy',
    explanation: 'In Slow Start, cwnd doubles each RTT:\n• Start (RTT 0): 2 KB (1 MSS)\n• End of RTT 1: 4 KB (2 MSS)\n• End of RTT 2: 8 KB (4 MSS)\n• End of RTT 3: 16 KB (8 MSS)\n• End of RTT 4: 32 KB (16 MSS)\nThus, it takes exactly 4 RTTs (since 2 * 2^4 = 32 KB).',
    isPyq: true,
    year: 2022,
    source: 'GATE CS 2022 Set-2',
    benchmarkTimeSeconds: 60,
    errorDistractors: {
      B: { errorType: 'Procedural', confusionNote: 'Counted initial state as RTT 1 (off-by-one indexing error).' },
      C: { errorType: 'Conceptual', confusionNote: 'Assumed linear additive increase (+2 KB per RTT) instead of exponential doubling.' },
      D: { errorType: 'Misreading', confusionNote: 'Divided 32 by 2 directly thinking each RTT adds 2 KB.' }
    }
  },

  // 3. TCP Sliding Window Efficiency
  {
    id: 'q-cn-03',
    examId: 'GATE',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    topicId: 'gate-cn-transport',
    topicName: 'Transport Layer Protocols',
    conceptId: 'cn-tcp-flow-control',
    conceptName: 'TCP Sliding Window & Flow Control',
    questionText: 'A host is transmitting a 1000-byte packet over a 1 Gbps link. The round-trip propagation time (2 * Tp) is 40 microseconds. If the Stop-and-Wait protocol is used, what is the channel utilization (efficiency)?',
    optionA: '83.3%',
    optionB: '16.7%',
    optionC: '50.0%',
    optionD: '4.8%',
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'Transmission time Tt = Packet size / Bandwidth = (1000 * 8 bits) / (10^9 bits/sec) = 8 * 10^-6 sec = 8 microseconds.\nPropagation delay for round trip 2 * Tp = 40 microseconds.\nTotal cycle time = Tt + 2 * Tp = 8 + 40 = 48 microseconds.\nEfficiency η = Tt / (Tt + 2 * Tp) = 8 / 48 = 1/6 ≈ 16.67%.',
    isPyq: true,
    year: 2023,
    source: 'GATE CS 2023 Set-1',
    benchmarkTimeSeconds: 90,
    errorDistractors: {
      A: { errorType: 'Calculation', confusionNote: 'Calculated 2*Tp / (Tt + 2*Tp) = 40/48 = 83.3% (calculated idle ratio instead of utilization).' },
      C: { errorType: 'Conceptual', confusionNote: 'Assumed half-duplex 50% fixed bound.' },
      D: { errorType: 'Misreading', confusionNote: 'Forgot to convert bytes to bits (missed multiplying by 8).' }
    }
  },

  // 4. IP Subnetting CIDR
  {
    id: 'q-cn-04',
    examId: 'GATE',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    topicId: 'gate-cn-network',
    topicName: 'Network Layer & Addressing',
    conceptId: 'cn-ip-subnetting',
    conceptName: 'IP Addressing & Subnetting (CIDR)',
    questionText: 'An organization is granted the block 200.16.0.0/22. The administrator wants to divide this into 4 equal subnets. What is the subnet mask and the maximum number of usable host IP addresses per subnet?',
    optionA: '255.255.255.0 and 254 hosts',
    optionB: '255.255.254.0 and 510 hosts',
    optionC: '255.255.255.128 and 126 hosts',
    optionD: '255.255.252.0 and 1022 hosts',
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'Original prefix is /22 (total addresses = 2^(32-22) = 1024).\nTo create 4 equal subnets, we need log2(4) = 2 additional subnet bits.\nNew prefix = 22 + 2 = /24.\nSubnet mask for /24 is 255.255.255.0.\nEach /24 has 2^(32-24) = 256 addresses, minus 2 (network & broadcast) = 254 usable hosts.',
    isPyq: true,
    year: 2021,
    source: 'GATE CS 2021',
    benchmarkTimeSeconds: 70,
    errorDistractors: {
      B: { errorType: 'Procedural', confusionNote: 'Borrowed only 1 bit (/23) instead of 2 bits for 4 subnets.' },
      C: { errorType: 'Calculation', confusionNote: 'Split into 8 subnets (/25) instead of 4.' },
      D: { errorType: 'Misreading', confusionNote: 'Gave the original unsubnetted block size instead of per-subnet hosts.' }
    }
  },

  // 5. Operating Systems: Waiting Time vs Turnaround Time (Classic PDF Weakness Example!)
  {
    id: 'q-os-01',
    examId: 'GATE',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    topicId: 'gate-os-scheduling',
    topicName: 'CPU Scheduling Algorithms',
    conceptId: 'os-turnaround-waiting',
    conceptName: 'Waiting Time vs Turnaround Time',
    questionText: 'Consider three processes P1, P2, and P3 arriving at time t=0 with CPU burst times of 10, 4, and 2 ms respectively. The CPU uses First-Come-First-Served (FCFS) scheduling in order P1, P2, P3. What is the AVERAGE WAITING TIME for these processes?',
    optionA: '14 ms',
    optionB: '8 ms',
    optionC: '16 ms',
    optionD: '10 ms',
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'Gantt chart:\n[ P1: 0 to 10 ] [ P2: 10 to 14 ] [ P3: 14 to 16 ]\n\nCompletion times: P1 = 10, P2 = 14, P3 = 16.\nWaiting Times (WT = Turnaround Time - Burst Time, where Arrival = 0):\n• P1 WT = 0 - 0 = 0 ms\n• P2 WT = 10 - 0 = 10 ms\n• P3 WT = 14 - 0 = 14 ms\nTotal Waiting Time = 0 + 10 + 14 = 24 ms.\nAverage Waiting Time = 24 / 3 = 8 ms.\n\nNote: If you calculated 14 ms, you computed Average Turnaround Time: (10 + 14 + 16) / 3 = 40/3 ≈ 13.33 ms or confused completion times with waiting times!',
    isPyq: true,
    year: 2024,
    source: 'GATE CS 2024 Set-2',
    benchmarkTimeSeconds: 80,
    errorDistractors: {
      A: { errorType: 'Conceptual', confusionNote: 'Confused Turnaround Time with Waiting Time. Waiting time does NOT include the process own burst time!' },
      C: { errorType: 'Calculation', confusionNote: 'Summed completion times instead of start times and made an arithmetic mistake.' },
      D: { errorType: 'Procedural', confusionNote: 'Included P1 execution time in its own waiting time.' }
    }
  },

  // 6. Round Robin Scheduling & Time Quantum
  {
    id: 'q-os-02',
    examId: 'GATE',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    topicId: 'gate-os-scheduling',
    topicName: 'CPU Scheduling Algorithms',
    conceptId: 'os-round-robin',
    conceptName: 'Round Robin & Time Quantum',
    questionText: 'In a Round Robin CPU scheduling algorithm with time quantum q, what happens when q is made extremely large (approaching infinity)?',
    optionA: 'It degenerates into Shortest Job First (SJF)',
    optionB: 'It degenerates into First-Come-First-Served (FCFS)',
    optionC: 'Context switches increase exponentially causing thrashing',
    optionD: 'Average response time becomes strictly minimal',
    correctAnswer: 'B',
    difficulty: 'Easy',
    explanation: 'When the time quantum q is larger than the longest process burst time, each process gets the CPU and completes its entire execution before its quantum expires. Thus, processes execute in the exact order they arrived in the ready queue, behaving identically to First-Come-First-Served (FCFS).',
    isPyq: true,
    year: 2023,
    source: 'GATE CS 2023',
    benchmarkTimeSeconds: 45,
    errorDistractors: {
      A: { errorType: 'Conceptual', confusionNote: 'SJF requires prior knowledge of burst times; RR has no concept of shortest jobs.' },
      C: { errorType: 'Recall', confusionNote: 'Context switches increase when q is very small (near 0), not when q is large.' },
      D: { errorType: 'Misreading', confusionNote: 'Response time degrades severely because later processes wait for long earlier jobs.' }
    }
  },

  // 7. Banker's Algorithm Deadlock Avoidance
  {
    id: 'q-os-03',
    examId: 'GATE',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    topicId: 'gate-os-concurrency',
    topicName: 'Synchronization & Deadlocks',
    conceptId: 'os-bankers-algo',
    conceptName: "Banker's Algorithm & Safe States",
    questionText: 'A system has 5 processes (P0 to P4) and 3 resource types (A, B, C) with instances (10, 5, 7). Current Allocation is P0(0,1,0), P1(2,0,0), P2(3,0,2), P3(2,1,1), P4(0,0,2). Max needs are P0(7,5,3), P1(3,2,2), P2(9,0,2), P3(2,2,2), P4(4,3,3). Available vector is (3, 3, 2). Which of the following is a valid safe sequence?',
    optionA: '<P1, P3, P4, P0, P2>',
    optionB: '<P0, P1, P2, P3, P4>',
    optionC: '<P2, P1, P0, P3, P4>',
    optionD: 'No safe sequence exists (system is in deadlock)',
    correctAnswer: 'A',
    difficulty: 'Hard',
    explanation: 'Calculate Need = Max - Allocation:\n• P0 Need: (7, 4, 3)\n• P1 Need: (1, 2, 2) <= Available (3, 3, 2) -> P1 can finish! New Available = (3,3,2) + (2,0,0) = (5, 3, 2)\n• P3 Need: (0, 1, 1) <= (5, 3, 2) -> P3 can finish! New Available = (5,3,2) + (2,1,1) = (7, 4, 3)\n• P4 Need: (4, 3, 1) <= (7, 4, 3) -> P4 can finish! New Available = (7,4,3) + (0,0,2) = (7, 4, 5)\n• P0 Need: (7, 4, 3) <= (7, 4, 5) -> P0 can finish! New Available = (7,5,5)\n• P2 Need: (6, 0, 0) <= (7, 5, 5) -> P2 can finish!\nSequence <P1, P3, P4, P0, P2> safely executes all processes.',
    isPyq: true,
    year: 2022,
    source: 'GATE CS 2022',
    benchmarkTimeSeconds: 120,
    errorDistractors: {
      B: { errorType: 'Procedural', confusionNote: 'Attempted P0 first whose Need (7,4,3) exceeds initial Available (3,3,2).' },
      C: { errorType: 'Procedural', confusionNote: 'Attempted P2 first whose Need (6,0,0) exceeds Available (3,3,2).' },
      D: { errorType: 'Calculation', confusionNote: 'Calculated Need incorrectly and declared deadlock.' }
    }
  },

  // 8. Effective Memory Access Time in Paging
  {
    id: 'q-os-04',
    examId: 'GATE',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    topicId: 'gate-os-memory',
    topicName: 'Memory Management & Paging',
    conceptId: 'os-virtual-memory',
    conceptName: 'Page Tables & Effective Access Time',
    questionText: 'In a paging system, the TLB lookup time is 20 ns and the main memory access time is 100 ns. What is the minimum TLB hit ratio required to achieve an Effective Access Time (EAT) of no more than 140 ns?',
    optionA: '70%',
    optionB: '80%',
    optionC: '85%',
    optionD: '90%',
    correctAnswer: 'B',
    difficulty: 'Medium',
    explanation: 'Let h be the hit ratio.\n• On TLB hit: Time = TLB + Memory = 20 + 100 = 120 ns.\n• On TLB miss: Time = TLB + Page Table Memory + Data Memory = 20 + 100 + 100 = 220 ns.\nEAT = h * 120 + (1 - h) * 220 = 220 - 100h.\nWe want EAT <= 140:\n220 - 100h <= 140  =>  100h >= 80  =>  h >= 0.80 (80%).',
    isPyq: true,
    year: 2020,
    source: 'GATE CS 2020',
    benchmarkTimeSeconds: 85,
    errorDistractors: {
      A: { errorType: 'Calculation', confusionNote: 'Subtracted incorrectly yielding h = 0.70.' },
      C: { errorType: 'Procedural', confusionNote: 'Forgot that TLB lookup still occurs on a miss (used 200 ns instead of 220 ns).' },
      D: { errorType: 'Conceptual', confusionNote: 'Estimated high without applying the formal formula.' }
    }
  },

  // 9. DBMS: Normalization BCNF vs 3NF
  {
    id: 'q-dbms-01',
    examId: 'GATE',
    subjectId: 'gate-dbms',
    subjectName: 'Databases (DBMS)',
    topicId: 'gate-dbms-normalization',
    topicName: 'Relational Design & Normalization',
    conceptId: 'dbms-normal-forms',
    conceptName: '3NF vs BCNF Decomposition',
    questionText: 'Relation R(A, B, C, D) has the Functional Dependencies F = { AB -> C, C -> D, D -> A }. Which of the following statements is TRUE regarding the highest normal form of R?',
    optionA: 'R is in BCNF',
    optionB: 'R is in 3NF but not in BCNF',
    optionC: 'R is in 2NF but not in 3NF',
    optionD: 'R is only in 1NF',
    correctAnswer: 'B',
    difficulty: 'Hard',
    explanation: 'Candidate keys:\n(AB)+ = {A, B, C, D} -> AB is a key.\n(BC)+ = {B, C, D, A} -> BC is a key.\n(BD)+ = {B, D, A, C} -> BD is a key.\nPrime attributes (part of some candidate key) are: {A, B, C, D}.\nCheck 3NF condition for each FD (X -> Y requires X is superkey OR Y is prime attribute):\n• AB -> C: AB is superkey (Passes 3NF and BCNF)\n• C -> D: C is NOT superkey, but D is a prime attribute (Passes 3NF! Fails BCNF)\n• D -> A: D is NOT superkey, but A is a prime attribute (Passes 3NF! Fails BCNF)\nTherefore, R is in 3NF, but NOT in BCNF.',
    isPyq: true,
    year: 2023,
    source: 'GATE CS 2023',
    benchmarkTimeSeconds: 110,
    errorDistractors: {
      A: { errorType: 'Conceptual', confusionNote: 'Overlooked that C and D are not superkeys; missed BCNF violation.' },
      C: { errorType: 'Procedural', confusionNote: 'Missed that D and A are prime attributes belonging to keys BD and AB, which satisfies 3NF.' },
      D: { errorType: 'Misreading', confusionNote: 'Assumed non-prime transitive dependency.' }
    }
  },

  // 10. Data Structures: AVL Trees
  {
    id: 'q-dsa-01',
    examId: 'GATE',
    subjectId: 'gate-dsa',
    subjectName: 'Data Structures & Algorithms',
    topicId: 'gate-dsa-trees',
    topicName: 'Trees & Balanced Search Trees',
    conceptId: 'dsa-avl-trees',
    conceptName: 'AVL Rotations & Height Balance',
    questionText: 'What is the minimum number of nodes in an AVL tree of height 5 (assuming a single root node has height 0)?',
    optionA: '20 nodes',
    optionB: '12 nodes',
    optionC: '31 nodes',
    optionD: '17 nodes',
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'Recurrence relation for minimum nodes N(h) in an AVL tree of height h:\nN(0) = 1\nN(1) = 2\nN(h) = N(h-1) + N(h-2) + 1\n• N(2) = 2 + 1 + 1 = 4\n• N(3) = 4 + 2 + 1 = 7\n• N(4) = 7 + 4 + 1 = 12\n• N(5) = 12 + 7 + 1 = 20.\nHence, minimum nodes for height 5 is 20.',
    isPyq: true,
    year: 2021,
    source: 'GATE CS 2021',
    benchmarkTimeSeconds: 65,
    errorDistractors: {
      B: { errorType: 'Calculation', confusionNote: 'Stopped at height 4 (12 nodes) instead of calculating to height 5.' },
      C: { errorType: 'Conceptual', confusionNote: 'Calculated 2^5 - 1 for a full binary tree instead of minimum AVL tree.' },
      D: { errorType: 'Procedural', confusionNote: 'Used Fibonacci without adding +1 for the root node.' }
    }
  },

  // 11. GATE CS - MSQ (Multiple Select Question)
  {
    id: 'q-cn-msq-01',
    examId: 'GATE',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    topicId: 'gate-cn-transport',
    topicName: 'Transport Layer Protocols',
    conceptId: 'cn-tcp-congestion',
    conceptName: 'TCP Congestion Control',
    pattern: 'MSQ',
    questionText: 'Which of the following statements is/are TRUE regarding TCP congestion control and flow control mechanisms? (Select ALL that apply)',
    optionA: 'In TCP Reno, receiving 3 duplicate ACKs triggers Fast Retransmit and enters Fast Recovery without resetting cwnd to 1 MSS.',
    optionB: 'Flow control is a router-level mechanism designed to prevent global buffer overflow on internet switches.',
    optionC: 'The effective transmission window size of a TCP sender is min(Congestion Window, Receiver Advertised Window).',
    optionD: 'TCP Tahoe uses multiplicative decrease on timeout, halving both ssthresh and cwnd without entering slow start.',
    correctAnswers: ['A', 'C'],
    difficulty: 'Hard',
    explanation: '• Statement A is TRUE: TCP Reno enters Fast Recovery on 3 dup ACKs (ssthresh = cwnd/2, cwnd = ssthresh + 3 MSS). It avoids dropping to 1 MSS.\n• Statement B is FALSE: Flow control is end-to-end between sender and receiver to protect receiver buffer; congestion control protects the subnet/routers.\n• Statement C is TRUE: Sender transmission window = min(cwnd, rwnd).\n• Statement D is FALSE: TCP Tahoe drops cwnd to 1 MSS on loss.',
    isPyq: true,
    year: 2024,
    source: 'GATE CS 2024 Official MSQ',
    benchmarkTimeSeconds: 90
  },

  // 12. GATE CS - NAT (Numerical Answer Type)
  {
    id: 'q-cn-nat-01',
    examId: 'GATE',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    topicId: 'gate-cn-transport',
    topicName: 'Transport Layer Protocols',
    conceptId: 'cn-tcp-congestion',
    conceptName: 'TCP Congestion Control',
    pattern: 'NAT',
    questionText: 'A token bucket traffic shaper has a maximum token bucket capacity C = 32 Megabits. Tokens are added at a constant rate r = 8 Mbps. The maximum burst transmission speed of the network interface is R = 24 Mbps. What is the maximum burst duration S (in seconds) during which the sender can transmit continuously at the peak rate R without token exhaustion? (Round to nearest integer)',
    numericalAnswer: 2,
    numericalTolerance: 0.1,
    difficulty: 'Medium',
    explanation: 'Maximum burst transmission formula:\nTokens consumed during burst duration S is R * S.\nTokens available is capacity C + tokens generated during time S (r * S).\nEquating:\nR * S = C + r * S\nS * (R - r) = C\nS = C / (R - r) = 32 / (24 - 8) = 32 / 16 = 2.0 seconds.',
    isPyq: true,
    year: 2023,
    source: 'GATE CS 2023 NAT Question',
    benchmarkTimeSeconds: 80,
    keyFormulaOrRule: 'Burst Duration S = C / (R - r)'
  },

  // 13. GATE CS - Assertion & Reason
  {
    id: 'q-os-ar-01',
    examId: 'GATE',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    topicId: 'gate-os-memory',
    topicName: 'Memory Management & Paging',
    conceptId: 'os-virtual-memory',
    conceptName: 'Page Tables & Effective Access Time',
    pattern: 'AssertionReason',
    questionText: 'Evaluate the Assertion (A) and Reason (R) given below:',
    assertionText: 'Assertion (A): In a virtual memory system with a Translation Lookaside Buffer (TLB), an increase in TLB hit ratio drastically reduces the Effective Memory Access Time (EMAT).',
    reasonText: 'Reason (R): When a TLB hit occurs, the physical frame number is retrieved in cache hardware time without needing any additional memory accesses to the page table in main memory.',
    optionA: 'Both (A) and (R) are TRUE, and (R) is the CORRECT explanation of (A).',
    optionB: 'Both (A) and (R) are TRUE, but (R) is NOT the correct explanation of (A).',
    optionC: '(A) is TRUE, but (R) is FALSE.',
    optionD: '(A) is FALSE, but (R) is TRUE.',
    correctAnswer: 'A',
    difficulty: 'Medium',
    explanation: 'EMAT = Hit_Ratio * (TLB_time + Mem_time) + (1 - Hit_Ratio) * (TLB_time + 2 * Mem_time). On a TLB hit, the page table in RAM does not need to be looked up. Both statements are true and (R) explains (A).',
    isPyq: true,
    year: 2022,
    source: 'GATE CS 2022 Assertion-Reason Pattern',
    benchmarkTimeSeconds: 60
  },

  // 14. GATE ECE - NAT
  {
    id: 'q-ece-nat-01',
    examId: 'GATE_ECE',
    subjectId: 'ece-analog',
    subjectName: 'Analog Circuits & Op-Amps',
    topicId: 'ece-opamp-circuits',
    topicName: 'Operational Amplifiers & Negative Feedback',
    conceptId: 'ece-virtual-ground',
    conceptName: 'Virtual Ground & Slew Rate Limitations',
    pattern: 'NAT',
    questionText: 'An ideal operational amplifier is connected in an inverting configuration with input resistor R1 = 10 kΩ and feedback resistor Rf = 100 kΩ. If a DC input voltage Vin = 0.25 V is applied, calculate the magnitude of the output voltage |Vout| in Volts.',
    numericalAnswer: 2.5,
    numericalTolerance: 0.05,
    difficulty: 'Easy',
    explanation: 'For an ideal inverting op-amp:\nVout = - (Rf / R1) * Vin = - (100 kΩ / 10 kΩ) * 0.25 V = - 10 * 0.25 V = -2.5 V.\nMagnitude |Vout| = 2.5 V.',
    isPyq: true,
    year: 2024,
    source: 'GATE ECE 2024 Official Paper',
    benchmarkTimeSeconds: 45
  },

  // 15. JEE Advanced - MSQ
  {
    id: 'q-jee-msq-01',
    examId: 'JEE',
    subjectId: 'jee-phys',
    subjectName: 'Physics',
    topicId: 'jee-mechanics',
    topicName: 'Mechanics & Newton Laws',
    conceptId: 'jee-kinematics',
    conceptName: 'Relative Motion & Trajectory',
    pattern: 'MSQ',
    questionText: 'A particle of mass m is moving under the influence of a central attractive conservative force field F(r) = - k/r^2. Which of the following physical quantities remain CONSTANT throughout its orbit? (Select ALL correct options)',
    optionA: 'Linear momentum of the particle',
    optionB: 'Angular momentum about the center of force',
    optionC: 'Kinetic energy of the particle in an eccentric elliptical orbit',
    optionD: 'Total mechanical energy (Kinetic + Potential)',
    correctAnswers: ['B', 'D'],
    difficulty: 'Hard',
    explanation: 'In central force motion:\n• Torque tau = r x F = 0 because F is parallel to r. Hence dL/dt = 0, so Angular Momentum is strictly conserved (Option B).\n• Force is conservative, so Total Mechanical Energy E = K + U is strictly conserved (Option D).\n• Linear momentum is NOT conserved because net force is non-zero.\n• Kinetic energy changes as distance r varies in an elliptical orbit.',
    isPyq: true,
    year: 2024,
    source: 'JEE Advanced 2024 Paper 1 MSQ',
    benchmarkTimeSeconds: 110
  },

  // 16. NEET UG - AssertionReason
  {
    id: 'q-neet-ar-01',
    examId: 'NEET',
    subjectId: 'neet-bio',
    subjectName: 'Biology (Botany & Zoology)',
    topicId: 'neet-genetics',
    topicName: 'Genetics & Molecular Basis of Inheritance',
    conceptId: 'neet-dna-replication',
    conceptName: 'Semi-Conservative DNA Replication & Enzymes',
    pattern: 'AssertionReason',
    questionText: 'Read the following statements carefully:',
    assertionText: 'Assertion (A): DNA replication in living cells is called semi-conservative replication.',
    reasonText: 'Reason (R): In each replicated daughter DNA duplex, one polynucleotide chain is conserved from the parent molecule while the other is newly synthesized.',
    optionA: 'Both (A) and (R) are correct and (R) is the correct explanation of (A).',
    optionB: 'Both (A) and (R) are correct but (R) is not the correct explanation of (A).',
    optionC: '(A) is correct but (R) is incorrect.',
    optionD: '(A) is incorrect but (R) is correct.',
    correctAnswer: 'A',
    difficulty: 'Easy',
    explanation: 'Meselson and Stahl experimentally proved that during DNA replication, the two parent strands separate, and each acts as a template for synthesis of a complementary new strand. Thus each daughter DNA has one parent and one new strand. Both are correct and (R) explains (A).',
    isPyq: true,
    year: 2024,
    source: 'NEET UG 2024 Paper',
    benchmarkTimeSeconds: 40
  },

  // 17. CAT - NAT
  {
    id: 'q-cat-nat-01',
    examId: 'CAT',
    subjectId: 'cat-qa',
    subjectName: 'Quantitative Aptitude (QA)',
    topicId: 'cat-algebra',
    topicName: 'Quadratic Equations & Polynomials',
    conceptId: 'cat-roots-coefficients',
    conceptName: 'Roots, Discriminant & Vieta’s Relations',
    pattern: 'NAT',
    questionText: 'The roots of the quadratic equation x^2 - 12x + k = 0 are real and positive, and one root is three times the other root. What is the numerical value of constant k?',
    numericalAnswer: 27,
    numericalTolerance: 0.0,
    difficulty: 'Medium',
    explanation: 'Let the roots be alpha and 3*alpha.\nSum of roots: alpha + 3*alpha = 12 => 4*alpha = 12 => alpha = 3.\nThe two roots are 3 and 9.\nProduct of roots: k = 3 * 9 = 27.',
    isPyq: true,
    year: 2024,
    source: 'CAT 2024 Slot 1 QA NAT',
    benchmarkTimeSeconds: 50
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'usr-navadeep',
  name: 'Navadeep',
  email: '23eg106b31@anurag.edu.in',
  targetExam: 'GATE',
  targetYear: '2027',
  avatarUrl: '',
  streakDays: 1,
  testsCompleted: 1,
  questionsAttempted: 10,
  overallMastery: 64,
  provider: 'google'
};

export const INITIAL_MASTERY_DATA: ConceptMastery[] = [
  // Computer Networks (Critical: 35%)
  {
    conceptId: 'cn-tcp-congestion',
    conceptName: 'TCP Congestion Control',
    topicId: 'gate-cn-transport',
    topicName: 'Transport Layer Protocols',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    masteryPercentage: 28,
    status: 'Critical',
    totalAttempts: 10,
    correctAttempts: 3,
    avgTimeSeconds: 95,
    lastTestedDate: '2026-09-18'
  },
  {
    conceptId: 'cn-tcp-flow-control',
    conceptName: 'TCP Sliding Window & Flow Control',
    topicId: 'gate-cn-transport',
    topicName: 'Transport Layer Protocols',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    masteryPercentage: 42,
    status: 'Weak',
    totalAttempts: 8,
    correctAttempts: 3,
    avgTimeSeconds: 88,
    lastTestedDate: '2026-09-17'
  },
  {
    conceptId: 'cn-ip-subnetting',
    conceptName: 'IP Addressing & Subnetting (CIDR)',
    topicId: 'gate-cn-network',
    topicName: 'Network Layer & Addressing',
    subjectId: 'gate-cn',
    subjectName: 'Computer Networks',
    masteryPercentage: 40,
    status: 'Weak',
    totalAttempts: 9,
    correctAttempts: 4,
    avgTimeSeconds: 78,
    lastTestedDate: '2026-09-15'
  },

  // Operating Systems (Weak: 48%)
  {
    conceptId: 'os-turnaround-waiting',
    conceptName: 'Waiting Time vs Turnaround Time',
    topicId: 'gate-os-scheduling',
    topicName: 'CPU Scheduling Algorithms',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    masteryPercentage: 40,
    status: 'Weak',
    totalAttempts: 10,
    correctAttempts: 4,
    avgTimeSeconds: 92,
    lastTestedDate: '2026-09-19'
  },
  {
    conceptId: 'os-round-robin',
    conceptName: 'Round Robin & Time Quantum',
    topicId: 'gate-os-scheduling',
    topicName: 'CPU Scheduling Algorithms',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    masteryPercentage: 45,
    status: 'Weak',
    totalAttempts: 6,
    correctAttempts: 3,
    avgTimeSeconds: 52,
    lastTestedDate: '2026-09-16'
  },
  {
    conceptId: 'os-bankers-algo',
    conceptName: "Banker's Algorithm & Safe States",
    topicId: 'gate-os-concurrency',
    topicName: 'Synchronization & Deadlocks',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    masteryPercentage: 55,
    status: 'Good',
    totalAttempts: 6,
    correctAttempts: 4,
    avgTimeSeconds: 110,
    lastTestedDate: '2026-09-14'
  },
  {
    conceptId: 'os-virtual-memory',
    conceptName: 'Page Tables & Effective Access Time',
    topicId: 'gate-os-memory',
    topicName: 'Memory Management & Paging',
    subjectId: 'gate-os',
    subjectName: 'Operating Systems',
    masteryPercentage: 52,
    status: 'Good',
    totalAttempts: 8,
    correctAttempts: 4,
    avgTimeSeconds: 84,
    lastTestedDate: '2026-09-12'
  },

  // DBMS (Good: 70%)
  {
    conceptId: 'dbms-normal-forms',
    conceptName: '3NF vs BCNF Decomposition',
    topicId: 'gate-dbms-normalization',
    topicName: 'Relational Design & Normalization',
    subjectId: 'gate-dbms',
    subjectName: 'Databases (DBMS)',
    masteryPercentage: 68,
    status: 'Good',
    totalAttempts: 7,
    correctAttempts: 5,
    avgTimeSeconds: 75,
    lastTestedDate: '2026-09-16'
  },
  {
    conceptId: 'dbms-bplus-trees',
    conceptName: 'B+ Tree Order & Search Cost',
    topicId: 'gate-dbms-indexing',
    topicName: 'Storage & Indexing',
    subjectId: 'gate-dbms',
    subjectName: 'Databases (DBMS)',
    masteryPercentage: 72,
    status: 'Good',
    totalAttempts: 8,
    correctAttempts: 6,
    avgTimeSeconds: 70,
    lastTestedDate: '2026-09-10'
  },

  // Data Structures (Strong: 82%)
  {
    conceptId: 'dsa-avl-trees',
    conceptName: 'AVL Rotations & Height Balance',
    topicId: 'gate-dsa-trees',
    topicName: 'Trees & Balanced Search Trees',
    subjectId: 'gate-dsa',
    subjectName: 'Data Structures & Algorithms',
    examId: 'GATE',
    masteryPercentage: 82,
    status: 'Strong',
    totalAttempts: 11,
    correctAttempts: 9,
    avgTimeSeconds: 48,
    lastTestedDate: '2026-09-15'
  },

  // GATE ECE
  {
    conceptId: 'ece-virtual-ground',
    conceptName: 'Virtual Ground & Slew Rate Limitations',
    topicId: 'ece-opamp-circuits',
    topicName: 'Operational Amplifiers & Negative Feedback',
    subjectId: 'ece-analog',
    subjectName: 'Analog Circuits',
    examId: 'GATE_ECE',
    masteryPercentage: 36,
    status: 'Critical',
    totalAttempts: 9,
    correctAttempts: 3,
    avgTimeSeconds: 98,
    lastTestedDate: '2026-09-18'
  },
  {
    conceptId: 'ece-stability-causality',
    conceptName: 'BIBO Stability & Causality of LTI Systems',
    topicId: 'ece-signals-lti',
    topicName: 'LTI Systems & Convolution',
    subjectId: 'ece-signals',
    subjectName: 'Signals & Systems',
    examId: 'GATE_ECE',
    masteryPercentage: 68,
    status: 'Good',
    totalAttempts: 7,
    correctAttempts: 5,
    avgTimeSeconds: 72,
    lastTestedDate: '2026-09-14'
  },
  {
    conceptId: 'ece-digital-fsm',
    conceptName: 'Sequential FSM & Setup/Hold Timing',
    topicId: 'ece-digital-timing',
    topicName: 'Digital Circuits & Timing Analysis',
    subjectId: 'ece-digital',
    subjectName: 'Digital Circuits',
    examId: 'GATE_ECE',
    masteryPercentage: 84,
    status: 'Strong',
    totalAttempts: 12,
    correctAttempts: 10,
    avgTimeSeconds: 45,
    lastTestedDate: '2026-09-16'
  },
  {
    conceptId: 'ece-modulation-index',
    conceptName: 'FM Modulation Index & Carson Bandwidth',
    topicId: 'ece-comm-angle',
    topicName: 'Angle Modulation & Noise in Receivers',
    subjectId: 'ece-comm',
    subjectName: 'Communications',
    examId: 'GATE_ECE',
    masteryPercentage: 42,
    status: 'Weak',
    totalAttempts: 8,
    correctAttempts: 3,
    avgTimeSeconds: 88,
    lastTestedDate: '2026-09-12'
  },
  {
    conceptId: 'ece-mosfet-biasing',
    conceptName: 'MOSFET Small Signal Parameters & Early Effect',
    topicId: 'ece-edc-mosfet',
    topicName: 'Semiconductor Devices (EDC)',
    subjectId: 'ece-edc',
    subjectName: 'Electronic Devices & Circuits (EDC)',
    examId: 'GATE_ECE',
    masteryPercentage: 54,
    status: 'Good',
    totalAttempts: 6,
    correctAttempts: 3,
    avgTimeSeconds: 80,
    lastTestedDate: '2026-09-10'
  },
  {
    conceptId: 'ece-wave-polarization',
    conceptName: 'Electromagnetic Wave Polarization & Poynting Vector',
    topicId: 'ece-em-waves',
    topicName: 'Plane Waves & Boundary Conditions',
    subjectId: 'ece-emft',
    subjectName: 'Electromagnetics',
    examId: 'GATE_ECE',
    masteryPercentage: 48,
    status: 'Weak',
    totalAttempts: 6,
    correctAttempts: 3,
    avgTimeSeconds: 90,
    lastTestedDate: '2026-09-08'
  },

  // JEE Advanced & Main
  {
    conceptId: 'jee-projectile',
    conceptName: 'Rotational Dynamics & Instantaneous Axis (IAOR)',
    topicId: 'jee-phys-mechanics',
    topicName: 'Rotational Mechanics & Conservation of L',
    subjectId: 'jee-phys',
    subjectName: 'Physics',
    examId: 'JEE',
    masteryPercentage: 34,
    status: 'Critical',
    totalAttempts: 12,
    correctAttempts: 4,
    avgTimeSeconds: 110,
    lastTestedDate: '2026-09-18'
  },
  {
    conceptId: 'jee-integration-parts',
    conceptName: 'Definite Integrals & King Property',
    topicId: 'jee-math-calculus',
    topicName: 'Integral Calculus & Differential Equations',
    subjectId: 'jee-math',
    subjectName: 'Mathematics',
    examId: 'JEE',
    masteryPercentage: 58,
    status: 'Good',
    totalAttempts: 8,
    correctAttempts: 5,
    avgTimeSeconds: 85,
    lastTestedDate: '2026-09-16'
  },
  {
    conceptId: 'jee-chem-bonding',
    conceptName: 'Chemical Thermodynamics & Gibbs Free Energy',
    topicId: 'jee-chem-thermo',
    topicName: 'Physical & Inorganic Chemistry',
    subjectId: 'jee-chem',
    subjectName: 'Chemistry',
    examId: 'JEE',
    masteryPercentage: 76,
    status: 'Strong',
    totalAttempts: 10,
    correctAttempts: 8,
    avgTimeSeconds: 50,
    lastTestedDate: '2026-09-15'
  },

  // NEET UG
  {
    conceptId: 'neet-dna-replication',
    conceptName: 'DNA Replication & Leading/Lagging Strand Enzymes',
    topicId: 'neet-genetics',
    topicName: 'Molecular Basis of Inheritance',
    subjectId: 'neet-bio',
    subjectName: 'Biology (Botany & Zoology)',
    examId: 'NEET',
    masteryPercentage: 35,
    status: 'Critical',
    totalAttempts: 14,
    correctAttempts: 5,
    avgTimeSeconds: 70,
    lastTestedDate: '2026-09-19'
  },
  {
    conceptId: 'neet-buffer-solutions',
    conceptName: 'Henderson-Hasselbalch Equation & Buffer Capacity',
    topicId: 'neet-equilibrium',
    topicName: 'Ionic Equilibrium & Solutions',
    subjectId: 'neet-chem',
    subjectName: 'Chemistry',
    examId: 'NEET',
    masteryPercentage: 48,
    status: 'Weak',
    totalAttempts: 9,
    correctAttempts: 4,
    avgTimeSeconds: 65,
    lastTestedDate: '2026-09-15'
  },
  {
    conceptId: 'neet-optics-ray',
    conceptName: 'Ray Optics & Lens Maker Formula',
    topicId: 'neet-phys-optics',
    topicName: 'Optics & Modern Physics',
    subjectId: 'neet-phys',
    subjectName: 'Physics',
    examId: 'NEET',
    masteryPercentage: 66,
    status: 'Good',
    totalAttempts: 10,
    correctAttempts: 7,
    avgTimeSeconds: 58,
    lastTestedDate: '2026-09-12'
  },

  // UPSC CSE
  {
    conceptId: 'upsc-rights-writs',
    conceptName: 'Article 32 & Constitutional Writs Jurisdiction',
    topicId: 'upsc-polity-const',
    topicName: 'Fundamental Rights & Constitutional Remedies',
    subjectId: 'upsc-polity',
    subjectName: 'Indian Polity & Governance',
    examId: 'UPSC',
    masteryPercentage: 38,
    status: 'Critical',
    totalAttempts: 10,
    correctAttempts: 4,
    avgTimeSeconds: 85,
    lastTestedDate: '2026-09-18'
  },
  {
    conceptId: 'upsc-monetary-policy',
    conceptName: 'Monetary Policy Tools & RBI Repo Rate Dynamics',
    topicId: 'upsc-econ-macro',
    topicName: 'Banking & Macroeconomic Management',
    subjectId: 'upsc-econ',
    subjectName: 'Economy & Development',
    examId: 'UPSC',
    masteryPercentage: 62,
    status: 'Good',
    totalAttempts: 8,
    correctAttempts: 5,
    avgTimeSeconds: 70,
    lastTestedDate: '2026-09-14'
  },
  {
    conceptId: 'upsc-1857-revolt',
    conceptName: 'Socio-Religious Reform Movements & 1857 Aftermath',
    topicId: 'upsc-hist-modern',
    topicName: 'Modern Indian History',
    subjectId: 'upsc-hist',
    subjectName: 'Modern History',
    examId: 'UPSC',
    masteryPercentage: 80,
    status: 'Strong',
    totalAttempts: 11,
    correctAttempts: 9,
    avgTimeSeconds: 52,
    lastTestedDate: '2026-09-15'
  },
  {
    conceptId: 'upsc-monsoon-mechanism',
    conceptName: 'Indian Monsoon Mechanism & El Niño-Southern Oscillation',
    topicId: 'upsc-geog-climate',
    topicName: 'Climatology & Physical Geography',
    subjectId: 'upsc-geog',
    subjectName: 'Geography & Environment',
    examId: 'UPSC',
    masteryPercentage: 54,
    status: 'Good',
    totalAttempts: 7,
    correctAttempts: 4,
    avgTimeSeconds: 75,
    lastTestedDate: '2026-09-11'
  },

  // CAT
  {
    conceptId: 'cat-roots-coefficients',
    conceptName: 'Roots, Discriminant & Vieta’s Relations',
    topicId: 'cat-algebra',
    topicName: 'Quadratic Equations & Polynomials',
    subjectId: 'cat-qa',
    subjectName: 'Quantitative Aptitude (QA)',
    examId: 'CAT',
    masteryPercentage: 35,
    status: 'Critical',
    totalAttempts: 10,
    correctAttempts: 3,
    avgTimeSeconds: 90,
    lastTestedDate: '2026-09-18'
  },
  {
    conceptId: 'cat-grid-elimination',
    conceptName: 'Cross-Grid Constraint Elimination in Arrangements',
    topicId: 'cat-arrangements',
    topicName: 'Matrix & Multi-Dimensional Grid Arrangements',
    subjectId: 'cat-dilr',
    subjectName: 'Data Interpretation & Logical Reasoning (DILR)',
    examId: 'CAT',
    masteryPercentage: 64,
    status: 'Good',
    totalAttempts: 8,
    correctAttempts: 5,
    avgTimeSeconds: 115,
    lastTestedDate: '2026-09-14'
  },
  {
    conceptId: 'cat-rc-inference',
    conceptName: 'Author Tone & Critical Reasoning Inferences',
    topicId: 'cat-varc-rc',
    topicName: 'Reading Comprehension & Critical Reasoning',
    subjectId: 'cat-varc',
    subjectName: 'Verbal Ability & Reading Comprehension (VARC)',
    examId: 'CAT',
    masteryPercentage: 82,
    status: 'Strong',
    totalAttempts: 12,
    correctAttempts: 10,
    avgTimeSeconds: 58,
    lastTestedDate: '2026-09-16'
  },

  // Banking
  {
    conceptId: 'bank-ci-si',
    conceptName: 'Compound Interest vs Simple Interest Difference Formulas',
    topicId: 'bank-arithmetic',
    topicName: 'Commercial Mathematics',
    subjectId: 'bank-quant',
    subjectName: 'Quantitative Aptitude',
    examId: 'Banking',
    masteryPercentage: 42,
    status: 'Weak',
    totalAttempts: 8,
    correctAttempts: 3,
    avgTimeSeconds: 65,
    lastTestedDate: '2026-09-17'
  },
  {
    conceptId: 'bank-syllogisms',
    conceptName: 'Reverse Syllogisms & Possibility Conditions',
    topicId: 'bank-reasoning-logic',
    topicName: 'Logical & Verbal Reasoning',
    subjectId: 'bank-reasoning',
    subjectName: 'Reasoning Ability',
    examId: 'Banking',
    masteryPercentage: 84,
    status: 'Strong',
    totalAttempts: 12,
    correctAttempts: 10,
    avgTimeSeconds: 40,
    lastTestedDate: '2026-09-15'
  },
  {
    conceptId: 'bank-reading-comp',
    conceptName: 'Speed Reading & Cloze Test Context Matching',
    topicId: 'bank-eng-cloze',
    topicName: 'Grammar & Vocabulary',
    subjectId: 'bank-english',
    subjectName: 'English Language',
    examId: 'Banking',
    masteryPercentage: 70,
    status: 'Good',
    totalAttempts: 9,
    correctAttempts: 6,
    avgTimeSeconds: 48,
    lastTestedDate: '2026-09-13'
  },
  {
    conceptId: 'bank-repo-reverse',
    conceptName: 'Monetary Rates, CRR, SLR & Priority Sector Lending',
    topicId: 'bank-awareness-finance',
    topicName: 'Banking & Financial Awareness',
    subjectId: 'bank-awareness',
    subjectName: 'General & Banking Awareness',
    examId: 'Banking',
    masteryPercentage: 60,
    status: 'Good',
    totalAttempts: 7,
    correctAttempts: 4,
    avgTimeSeconds: 35,
    lastTestedDate: '2026-09-11'
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = SYLLABUS_RESOURCES;

export const INITIAL_ACCURACY_TRENDS: AccuracyTrend[] = [
  { week: 'Week 1', accuracy: 48 },
  { week: 'Week 2', accuracy: 56 },
  { week: 'Week 3', accuracy: 64 },
  { week: 'Week 4', accuracy: 72 }
];

export const INITIAL_REPEATED_ERRORS: RepeatedErrorRecord[] = [
  {
    conceptName: 'TCP Congestion Control',
    topicName: 'Transport Layer Protocols',
    subjectName: 'Computer Networks',
    errorCount: 6,
    primaryErrorType: 'Conceptual',
    lastEncountered: 'Yesterday',
    status: 'Critical'
  },
  {
    conceptName: 'Waiting Time vs Turnaround Time',
    topicName: 'CPU Scheduling Algorithms',
    subjectName: 'Operating Systems',
    errorCount: 4,
    primaryErrorType: 'Conceptual',
    lastEncountered: '2 days ago',
    status: 'Critical'
  },
  {
    conceptName: 'IP Addressing & Subnetting',
    topicName: 'Network Layer & Addressing',
    subjectName: 'Computer Networks',
    errorCount: 3,
    primaryErrorType: 'Calculation',
    lastEncountered: '4 days ago',
    status: 'Improving'
  },
  {
    conceptName: 'Distance Vector Routing Loops',
    topicName: 'Network Layer & Addressing',
    subjectName: 'Computer Networks',
    errorCount: 2,
    primaryErrorType: 'Recall',
    lastEncountered: '1 week ago',
    status: 'Improving'
  }
];

export const INITIAL_WEAKNESSES: WeaknessItem[] = [
  // GATE CS
  {
    id: 'w-tcp-congestion',
    conceptId: 'cn-tcp-congestion',
    conceptName: 'TCP Congestion Control',
    topicName: 'Transport Layer Protocols',
    subjectName: 'Computer Networks',
    examId: 'GATE',
    errorTypes: ['Conceptual', 'Time'],
    accuracy: 30,
    avgTime: 95,
    benchmarkTime: 75,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 6,
    reason: '6 incorrect answers in recent attempts. Confusing Reno Fast Recovery (ssthresh = cwnd/2, cwnd = ssthresh + 3 MSS) with Tahoe timeout behavior (reset cwnd = 1 MSS).',
    quickExplanation: 'TCP Reno on 3 Duplicate ACKs sets ssthresh = cwnd / 2 and cwnd = ssthresh + 3 MSS (Fast Recovery). Only timeout resets cwnd to 1 MSS.',
    recommendedAction: 'Review Transport layer cheat sheet and complete 5 targeted questions + 5 PYQs.'
  },
  {
    id: 'w-cpu-waiting',
    conceptId: 'os-turnaround-waiting',
    conceptName: 'Waiting Time vs Turnaround Time',
    topicName: 'CPU Scheduling Algorithms',
    subjectName: 'Operating Systems',
    examId: 'GATE',
    errorTypes: ['Conceptual', 'Calculation'],
    accuracy: 40,
    avgTime: 92,
    benchmarkTime: 60,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 4,
    reason: '4 incorrect answers in recent tests. Confusing Waiting Time with Turnaround Time on non-zero arrival times.',
    quickExplanation: 'Turnaround Time = Completion Time - Arrival Time. Waiting Time = Turnaround Time - Burst Time. Waiting time does NOT include CPU execution time!',
    recommendedAction: 'Solve 5 targeted Gantt chart numerical questions.'
  },
  {
    id: 'w-subnetting',
    conceptId: 'cn-ip-subnetting',
    conceptName: 'IP Addressing & Subnetting (CIDR)',
    topicName: 'Network Layer & Addressing',
    subjectName: 'Computer Networks',
    examId: 'GATE',
    errorTypes: ['Calculation'],
    accuracy: 44,
    avgTime: 78,
    benchmarkTime: 60,
    severity: 'Medium',
    priority: 'Medium',
    recentIncorrectCount: 3,
    reason: 'Calculation slips when converting CIDR prefix into usable host range subtracting network and broadcast addresses (2^h - 2).',
    quickExplanation: 'Number of usable host addresses in a /n network is 2^(32 - n) - 2.',
    recommendedAction: 'Complete 3 CIDR binary calculation drills.'
  },

  // GATE ECE
  {
    id: 'w-ece-virtual-ground',
    conceptId: 'ece-virtual-ground',
    conceptName: 'Virtual Ground & Slew Rate Limitations',
    topicName: 'Operational Amplifiers & Negative Feedback',
    subjectName: 'Analog Circuits',
    examId: 'GATE_ECE',
    errorTypes: ['Conceptual', 'Calculation'],
    accuracy: 36,
    avgTime: 98,
    benchmarkTime: 70,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 5,
    reason: 'Applying virtual ground condition blindly when the op-amp output is saturated at Vdd/Vss or when feedback is positive.',
    quickExplanation: 'Virtual ground (V+ = V-) holds strictly under negative feedback when the op-amp operates in linear region without output saturation.',
    recommendedAction: 'Study the Op-Amp saturation boundary conditions and complete 5 GATE ECE numericals.'
  },

  // JEE
  {
    id: 'w-jee-rotational',
    conceptId: 'jee-projectile',
    conceptName: 'Rotational Dynamics & Instantaneous Axis (IAOR)',
    topicName: 'Rotational Mechanics & Conservation of L',
    subjectName: 'Physics',
    examId: 'JEE',
    errorTypes: ['Procedural', 'Calculation'],
    accuracy: 34,
    avgTime: 110,
    benchmarkTime: 80,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 6,
    reason: 'Incorrect torque reference point selection and omitting the pseudo-force torque term about non-inertial centers of mass.',
    quickExplanation: 'When computing torque about an accelerating point, you must include the torque of the fictitious pseudo force acting at the center of mass: tau = I_point * alpha.',
    recommendedAction: 'Review parallel axis theorem and solve 5 JEE Advanced multi-body rolling problems.'
  },

  // NEET
  {
    id: 'w-neet-dna-replication',
    conceptId: 'neet-dna-replication',
    conceptName: 'DNA Replication & Leading/Lagging Strand Enzymes',
    topicName: 'Molecular Basis of Inheritance',
    subjectName: 'Biology (Botany & Zoology)',
    examId: 'NEET',
    errorTypes: ['Conceptual', 'Recall'],
    accuracy: 35,
    avgTime: 70,
    benchmarkTime: 45,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 5,
    reason: 'Confusing DNA Polymerase I (RNA primer excision) with DNA Polymerase III (main synthesis) and polarity of Okazaki fragment addition.',
    quickExplanation: 'DNA Polymerase synthesizes strictly in 5\' to 3\' direction. Lagging strand synthesis requires repetitive RNA primase priming and DNA Ligase phosphodiester ligation.',
    recommendedAction: 'Review NCERT Chapter 6 Molecular Biology flowcharts and take 10 targeted NEET MCQs.'
  },

  // UPSC
  {
    id: 'w-upsc-rights-writs',
    conceptId: 'upsc-rights-writs',
    conceptName: 'Article 32 & Constitutional Writs Jurisdiction',
    topicName: 'Fundamental Rights & Constitutional Remedies',
    subjectName: 'Indian Polity & Governance',
    examId: 'UPSC',
    errorTypes: ['Conceptual', 'Misreading'],
    accuracy: 38,
    avgTime: 85,
    benchmarkTime: 55,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 4,
    reason: 'Confusing the writ jurisdiction of the Supreme Court (Article 32 - only Fundamental Rights) with High Courts (Article 226 - Fundamental Rights + other legal rights).',
    quickExplanation: 'Article 32 is itself a Fundamental Right and can be invoked ONLY for enforcement of Part III rights. Article 226 is discretionary and broader.',
    recommendedAction: 'Read Laxmikanth Chapter on Writs and practice 5 UPSC Prelims Assertion-Reason questions.'
  },

  // CAT
  {
    id: 'w-cat-roots',
    conceptId: 'cat-roots-coefficients',
    conceptName: 'Roots, Discriminant & Vieta’s Relations',
    topicName: 'Quadratic Equations & Polynomials',
    subjectName: 'Quantitative Aptitude (QA)',
    examId: 'CAT',
    errorTypes: ['Calculation', 'Procedural'],
    accuracy: 35,
    avgTime: 90,
    benchmarkTime: 60,
    severity: 'High',
    priority: 'High',
    recentIncorrectCount: 5,
    reason: 'Missing the sign inversion in sum of roots (-b/a) vs product (c/a) in higher degree polynomials and non-monic quadratics.',
    quickExplanation: 'For quadratic ax^2 + bx + c = 0, sum = -b/a, product = c/a. For cubic ax^3 + bx^2 + cx + d = 0, sum = -b/a, pairwise = c/a, product = -d/a.',
    recommendedAction: 'Solve 5 CAT QA NAT drill problems without using calculator.'
  },

  // Banking
  {
    id: 'w-bank-ci-si',
    conceptId: 'bank-ci-si',
    conceptName: 'Compound Interest vs Simple Interest Difference Formulas',
    topicName: 'Commercial Mathematics',
    subjectName: 'Quantitative Aptitude',
    examId: 'Banking',
    errorTypes: ['Calculation', 'Time'],
    accuracy: 42,
    avgTime: 65,
    benchmarkTime: 40,
    severity: 'Medium',
    priority: 'High',
    recentIncorrectCount: 4,
    reason: 'Deriving compound interest manually step-by-step instead of applying the direct 2-year difference formula D = P * (R/100)^2.',
    quickExplanation: '2-Year Difference: D = P * (R/100)^2. 3-Year Difference: D = P * (R/100)^2 * (3 + R/100). Use direct formula to save 45 seconds per question.',
    recommendedAction: 'Memorize the direct 2-year and 3-year difference shortcuts and solve 5 timed banking problems.'
  }
];

export const DOMAIN_DEFAULT_WEAKNESSES: Record<string, WeaknessItem> = {
  GATE: INITIAL_WEAKNESSES[0],
  GATE_ECE: INITIAL_WEAKNESSES.find(w => w.examId === 'GATE_ECE') || INITIAL_WEAKNESSES[0],
  JEE: INITIAL_WEAKNESSES.find(w => w.examId === 'JEE') || INITIAL_WEAKNESSES[0],
  NEET: INITIAL_WEAKNESSES.find(w => w.examId === 'NEET') || INITIAL_WEAKNESSES[0],
  UPSC: INITIAL_WEAKNESSES.find(w => w.examId === 'UPSC') || INITIAL_WEAKNESSES[0],
  CAT: INITIAL_WEAKNESSES.find(w => w.examId === 'CAT') || INITIAL_WEAKNESSES[0],
  Banking: INITIAL_WEAKNESSES.find(w => w.examId === 'Banking') || INITIAL_WEAKNESSES[0]
};

export const INITIAL_STUDENT = INITIAL_STUDENT_PROFILE;
export const INITIAL_MASTERY = INITIAL_MASTERY_DATA;
export const SYLLABUS_DATA = SUBJECTS_DATA;
export const WEEKLY_ACCURACY_TRENDS = INITIAL_ACCURACY_TRENDS;
export const REPEATED_ERRORS_HISTORY = INITIAL_REPEATED_ERRORS;
