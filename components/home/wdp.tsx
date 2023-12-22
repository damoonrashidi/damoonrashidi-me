export function Wdp() {
  return (
    <section
      className="p-32 font-code"
      title="Wdp"
    >
      <div className="flex flex-col items-center gap-32 m-auto lg:w-3/4 md:flex-row ">
        <img src="/wdp.png" />
        <div>
          <h2 className="text-highlight text-5xl font-[700]">
            λ ~/wdp
          </h2>
          <p className="pt-8 font-[300] max-w-prose">
            wdp (wɒt ʌp) is a command line tool for getting a developer news
            feed in the terminal.
          </p>
          <p className="pt-8 font-[300]">
            install via yarn (<span className="text-highlight">
              yarn add --global wdp
            </span>) and then run <span className="text-highlight">wdp</span>
            {" "}
            in your terminal.
          </p>
          <p className="pt-8 font-[300]">
            View on{" "}
            <a
              href="https://github.com/damoonrashidi/bitalarm"
              target="_blank"
              className="text-link underline underline-offset-2"
              rel="noopener nofollow"
            >
              github
            </a>{" "}
            or{" "}
            <a
              href="https://www.npmjs.com/package/wdp"
              target="_blank"
              className="text-link underline underline-offset-2"
              rel="noopener nofollow"
            >
              NPM
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
