export interface ArticleSummaryProps {
  slug: string;
  title: string;
  snippet: string;
  createdAt: Date;
}

export function ArticleSummary({ post }: { post: ArticleSummaryProps }) {
  return (
    <article
      key={post.slug}
      className="pb-16"
    >
      <h2 className="text-3xl underline underline-offset-4 leading-10">
        <a href={`/articles/${post.slug}`}>
          {post.title}
        </a>
      </h2>
      <p className="text-lg">
        {post.snippet}
      </p>
      <p className="text-subtle font-bold">
        {Intl.DateTimeFormat("en-us", {
          year: "numeric",
          day: "numeric",
          month: "long",
        }).format(post.createdAt)}
      </p>
    </article>
  );
}
