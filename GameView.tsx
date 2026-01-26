import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, RefreshCw } from 'lucide-react';
import { GameType, UserProgress, GameQuestion } from '../types.ts';

interface GameViewProps {
  progress: UserProgress;
  onUpdateProgress: (type: GameType, isCorrect: boolean) => void;
}

const GameView: React.FC<GameViewProps> = ({ progress, onUpdateProgress }) => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const gameType = type?.toUpperCase() as GameType;
  
  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const generateQuestion = useCallback(() => {
    const range = Math.min(10 + progress.level * 2, 20);
    let q: GameQuestion;

    if (gameType === GameType.ADDITION) {
      const a = Math.floor(Math.random() * (range - 3)) + 1;
      const b = Math.floor(Math.random() * (range - a)) + 1;
      const ans = a + b;
      q = { id: Date.now().toString(), type: GameType.ADDITION, prompt: `${a} + ${b}`, operands: [a, b], answer: ans, options: [ans, ans+1, ans-1, ans+2].sort(() => Math.random() - 0.5) };
    } else if (gameType === GameType.SUBTRACTION) {
      const a = Math.floor(Math.random() * (range - 5)) + 5;
      const b = Math.floor(Math.random() * (a - 1)) + 1;
      const ans = a - b;
      q = { id: Date.now().toString(), type: GameType.SUBTRACTION, prompt: `${a} - ${b}`, operands: [a, b], answer: ans, options: [ans, ans+1, ans-1, ans+2].sort(() => Math.random() - 0.5) };
    } else {
      const start = Math.floor(Math.random() * (range - 5)) + 1;
      const ans = start + 1;
      q = { id: Date.now().toString(), type: gameType, prompt: `${start}, ?, ${start+2}`, answer: ans, options: [ans, ans+1, ans-1, ans+2].sort(() => Math.random() - 0.5) };
    }

    setQuestion(q);
    setFeedback('none');
  }, [gameType, progress.level]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (val: number) => {
    if (!question || feedback !== 'none') return;
    if (val === question.answer) {
      setFeedback('correct');
      onUpdateProgress(gameType, true);
      setTimeout(() => generateQuestion(), 1000);
    } else {
      setFeedback('wrong');
      onUpdateProgress(gameType, false);
      setTimeout(() => setFeedback('none'), 600);
    }
  };

  if (!question) return null;

  return (
    <div className="flex-1 flex flex-col p-4 bg-white relative">
      <header className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/')} className="p-2 bg-slate-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-yellow-700">{progress.stars}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Visual Aid */}
        <div className="bg-sky-50 w-full rounded-3xl p-4 min-h-[100px] flex items-center justify-center border-2 border-dashed border-sky-200">
           {gameType === GameType.ADDITION && (
             <div className="flex gap-2 text-2xl">
               {Array.from({length: question.operands![0]}).map((_, i) => <span key={i}>🍎</span>)}
               <span className="text-slate-300 font-bold">+</span>
               {Array.from({length: question.operands![1]}).map((_, i) => <span key={i}>🍎</span>)}
             </div>
           )}
           {gameType === GameType.SUBTRACTION && (
             <div className="flex gap-2 text-2xl">
               {Array.from({length: question.operands![0]}).map((_, i) => <span key={i} className={i >= (question.operands![0] - question.operands![1]) ? 'opacity-20' : ''}>🍌</span>)}
             </div>
           )}
           {(gameType === GameType.SEQUENCE || gameType === GameType.MISSING) && (
             <span className="text-4xl">🚂 🚃 🚃</span>
           )}
        </div>

        <h2 className="text-5xl brand-font text-slate-700">{question.prompt}</h2>

        {feedback !== 'none' && (
          <div className="text-6xl animate-bounce">
            {feedback === 'correct' ? '🌟' : '❌'}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {question.options.filter(o => o >= 0).map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="bg-white border-4 border-slate-100 py-6 rounded-3xl text-4xl brand-font text-slate-700 shadow-md active:translate-y-1 active:shadow-none"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <footer className="mt-6 flex justify-center pb-2">
        <button onClick={generateQuestion} className="text-slate-400 font-bold flex items-center gap-2 text-sm uppercase">
          <RefreshCw className="w-4 h-4" /> Skip
        </button>
      </footer>
    </div>
  );
};

export default GameView;