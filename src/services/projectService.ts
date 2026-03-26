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
  tasks: { id: string; name: string; status: string; owner: string; priority: string }[];
  risks: { id: string; name: string; probability: string; impact: string; status: string }[];
  timeline: { id: string; name: string; start: number; duration: number; status: string }[];
  budget: { id: string; category: string; spent: number; budget: number; color: string }[];
}

export interface Project {
  id: string;
  name: string;
  state: ProjectState;
  createdAt: string;
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

const STORAGE_KEY = 'nexus_projects';

export const projectService = {
  getProjects: (): Project[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveProjects: (projects: Project[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  },

  createProject: (name: string): Project => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      state: { ...initialProjectState },
      createdAt: new Date().toISOString(),
    };
    return newProject;
  }
};

