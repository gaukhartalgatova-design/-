export interface BiologyTerm {
  id: string;
  term: string;
  formula?: string;
  pronunciationOrOrigin?: string;
  shortExplanation: string;
  category: 'monosaccharide' | 'disaccharide' | 'polysaccharide' | 'complex' | 'reaction' | 'general';
  tags: string[];
}

export interface RememberFact {
  id: string;
  title: string;
  fact: string;
  accent: 'rose' | 'amber' | 'emerald' | 'blue' | 'purple';
  badge?: string;
}

export interface ComparisonItem {
  id: string;
  title: string;
  aspects: {
    feature: string;
    itemA: string;
    itemB: string;
  }[];
  nameA: string;
  nameB: string;
  keyTakeaway: string;
}

export interface BiologicalProcess {
  id: string;
  title: string;
  formulaOrSummary?: string;
  stages: {
    number: number;
    title: string;
    description: string;
    badge?: string;
  }[];
  result: string;
}

export interface StructureItem {
  id: string;
  part: string;
  formula?: string;
  characteristic: string;
  function: string;
}

export interface ClassificationNode {
  title: string;
  description?: string;
  badge?: string;
  children?: {
    name: string;
    details: string;
    examples?: string[];
  }[];
}

export interface ConnectionLink {
  from: string;
  verb: 'служит мономером для' | 'входит в состав' | 'является акцептором' | 'является конечным продуктом' | 'обеспечивают' | 'вступает в реакцию с' | 'вызывает гидролиз' | 'образует';
  to: string;
  note?: string;
}

export interface AssociationItem {
  id: string;
  term: string;
  association: string;
  explanation: string;
  iconType: string;
}

export interface BiologyMeme {
  id: string;
  title: string;
  character: string; // e.g., 'Кот-биохимик', 'Бактерия в доспехах'
  scenario: string;
  quote: string;
  punchline: string;
  memoryHook: string;
  visualTag: string;
  themeColor: string;
}

export interface KeyNumber {
  id: string;
  value: string;
  unit: string;
  context: string;
  importance: string;
  category: 'energy' | 'homeostasis' | 'temperature' | 'concentration' | 'lab';
}

export interface TopicSection {
  id: 'section3' | 'section4';
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  explanations: {
    title: string;
    simpleText: string;
    bulletPoints: string[];
  }[];
  keyTerms: BiologyTerm[];
  rememberFacts: RememberFact[];
  comparisons: ComparisonItem[];
  processes: BiologicalProcess[];
  structures: StructureItem[];
  classifications: ClassificationNode[];
  connections: ConnectionLink[];
  associations: AssociationItem[];
  memes: BiologyMeme[];
  numbers: KeyNumber[];
  mainTakeaways: string[];
}
