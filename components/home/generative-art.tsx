import { ArtSpinner } from "@/islands/home/art-spinner.tsx";

export function GenerativeArtSpinner() {
  const images = [
    "forces",
    "nightfall",
    "disrupted-arrival",
    "wildlands",
    "grid",
    "genesis",
  ];

  return (
    <section title="Generative Art">
      <div className="p-16 md:p-24 lg:w-3/4 m-auto">
        <h2 className="font-display text-5xl">Generative Art.</h2>
        <p className="py-8 font-display text-2xl leading-9 max-w-prose">
          My generative art experiments. Each series was created by writing an
          algorithm that was given a set of parameters where each parameter was
          bound to a range to help guide the output.{" "}
          <a className="text-link underline underline-offset-4" href="/art">
            Visit the gallery
          </a>.
        </p>
      </div>
      <ArtSpinner images={images} />
    </section>
  );
}
