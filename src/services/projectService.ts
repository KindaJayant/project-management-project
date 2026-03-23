export interface ProjectState {
  metrics: {
    budgetHealth: string;
    riskIndices: string;
    teamVelocity: string;
    predictiveAccuracy: string;
    budgetChange: string;
    riskChange: string;
    velocityChange: string;
    accuracyChange: string;
  };
  tasks: { name: string; status: string; owner: string; priority: string }[];
  risks: { id: number; name: string; probability: string; impact: string; status: string }[];
  timeline: { name: string; start: number; duration: number; status: string }[];
  budget: { category: string; spent: number; budget: number; color: string }[];
}

export const initialProjectState: ProjectState = {
  metrics: {
    budgetHealth: '0%',
    riskIndices: 'None',
    teamVelocity: '0',
    predictiveAccuracy: '0%',
    budgetChange: '+0%',
    riskChange: '0%',
    velocityChange: '+0%',
    accuracyChange: '+0%',
  },
  tasks: [],
  risks: [],
  timeline: [],
  budget: [],
};

