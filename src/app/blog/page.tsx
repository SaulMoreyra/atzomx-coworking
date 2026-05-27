import BlogCard from "@/components/BlogCard/BlogCard";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import { ALL_BLOG_POSTS } from "@/mocks/blog";
import React from "react";

export default function BlogPage() {
  return (
    <div className="site-main flex min-h-screen flex-1 flex-col bg-brand-cream">
      <OrganicDivider fill="cream" variant="clover" />
      <section className="w-full py-10 md:py-14">
        <div className="section-container grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ALL_BLOG_POSTS.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
