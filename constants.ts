
import { Token, AttentionHeadData, Matrix } from './types';

export const INITIAL_SENTENCE = ["The", "king", "and", "the", "queen", "quarrel", "as", "well", "as", "uncle", "and", "aunt"];
export const VECTOR_DIM = 4;

const generateMatrix = (rows: number, cols: number): Matrix => 
  Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => Math.random() * 2 - 1)
  );

// Distributed random noise for the 12-token sentence
export const RANDOM_EMBEDDING_TABLE = INITIAL_SENTENCE.map(() => [
  (Math.random() * 2 - 1) * 0.8,
  (Math.random() * 2 - 1) * 0.8,
  (Math.random() * 2 - 1) * 0.8,
  (Math.random() * 2 - 1) * 0.8
]);

/**
 * TRAINED_EMBEDDING_TABLE
 * Precise semantic analogy: (king - queen) = (uncle - aunt)
 */
const GENDER_DIRECTION = [0.7, -0.1, 0.1]; // The "Masculinity" vector
const ROYAL_CENTER = [-0.4, 0.6, 0.5];
const FAMILY_CENTER = [0.4, -0.3, -0.4];
const NEUTRAL_CENTER = [0, 0.1, 0.1];

export const TRAINED_EMBEDDING_TABLE = INITIAL_SENTENCE.map((word) => {
  const w = word.toLowerCase();
  
  // Analogy Pair 1: Royalty
  if (w === 'king') return [...ROYAL_CENTER.map((v, j) => v + GENDER_DIRECTION[j]), 0.5];
  if (w === 'queen') return [...ROYAL_CENTER.map((v, j) => v - GENDER_DIRECTION[j]), -0.5];
  
  // Analogy Pair 2: Family
  if (w === 'uncle') return [...FAMILY_CENTER.map((v, j) => v + GENDER_DIRECTION[j]), 0.4];
  if (w === 'aunt') return [...FAMILY_CENTER.map((v, j) => v - GENDER_DIRECTION[j]), -0.4];
  
  // Functional/Context words clustered near center
  if (['the', 'and', 'as', 'well'].includes(w)) {
    return [...NEUTRAL_CENTER.map(v => v + (Math.random() * 0.15 - 0.075)), 0];
  }
  
  // Action word
  if (w === 'quarrel') return [-0.7, -0.7, 0.1, -0.2];
  
  return [0, 0, 0, 0];
});

export const INITIAL_HEADS: AttentionHeadData[] = [
  {
    id: 0,
    name: "Head 1 (Syntax)",
    color: "#06b6d4",
    Wq: generateMatrix(VECTOR_DIM, VECTOR_DIM),
    Wk: generateMatrix(VECTOR_DIM, VECTOR_DIM),
    Wv: generateMatrix(VECTOR_DIM, VECTOR_DIM),
  },
  {
    id: 1,
    name: "Head 2 (Semantic)",
    color: "#8b5cf6",
    Wq: generateMatrix(VECTOR_DIM, VECTOR_DIM),
    Wk: generateMatrix(VECTOR_DIM, VECTOR_DIM),
    Wv: generateMatrix(VECTOR_DIM, VECTOR_DIM),
  },
  {
    id: 2,
    name: "Head 3 (Global)",
    color: "#f43f5e",
    Wq: generateMatrix(VECTOR_DIM, VECTOR_DIM),
    Wk: generateMatrix(VECTOR_DIM, VECTOR_DIM),
    Wv: generateMatrix(VECTOR_DIM, VECTOR_DIM),
  }
];

export const INITIAL_TOKENS: Token[] = INITIAL_SENTENCE.map((word, i) => ({
  id: `token-${i}`,
  text: word,
  embedding: RANDOM_EMBEDDING_TABLE[i]
}));

export const dotProduct = (v1: number[], v2: number[]) => 
  v1.reduce((acc, val, i) => acc + val * v2[i], 0);

export const matrixVectorMul = (m: Matrix, v: number[]) =>
  m.map(row => dotProduct(row, v));

export const softmax = (arr: number[]) => {
  const exps = arr.map(x => Math.exp(x));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
};

export const getPositionalEncoding = (pos: number, dim: number): number[] => {
  const pe = new Array(dim);
  for (let i = 0; i < dim; i++) {
    const angle = pos / Math.pow(10000, (2 * Math.floor(i / 2)) / dim);
    pe[i] = i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  }
  return pe;
};
