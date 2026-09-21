import React from 'react';
import { AccuracyTrend, RepeatedErrorRecord, ConceptMastery } from '../types';
import { TrendingUp, AlertTriangle, CheckCircle, BarChart3, Clock } from 'lucide-react';

interface MasteryChartProps {
  accuracyTrends: AccuracyTrend[];
  repeatedErrors: RepeatedErrorRecord[];
  subjectMasterySummary: Array<{
    name: string;
    percentage: number;
    status: 'Strong' | 'Good' | 'Weak' | 'Critical';
  }>;
}

export const MasteryChart: React.FC<MasteryChartProps> = ({
  accuracyTrends,
  repeatedErrors,
  subjectMasterySummary
}) => {
  return (
    <div className="space-y-6">
      
      {/* 2-Column Grid: Accuracy Trend & Subject Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Accuracy Growth Trend */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Accuracy Trajectory Over Time</h3>
              <p className="text-xs text-slate-500 mt-0.5">Measuring weekly accuracy gains after targeted remediation</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24% Improvement</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-3 pt-2">
            {accuracyTrends.map(item => (
              <div key={item.week} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">{item.week}</span>
                  <span className="font-mono text-indigo-700 font-bold">{item.accuracy}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                    style={{ width: `${item.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 text-center font-medium">
            Goal: Reach 80%+ consistency before full-length all-India mock examinations.
          </div>
        </div>

        {/* Concept Mastery Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Subject Mastery Breakdown</h3>
            <p className="text-xs text-slate-500 mt-0.5">Aggregated performance across current syllabus</p>
          </div>

          <div className="space-y-4 pt-1">
            {subjectMasterySummary.map(sub => {
              const color = 
                sub.status === 'Strong' ? 'bg-emerald-500' :
                sub.status === 'Good' ? 'bg-sky-500' :
                sub.status === 'Weak' ? 'bg-amber-500' : 'bg-rose-500';

              const badgeColor =
                sub.status === 'Strong' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                sub.status === 'Good' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                sub.status === 'Weak' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200';

              return (
                <div key={sub.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{sub.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${badgeColor}`}>
                        {sub.status}
                      </span>
                      <span className="font-mono font-bold text-slate-700">{sub.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${sub.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Repeated Errors History Card (Stage 14 requirement) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Repeated Error Tracking Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuously tracks persistent traps and recurring misconceptions across test sessions
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold">
            {repeatedErrors.length} Active Hotspots
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5 pr-4">Concept Name</th>
                <th className="py-2.5 px-4">Subject & Topic</th>
                <th className="py-2.5 px-4">Error Frequency</th>
                <th className="py-2.5 px-4">Primary Error Type</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 pl-4 text-right">Last Encountered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {repeatedErrors.map((err, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 pr-4 font-bold text-slate-900">{err.conceptName}</td>
                  <td className="py-3 px-4 text-slate-500">{err.subjectName} › {err.topicName}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                      {err.errorCount} Errors
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      {err.primaryErrorType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      err.status === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' :
                      err.status === 'Improving' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {err.status}
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-right text-slate-400">{err.lastEncountered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
