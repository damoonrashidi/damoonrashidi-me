import { openSimplexNoise2D } from "$noise";
import { Button } from "@/components/ui/button.tsx";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";
const noise = openSimplexNoise2D();

export function BuildingALine() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [stepLabel, setButtonLabel] = useState("Simulate a step");
  const [fill, stroke] = useColors();
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });

  useEffect(() => {
    if (ctx) {
      ctx.font = "10px 'Overpass Mono', monospace";
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
    }
  }, [ctx, stroke, fill, maxWidth, maxHeight]);
  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    setCtx(canvas.current.getContext("2d")!);
  }, [canvas]);

  useEffect(() => {
    if (typeof noise === "function") {
      draw();
    }
  }, [canvas, ctx, maxWidth, maxHeight, fill, stroke, noise]);

  const draw = () => {
    if (!ctx || maxWidth === 0 || maxHeight === 0) {
      return;
    }

    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let y = 0; y < maxHeight; y += 20) {
      for (let x = 0; x < maxWidth; x += 20) {
        const n = noise(x / 80, y / 80);
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

  const step = (x: number, y: number) => {
    if (!ctx || x < 0 || x > maxWidth || y < 0 || y > maxHeight) {
      return;
    }

    const n = noise(x / 80, y / 80);

    const nx = x + Math.cos(n) * 15;
    const ny = y + Math.sin(n) * 15;

    ctx.beginPath();
    ctx.ellipse(nx, ny, 3, 3, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    requestAnimationFrame(() => step(nx, ny));
  };

  return (
    <Illustration>
      <canvas className="h-[500px] w-full" ref={canvas} />
      <div className="pb-2 flex gap-4 py-4 items-center justify-center">
        <Button
          onClick={() => {
            step(2, Math.random() * maxHeight + 0.1 * 0.9);
            setButtonLabel("Simulate another step");
          }}
        >
          {stepLabel}
        </Button>
        <Button
          onClick={() => {
            draw();
          }}
        >
          Reset
        </Button>
      </div>
    </Illustration>
  );
}
