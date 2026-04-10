import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProgress, GameType } from './types.ts';
import LandingPage from './LandingPage.tsx';
import GameView from './GameView.tsx';
import ParentDashboard from './ParentDashboard.tsx';
import RewardCelebration from './RewardCelebration.tsx';

const REWARDS = [
  { name: 'Blue Speed Bike', icon: '🚲' },
  { name: 'Red Race Car', icon: '🏎️' },
  { name: 'Golden Rocket', icon: '🚀' },
  { name: 'Magic Airplane', icon: '✈️' },
  { name: 'Super Boat', icon: '🛥️' },
  { name: 'Space Rover', icon: '🛸' },
];

const AppContent: React.FC<{
  progress: UserProgress;
  updateProgress: (type: GameType, isCorrect: boolean) => void;
}> = ({ progress, updateProgress }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();

  const milestone = Math.floor(progress.stars / 100);
  const lastCelebrated = Number(localStorage.getItem('math_play_last_celebrated') || '0');

  useEffect(() => {
    if (milestone > 0 && milestone > lastCelebrated) {
      setShowCelebration(true);
    }
  }, [milestone, lastCelebrated]);

  const onCollectReward = () => {
    localStorage.setItem('math_play_last_celebrated', milestone.toString());
    setShowCelebration(false);
    navigate('/', { replace: true });
  };

  const currentReward = REWARDS[(milestone - 1) % REWARDS.length] || { name: 'Mystery Prize', icon: '🎁' };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <main className="flex-1 w-full relative overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage progress={progress} />} />
          <Route 
            path="/game/:type" 
            element={<GameView progress={progress} onUpdateProgress={updateProgress} />} 
          />
          <Route 
            path="/parents" 
            element={<ParentDashboard progress={progress} />} 
          />
        </Routes>

        {showCelebration && (
          <RewardCelebration 
            onCollect={onCollectReward} 
            rewardName={currentReward.name}
            rewardIcon={currentReward.icon}
          />
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('math_play_progress');
    const defaultStats = {
      [GameType.ADDITION]: { correct: 0, total: 0 },
      [GameType.SUBTRACTION]: { correct: 0, total: 0 },
      [GameType.SEQUENCE]: { correct: 0, total: 0 },
      [GameType.MISSING]: { correct: 0, total: 0 }
    };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          achievements: parsed.achievements || [],
          gameStats: parsed.gameStats || defaultStats
        };
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }

    return {
      stars: 0,
      level: 1,
      badges: [],
      achievements: [],
      gameStats: defaultStats
    };
  });

  useEffect(() => {
    localStorage.setItem('math_play_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (type: GameType, isCorrect: boolean) => {
    setProgress(prev => {
      const newStats = { ...prev.gameStats };
      newStats[type].total += 1;
      if (isCorrect) {
        newStats[type].correct += 1;
      }
      
      const newStars = isCorrect ? prev.stars + 5 : prev.stars;
      const newLevel = Math.floor(newStars / 100) + 1;
      
      const newAchievements = [...prev.achievements];
      const milestone = Math.floor(newStars / 100);
      const prevMilestone = Math.floor(prev.stars / 100);

      if (milestone > prevMilestone && milestone > 0) {
        const reward = REWARDS[(milestone - 1) % REWARDS.length] || { name: 'Mystery Prize', icon: '🎁' };
        if (!newAchievements.includes(reward.name)) {
          newAchievements.push(reward.name);
          newAchievements.push(`Sticker Pack ${milestone}`);
        }
      }

      return {
        ...prev,
        stars: newStars,
        level: newLevel,
        achievements: newAchievements,
        gameStats: newStats
      };
    });
  };

  return (
    <Router>
      <AppContent progress={progress} updateProgress={updateProgress} />
    </Router>
  );
};

export default App;
