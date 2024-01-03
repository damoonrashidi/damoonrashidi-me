export enum PostStatus {
  Draft = "draft",
  Published = "published",
}

export interface Post {
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  status: PostStatus;
  snippet: string;
  body: string;
  ogImageUrl?: string;
}
