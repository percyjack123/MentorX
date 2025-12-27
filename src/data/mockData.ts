import type { Professor, Course, Unit, UpcomingClass, Alert, AIRecommendation, StudyResource } from './types';

export const professor: Professor = {
  id: 'prof-001',
  name: 'Dr. Ajit Kumar Pasayat',
  title: 'Associate Professor',
  department: 'Computer Science',
  email: 'ajitkumar@university.edu',
};

export const course: Course = {
  id: 'course-001',
  code: 'CS301',
  name: 'Data Structures & Algorithms',
  semester: 'Autumn',
  academicYear: '2024-25',
  credits: 4,
  totalWeeks: 14,
  currentWeek: 8,
  professorId: 'prof-001',
};

export const units: Unit[] = [
  {
    id: 'unit-1',
    courseId: 'course-001',
    name: 'Unit 1: Foundations of Data Structures',
    description: 'Introduction to fundamental data structures and their applications',
    order: 1,
    topics: [
      { id: 't-1-1', unitId: 'unit-1', name: 'Introduction to Data Structures', scheduledWeek: 1, actualWeek: 1, hoursPlanned: 2, status: 'completed', order: 1 },
      { id: 't-1-2', unitId: 'unit-1', name: 'Arrays and Linked Lists', scheduledWeek: 1, actualWeek: 1, hoursPlanned: 3, status: 'completed', order: 2 },
      { id: 't-1-3', unitId: 'unit-1', name: 'Stacks and Queues', scheduledWeek: 2, actualWeek: 2, hoursPlanned: 3, status: 'completed', order: 3 },
    ],
  },
  {
    id: 'unit-2',
    courseId: 'course-001',
    name: 'Unit 2: Trees and Graphs',
    description: 'Hierarchical and network data structures',
    order: 2,
    topics: [
      { id: 't-2-1', unitId: 'unit-2', name: 'Binary Trees', scheduledWeek: 3, actualWeek: 3, hoursPlanned: 3, status: 'completed', order: 1 },
      { id: 't-2-2', unitId: 'unit-2', name: 'Binary Search Trees', scheduledWeek: 4, actualWeek: 4, hoursPlanned: 3, status: 'completed', order: 2 },
      { id: 't-2-3', unitId: 'unit-2', name: 'AVL Trees and Balancing', scheduledWeek: 5, actualWeek: 5, hoursPlanned: 3, status: 'completed', order: 3 },
      { id: 't-2-4', unitId: 'unit-2', name: 'Graph Representations', scheduledWeek: 6, actualWeek: 7, hoursPlanned: 3, status: 'behind', order: 4, description: 'Delayed due to extended discussion on AVL trees' },
    ],
  },
  {
    id: 'unit-3',
    courseId: 'course-001',
    name: 'Unit 3: Sorting & Searching',
    description: 'Algorithms for organizing and finding data',
    order: 3,
    topics: [
      { id: 't-3-1', unitId: 'unit-3', name: 'Basic Sorting Algorithms', scheduledWeek: 7, hoursPlanned: 3, status: 'behind', order: 1 },
      { id: 't-3-2', unitId: 'unit-3', name: 'Advanced Sorting (Quick, Merge)', scheduledWeek: 8, hoursPlanned: 4, status: 'planned', order: 2 },
      { id: 't-3-3', unitId: 'unit-3', name: 'Searching Algorithms', scheduledWeek: 9, hoursPlanned: 3, status: 'planned', order: 3 },
    ],
  },
  {
    id: 'unit-4',
    courseId: 'course-001',
    name: 'Unit 4: Advanced Topics',
    description: 'Hash tables, heaps, and algorithm analysis',
    order: 4,
    topics: [
      { id: 't-4-1', unitId: 'unit-4', name: 'Hash Tables', scheduledWeek: 10, hoursPlanned: 3, status: 'pending', order: 1 },
      { id: 't-4-2', unitId: 'unit-4', name: 'Heaps and Priority Queues', scheduledWeek: 11, hoursPlanned: 3, status: 'pending', order: 2 },
      { id: 't-4-3', unitId: 'unit-4', name: 'Algorithm Complexity Analysis', scheduledWeek: 12, hoursPlanned: 4, status: 'pending', order: 3 },
      { id: 't-4-4', unitId: 'unit-4', name: 'Course Review & Problem Solving', scheduledWeek: 13, hoursPlanned: 3, status: 'pending', order: 4 },
    ],
  },
];

export const upcomingClass: UpcomingClass = {
  id: 'class-001',
  topicId: 't-3-2',
  topicName: 'Advanced Sorting (Quick, Merge)',
  unitName: 'Unit 3: Sorting & Searching',
  scheduledTime: '2024-10-28T10:00:00',
  room: 'Room 304, Engineering Building',
  duration: 90,
};

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    title: 'Schedule Deviation Detected',
    message: 'You are 2 classes behind the planned schedule. Unit 3 topics may need adjustment.',
    createdAt: '2024-10-25T09:00:00',
  },
];

export const aiRecommendations: AIRecommendation[] = [
  {
    id: 'rec-001',
    type: 'schedule',
    priority: 'high',
    title: 'You are 2 classes behind schedule',
    suggestion: 'Consider combining "Basic Sorting" with "Advanced Sorting" into a single extended session.',
    explanation: 'Based on the current pace, completing all planned topics by week 13 requires adjustment. The overlap between basic and advanced sorting concepts allows for efficient consolidation without sacrificing depth.',
    actionable: true,
  },
  {
    id: 'rec-002',
    type: 'pace',
    priority: 'medium',
    title: 'Suggested adjustment: shift Unit 4 by 1 week',
    suggestion: 'Move Hash Tables to Week 11 and compress the final review session.',
    explanation: 'This maintains the logical progression while accommodating the current delay. Students will have adequate time for each topic, and the review can be integrated with problem-solving exercises.',
    actionable: true,
  },
  {
    id: 'rec-003',
    type: 'reminder',
    priority: 'low',
    title: 'Mid-semester feedback window',
    suggestion: 'Consider scheduling a brief student feedback session this week.',
    explanation: 'Week 8 is an optimal point for gathering student input on pace and comprehension. This can inform your approach to the remaining units.',
    actionable: false,
  },
];

export const studyResources: StudyResource[] = [
  {
    id: 'res-001',
    topicId: 't-3-2',
    topicName: 'Advanced Sorting (Quick, Merge)',
    title: 'Introduction to Algorithms (Ch. 7-8)',
    type: 'textbook',
    importance: 'must-study',
    author: 'Cormen, Leiserson, Rivest, Stein',
    description: 'Comprehensive coverage of quicksort and mergesort with proofs and analysis.',
  },
  {
    id: 'res-002',
    topicId: 't-3-2',
    topicName: 'Advanced Sorting (Quick, Merge)',
    title: 'Visualizing Sorting Algorithms',
    type: 'video',
    importance: 'helpful',
    url: 'https://example.com/sorting-viz',
    description: 'Interactive visualizations demonstrating algorithm behavior on various inputs.',
  },
  {
    id: 'res-003',
    topicId: 't-3-2',
    topicName: 'Advanced Sorting (Quick, Merge)',
    title: 'Sorting Algorithm Comparison Notes',
    type: 'notes',
    importance: 'optional',
    description: 'Supplementary comparison table with time/space complexity tradeoffs.',
  },
  {
    id: 'res-004',
    topicId: 't-2-4',
    topicName: 'Graph Representations',
    title: 'Graph Theory Fundamentals',
    type: 'textbook',
    importance: 'must-study',
    author: 'Sedgewick & Wayne',
    description: 'Essential reading on adjacency lists, matrices, and graph properties.',
  },
  {
    id: 'res-005',
    topicId: 't-2-4',
    topicName: 'Graph Representations',
    title: 'Graph Data Structures in Practice',
    type: 'article',
    importance: 'helpful',
    description: 'Real-world applications of graph structures in social networks and maps.',
  },
  {
    id: 'res-006',
    topicId: 't-4-1',
    topicName: 'Hash Tables',
    title: 'Hashing: Theory and Practice',
    type: 'slides',
    importance: 'must-study',
    description: 'Lecture slides covering hash functions, collision resolution, and performance.',
  },
  {
    id: 'res-007',
    topicId: 't-4-1',
    topicName: 'Hash Tables',
    title: 'Bloom Filters and Beyond',
    type: 'article',
    importance: 'optional',
    description: 'Advanced probabilistic data structures building on hashing concepts.',
  },
];

// Helper functions
export const getSyllabusCompletion = (): number => {
  const allTopics = units.flatMap(u => u.topics);
  const completed = allTopics.filter(t => t.status === 'completed').length;
  return Math.round((completed / allTopics.length) * 100);
};

export const getSemesterProgress = (): number => {
  return Math.round((course.currentWeek / course.totalWeeks) * 100);
};

export const getTopicsByStatus = (status: string) => {
  return units.flatMap(u => u.topics).filter(t => t.status === status);
};
