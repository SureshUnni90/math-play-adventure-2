import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameType, UserProgress } from '../types.ts';
import { GAME_ICONS } from '../constants.tsx';
import { Star, Trophy, Users, Package, X } from 'lucide-react';

interface LandingPageProps {
  progress: UserProgress;
}

const LandingPage: React.FC<LandingPageProps> = ({ progress }) => {
  const navigate = useNavigate();
  const [showWallet, setShowWallet] = useState(false);

  const gameOptions = [
    { type: GameType.ADDITION, label: 'Plus Fun!', color: 'bg-red-400' },
    { type: GameType.SUBTRACTION, label: 'Minus!', color: 'bg-blue-400' },
    { type: GameType.SEQUENCE, label: 'Train Ride!', color: 'bg-purple-400' },
    { type: GameType.MISSING, label: 'Missing!', color: 'bg-orange-400' },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 relative overflow-y-auto bg-slate-50">
      {/* Mini Top Bar */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-sm">
            👶
          </div>
          <div>
            <p className="font-bold brand-font text-sm text-slate-700 leading-none">Level {progress.level}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowWallet(true)}
            className="p-1.5 bg-pink-100 rounded-full border border-pink-200 relative"
          >
            <Package className="w-4 h-4 text-pink-500" />
            {progress.achievements.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                {progress.achievements.length}
              </span>
            )}
          </button>
          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-200">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm text-yellow-700">{progress.stars}</span>
          </div>
        </div>
      </header>

      {/* Main Hero */}
      <div className="text-center mb-8">
        <h1 className="text-2xl brand-font text-sky-500 leading-tight">
          Math Play Adventure
        </h1>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Choose a World</p>
      </div>

      {/* Game Grid - Better spacing and card layout */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {gameOptions.map((game) => (
          <button
            key={game.type}
            onClick={() => navigate(`/game/${game.type.toLowerCase()}`)}
            className={`${game.color} rounded-[24px] p-4 shadow-[0_4px_0_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 border-4 border-white/30 aspect-[4/5]`}
          >
            <span className="text-4xl drop-shadow-md">
              {GAME_ICONS[game.type]}
            </span>
            <span className="font-bold text-white text-xs brand-font text-center leading-tight">
              {game.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6 flex flex-col items-center gap-4">
        <button 
          onClick={() => navigate('/parents')}
          className="w-full bg-white py-3 rounded-xl flex items-center justify-center gap-2 text-slate-500 font-bold text-xs border border-slate-200 shadow-sm"
        >
          <Users className="w-4 h-4" />
          Parents Dashboard
        </button>
      </div>

      {/* Wallet Modal */}
      {showWallet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xs rounded-[32px] overflow-hidden flex flex-col">
            <div className="bg-pink-400 p-4 text-center relative">
              <button onClick={() => setShowWallet(false)} className="absolute top-4 right-4 text-white"><X className="w-5 h-5" /></button>
              <Trophy className="w-8 h-8 text-white mx-auto mb-1" />
              <h2 className="text-lg brand-font text-white">My Prizes</h2>
            </div>
            <div className="p-4 max-h-[40vh] overflow-y-auto">
              {progress.achievements.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4 italic font-medium">Earn 100 stars to win prizes!</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {progress.achievements.map((ach, i) => (
                    <div key={i} className="bg-sky-50 p-2 rounded-xl text-center border border-sky-100">
                      <span className="text-2xl">🎁</span>
                      <p className="text-[8px] font-bold text-slate-600 uppercase mt-1">{ach}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;