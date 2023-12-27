import { Post, PostStatus } from "@/blog/post.ts";

export function ArticleLead({ post }: { post: Post }) {
  const dateFormat = Intl.DateTimeFormat("en-us", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
  const createdAt = dateFormat.format(post.createdAt);
  const updatedAt = dateFormat.format(post.updatedAt);

  return (
    <section
      key={post.slug}
      className="pb-8"
    >
      <h1 className="text-4xl  leading-10">
        {post.title}
      </h1>
      <p className="text-subtle">
        {createdAt}
        {createdAt !== updatedAt ? `, updated ${updatedAt}.` : <></>}
      </p>
      {post.status !== PostStatus.Published
        ? (
          <p className="bg-[#dae69d] text-[#111] p-1 rounded-sm inline-block">
            This article is a Work in Progress and not yet published.
          </p>
        )
        : <></>}
    </section>
  );
}
