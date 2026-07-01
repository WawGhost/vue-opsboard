export const queryKeys = {
  scenarios: ["scenarios"] as const,
  scenario: (id: string) => ["scenario", id] as const,
  vehicles: ["vehicles"] as const,
  tasks: ["tasks"] as const,
  incidents: ["incidents"] as const,
  zones: ["zones"] as const,
};
