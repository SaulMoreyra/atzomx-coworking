import { type BlogPost } from "@/common/types/blogTypes";

export const ALL_BLOG_POSTS: BlogPost[] = [
  {
    id: "guelaguetza-survival-2026",
    slug: "guia-supervivencia-guelaguetza-2026",
    category: "oaxaca",
    publishedAt: "2026-07-18",
    coverImage:
      "https://images.squarespace-cdn.com/content/v1/649cb0b4a4490d6c17bef429/5925bd0a-2096-4e62-a9c4-d155b1af3472/JHO08892.jpg",
    imageShare: "/images/bloq/atzomx-marmota.webp",
    readingMinutes: 12,
    featured: true,
  },
  {
    id: "welcome-atzomx",
    slug: "welcome-atzomx",
    category: "coworking",
    publishedAt: "2026-03-12",
    coverImage: "/images/coworking/atzomx.webp",
    readingMinutes: 10,
    featured: true,
  },
  {
    id: "specialty-coffee-oaxaca",
    slug: "specialty-coffee-oaxaca",
    category: "coffee",
    publishedAt: "2026-04-02",
    coverImage: "/images/coworking/art-latte.webp",
    readingMinutes: 9,
    featured: true,
  },
  {
    id: "remote-work-oaxaca",
    slug: "remote-work-oaxaca",
    category: "coworking",
    publishedAt: "2026-04-18",
    coverImage: "/images/coworking/monitor.webp",
    readingMinutes: 10,
    featured: true,
  },
  {
    id: "community-coworking",
    slug: "community-coworking",
    category: "community",
    publishedAt: "2026-05-05",
    coverImage: "/images/coworking/meeting-room.webp",
    readingMinutes: 8,
  },
];

export const FEATURED_BLOG_POSTS = ALL_BLOG_POSTS.filter(post => post.featured);

export const getBlogPostBySlug = (slug: string) =>
  ALL_BLOG_POSTS.find(post => post.slug === slug);

export const getRelatedPosts = (slug: string, limit = 2) => {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];

  const sameCategory = ALL_BLOG_POSTS.filter(
    post => post.slug !== slug && post.category === current.category
  );
  const others = ALL_BLOG_POSTS.filter(
    post => post.slug !== slug && post.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
};
