import { useEffect, useRef } from "preact/hooks";

export const ArtSpinner = ({ images }: { images: string[] }) => {
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      spinnerRef.current.scrollLeft = 250;
    }
  }, [spinnerRef]);

  return (
    <div
      className="flex gap-24 max-w-screen overflow-x-auto px-24 pb-48 items-center content-center"
      ref={spinnerRef}
    >
      {images.map((src) => (
        <img
          src={`/art/${src}.png`}
          loading="lazy"
          alt={src}
          className="max-h-[500px] w-auto border-4 border-white-500/100 dark:border-black-500/100"
          style="box-shadow: 0px 6.899px 2.721px 0px rgba(0, 0, 0, 0.03), 0px 15.04px 6.327px 0px rgba(0, 0, 0, 0.05), 0px 24.619px 11.44px 0px rgba(0, 0, 0, 0.06), 0px 35.977px 19.304px 0px rgba(0, 0, 0, 0.06), 0px 49.775px 32.76px 0px rgba(0, 0, 0, 0.07), 0px 67.667px 59.467px 0px rgba(0, 0, 0, 0.07), 0px 100px 118px 0px rgba(0, 0, 0, 0.07);"
        />
      ))}
    </div>
  );
};
