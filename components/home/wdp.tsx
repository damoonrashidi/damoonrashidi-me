export function Wdp() {
  return (
    <section className="p-24 py-48 font-code" title="Wdp">
      <div className="flex flex-col items-center gap-32 m-auto lg:w-3/4 lg:flex-row ">
        <img
          src="/wdp.png"
          loading="lazy"
          alt="An illustration of the CLI tool WDP"
          width={495}
          height={271}
        />
        <div>
          <h2 className="text-highlight text-5xl font-[700]">λ ~/wdp</h2>
          <p className="font-[300] w-prose">
            wdp (wɒt ʌp) is a command line tool for getting a developer news
            feed in the terminal.
          </p>
          <p className="font-[300]">
            install via yarn (
            <span className="text-highlight">yarn add --global wdp</span>) and
            then run <span className="text-highlight">wdp</span>{" "}
            in your terminal.
          </p>
          <p className="font-[300]">
            View on{" "}
            <a
              href="https://github.com/damoonrashidi/wdp"
              className="text-link underline underline-offset-2"
              rel="noopener nofollow"
            >
              github
            </a>{" "}
            or{" "}
            <a
              href="https://www.npmjs.com/package/wdp"
              className="text-link underline underline-offset-2"
              rel="noopener nofollow"
            >
              NPM
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
