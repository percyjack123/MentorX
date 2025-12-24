export interface Professor {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  avatar?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
  academicYear: string;
  credits: number;
  totalWeeks: number;
  currentWeek: number;
  professorId: string;
}

export type TopicStatus = 'completed' | 'planned' | 'pending' | 'behind';

export interface Topic {
  id: string;
  unitId: string;
  name: string;
  description?: string;
  scheduledWeek: number;
  actualWeek?: number;
  hoursPlanned: number;
  status: TopicStatus;
  order: number;
}

export interface Unit {
  id: string;
  courseId: string;
  name: string;
  description?: string;
  order: number;
  topics: Topic[];
}

export interface UpcomingClass {
  id: string;
  topicId: string;
  topicName: string;
  unitName: string;
  scheduledTime: string;
  room: string;
  duration: number; // in minutes
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'error';
  title: string;
  message: string;
  createdAt: string;
}

export interface AIRecommendation {
  id: string;
  type: 'schedule' | 'pace' | 'resource' | 'reminder';
  priority: 'high' | 'medium' | 'low';
  title: string;
  suggestion: string;
  explanation: string;
  actionable: boolean;
}

export type ResourceImportance = 'must-study' | 'helpful' | 'optional';

export interface StudyResource {
  id: string;
  topicId: string;
  topicName: string;
  title: string;
  type: 'textbook' | 'article' | 'video' | 'slides' | 'notes';
  importance: ResourceImportance;
  url?: string;
  author?: string;
  description?: string;
}
