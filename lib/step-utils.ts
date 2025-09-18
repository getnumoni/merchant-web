export const getStepDescription = (step: number): string => {
  switch (step) {
    case 1: return "Add a new branch or location under your organization's structure.";
    case 2: return "Add a new branch or location under your organization's structure.";
    case 3: return "Add a new branch or location under your organization's structure.";
    case 4: return "Add a new branch or location under your organization's structure.";
    case 5: return "Add a new branch or location under your organization's structure.";
    default: return "Add a new branch or location under your organization's structure.";
  }
};

export const getStepTitle = (step: number): string => {
  switch (step) {
    case 1: return "Branch Info";
    case 2: return "Branch Location";
    case 3: return "Social Media Links";
    case 4: return "Branch Manager";
    case 5: return "Collection Account";
    default: return "Branch Registration";
  }
};
