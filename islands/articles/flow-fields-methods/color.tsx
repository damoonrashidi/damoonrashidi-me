import { openSimplexNoise2D } from "$noise";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { Illustration } from "@/islands/articles/illustration.tsx";
import { useResize } from "@/islands/articles/useResize.ts";

interface Point {
  x: number;
  y: number;
  r: number;
}

function intersects(a: Point, b: Point) {
  const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  return distance < (a.r + b.r) / 1.5;
}

export function ColorIllustration({
  mode,
}: {
  mode: "by-line" | "region" | "angle";
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  let points: Point[] = [];
  let noise = openSimplexNoise2D();
  const palette = ["#eb6f92", "#f6c177", "#ea9a97", "#3e8fb0", "#9ccfd8"];

  useEffect(() => {
    if (canvas.current) {
      setCtx(canvas.current.getContext("2d")!);
    }
  }, [canvas]);

  useEffect(() => {
    draw();
  }, [ctx, maxHeight, maxWidth, mode, noise]);

  const draw = () => {
    if (!ctx || maxHeight === 0 || maxWidth === 0) {
      return;
    }
    noise = openSimplexNoise2D();
    const regions: { x: number; y: number; w: number; h: number; c: string }[] =
      Array.from({ length: 8 }, () => ({
        x: Math.random() * maxWidth - maxWidth / 3,
        y: Math.random() * maxHeight - maxHeight / 3,
        w: (Math.random() * maxWidth) / 3,
        h: (Math.random() * maxHeight) / 3,
        c: palette[Math.floor(Math.random() * palette.length)],
      }));

    ctx.fillStyle = "#232136";
    ctx.fillRect(0, 0, maxWidth, maxHeight);

    for (let i = 0; i < 600; i++) {
      let x = Math.random() * maxWidth;
      let y = Math.random() * maxHeight;
      let r = Math.random() * 30 + 10;
      if (Math.random() > 0.98) {
        r = 60;
      }

      const line: Point[] = [];
      while (
        (x > 0 && y > 0 && x < maxWidth && y < maxHeight) ||
        Math.random() < 0.01
      ) {
        const n = noise(x / 120, y / 120) * 1;
        x += Math.cos(n) * 0.5;
        y += Math.sin(n) * 0.5;

        if (points.some((point) => intersects(point, { x, y, r }))) {
          break;
        }
        line.push({ x, y, r });
      }

      if (line.length > 30) {
        switch (mode) {
          case "angle": {
            const n = (noise(line[0].x / 120, line[0].y / 120) * 255) % 30;
            ctx.strokeStyle = `hsl(${n}deg, 70%, 70%)`;
            break;
          }
          case "by-line": {
            const i = Math.floor(Math.random() * palette.length);
            ctx.strokeStyle = palette[i];
            break;
          }
          case "region": {
            const { x, y } = line[0];
            ctx.strokeStyle = palette[2];
            for (const r of regions) {
              if (x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.x) {
                ctx.strokeStyle = r.c;
                break;
              }
            }
            break;
          }
          default: {
            ctx.strokeStyle = "#333";
          }
        }

        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        ctx.lineWidth = line[0].r;
        for (const { x, y } of line) {
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        points.push(...line);
      }
    }
  };

  return (
    <Illustration>
      <canvas className="h-[500px] w-full touch-none" ref={canvas} />
      <div className="py-4 flex items-center content-center gap-4">
        <Button
          onClick={() => {
            points = [];
            draw();
          }}
        >
          Re-generate
        </Button>
      </div>
    </Illustration>
  );
}
