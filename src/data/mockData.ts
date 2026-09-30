import { Talk, FeatureItem, DebateTopic, CommunicationDnaMetric, DailyMission, ConversationRoom, LeaderboardEntry } from '../types';

export const JOURNEY_ROWS = [
  {
    stage: 'LEARN',
    tag: '01',
    headline: 'TED-Style Talks by Top Students',
    desc: 'Curated talks on AI, coding, startups, careers, college and life skills delivered by ambitious peers.',
    stat: '1,420+ Talks',
    accent: '#E62B1E',
  },
  {
    stage: 'PRACTICE',
    tag: '02',
    headline: 'AI Real-Time Voice Lab',
    desc: 'Sub-second AI feedback on clarity, pace (WPM), filler words and story structure with zero judgment.',
    stat: '38,000+ Sessions',
    accent: '#FF4438',
  },
  {
    stage: 'SPEAK',
    tag: '03',
    headline: 'The Student TED Stage',
    desc: 'Publish your own 3–10 minute talk. Gain visibility with peer reviews, recruiter views, and verified proof.',
    stat: '94% Confidence Boost',
    accent: '#FF6B5B',
  },
  {
    stage: 'CONNECT',
    tag: '04',
    headline: 'Debate Arena & Live Rooms',
    desc: 'College-vs-college debate battles, 24/7 impromptu speaking rooms, and cross-university networking.',
    stat: '280+ Colleges',
    accent: '#E62B1E',
  },
  {
    stage: 'GET HIRED',
    tag: '05',
    headline: 'Recruiter Proof & Readiness Score',
    desc: 'Turn your communication DNA into proof. Direct recruiter visibility, tailored mock interviews, and hiring referrals.',
    stat: '3.4x Interview Pass Rate',
    accent: '#FF3B30',
  },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'f1',
    number: '01',
    title: 'TED/Tech Talks',
    stage: 'LEARN',
    shortDesc: 'Curated talks on AI, coding, startups, career, college and life skills.',
    details: 'Immerse yourself in student-delivered talks that mirror TED and conference standards. Learn technical storytelling from peers who have done it.',
    statsLabel: 'Talks Archive',
    statsValue: '1,400+',
    tags: ['Inspiration', 'Storytelling', 'AI', 'Startups']
  },
  {
    id: 'f2',
    number: '02',
    title: 'AI Talk Lab',
    stage: 'PRACTICE',
    shortDesc: 'Practice speaking and get instant feedback on clarity, pace, filler words and structure.',
    details: 'Real-time acoustic & semantic analysis evaluates your rhythm, pauses, vocabulary variety, and filler vocalizations with millisecond precision.',
    statsLabel: 'Real-time Latency',
    statsValue: '< 180ms',
    tags: ['Acoustic AI', 'Pace', 'Filler Detection']
  },
  {
    id: 'f3',
    number: '03',
    title: 'Mock Interview Simulator',
    stage: 'PRACTICE',
    shortDesc: 'HR and technical interviews with personalized feedback.',
    details: 'Simulate high-pressure FAANG and startup interviews. The AI adapts questions dynamically based on your previous answers and resume projects.',
    statsLabel: 'Question Bank',
    statsValue: '4,500+ Scenarios',
    tags: ['Technical', 'Behavioral', 'System Design']
  },
  {
    id: 'f4',
    number: '04',
    title: 'Real-Life Simulations',
    stage: 'PRACTICE',
    shortDesc: 'Interviews, presentations, networking, project explanations and group discussions.',
    details: 'Train for the messy reality: unpredictable interviewers, boardroom project defenses, quick elevator pitches, and tricky Q&A confrontations.',
    statsLabel: 'Sim Types',
    statsValue: '12 Scenarios',
    tags: ['Networking', 'Group Discussion', 'Project Defense']
  },
  {
    id: 'f5',
    number: '05',
    title: 'Debate Arena',
    stage: 'CONNECT',
    shortDesc: 'Debate topics live and compete in college showdowns.',
    details: 'Step into the virtual amphitheater. Timed rebuttal rounds, live audience sentiment voting, and AI argument-strength critique.',
    statsLabel: 'Live Debates Today',
    statsValue: '48 Active',
    tags: ['Parliamentary', 'Oxford', 'Cross-College']
  },
  {
    id: 'f6',
    number: '06',
    title: 'Student TED Stage',
    stage: 'SPEAK',
    shortDesc: 'Publish your own 3–10 minute talks and build a verified portfolio.',
    details: 'Record or upload your signature keynote. Peer reviewed, professionally transcribed, and indexed for tech recruiters scouting top communicators.',
    statsLabel: 'Published Keynotes',
    statsValue: '920+',
    tags: ['Public Speaking', 'Keynote', 'Verified']
  },
  {
    id: 'f7',
    number: '07',
    title: 'Conversation Rooms',
    stage: 'CONNECT',
    shortDesc: 'Find students worldwide to practice English and conversation skills.',
    details: 'Low-friction audio huddles paired by topic and fluency level. Eliminate social hesitation and practice spontaneous speaking in safe micro-groups.',
    statsLabel: 'Daily Active Rooms',
    statsValue: '150+',
    tags: ['Peer Practice', 'Fluency', 'Global']
  },
  {
    id: 'f8',
    number: '08',
    title: 'Leaderboards & XP',
    stage: 'CONNECT',
    shortDesc: 'Best speaker, best debater, most improved, and university rankings.',
    details: 'Gain XP for every speaking minute and debate victory. Represent your university on the global leaderboard and unlock verified badges.',
    statsLabel: 'Universities Tracked',
    statsValue: '320+',
    tags: ['Competitions', 'XP', 'Rankings']
  },
  {
    id: 'f9',
    number: '09',
    title: 'Communication DNA',
    stage: 'PRACTICE',
    shortDesc: 'Your personal dashboard of speaking, interview, and presentation scores.',
    details: 'A multi-dimensional biometric and rhetorical fingerprint tracking your vocal clarity, cadence, hesitation patterns, and structural cohesion over time.',
    statsLabel: 'Dimensions Measured',
    statsValue: '6 Core Metrics',
    tags: ['Radar Analytics', 'DNA Helix', 'Progress']
  },
  {
    id: 'f10',
    number: '10',
    title: 'Daily Speaking Missions',
    stage: 'PRACTICE',
    shortDesc: '60-second challenges and practical daily speaking habits.',
    details: 'A fresh spontaneous prompt every morning. Record for 60 seconds, receive instant AI scoring, and maintain your speaking streak.',
    statsLabel: 'Average Daily Streak',
    statsValue: '18 Days',
    tags: ['Micro-habits', 'Spontaneous', 'Daily Prompt']
  },
  {
    id: 'f11',
    number: '11',
    title: 'Resume → Interview',
    stage: 'GET HIRED',
    shortDesc: 'Upload your resume and get interview questions based on your own projects.',
    details: 'Our parser deconstructs your GitHub repositories and resume bullet points to grill you exactly where recruiters will dig deepest.',
    statsLabel: 'Parsing Accuracy',
    statsValue: '99.4%',
    tags: ['Project Deep-Dive', 'Resume Parser', 'STAR Method']
  },
  {
    id: 'f12',
    number: '12',
    title: 'Recruiter Mode',
    stage: 'GET HIRED',
    shortDesc: 'Learn how recruiters and engineering leaders evaluate candidate answers.',
    details: 'Switch from candidate view to hiring manager view. Review real anonymized transcripts, see red flags flagged, and learn the rubrics.',
    statsLabel: 'Hiring Rubrics',
    statsValue: '35+ Templates',
    tags: ['Insider Knowledge', 'Rubrics', 'Red Flags']
  },
  {
    id: 'f13',
    number: '13',
    title: 'Internship Readiness Score',
    stage: 'GET HIRED',
    shortDesc: 'Overall score from communication, interview, projects, resume and networking.',
    details: 'A unified 0–100 benchmark recognized by hiring partners. Evaluates whether you can articulate technical tradeoffs under pressure.',
    statsLabel: 'Placement Correlation',
    statsValue: '88% Predictability',
    tags: ['0–100 Gauge', 'Recruiter Endorsed', 'Readiness']
  },
  {
    id: 'f14',
    number: '14',
    title: 'AI Career Coach',
    stage: 'GET HIRED',
    shortDesc: 'Personalized guidance, customized rehearsal plans and speech diagnosis.',
    details: 'An intelligent counselor that remembers your verbal weaknesses, suggests specific talks to study, and builds tailored drills for upcoming interviews.',
    statsLabel: 'Feedback Depth',
    statsValue: 'Full Contextual',
    tags: ['Coach', 'Actionable Plans', 'Mentorship']
  },
  {
    id: 'f15',
    number: '15',
    title: 'College Competitions',
    stage: 'CONNECT',
    shortDesc: 'College-vs-college debates, speaking contests and tech talks.',
    details: 'Intercollegiate tournaments featuring prize pools, verified certificates, and direct judging by tech executives and venture capitalists.',
    statsLabel: 'Season Prize Pool',
    statsValue: '$25,000 in Grants',
    tags: ['Tournaments', 'Brackets', 'University Pride']
  },
  {
    id: 'f16',
    number: '16',
    title: 'Professional Student Profile',
    stage: 'SPEAK',
    shortDesc: 'Public shareable showcase with verified talks, readiness score and achievements.',
    details: 'Replace static LinkedIn links with an interactive living stage profile that lets recruiters listen to your best 90-second technical explanations.',
    statsLabel: 'Recruiter Click-thru',
    statsValue: '4.8x Higher',
    tags: ['Public Showcase', 'Living Resume', 'Shareable']
  }
];

export const FEATURED_TALKS: Talk[] = [
  {
    id: 't1',
    title: 'Why Most CS Students Fail Their First Engineering Presentation',
    speaker: 'Aria Chen',
    college: 'UC Berkeley',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Career',
    duration: '06:42',
    views: '24.8K',
    likes: 1840,
    featured: true,
    summary: 'The difference between writing code and shipping systems is whether you can convince a team to adopt your design doc. Here is how to speak with engineering authority.',
    keyTakeaway: 'Structure technical proposals around tradeoffs, not just benefits.',
    publishedDate: '2 days ago'
  },
  {
    id: 't2',
    title: 'Building in Public: How I Pitch Micro-Startups from My Dorm Room',
    speaker: 'Marcus Thorne',
    college: 'Stanford University',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Startups',
    duration: '08:15',
    views: '19.2K',
    likes: 1420,
    featured: true,
    summary: 'Investors do not back code; they back clarity of vision. How I practiced my elevator pitch 100 times before raising our first pre-seed check.',
    keyTakeaway: 'The first 15 seconds must state the problem in plain non-jargon English.',
    publishedDate: '5 days ago'
  },
  {
    id: 't3',
    title: 'Overcoming Imposter Syndrome During Technical Screenings',
    speaker: 'Devika Patel',
    college: 'IIT Bombay',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    category: 'AI & Tech',
    duration: '07:30',
    views: '31.4K',
    likes: 2950,
    featured: true,
    summary: 'When an interviewer asks you a question you have never seen, silence kills your score. Here is the exact vocal cadence I use to turn panic into collaborative thinking.',
    keyTakeaway: 'Think out loud with hypothesis statements rather than guessing answers.',
    publishedDate: '1 week ago'
  },
  {
    id: 't4',
    title: 'The Lost Art of Disagreeing Agreeably in Agile Standups',
    speaker: 'Liam O’Connor',
    college: 'University of Waterloo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'Career',
    duration: '05:54',
    views: '14.1K',
    likes: 980,
    featured: false,
    summary: 'How to challenge a senior architect’s tech stack decision respectfully without sounding defensive or timid.',
    keyTakeaway: 'Use "Help me understand the constraint" instead of "That won’t work".',
    publishedDate: '2 weeks ago'
  },
  {
    id: 't5',
    title: 'AI Won’t Steal Your Job, But A Better Communicator Will',
    speaker: 'Elena Rostova',
    college: 'Cambridge University',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    category: 'Philosophy',
    duration: '09:10',
    views: '42.9K',
    likes: 3870,
    featured: true,
    summary: 'As LLMs generate boilerplate code instantly, the highest-leverage human skill is rhetorical clarity: framing problems and aligning human stakeholders.',
    keyTakeaway: 'Communication is the API between human ingenuity and execution.',
    publishedDate: '3 weeks ago'
  }
];

export const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: 'd1',
    title: 'Should universities replace introductory coding exams with oral defense & code explanation?',
    category: 'CS Education',
    collegeA: { name: 'MIT', avatar: '🏛️', stance: 'Affirmative: Code without explanation is obsolete in the AI era', votes: 642 },
    collegeB: { name: 'Stanford', avatar: '🌲', stance: 'Negative: Written execution and algorithmic rigor remain fundamental', votes: 588 },
    status: 'LIVE NOW',
    activeViewers: 1240,
    timeRemaining: '04:18 left in Round 2'
  },
  {
    id: 'd2',
    title: 'Is Remote Internships harmful to early-career engineering mentorship?',
    category: 'Workplace & Future',
    collegeA: { name: 'UC Berkeley', avatar: '🐻', stance: 'Affirmative: Serendipitous peer learning requires physical proximity', votes: 412 },
    collegeB: { name: 'Waterloo', avatar: '🦫', stance: 'Negative: Async documentation produces cleaner, more resilient engineers', votes: 495 },
    status: 'LIVE NOW',
    activeViewers: 890,
    timeRemaining: '08:45 left in Rebuttal'
  },
  {
    id: 'd3',
    title: 'Should junior developers be forbidden from using LLM auto-complete for their first 6 months?',
    category: 'AI Ethics',
    collegeA: { name: 'IIT Bombay', avatar: '🇮🇳', stance: 'Affirmative: Mental compilation models must form independently', votes: 830 },
    collegeB: { name: 'Carnegie Mellon', avatar: ' Tartans', stance: 'Negative: Speed and modern scaffolding prepare students for 2026 reality', votes: 790 },
    status: 'UPCOMING',
    activeViewers: 320,
    timeRemaining: 'Starts in 42 mins'
  }
];

export const COMMUNICATION_DNA_METRICS: CommunicationDnaMetric[] = [
  {
    key: 'clarity',
    label: 'Acoustic & Semantic Clarity',
    score: 88,
    benchmark: 72,
    description: 'Enunciation precision, crisp consonant endings, and avoidance of mumbled phrasing.',
    improvementTip: 'Extend vowel lengths slightly during key thesis statements to increase gravitas.'
  },
  {
    key: 'pace',
    label: 'Speaking Cadence (Pace & WPM)',
    score: 84,
    benchmark: 68,
    description: 'Optimal rhythm between 135–155 WPM with purposeful pauses before critical insights.',
    improvementTip: 'Slow down when introducing technical acronyms; pause for 0.8s immediately following.'
  },
  {
    key: 'filler',
    label: 'Filler Word Economy',
    score: 91,
    benchmark: 65,
    description: 'Minimal use of "um", "uh", "like", "you know", and vocal fillers.',
    improvementTip: 'Replace reflexive "like" with a conscious silent breath during topic transitions.'
  },
  {
    key: 'structure',
    label: 'Narrative & STAR Cohesion',
    score: 82,
    benchmark: 70,
    description: 'Clear progression from Context → Problem → Action → Quantified Outcome.',
    improvementTip: 'Always conclude project answers with a numeric metric (e.g. reduced latency by 34%).'
  },
  {
    key: 'confidence',
    label: 'Vocal Energy & Authority',
    score: 86,
    benchmark: 64,
    description: 'Downward pitch inflections at sentence ends; eliminates question-tone uptalk.',
    improvementTip: 'Drop voice pitch at the end of declarative statements to avoid sounding uncertain.'
  },
  {
    key: 'engagement',
    label: 'Audience & Recruiter Hook',
    score: 79,
    benchmark: 62,
    description: 'Use of rhetorical framing, relatable analogies, and energetic vocal dynamics.',
    improvementTip: 'Begin case explanations with an inverted hook: "Here is what broke first..."'
  }
];

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'm1',
    title: 'The 60-Second System Failure',
    category: 'Technical Pitch',
    durationSec: 60,
    difficulty: 'Medium',
    xpReward: 150,
    prompt: 'Explain the single hardest bug or system outage you encountered in your projects, what caused it, and how you engineered a permanent resolution in exactly 60 seconds.',
    rubric: [
      'State context in under 15 seconds',
      'Explain the root cause without rambling',
      'Quantify the permanent resolution',
      'Under 2 filler words total'
    ],
    completed: false
  },
  {
    id: 'm2',
    title: 'Tell Me About Yourself (Executive Edition)',
    category: 'HR & Screening',
    durationSec: 90,
    difficulty: 'Quick',
    xpReward: 120,
    prompt: 'Deliver your standard self-introduction, but tailor it strictly around what makes your engineering perspective uniquely valuable to a fast-growing team.',
    rubric: [
      'No chronological recitation of schools',
      'Focus on engineering philosophy',
      'Clear call-to-action closing'
    ],
    completed: true
  },
  {
    id: 'm3',
    title: 'Defend An Unpopular Tech Stack Choice',
    category: 'Architecture Defense',
    durationSec: 60,
    difficulty: 'Challenging',
    xpReward: 200,
    prompt: 'Convince an interviewer why SQLite or simple Monoliths are vastly superior to microservices for early-stage products.',
    rubric: [
      'Acknowledge counterarguments first',
      'Present 2 crisp operational trade-offs',
      'Finish with authoritative tone'
    ],
    completed: false
  }
];

export const CONVERSATION_ROOMS: ConversationRoom[] = [
  {
    id: 'r1',
    title: 'FAANG Behavioral Question Grilling',
    language: 'English',
    level: 'Advanced',
    activeSpeakers: 4,
    maxSpeakers: 6,
    topic: 'Amazon Leadership Principles & Google Googliness rounds',
    hostName: 'Siddharth Rao',
    college: 'Georgia Tech'
  },
  {
    id: 'r2',
    title: 'Non-Native English Fluency Warm-Up',
    language: 'English',
    level: 'Intermediate',
    activeSpeakers: 5,
    maxSpeakers: 8,
    topic: 'Eliminating stutter, building natural idioms, and spontaneous discussions',
    hostName: 'Yuki Tanaka',
    college: 'Waseda University'
  },
  {
    id: 'r3',
    title: 'Pitching Your Capstone / Side-Project',
    language: 'English',
    level: 'All Levels',
    activeSpeakers: 3,
    maxSpeakers: 5,
    topic: '3-minute live teardown with honest constructive peer feedback',
    hostName: 'Camila Rodriguez',
    college: 'Tec de Monterrey'
  },
  {
    id: 'r4',
    title: 'Tech News & AI Ethics Roundtable',
    language: 'English',
    level: 'All Levels',
    activeSpeakers: 6,
    maxSpeakers: 8,
    topic: 'Open source vs Closed source foundation models',
    hostName: 'Arjun Mehta',
    college: 'IIT Delhi'
  }
];

export const LEADERBOARD_USERS: LeaderboardEntry[] = [
  { rank: 1, name: 'Sora Takahashi', college: 'Univ. of Tokyo / MIT', xp: 14250, talksCount: 6, debatesWon: 18, streak: 42, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', badge: 'Diamond Orator' },
  { rank: 2, name: 'Alexandre Dubois', college: 'École Polytechnique', xp: 12890, talksCount: 5, debatesWon: 14, streak: 35, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', badge: 'Debate Champion' },
  { rank: 3, name: 'Priya Sundaram', college: 'Stanford University', xp: 11420, talksCount: 7, debatesWon: 12, streak: 28, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', badge: 'Master Storyteller' },
  { rank: 4, name: 'Jordan Vance', college: 'Harvard University', xp: 9850, talksCount: 4, debatesWon: 11, streak: 19, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', badge: 'Keynote Fellow' },
  { rank: 5, name: 'Kavita Nair', college: 'IIT Bombay', xp: 9240, talksCount: 4, debatesWon: 9, streak: 24, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', badge: 'Rising Star' }
];

export const COLLEGE_RANKINGS = [
  { rank: 1, name: 'MIT', country: 'USA', totalXp: '384,200', activeSpeakers: 840, logo: '🏛️' },
  { rank: 2, name: 'Stanford University', country: 'USA', totalXp: '362,100', activeSpeakers: 790, logo: '🌲' },
  { rank: 3, name: 'UC Berkeley', country: 'USA', totalXp: '341,900', activeSpeakers: 730, logo: '🐻' },
  { rank: 4, name: 'IIT Bombay', country: 'India', totalXp: '318,500', activeSpeakers: 810, logo: '🇮🇳' },
  { rank: 5, name: 'University of Waterloo', country: 'Canada', totalXp: '298,400', activeSpeakers: 620, logo: '🦫' },
  { rank: 6, name: 'Cambridge University', country: 'UK', totalXp: '284,100', activeSpeakers: 540, logo: '🏰' },
];

export const TESTIMONIALS = [
  {
    quote: "STAGE is the single reason I converted my Google interview. In CS school they teach you Dijkstra and Red-Black trees, but nobody ever shows you how to explain your thinking to an L6 Staff Engineer under timer pressure.",
    author: "Zainab Al-Mansoor",
    role: "Incoming Software Engineer @ Google",
    college: "Carnegie Mellon University",
    score: "Readiness: 94/100"
  },
  {
    quote: "The AI Talk Lab caught my habit of repeating 'basically' 23 times in a 5-minute presentation. Three weeks of Daily Missions later, I won 1st Place at our University Demo Day in front of 800 people.",
    author: "Klaus Van Der Bilt",
    role: "Founder, Synapse Neural (YC W26)",
    college: "TU Delft",
    score: "XP: 14,800"
  },
  {
    quote: "When reviewing candidates, technical resumes all look identical. But when a student includes their STAGE profile with verified 3-minute keynotes, we know immediately whether they can lead meetings and mentor juniors.",
    author: "Sarah Lindqvist",
    role: "Head of University Talent @ Stripe",
    college: "Partner Recruiter",
    score: "Hired 14 STAGE Graduates"
  }
];
