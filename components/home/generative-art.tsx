export function GenerativeArtSpinner() {
  const images = ["forces", "nightfall", "wildlands", "grid", "genesis"];

  return (
    <section title="Generative Art">
      <div className="p-24 lg:w-3/4 m-auto">
        <h2 className="font-display text-5xl">Generative Art.</h2>
        <p className="py-8 font-display text-2xl leading-9 max-w-prose">
          My generative art experiments. Each series was created by writing an
          algorithm that was given a set of parameters where each parameter was
          bound to a range to help guide the output.{" "}
          <a className="text-link underline underline-offset-4" href="/art">
            See all
          </a>.
        </p>
      </div>
      <div className="flex gap-24 max-w-screen overflow-x-auto px-24 pb-32">
        {images.map((src) => (
          <img
            src={`/art/${src}.png`}
            alt={src}
            className="lg:h-[500px] border-4 border-white-500/100 dark:border-black-500/100"
            style="box-shadow: 0px 6.899px 2.721px 0px rgba(0, 0, 0, 0.03), 0px 15.04px 6.327px 0px rgba(0, 0, 0, 0.05), 0px 24.619px 11.44px 0px rgba(0, 0, 0, 0.06), 0px 35.977px 19.304px 0px rgba(0, 0, 0, 0.06), 0px 49.775px 32.76px 0px rgba(0, 0, 0, 0.07), 0px 67.667px 59.467px 0px rgba(0, 0, 0, 0.07), 0px 100px 118px 0px rgba(0, 0, 0, 0.07);"
          />
        ))}
      </div>
    </section>
  );
}
