export interface CommunityEvent {
  id: string;
  type: "workshop" | "community" | "coffee";
  /** Local calendar date (YYYY-MM-DD) */
  startsAt: string;
  registrationUrl?: string;
}

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "spec-driven-development",
    type: "workshop",
    startsAt: "2026-06-26",
    registrationUrl:
      "https://oaxacoders.org/eventos/reagendado-spec-driven-development-2026-del-caos-a-la-conformidad/",
  },
  {
    id: "tarde-de-lenguas-jul-04",
    type: "community",
    startsAt: "2026-07-04",
  },
  {
    id: "quantum-computing-intro",
    type: "workshop",
    startsAt: "2026-07-25",
    registrationUrl:
      "https://oaxacoders.org/eventos/reagendado-una-primera-aprox-a-los-conceptos-de-computacin-cuntica/",
  },
  {
    id: "tarde-de-lenguas-ago-22",
    type: "community",
    startsAt: "2026-08-22",
  },
  {
    id: "tarde-de-lenguas-sep-12",
    type: "community",
    startsAt: "2026-09-12",
  },
  {
    id: "programmer-to-programmer-csharp",
    type: "workshop",
    startsAt: "2026-09-26",
    registrationUrl:
      "https://oaxacoders.org/eventos/de-programador-a-programador-c/",
  },
  {
    id: "tarde-de-lenguas-oct-03",
    type: "community",
    startsAt: "2026-10-03",
  },
  {
    id: "tarde-de-lenguas-oct-24",
    type: "community",
    startsAt: "2026-10-24",
  },
  {
    id: "tarde-de-lenguas-nov-21",
    type: "community",
    startsAt: "2026-11-21",
  },
  {
    id: "tarde-de-lenguas-dic-12",
    type: "community",
    startsAt: "2026-12-12",
  },
];
