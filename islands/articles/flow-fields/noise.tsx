import { openSimplexNoise2D } from "$noise";
import { Button } from "@/components/ui/button.tsx";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";

export function NoiseIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  const [fill, stroke] = useColors();

  useEffect(() => {
    if (ctx) {
      ctx.font = "10px 'Overpass Mono', monospace";
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
    }
  }, [ctx, stroke, fill]);
  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    setCtx(canvas.current.getContext("2d")!);
  }, [canvas]);

  useEffect(() => {
    draw();
  }, [canvas, ctx, maxWidth, maxHeight, fill, stroke]);

  const draw = () => {
    if (!ctx || maxWidth === 0 || maxHeight === 0) {
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
      <canvas className="h-[500px] w-full" ref={canvas} />
      <div className="pb-2">
        <Button
          onClick={() => {
            draw();
          }}
        >
          Re-generate
        </Button>
      </div>
    </Illustration>
  );
}
