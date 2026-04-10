
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, TrendingUp, Package } from 'lucide-react';
import { UserProgress, GameType } from './types.ts';
import { BADGES, COLORS } from './constants.tsx';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ParentDashboardProps {
  progress: UserProgress;
}

const REWARD_ICONS: Record<string, string> = {
  'Blue Speed Bike': '🚲',
  'Red Race Car': '🏎️',
  'Golden Rocket': '🚀',
  'Magic Airplane': '✈️',
  'Super Boat': '🛥️',
  'Space Rover': '🛸'
};

const ParentDashboard: React.FC<ParentDashboardProps> = ({ progress }) => {
  const navigate = useNavigate();

  const chartData = Object.entries(progress.gameStats).map(([key, stats]) => {
    const s = stats as { correct: number; total: number };
    return {
      name: key.toLowerCase(),
      accuracy: s.total === 0 ? 0 : Math.round((s.correct / s.total) * 100),
      correct: s.correct,
      total: s.total
    };
  });

  const COLORS_LIST = [COLORS.primary, COLORS.secondary, COLORS.train, COLORS.balloon];

  return (
    <div className="h-full flex flex-col p-6 bg-slate-50 overflow-y-auto">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/')} className="p-2 bg-white rounded-xl shadow-sm border-2 border-slate-200">
          <ChevronLeft className="w-6 h-6 text-slate-500" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Parents Dashboard</h1>
        <div className="w-10"></div>
      </header>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-4 border-yellow-100">
            👶
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800">Player 1</h2>
            <p className="text-slate-500 font-semibold">Level {progress.level} Adventure</p>
            <div className="mt-2 w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-yellow-400 h-full transition-all duration-1000" 
                style={{ width: `${(progress.stars % 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-tighter">
              {100 - (progress.stars % 100)} stars to Level {progress.level + 1}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-6 rounded-3xl shadow-lg border border-pink-300 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6" />
            <h3 className="text-lg font-bold brand-font">Reward Wallet</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {progress.achievements.length === 0 ? (
              <p className="text-sm opacity-80 font-medium">No rewards yet. Reach 100 stars!</p>
            ) : (
              progress.achievements.map((ach) => (
                <div key={ach} className="bg-white/20 p-3 rounded-2xl min-w-[80px] flex flex-col items-center gap-1 border border-white/30">
                  <span className="text-3xl">
                    {ach.includes('Sticker') ? '✨' : (REWARD_ICONS[ach] || '🎁')}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap">
                    {ach}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-yellow-500">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Total Stars</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{progress.stars}</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-sky-500">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Avg. Accuracy</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">
              {chartData.length > 0 ? (chartData.reduce((acc, curr) => acc + curr.accuracy, 0) / chartData.length).toFixed(0) : 0}%
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
             Accuracy by Subject (%)
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="accuracy" radius={[8, 8, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_LIST[index % COLORS_LIST.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            Badges Collected
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {BADGES.map((badge) => {
              const earned = progress.stars >= badge.requiredStars;
              return (
                <div key={badge.id} className={`p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-opacity ${earned ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                  <span className="text-4xl">{badge.icon}</span>
                  <span className="font-bold text-slate-800 leading-tight">{badge.name}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{earned ? 'Earned' : `Need ${badge.requiredStars} stars`}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button 
          onClick={() => {
             if(confirm('Are you sure you want to reset all progress?')) {
                localStorage.removeItem('math_play_progress');
                window.location.reload();
             }
          }}
          className="w-full bg-red-50 text-red-400 font-bold py-4 rounded-2xl border-2 border-red-100 hover:bg-red-100 transition-colors"
        >
          Reset All Data
        </button>
      </div>

      <div className="mt-8 text-center text-slate-400 text-xs font-semibold pb-8">
        MATH PLAY ADVENTURE • VERSION 1.1.0
      </div>
    </div>
  );
};

export default ParentDashboard;
