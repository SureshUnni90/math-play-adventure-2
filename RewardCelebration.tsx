
import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy } from 'lucide-react';

interface RewardCelebrationProps {
  onCollect: () => void;
  rewardName: string;
  rewardIcon: string;
}

const RewardCelebration: React.FC<RewardCelebrationProps> = ({ onCollect, rewardName, rewardIcon }) => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, char: string }[]>([]);

  useEffect(() => {
    const emojis = ['🌟', '✨', '🎈', '🎉', '🍎', '🍌', '🚂', '⭐'];
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      char: emojis[Math.floor(Math.random() * emojis.length)]
    }));
    setParticles(newParticles);
  }, []);

  const handleCollect = () => {
    setIsCollecting(true);
    // Visual satisfaction: delay for the zoom-out/shrink animation
    setTimeout(() => {
      onCollect();
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md overflow-hidden p-6">
      {/* Background Particles */}
      {!isCollecting && particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-2xl animate-bounce pointer-events-none opacity-60"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          {p.char}
        </div>
      ))}

      <div className={`relative bg-white w-full max-w-sm rounded-[50px] p-8 text-center transition-all duration-700 ease-in-out transform shadow-2xl ${isCollecting ? 'scale-0 translate-y-[-500px] translate-x-[250px] opacity-0 rotate-[45deg]' : 'scale-100 opacity-100 rotate-0'}`}>
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center border-8 border-white shadow-xl animate-pulse">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </div>

        <div className="mt-16 space-y-4">
          <h2 className="text-4xl brand-font text-sky-600">NEW REWARD!</h2>
          <p className="text-xl font-bold text-slate-500">You reached a milestone!</p>
          
          <div className="py-8 space-y-2">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">You Unlocked:</p>
            <div className="text-8xl animate-bounce py-4">{rewardIcon}</div>
            <h3 className="text-2xl brand-font text-pink-500 uppercase">{rewardName}</h3>
            <p className="text-slate-400 font-semibold italic">Saved to your Achievement Wallet!</p>
          </div>

          <button
            onClick={handleCollect}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-3xl text-2xl shadow-[0_10px_0_#166534] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            COLLECT!
          </button>
        </div>
      </div>

      {/* Burst effect when collecting */}
      {isCollecting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-8xl animate-ping text-yellow-400">🌟</div>
        </div>
      )}
    </div>
  );
};

export default RewardCelebration;
