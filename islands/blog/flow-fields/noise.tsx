import { openSimplexNoise2D } from "$noise";
import { Illustration } from "@/components/articles/illustration.tsx";
import { useEffect, useRef, useState } from "preact/hooks";

export function NoiseIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const noise = openSimplexNoise2D();
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!canvas.current) {
        return;
      }
      const { width, height } = canvas.current?.getBoundingClientRect();
      canvas.current.width = width;
      canvas.current.height = height;

      setMaxWidth(width);
      setMaxHeight(height);
    });

    if (canvas.current) {
      observer.observe(canvas.current);
    }

    return () => {
      if (canvas.current) {
        observer.unobserve(canvas.current);
      }
    };
  }, [canvas]);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const ctx = canvas.current.getContext("2d")!;
    ctx.font = "10px 'Overpass Mono', monospace";

    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let y = 0; y < maxHeight; y += 6) {
      for (let x = 0; x < maxWidth; x += 6) {
        const n = Math.round(noise(x / 100, y / 100) * 5) / 5;
        ctx.fillText(`${n}`, x * 5, y * 5);
      }
    }
  }, [canvas, maxHeight, maxWidth]);

  return (
    <Illustration>
      <canvas className="h-[500px] w-full" ref={canvas} />
    </Illustration>
  );
}
