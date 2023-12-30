export const Header = () => (
  <div className="flex p-16 md:p-32 items-center justify-between ">
    <h3 className="font-textular p-0 font-[700] text-2xl bg-background text-text">
      <a href="/">
        DAMOON<br />RASHIDI.
      </a>
    </h3>
    <div className="flex gap-x-5">
      <a
        href="/articles"
        className="font-textular font-[700] text-l"
        style="color: var(--text-fg); text-decoration: none;"
      >
        Blog
      </a>
      <a
        href="https://www.github.com/damoonrashidi"
        target="_blank"
        rel="nofollow noopener"
      >
        <picture>
          <source
            srcset="/github-dark.png"
            media="(prefers-color-scheme: dark)"
          />
          <img src="/github.png" alt="github" width={24} height={24} />
        </picture>
      </a>

      <a
        href="https://www.linkedin.com/in/damoonrashidi/"
        target="_blank"
        rel="nofollow noopener"
      >
        <picture>
          <source
            srcset="/linkedin-dark.png"
            media="(prefers-color-scheme: dark)"
          />
          <img src="/linkedin.png" alt="linkedin" width={24} height={24} />
        </picture>
      </a>
    </div>
  </div>
);
