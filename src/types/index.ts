export type SkillCategory = 'Statistics' | 'Technical' | 'Digital Governance' | 'Behavioural';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  currentLevel: number; // 1-5 scale
  requiredLevel: number; // 1-5 scale
  gap: number;
  priority: PriorityLevel;
  cadreBenchmark: number;
  recommendationReason: string;
  certifiedDate?: string;
  tags: string[];
}

export interface OfficerProfile {
  id: string;
  name: string;
  designation: string;
  cadre: string; // e.g. "Indian Statistical Service (ISS)"
  batch: string;
  division: string;
  ministry: string;
  location: string;
  overallScore: number; // e.g. 76 / 100
  targetScore: number; // e.g. 88 / 100
  percentile: number;
  level: string; // e.g. "Proficient (Grade-III SSO)"
  avatar: string;
  email: string;
  employeeCode: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  provider: 'iGOT Karmayogi' | 'NSSTA TPAC';
  category: SkillCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  format: 'Self-Paced e-Learning' | '5-Day Residential (Greater Noida)' | 'Hybrid Virtual Workshop';
  skillsCovered: string[];
  recommendationReason: string;
  status: 'In Progress' | 'Recommended' | 'Completed' | 'Mandatory';
  progress?: number; // 0-100
  rating: number;
  enrolledCount: number;
  dueDate?: string;
}

export interface AssessmentResult {
  id: string;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  status: 'Passed' | 'Needs Review' | 'Distinction';
  competencyArea: SkillCategory;
  keyFeedback: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  competencyPill?: {
    skill: string;
    evaluatedLevel: string;
    confidence: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: SkillCategory;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  referenceSource: string;
}

export interface LearningPathMilestone {
  step: number;
  title: string;
  roleTarget: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  estimatedWeeks: string;
  coursesCount: number;
  keySkills: string[];
}
