export type JourneyStage = 'LEARN' | 'PRACTICE' | 'SPEAK' | 'CONNECT' | 'GET HIRED';

export interface Talk {
  id: string;
  title: string;
  speaker: string;
  college: string;
  avatar: string;
  category: 'AI & Tech' | 'Startups' | 'Career' | 'Philosophy' | 'College Life';
  duration: string;
  views: string;
  likes: number;
  featured?: boolean;
  summary: string;
  keyTakeaway: string;
  publishedDate: string;
}

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  stage: JourneyStage;
  shortDesc: string;
  details: string;
  statsLabel: string;
  statsValue: string;
  tags: string[];
}

export interface DebateTopic {
  id: string;
  title: string;
  category: string;
  collegeA: { name: string; avatar: string; stance: string; votes: number };
  collegeB: { name: string; avatar: string; stance: string; votes: number };
  status: 'LIVE NOW' | 'UPCOMING' | 'CONCLUDED';
  activeViewers: number;
  timeRemaining?: string;
}

export interface CommunicationDnaMetric {
  key: string;
  label: string;
  score: number; // 0 - 100
  benchmark: number;
  description: string;
  improvementTip: string;
}

export interface DailyMission {
  id: string;
  title: string;
  category: string;
  durationSec: number;
  difficulty: 'Quick' | 'Medium' | 'Challenging';
  xpReward: number;
  prompt: string;
  rubric: string[];
  completed: boolean;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'HR' | 'Technical' | 'Behavioral';
  context: string;
  sampleAnswerTips: string[];
}

export interface ConversationRoom {
  id: string;
  title: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  activeSpeakers: number;
  maxSpeakers: number;
  topic: string;
  hostName: string;
  college: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  xp: number;
  talksCount: number;
  debatesWon: number;
  streak: number;
  avatar: string;
  badge: string;
}
