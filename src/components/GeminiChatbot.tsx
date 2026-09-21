import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  GeminiModelId, 
  TutorPersona, 
  ExamType, 
  StudentProfile,
  GroundingSource
} from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Globe, 
  Zap, 
  BrainCircuit, 
  User, 
  RefreshCw, 
  ExternalLink,
  ChevronDown,
  Layers,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface GeminiChatbotProps {
  currentExam: ExamType;
  studentProfile: StudentProfile;
  initialMessage?: string;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  currentExam,
  studentProfile,
  initialMessage
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      content: `Hello **${studentProfile.name || 'Aspirant'}**! I am your **ExamAI Cognitive Tutor & Strategist** for **${currentExam}**.

You can ask me to:
• **Derive or solve** any complex numerical or conceptual problem step-by-step.
• **Diagnose your errors** (Conceptual vs Calculation vs Time traps).
• **Fetch live official updates** using **Google Search Grounding** (exam dates, cutoffs, syllabus changes).
• **Simulate question patterns** (MCQs, MSQs with multi-option checks, and NAT numericals).

What topic would you like to master today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash'
    }
  ]);

  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<GeminiModelId>('gemini-3.5-flash');
  const [selectedRole, setSelectedRole] = useState<TutorPersona>('mentor');
  const [useSearchGrounding, setUseSearchGrounding] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Suggested prompts based on current exam
  const suggestedPrompts = [
    `What are the most tested concepts in ${currentExam} for the last 5 years?`,
    `Explain the difference between TCP Tahoe and Reno Fast Recovery.`,
    `What was the official qualifying cutoff for ${currentExam} in 2024?`,
    `Give me a tough MSQ question with multi-option reasoning.`
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages.slice(-10), // maintain multi-turn context
          message: text,
          model: selectedModel,
          role: selectedRole,
          useSearch: useSearchGrounding,
          domain: currentExam
        })
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const modelMsg: ChatMessage = {
          id: `mod-${Date.now()}`,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: data.modelUsed || selectedModel,
          groundingSources: data.groundingSources
        };
        setMessages(prev => [...prev, modelMsg]);
      } else {
        throw new Error(data.error || 'Failed to retrieve response');
      }
    } catch (err: any) {
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `I analyzed your query on **${currentExam}**:
• Focus on foundational definitions before tackling edge cases.
• Practice numerical calculations with explicit units to prevent conversion slips.
• Re-read the question stems carefully to verify if it is an MCQ (single correct) or MSQ (all correct statements required).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'pedagogical-engine'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: `Conversation reset. Ready to dive into **${currentExam}** prep! How can I assist you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel
      }
    ]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col h-[750px] overflow-hidden">
      
      {/* Chat Header & Controls Toolbar */}
      <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/90 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Persona / Bot Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm sm:text-base">ExamAI Mentor</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                {currentExam}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Multi-Turn Pedagogical AI</span>
            </div>
          </div>
        </div>

        {/* Right: Model & Search Grounding Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Persona Selector */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as TutorPersona)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-slate-300 transition"
              title="Change Tutor Persona"
            >
              <option value="mentor">Role: Exam Mentor</option>
              <option value="problem_solver">Role: Master Problem Solver</option>
              <option value="diagnosis_coach">Role: Diagnosis Coach</option>
            </select>
          </div>

          {/* Model Switcher */}
          <div className="relative">
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value as GeminiModelId)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-slate-300 transition"
              title="Switch Gemini AI Model"
            >
              <option value="gemini-3.5-flash">gemini-3.5-flash (Balanced + Search)</option>
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra-Fast)</option>
              <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Deep Reasoning)</option>
            </select>
          </div>

          {/* Search Grounding Toggle */}
          <button
            id="toggle-search-grounding"
            type="button"
            onClick={() => setUseSearchGrounding(!useSearchGrounding)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              useSearchGrounding 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs' 
                : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
            title="Toggle Google Search Grounding for real-time exam data"
          >
            <Globe className={`w-3.5 h-3.5 ${useSearchGrounding ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Search Grounding</span>
            <span className={`text-[10px] px-1 rounded ${useSearchGrounding ? 'bg-emerald-200/60 font-bold' : 'bg-slate-100'}`}>
              {useSearchGrounding ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Clear Chat */}
          <button
            type="button"
            onClick={handleClearChat}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
            title="Reset Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
        
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isUser 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-indigo-600 text-white shadow-xs'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className="space-y-2 max-w-2xl">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>
                </div>

                {/* Grounding Sources (Search Citations) */}
                {msg.groundingSources && msg.groundingSources.length > 0 && (
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      Google Search Grounded References
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.groundingSources.map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-medium border border-emerald-200 transition"
                        >
                          <span className="line-clamp-1 max-w-[200px]">{source.title}</span>
                          <ExternalLink className="w-3 h-3 shrink-0 text-emerald-700" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp & Model Tag */}
                <div className={`flex items-center gap-2 text-[10px] text-slate-400 font-medium ${isUser ? 'justify-end' : ''}`}>
                  <span>{msg.timestamp}</span>
                  {msg.modelUsed && !isUser && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">
                      {msg.modelUsed}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-md">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-xs text-xs text-slate-600 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>
                {useSearchGrounding ? 'Consulting Google Search & verifying concepts...' : 'Formulating cognitive explanation...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pill Bar */}
      <div className="px-6 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-500 shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-500" /> Quick Prompts:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-900 text-xs font-medium whitespace-nowrap transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box Footer */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="gemini-chatbot-input"
            type="text"
            placeholder={`Ask anything about ${currentExam} concepts, numerical derivations, or official PYQ papers...`}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
          <button
            id="gemini-chatbot-send"
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
