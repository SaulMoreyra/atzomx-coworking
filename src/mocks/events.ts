export interface CommunityEvent {
  id: string;
  dateKey: string;
  type: "workshop" | "community" | "coffee";
}

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  { id: "nomad-coffee", dateKey: "this-week", type: "community" },
  { id: "pour-over", dateKey: "friday", type: "coffee" },
  { id: "focus-hours", dateKey: "daily", type: "workshop" },
];
