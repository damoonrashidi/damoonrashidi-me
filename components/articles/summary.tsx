export interface ArticleSummaryProps {
  slug: string;
  title: string;
  snippet: string;
  createdAt: Date;
  updatedAt: Date;
}

export function ArticleSummary({ post }: { post: ArticleSummaryProps }) {
  const dateFormat = Intl.DateTimeFormat("en-us", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });

  const createdAt = dateFormat.format(post.createdAt);
  const updatedAt = dateFormat.format(post.updatedAt);

  return (
    <article key={post.slug} className="pb-16">
      <h2 className="text-3xl underline underline-offset-4 leading-10">
        <a href={`/articles/${post.slug}`}>{post.title}</a>
      </h2>
      <p className="text-md">{post.snippet}</p>
      <p className="text-subtle">
        {createdAt}
        {createdAt !== updatedAt ? `, updated ${updatedAt}` : <></>}
      </p>
    </article>
  );
}
