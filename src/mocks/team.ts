export interface TeamMember {
  id: string;
  /** Replace PNG in public/images/team/ — no code change needed */
  image: string;
  linkedIn?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder-1",
    image: "/images/team/default-avatar.png",
  },
  {
    id: "founder-2",
    image: "/images/team/default-avatar.png",
  },
];

export const TEAM_DEFAULT_AVATAR = "/images/team/default-avatar.png";
