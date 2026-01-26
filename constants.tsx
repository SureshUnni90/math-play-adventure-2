
import React from 'react';
import { GameType, Badge } from './types.ts';

export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  background: '#f0f9ff',
  success: '#95E1D3',
  danger: '#FF8B94',
  train: '#6C5CE7',
  boundary: '#FF9FF3',
  balloon: '#FF9FF3'
};

export const BADGES: Badge[] = [
  { id: 'rookie', name: 'Math Rookie', description: 'Earn 10 stars', icon: '🌱', requiredStars: 10 },
  { id: 'star', name: 'Addition Star', description: 'Earn 50 stars', icon: '⭐', requiredStars: 50 },
  { id: 'wizard', name: 'Math Wizard', description: 'Earn 100 stars', icon: '🧙‍♂️', requiredStars: 100 },
  { id: 'king', name: 'Math King', description: 'Earn 250 stars', icon: '👑', requiredStars: 250 },
];

export const GAME_ICONS = {
  [GameType.ADDITION]: '🍎',
  [GameType.SUBTRACTION]: '🍌',
  [GameType.SEQUENCE]: '🚂',
  [GameType.MISSING]: '🎈'
};

export const ANIMALS = ['🦁', '🐯', '🦒', '🐘', '🦘', '🦓', '🦛', '🐫', '🐊'];
export const FRUITS = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒'];
