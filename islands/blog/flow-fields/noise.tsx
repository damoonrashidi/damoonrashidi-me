import { openSimplexNoise2D } from "$noise";
import { Illustration } from "@/components/articles/illustration.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "preact/hooks";

export function NoiseIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
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
    ctx.fillStyle = getComputedStyle(canvas.current).getPropertyValue(
      "--text-fg",
    );
    ctx.strokeStyle = getComputedStyle(canvas.current).getPropertyValue(
      "--text-fg",
    );
    setCtx(ctx);
    draw();
  }, [canvas, maxHeight, maxWidth]);

  const draw = () => {
    if (!ctx) {
      return;
    }

    const noise = openSimplexNoise2D();

    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let y = 0; y < maxHeight; y += 6) {
      for (let x = 0; x < maxWidth; x += 6) {
        const n = Math.round(noise(x / 100, y / 100) * 5) / 5;
        ctx.fillText(`${n}`, x * 5, y * 5);
      }
    }
  };

  return (
    <Illustration>
      <div className="pb-2">
        <Button
          onClick={() => {
            draw();
          }}
        >
          Re-generate
        </Button>
      </div>
      <canvas className="h-[500px] w-full" ref={canvas} />
    </Illustration>
  );
}
