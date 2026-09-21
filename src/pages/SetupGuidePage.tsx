import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Code2, 
  Laptop, 
  FolderGit2, 
  FileCode2, 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Play, 
  Cpu, 
  KeyRound, 
  Settings, 
  ShieldCheck,
  ChevronRight,
  BookOpen,
  ArrowRight,
  RefreshCw,
  X
} from 'lucide-react';

interface SetupGuidePageProps {
  isModal?: boolean;
  onClose?: () => void;
}

type PackageManager = 'npm' | 'yarn' | 'pnpm';

export const SetupGuidePage: React.FC<SetupGuidePageProps> = ({ isModal = false, onClose }) => {
  const [pkgManager, setPkgManager] = useState<PackageManager>('npm');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'vscode' | 'troubleshooting' | 'architecture'>('walkthrough');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2000);
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  // Commands dynamically mapped to selected package manager
  const commands = {
    install: pkgManager === 'yarn' ? 'yarn install' : pkgManager === 'pnpm' ? 'pnpm install' : 'npm install',
    dev: pkgManager === 'yarn' ? 'yarn dev' : pkgManager === 'pnpm' ? 'pnpm dev' : 'npm run dev',
    build: pkgManager === 'yarn' ? 'yarn build' : pkgManager === 'pnpm' ? 'pnpm build' : 'npm run build',
    start: pkgManager === 'yarn' ? 'yarn start' : pkgManager === 'pnpm' ? 'pnpm start' : 'npm start',
    lint: pkgManager === 'yarn' ? 'yarn lint' : pkgManager === 'pnpm' ? 'pnpm lint' : 'npm run lint',
  };

  const oneLinerScript = `git clone https://github.com/example/examai-platform.git exam-ai\ncd exam-ai\n${commands.install}\ncp .env.example .env\n${commands.dev}`;

  const vscodeSettingsJson = `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}`;

  const vscodeLaunchJson = `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ExamAI: Fullstack Dev Server",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 9229,
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}`;

  return (
    <div className={`space-y-8 animate-in fade-in duration-300 ${isModal ? 'max-h-[85vh] overflow-y-auto px-1 sm:px-2' : ''}`}>
      
      {/* 1. Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-50/70 via-violet-50/40 to-transparent rounded-bl-full pointer-events-none -z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5" />
                Local Environment Manual
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                VS Code • TypeScript • Node 18+
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                Port 3000 Ready
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              VS Code Local Setup & Deployment Guide
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Step-by-step instructions to clone, install dependencies via <strong>npm</strong> or <strong>yarn</strong>, configure environment variables, and run the <strong>ExamAI</strong> fullstack platform locally on your machine with Visual Studio Code.
            </p>
          </div>

          {/* Package Manager Selector Pill */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Preferred Package Manager:
            </span>
            <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-2xl shadow-2xs">
              {(['npm', 'yarn', 'pnpm'] as PackageManager[]).map((mgr) => (
                <button
                  key={mgr}
                  id={`pkg-mgr-btn-${mgr}`}
                  type="button"
                  onClick={() => setPkgManager(mgr)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    pkgManager === mgr
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mgr}
                </button>
              ))}
            </div>

            {isModal && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="mt-2 text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Close Guide
              </button>
            )}
          </div>
        </div>

        {/* Quick One-Liner Box */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Quick 60-Second Setup (Terminal One-Liner)</div>
              <div className="text-[11px] text-slate-500">Clone, install {pkgManager}, copy environment config, and launch local server</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-oneliner-btn"
              type="button"
              onClick={() => handleCopy(oneLinerScript, 'oneliner')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition"
            >
              {copiedSnippet === 'oneliner' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied One-Liner!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Complete Command</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveTab('walkthrough')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'walkthrough'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Step-by-Step Instructions</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'walkthrough' ? 'bg-indigo-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
            6 Steps
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vscode')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'vscode'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>VS Code Extensions & Config</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('troubleshooting')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'troubleshooting'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Troubleshooting & FAQ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'architecture'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Project Architecture</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: STEP-BY-STEP WALKTHROUGH */}
      {activeTab === 'walkthrough' && (
        <div className="space-y-6">
          
          {/* Prerequisites card */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 text-amber-900 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>System Prerequisites Checklist</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Node.js ≥ 18.x</div>
                  <div className="text-[11px] text-slate-500">v20.x or v22.x recommended</div>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Git Installed</div>
                  <div className="text-[11px] text-slate-500">git --version</div>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">Visual Studio Code</div>
                  <div className="text-[11px] text-slate-500">code command in PATH</div>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">{pkgManager.toUpperCase()} CLI</div>
                  <div className="text-[11px] text-slate-500">{pkgManager} --version</div>
                </div>
              </div>
            </div>
          </div>

          {/* The 6 Steps Pipeline */}
          <div className="space-y-6">

            {/* STEP 1: Clone Repository */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    completedSteps.includes(1) 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {completedSteps.includes(1) ? <Check className="w-4 h-4" /> : '1'}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Clone the Repository via Git</h3>
                    <p className="text-xs text-slate-500">Download the source code to your local drive using terminal or Git Bash.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStep(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                    completedSteps.includes(1)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {completedSteps.includes(1) ? 'Completed ✓' : 'Mark as done'}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Open your terminal (Terminal on macOS/Linux, or PowerShell / Git Bash on Windows) and run:
              </p>

              {/* Code Box */}
              <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs relative group">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>BASH / POWERSHELL</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`git clone https://github.com/your-username/examai-platform.git exam-ai\ncd exam-ai`, 'step1')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                  >
                    {copiedSnippet === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'step1' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="text-emerald-400"># 1. Clone repository into local 'exam-ai' folder</div>
                  <div>git clone https://github.com/your-username/examai-platform.git exam-ai</div>
                  <div className="text-emerald-400 pt-1"># 2. Enter project directory</div>
                  <div>cd exam-ai</div>
                </div>
              </div>
            </div>

            {/* STEP 2: Open in Visual Studio Code */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    completedSteps.includes(2) 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {completedSteps.includes(2) ? <Check className="w-4 h-4" /> : '2'}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Open Project in Visual Studio Code</h3>
                    <p className="text-xs text-slate-500">Launch VS Code directly from your terminal and open the integrated terminal.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStep(2)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                    completedSteps.includes(2)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {completedSteps.includes(2) ? 'Completed ✓' : 'Mark as done'}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Launch VS Code directly from the project directory. Once inside VS Code, press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[11px] text-slate-700">Ctrl + `</kbd> (or <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[11px] text-slate-700">Cmd + `</kbd> on macOS) to open the Integrated Terminal.
              </p>

              <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs relative group">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>TERMINAL</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('code .', 'step2')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                  >
                    {copiedSnippet === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'step2' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="text-emerald-400"># Open current folder in VS Code workspace</div>
                  <div>code .</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tip for Windows/Mac:</strong> If `code` is not recognized, open VS Code, press <kbd className="font-mono">F1</kbd>, type <em>"Shell Command: Install 'code' command in PATH"</em>, and press Enter.
                </span>
              </div>
            </div>

            {/* STEP 3: Install Dependencies via npm/yarn */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    completedSteps.includes(3) 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {completedSteps.includes(3) ? <Check className="w-4 h-4" /> : '3'}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Install Node Dependencies</h3>
                    <p className="text-xs text-slate-500">
                      Install React 19, Vite, Express, Tailwind CSS, Lucide icons, and the Google Gen AI SDK.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStep(3)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                    completedSteps.includes(3)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {completedSteps.includes(3) ? 'Completed ✓' : 'Mark as done'}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                In VS Code's integrated terminal, install all packages listed in <code className="text-indigo-600 font-mono">package.json</code> using your selected package manager (<strong>{pkgManager}</strong>):
              </p>

              {/* Dynamic Command Box */}
              <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs relative group">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-bold uppercase">{pkgManager}</span>
                    <span>DEPENDENCY INSTALLATION</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(commands.install, 'step3')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                  >
                    {copiedSnippet === 'step3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'step3' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="text-emerald-400"># Install all backend and frontend dependencies</div>
                  <div>{commands.install}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <strong>Core Libraries:</strong> React 19, Vite, Express, tsx, @google/genai
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <strong>UI & Styling:</strong> Tailwind CSS v4, Motion, Lucide-React
                </div>
              </div>
            </div>

            {/* STEP 4: Configure Environment (.env) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    completedSteps.includes(4) 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {completedSteps.includes(4) ? <Check className="w-4 h-4" /> : '4'}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Configure Environment Variables (.env)</h3>
                    <p className="text-xs text-slate-500">Set up your local configuration and optional Gemini API credentials.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStep(4)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                    completedSteps.includes(4)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {completedSteps.includes(4) ? 'Completed ✓' : 'Mark as done'}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Copy the template from <code className="font-mono text-indigo-600">.env.example</code> into a new local <code className="font-mono text-indigo-600">.env</code> file:
              </p>

              <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs relative group">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>ENV SETUP COMMAND</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('cp .env.example .env', 'step4_cp')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                  >
                    {copiedSnippet === 'step4_cp' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'step4_cp' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div>cp .env.example .env</div>
              </div>

              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>CONTENT OF .env FILE</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`GEMINI_API_KEY="your_api_key_here"\nAPP_URL="http://localhost:3000"`, 'env_content')}
                    className="text-slate-400 hover:text-white transition"
                  >
                    {copiedSnippet === 'env_content' ? 'Copied' : 'Copy Content'}
                  </button>
                </div>
                <div className="text-slate-400"># Required for server-side Gemini AI diagnosis & tutor chat:</div>
                <div className="text-amber-300">GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere"</div>
                <div className="text-slate-400 pt-1"># Optional local origin:</div>
                <div>APP_URL="http://localhost:3000"</div>
              </div>

              <div className="text-[11px] text-slate-500 bg-indigo-50/70 p-3 rounded-xl border border-indigo-100 flex items-start gap-2">
                <KeyRound className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Getting a Gemini API Key:</strong> You can generate a free API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline inline-flex items-center gap-0.5">Google AI Studio <ExternalLink className="w-3 h-3" /></a>. The platform also has built-in heuristics and fallback responses if you prefer testing without an API key first!
                </span>
              </div>
            </div>

            {/* STEP 5: Run Development Server */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    completedSteps.includes(5) 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {completedSteps.includes(5) ? <Check className="w-4 h-4" /> : '5'}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Start the Local Development Server</h3>
                    <p className="text-xs text-slate-500">
                      Executes <code className="font-mono text-indigo-600">tsx server.ts</code>, launching Express + Vite dev server on port 3000.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStep(5)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                    completedSteps.includes(5)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {completedSteps.includes(5) ? 'Completed ✓' : 'Mark as done'}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Run the development command in your VS Code terminal:
              </p>

              <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs relative group">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>TERMINAL COMMAND</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(commands.dev, 'step5')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                  >
                    {copiedSnippet === 'step5' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'step5' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="text-emerald-400"># Boots fullstack Express server with Vite middleware</div>
                  <div>{commands.dev}</div>
                </div>
              </div>

              {/* Expected Output Demonstration */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-1 text-slate-300">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-800">
                  Expected Console Output:
                </div>
                <div className="text-indigo-400">[Express] API routes mounted successfully (/api/diagnose, /api/tutor, /api/resource)</div>
                <div className="text-emerald-400">[Vite] Middleware active in development mode (SPA)</div>
                <div className="text-white font-bold">➜ Local:   http://localhost:3000/</div>
                <div className="text-slate-400">➜ Network: http://0.0.0.0:3000/</div>
              </div>
            </div>

            {/* STEP 6: Open Browser & Verify */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    completedSteps.includes(6) 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {completedSteps.includes(6) ? <Check className="w-4 h-4" /> : '6'}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Verify in Browser & Start Practicing</h3>
                    <p className="text-xs text-slate-500">Open Chrome or your preferred browser at http://localhost:3000</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStep(6)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                    completedSteps.includes(6)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {completedSteps.includes(6) ? 'Completed ✓' : 'Mark as done'}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-indigo-950">Localhost Address:</div>
                  <div className="font-mono text-sm font-bold text-indigo-700">http://localhost:3000</div>
                </div>
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
                >
                  <span>Open in Browser</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-600">
                You should now see the ExamAI Diagnostic Assessment dashboard with active syllabus trees, interactive PYQs, and weakness engines running locally!
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: VS CODE CONFIGURATION & EXTENSIONS */}
      {activeTab === 'vscode' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-indigo-600" />
              <span>Recommended VS Code Extensions</span>
            </h2>
            <p className="text-xs text-slate-600">
              Install these extensions to get full syntax highlighting, auto-completion, Tailwind CSS intellisense, and formatting support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-800">Tailwind CSS IntelliSense</div>
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">bradlc.vscode-tailwindcss</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Provides autocomplete, syntax highlighting, and linting for Tailwind CSS utility classes inside TSX.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-800">Prettier - Code Formatter</div>
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">esbenp.prettier-vscode</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enforces consistent code styling and auto-formats TSX and JSON files automatically on save.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-800">ESLint</div>
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">dbaeumer.vscode-eslint</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Integrates TypeScript linting and catches potential bugs before running compilation.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-800">Pretty TypeScript Errors</div>
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">yoavbls.pretty-ts-errors</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Makes TypeScript error messages readable and formatted directly in your VS Code editor.
                </p>
              </div>
            </div>
          </div>

          {/* VS Code Workspace Settings */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Optional: .vscode/settings.json</h3>
                <p className="text-xs text-slate-500">Place in your project root to auto-format files on save.</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(vscodeSettingsJson, 'vscode_settings')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                {copiedSnippet === 'vscode_settings' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'vscode_settings' ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
              {vscodeSettingsJson}
            </pre>
          </div>

          {/* VS Code Debugger Launch Config */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Optional: .vscode/launch.json (F5 Debugger)</h3>
                <p className="text-xs text-slate-500">Allows pressing F5 in VS Code to run and set breakpoints.</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(vscodeLaunchJson, 'vscode_launch')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                {copiedSnippet === 'vscode_launch' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'vscode_launch' ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
              {vscodeLaunchJson}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: TROUBLESHOOTING & FAQ */}
      {activeTab === 'troubleshooting' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Common Issues & Fast Resolutions</span>
            </h2>

            <div className="space-y-4 pt-2">
              
              {/* Issue 1 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Error: "Port 3000 is already in use" (EADDRINUSE)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Another process (such as a previous dev server instance) is already using port 3000. Free up port 3000 using your terminal:
                </p>
                <div className="bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span># macOS / Linux: kill -9 $(lsof -ti :3000)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('kill -9 $(lsof -ti :3000)', 'kill_port')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedSnippet === 'kill_port' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span># Windows PowerShell: Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force', 'kill_win')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedSnippet === 'kill_win' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Issue 2 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Missing GEMINI_API_KEY Warning in Terminal</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If <code className="font-mono text-indigo-600">process.env.GEMINI_API_KEY</code> is not provided in your <code className="font-mono text-indigo-600">.env</code>, the platform gracefully switches to built-in pedagogical heuristic engines for diagnosis and tutoring. To enable live Gemini responses, create a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline">Google AI Studio</a> and place it inside your <code className="font-mono">.env</code> file.
                </p>
              </div>

              {/* Issue 3 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>How to Run Production Build Locally</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To test the production compilation (Vite static bundle + esbuild bundled server CJS):
                </p>
                <div className="bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span>{commands.build} && {commands.start}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${commands.build} && ${commands.start}`, 'prod_build')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedSnippet === 'prod_build' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Issue 4 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span>Node.js Version Check</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verify your Node.js version is at least 18 by running <code className="font-mono text-indigo-600">node -v</code>. If using <strong>nvm</strong> (Node Version Manager):
                </p>
                <div className="bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span>nvm install 20 && nvm use 20</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('nvm install 20 && nvm use 20', 'nvm_cmd')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedSnippet === 'nvm_cmd' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ARCHITECTURE OVERVIEW */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>ExamAI Local Architecture</span>
            </h2>
            <p className="text-xs text-slate-600">
              ExamAI runs as a unified fullstack application combining an Express backend with Vite's blazing fast developer middleware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 text-indigo-700">
                <Cpu className="w-4 h-4" />
                <span>server.ts (Backend)</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Express HTTP server binding port 3000. Provides <code className="font-mono text-indigo-600">/api/diagnose</code>, <code className="font-mono text-indigo-600">/api/tutor</code>, and <code className="font-mono text-indigo-600">/api/resource</code>, keeping AI studio secrets completely safe.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 text-violet-700">
                <Code2 className="w-4 h-4" />
                <span>/src (React 19 Frontend)</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Modular UI components, diagnostic test engine, interactive syllabus hierarchy trees, roadmap visualizers, and offline-first state persistence.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 text-emerald-700">
                <Sparkles className="w-4 h-4" />
                <span>Tailwind CSS & Motion</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Tailwind CSS v4 with Vite integration plugin, responsive utility design system, and fluid micro-interactions with Motion.
              </p>
            </div>
          </div>

          {/* Directory Tree */}
          <div className="bg-slate-950 text-slate-300 p-5 rounded-2xl font-mono text-xs space-y-1 overflow-x-auto">
            <div className="text-slate-500 mb-2"># Workspace Structure:</div>
            <div>exam-ai/</div>
            <div>├── server.ts                 <span className="text-slate-500"># Express backend + Vite middleware</span></div>
            <div>├── package.json              <span className="text-slate-500"># Scripts & dependencies (npm/yarn)</span></div>
            <div>├── .env                      <span className="text-slate-500"># Local environment variables</span></div>
            <div>├── vite.config.ts            <span className="text-slate-500"># Vite + Tailwind v4 configuration</span></div>
            <div>└── src/</div>
            <div>    ├── App.tsx               <span className="text-slate-500"># Root orchestrator & routing state</span></div>
            <div>    ├── pages/                <span className="text-slate-500"># Diagnostic, Roadmap, SetupGuide, etc.</span></div>
            <div>    ├── components/           <span className="text-slate-500"># Navbar, Sidebar, Modals, Cards</span></div>
            <div>    ├── data/                 <span className="text-slate-500"># Syllabus trees, PYQs, questions</span></div>
            <div>    └── types.ts              <span className="text-slate-500"># Shared TypeScript definitions</span></div>
          </div>
        </div>
      )}

    </div>
  );
};
