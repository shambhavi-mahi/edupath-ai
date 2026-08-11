const fs = require('fs');
const path = require('path');

const dimensions = [
  { name: 'Logical Reasoning', start: 1, end: 5, formats: ['sequence', 'pattern', 'analogy', 'classification', 'conditional_logic'] },
  { name: 'Numerical Ability', start: 6, end: 10, formats: ['number_sequence', 'percentage', 'ratio', 'estimation', 'word_problem'] },
  { name: 'Verbal Ability', start: 11, end: 15, formats: ['reading_comprehension', 'word_relationships', 'sentence_logic', 'inference', 'vocabulary'] },
  { name: 'Analytical Thinking', start: 16, end: 20, formats: ['multiple_choice'] },
  { name: 'Problem Solving', start: 21, end: 25, formats: ['multiple_choice'] },
  { name: 'Memory', start: 26, end: 30, formats: ['multiple_choice'] },
  { name: 'Creativity', start: 31, end: 35, formats: ['alternative_uses', 'idea_generation', 'pattern_completion', 'open_ended_thinking', 'unusual_associations'] },
  { name: 'Attention', start: 36, end: 40, formats: ['multiple_choice'] },
  { name: 'Spatial Reasoning', start: 41, end: 45, formats: ['shape_rotation', 'pattern_completion', 'mirror_images', '3d_visualization', 'spatial_relationships'] }
];

const questions = [];

for (const dim of dimensions) {
  for (let i = dim.start; i <= dim.end; i++) {
    const format = dim.formats[(i - dim.start) % dim.formats.length];
    questions.push({
      id: `Q${i.toString().padStart(2, '0')}`,
      dimension: dim.name,
      format: format,
      text: `Sample question for ${dim.name} using format ${format}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A'
    });
  }
}

fs.writeFileSync(
  path.join(__dirname, 'assessment-questions.json'),
  JSON.stringify(questions, null, 2)
);
console.log('Generated assessment-questions.json');
