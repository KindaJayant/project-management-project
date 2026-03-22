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
    budgetHealth: '94.2%',
    riskIndices: 'Low',
    teamVelocity: '42.8',
    predictiveAccuracy: '98.5%',
    budgetChange: '+2.4%',
    riskChange: '-12%',
    velocityChange: '+5.1%',
    accuracyChange: '+0.4%',
  },
  tasks: [
    { name: 'Core Engine Refactor', status: 'Completed', owner: 'Alex M.', priority: 'High' },
    { name: 'Risk Mitigation Alpha', status: 'In Progress', owner: 'Sarah J.', priority: 'Medium' },
    { name: 'Budget Realignment', status: 'Pending', owner: 'David K.', priority: 'Low' },
  ],
  risks: [
    { id: 1, name: 'Budget Overrun', probability: 'Medium', impact: 'High', status: 'Mitigated' },
    { id: 2, name: 'Vendor Delay', probability: 'High', impact: 'Medium', status: 'Active' },
    { id: 3, name: 'Scope Creep', probability: 'Low', impact: 'Critical', status: 'Warning' },
    { id: 4, name: 'Talent Attrition', probability: 'Low', impact: 'Medium', status: 'Monitored' },
  ],
  timeline: [
    { name: 'Research & Discovery', start: 0, duration: 2, status: 'Completed' },
    { name: 'Architecture Design', start: 2, duration: 3, status: 'Completed' },
    { name: 'Core Development', start: 5, duration: 5, status: 'In Progress' },
    { name: 'Beta Testing', start: 10, duration: 3, status: 'Pending' },
    { name: 'Deployment', start: 13, duration: 2, status: 'Pending' },
  ],
  budget: [
    { category: 'Development', spent: 120000, budget: 150000, color: '#FF6D29' },
    { category: 'Cloud Infrastructure', spent: 45000, budget: 50000, color: '#BABABA' },
    { category: 'Marketing', spent: 30000, budget: 80000, color: '#453027' },
    { category: 'Operations', spent: 25000, budget: 30000, color: 'rgba(255, 255, 255, 0.1)' },
  ],
};
