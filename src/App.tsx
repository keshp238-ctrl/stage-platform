import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Navbar } from './components/ui/Navbar';
import { EnterStageModal } from './components/ui/EnterStageModal';
import { HeroSection } from './components/landing/HeroSection';
import { StatementSection } from './components/landing/StatementSection';
import { JourneySection } from './components/landing/JourneySection';
import { FeatureExplorer } from './components/landing/FeatureExplorer';
import { TalkLabDemoSection } from './components/landing/TalkLabDemoSection';
import { CommunicationDnaSection } from './components/landing/CommunicationDnaSection';
import { TedStageSection } from './components/landing/TedStageSection';
import { DebateArenaSection } from './components/landing/DebateArenaSection';
import { CareerReadinessSection } from './components/landing/CareerReadinessSection';
import { ProcessSection } from './components/landing/ProcessSection';
import { StatsSection } from './components/landing/StatsSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { JoinCtaSection } from './components/landing/JoinCtaSection';
import { Footer } from './components/landing/Footer';

// App Views
import { AppLayout, AppTab } from './components/app/AppLayout';
import { DashboardView } from './components/app/DashboardView';
import { TalkLabView } from './components/app/TalkLabView';
import { MockInterviewView } from './components/app/MockInterviewView';
import { ResumeToInterviewView } from './components/app/ResumeToInterviewView';
import { DebateArenaView } from './components/app/DebateArenaView';
import { ConversationRoomsView } from './components/app/ConversationRoomsView';
import { StudentTedStageView } from './components/app/StudentTedStageView';
import { LeaderboardsView } from './components/app/LeaderboardsView';
import { RecruiterModeView } from './components/app/RecruiterModeView';
import { CareerCoachView } from './components/app/CareerCoachView';
import { StudentProfileView } from './components/app/StudentProfileView';
import { RealLifeSimulationsView } from './components/app/RealLifeSimulationsView';
import { CollegeCompetitionsView } from './components/app/CollegeCompetitionsView';

export function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEnterStageOpen, setIsEnterStageOpen] = useState(false);
  const [isLoggedInApp, setIsLoggedInApp] = useState(false);
  const [activeGoal, setActiveGoal] = useState('Interviews');
  const [currentAppTab, setCurrentAppTab] = useState<AppTab>('dashboard');

  const [userStats, setUserStats] = useState({
    name: 'Alex Chen',
    college: 'UC Berkeley',
    xp: 8450,
    streak: 14,
    readinessScore: 90,
    level: 'Orator Lv. 4',
  });

  // Dark/Light mode synchronization
  useEffect(() => {
    const savedTheme = localStorage.getItem('stage_theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme !== 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
      document.documentElement.classList.toggle('light', !prefersDark);
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    localStorage.setItem('stage_theme', nextTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', nextTheme);
    document.documentElement.classList.toggle('light', !nextTheme);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (isLoggedInApp) {
      setIsLoggedInApp(false);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterStageComplete = (goal: string, level: string, practiceTime: string) => {
    setActiveGoal(goal);
    setIsLoggedInApp(true);
    setCurrentAppTab('dashboard');
  };

  const handleOpenAppFeature = (featureId: string) => {
    setIsLoggedInApp(true);
    if (featureId === 'f2') setCurrentAppTab('talk-lab');
    else if (featureId === 'f3') setCurrentAppTab('mock-interview');
    else if (featureId === 'f4') setCurrentAppTab('real-life-sims');
    else if (featureId === 'f5') setCurrentAppTab('debate-arena');
    else if (featureId === 'f6') setCurrentAppTab('student-stage');
    else if (featureId === 'f7') setCurrentAppTab('conversation-rooms');
    else if (featureId === 'f8') setCurrentAppTab('leaderboards');
    else if (featureId === 'f11') setCurrentAppTab('resume-interview');
    else if (featureId === 'f12') setCurrentAppTab('recruiter-mode');
    else if (featureId === 'f14') setCurrentAppTab('career-coach');
    else if (featureId === 'f15') setCurrentAppTab('college-competitions');
    else if (featureId === 'f16') setCurrentAppTab('profile');
    else setCurrentAppTab('dashboard');
  };

  return (
    <div className={`min-h-screen selection:bg-[#E62B1E] selection:text-white ${isDarkMode ? 'dark bg-[#0A0B0E] text-white' : 'light bg-[#F9F9F8] text-neutral-900'}`}>
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Cinematic 00 -> 100 Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Signature 3-Step Onboarding Modal */}
      <EnterStageModal
        isOpen={isEnterStageOpen}
        onClose={() => setIsEnterStageOpen(false)}
        onComplete={handleEnterStageComplete}
        onGoalChange={setActiveGoal}
        isDarkMode={isDarkMode}
      />

      {/* Switch between Logged-in App and Cinematic Landing Page */}
      {isLoggedInApp ? (
        <AppLayout
          currentTab={currentAppTab}
          onSelectTab={setCurrentAppTab}
          onExitApp={() => setIsLoggedInApp(false)}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          userStats={userStats}
        >
          {currentAppTab === 'dashboard' && <DashboardView onNavigateTab={setCurrentAppTab} isDarkMode={isDarkMode} />}
          {currentAppTab === 'talk-lab' && <TalkLabView />}
          {currentAppTab === 'mock-interview' && <MockInterviewView />}
          {currentAppTab === 'real-life-sims' && <RealLifeSimulationsView />}
          {currentAppTab === 'resume-interview' && <ResumeToInterviewView />}
          {currentAppTab === 'debate-arena' && <DebateArenaView />}
          {currentAppTab === 'college-competitions' && <CollegeCompetitionsView />}
          {currentAppTab === 'conversation-rooms' && <ConversationRoomsView />}
          {currentAppTab === 'student-stage' && <StudentTedStageView />}
          {currentAppTab === 'leaderboards' && <LeaderboardsView />}
          {currentAppTab === 'recruiter-mode' && <RecruiterModeView />}
          {currentAppTab === 'career-coach' && <CareerCoachView />}
          {currentAppTab === 'profile' && <StudentProfileView />}
        </AppLayout>
      ) : (
        <>
          {/* Minimal Floating Navigation */}
          <Navbar
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onEnterStage={() => setIsEnterStageOpen(true)}
            onNavigateSection={handleNavigateSection}
            isLoggedInApp={isLoggedInApp}
            onToggleAppMode={() => setIsLoggedInApp(true)}
          />

          {/* Landing Page Narrative Sections */}
          <main>
            {/* Hero Section with 3D Voice Stage */}
            <HeroSection
              onEnterStage={() => setIsEnterStageOpen(true)}
              onWatchTalks={() => handleNavigateSection('ted-stage')}
              isDarkMode={isDarkMode}
              activeGoal={activeGoal}
            />

            {/* Statement Section: 01 / WHY STAGE */}
            <StatementSection isDarkMode={isDarkMode} />

            {/* The Journey: LEARN -> PRACTICE -> SPEAK -> CONNECT -> GET HIRED */}
            <JourneySection
              onSelectStage={(stage) => handleNavigateSection('features')}
              isDarkMode={isDarkMode}
            />

            {/* Feature Explorer: 15 Features */}
            <FeatureExplorer
              onOpenAppFeature={handleOpenAppFeature}
              isDarkMode={isDarkMode}
            />

            {/* Interactive 3D Product Display: AI Talk Lab */}
            <TalkLabDemoSection isDarkMode={isDarkMode} />

            {/* Communication DNA with 3D Helix */}
            <CommunicationDnaSection isDarkMode={isDarkMode} />

            {/* Student TED Stage */}
            <TedStageSection isDarkMode={isDarkMode} />

            {/* Debate Arena & 3D Podiums */}
            <DebateArenaSection isDarkMode={isDarkMode} />

            {/* Career Readiness: Resume -> Interview -> Readiness Score */}
            <CareerReadinessSection isDarkMode={isDarkMode} />

            {/* 4-Step Process Section */}
            <ProcessSection />

            {/* Stats / Proof */}
            <StatsSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Final CTA Join Section */}
            <JoinCtaSection
              onEnterStage={() => setIsEnterStageOpen(true)}
              isDarkMode={isDarkMode}
            />
          </main>

          {/* Minimal Premium Footer */}
          <Footer
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onNavigateSection={handleNavigateSection}
          />
        </>
      )}
    </div>
  );
}

export default App;
