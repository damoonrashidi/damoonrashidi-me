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
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [fill, stroke] = useColors();
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  const [smoothness, setSmoothness] = useState(1);

  useEffect(() => {
    if (ctx) {
      ctx.font = "10px 'Overpass Mono', monospace";
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
    }
  }, [ctx, fill, stroke, maxWidth, maxHeight]);

  useEffect(() => {
    if (canvas.current) {
      setCtx(canvas.current.getContext("2d")!);
    }
  }, [canvas]);

  useEffect(() => {
    draw();
  }, [canvas, ctx, smoothness, maxWidth, maxHeight, stroke, fill]);

  const draw = () => {
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let y = 0; y < maxHeight; y += 20) {
      for (let x = 0; x < maxWidth; x += 20) {
        const n = noise(x / smoothness, y / smoothness);
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
              <label for="smoothness_angles">smoothness =</label>
              <input
                type="range"
                min={1}
                max={100}
                id="smoothness_angles"
                value={smoothness}
                onChange={(e) =>
                  setSmoothness(parseInt(e.currentTarget.value, 10))}
              />
              <span>{smoothness}</span>
            </div>
          )
          : <></>}
      </div>
    </Illustration>
  );
}
