import { openSimplexNoise2D } from "$noise";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";

export interface NoiseAngleIllustrationProps {
  showSmoothening?: boolean;
}

const noise = openSimplexNoise2D();

export function NoiseAngleIllustration(
  { showSmoothening }: NoiseAngleIllustrationProps,
) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fill, stroke] = useColors();
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  const [c, setC] = useState(1);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    if (ctx) {
      ctx.font = "10px 'Overpass Mono', monospace";
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
    }
  }, [ctx, fill, stroke]);

  useEffect(() => {
    if (canvas.current) {
      setCtx(canvas.current.getContext("2d")!);
    }
  }, [canvas]);

  useEffect(() => {
    draw();
  }, [canvas, ctx, c, maxWidth, maxHeight, stroke, fill]);

  const draw = () => {
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let y = 0; y < maxHeight; y += 20) {
      for (let x = 0; x < maxWidth; x += 20) {
        const n = noise(x / c, y / c);
        ctx.beginPath();
        ctx.moveTo(x, y + 15);
        ctx.lineTo(
          x + Math.cos(n) * 15,
          y + 15 + Math.sin(n) * 15,
        );
        ctx.closePath();
        ctx.stroke();
      }
    }
  };

  return (
    <Illustration>
      <canvas className="h-[500px] w-full" ref={canvas} />
      <div className="flex gap-4 pt-4 flex-wrap">
        {showSmoothening
          ? (
            <div className="flex items-center gap-1">
              <span>smoothness =</span>
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
    </Illustration>
  );
}
