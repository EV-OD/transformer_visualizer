export type Vector = number[];
export type Matrix = Vector[];

export interface Token {
  id: string;
  text: string;
  embedding: Vector;
  posEncoded?: Vector;
}

export enum Step {
  INPUT = 'INPUT',
  EMBEDDING = 'EMBEDDING',
  HARDWARE = 'HARDWARE',
  POSITIONAL = 'POSITIONAL',
  ENCODING = 'ENCODING',
  SIGNAL = 'SIGNAL',
  ATTENTION = 'ATTENTION',
  SOFTMAX = 'SOFTMAX',
  SELF_ATTENTION_BLOCK = 'SELF_ATTENTION_BLOCK',
  MULTI_HEAD_ATTENTION = 'MULTI_HEAD_ATTENTION',
  CONCAT_PROJECTION = 'CONCAT_PROJECTION',
  RESIDUAL_ADD = 'RESIDUAL_ADD',
  LAYER_NORM = 'LAYER_NORM',
  FFN_OVERVIEW = 'FFN_OVERVIEW',
  FFN_EXPAND = 'FFN_EXPAND',
  FFN_ACTIVATE = 'FFN_ACTIVATE',
  FFN_REFINE = 'FFN_REFINE',
  ADD_NORM = 'ADD_NORM',
  STACK = 'STACK',
  OUTPUT = 'OUTPUT',
  BLACKBOX = 'BLACKBOX',
  FORMULA = 'FORMULA'
}

export interface AttentionHeadData {
  id: number;
  name: string;
  color: string;
  Wq: Matrix;
  Wk: Matrix;
  Wv: Matrix;
}

export interface TransformerState {
  currentStep: Step;
  tokens: Token[];
  activeHeadIndex: number;
  mathMode: boolean;
  heads: AttentionHeadData[];
}