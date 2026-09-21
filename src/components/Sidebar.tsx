import React from 'react';
import { 
  LayoutDashboard, 
  HelpCircle, 
  AlertTriangle, 
  Network, 
  FolderGit2, 
  Target, 
  TrendingUp, 
  Bot, 
  BookOpen,
  Award,
  Compass
} from 'lucide-react';
import { ActiveTab } from '../types';

export type { ActiveTab };

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  hasRecentResult: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  hasRecentResult
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'roadmap' as ActiveTab,
      label: 'Roadmap & Scoring',
      icon: Compass,
      badge: 'Get Marks'
    },
    {
      id: 'diagnostic' as ActiveTab,
      label: 'Diagnostic Test',
      icon: HelpCircle,
      badge: '10 Qs'
    },
    ...(hasRecentResult ? [
      {
        id: 'result' as ActiveTab,
        label: 'Latest Test Result',
        icon: Target,
        badge: 'Analysis'
      }
    ] : []),
    {
      id: 'previous-papers' as ActiveTab,
      label: 'Previous Year Papers',
      icon: Award,
      badge: 'Official PYQs'
    },
    {
      id: 'weaknesses' as ActiveTab,
      label: 'Weakness Engine',
      icon: AlertTriangle,
      badge: '6 Types'
    },
    {
      id: 'knowledge-map' as ActiveTab,
      label: 'Knowledge Map',
      icon: Network,
      badge: 'Mastery'
    },
    {
      id: 'resources' as ActiveTab,
      label: 'Resource Hub',
      icon: BookOpen,
      badge: 'PDF + Videos'
    },
    {
      id: 'practice' as ActiveTab,
      label: 'Targeted Practice',
      icon: FolderGit2,
      badge: '5 Qs + PYQs'
    },
    {
      id: 'progress' as ActiveTab,
      label: 'Progress & Errors',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'ai-tutor' as ActiveTab,
      label: 'Gemini AI Tutor & Chat',
      icon: Bot,
      badge: 'Grounding'
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          The ExamAI Loop
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-${item.id}`}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loop Framework Box */}
      <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
        <div className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>ExamAI Continuous Cycle</span>
        </div>
        <div className="space-y-1 text-slate-500 font-medium text-[11px] leading-relaxed">
          <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
            <span>1.</span> Assessment → Diagnosis
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>2.</span> Error Type Identification
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>3.</span> Curated Resources + Notes
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>4.</span> 5 Targeted Qs & PYQs
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span>5.</span> Reassessment & Mastery
          </div>
        </div>
      </div>
    </aside>
  );
};
