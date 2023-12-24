import { Post, PostStatus } from "@/blog/post.ts";

export default {
  title: "What I've learned about flow fields.",
  slug: "what-ive-learned-about-flow-fields",
  createdAt: new Date(2022, 5, 12),
  updatedAt: new Date(2022, 5, 12),
  status: PostStatus.Draft,
  snippet: "Noise values and a tiny bit of math goes a long way.",
  body: "",
} satisfies Post;
