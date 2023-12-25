import { openSimplexNoise2D } from "$noise";
import { Illustration } from "@/components/articles/illustration.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "preact/hooks";

export function NoiseAngleIllustration(
  { showSmoothening }: { showSmoothening?: boolean },
) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [c, setC] = useState(1);

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
    setCtx(ctx);
    draw();
  }, [canvas, maxHeight, maxWidth]);

  useEffect(() => {
    draw();
  }, [c]);

  const draw = () => {
    if (!ctx) {
      return;
    }

    const noise = openSimplexNoise2D();

    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let y = 0; y < maxHeight; y += 20) {
      for (let x = 0; x < maxWidth; x += 20) {
        const n = noise(x / c, y / c);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x + Math.cos(n) * 10,
          y + Math.sin(n) * 10,
        );
        ctx.closePath();
        ctx.stroke();
      }
    }
  };

  return (
    <Illustration>
      <div className="flex gap-10 pb-4">
        <Button
          onClick={() => {
            draw();
          }}
        >
          Re-generate
        </Button>
        {showSmoothening
          ? (
            <div className="flex items-center gap-1">
              <span>c =</span>
              <input
                type="range"
                min={1}
                max={100}
                value={c}
                onChange={(e) => setC(parseInt(e.currentTarget.value, 10))}
              />
              <span>{c}</span>
            </div>
          )
          : <></>}
      </div>
      <canvas className="h-[500px] w-full" ref={canvas} />
    </Illustration>
  );
}
