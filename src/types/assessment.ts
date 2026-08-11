export enum Dimension {
  LogicalReasoning = 'Logical Reasoning',
  NumericalAbility = 'Numerical Ability',
  VerbalAbility = 'Verbal Ability',
  AnalyticalThinking = 'Analytical Thinking',
  ProblemSolving = 'Problem Solving',
  Memory = 'Memory',
  Creativity = 'Creativity',
  Attention = 'Attention',
  SpatialReasoning = 'Spatial Reasoning',
}

export type QuestionFormat = 'sequence' | 'pattern' | 'analogy' | 'classification' | 'conditional_logic' | 'number_sequence' | 'percentage' | 'ratio' | 'estimation' | 'word_problem' | 'reading_comprehension' | 'word_relationships' | 'sentence_logic' | 'inference' | 'vocabulary' | 'shape_rotation' | 'pattern_completion' | 'mirror_images' | '3d_visualization' | 'spatial_relationships' | 'alternative_uses' | 'idea_generation' | 'open_ended_thinking' | 'unusual_associations' | 'multiple_choice' | 'text_input';

export interface Question {
  id: string; // e.g. Q01
  dimension: Dimension;
  format: QuestionFormat;
  text: string;
  options?: string[];
  correctAnswer: string;
  assets?: string[]; // Optional URLs for images
}

export interface DimensionScore {
  dimension: Dimension;
  rawScore: number;
  percentageScore: number; // 0-100
}

export interface AssessmentResult {
  scores: DimensionScore[];
  // Profile, career matching, etc. can be expanded here
}
