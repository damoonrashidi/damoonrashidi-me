import { openSimplexNoise2D } from "$noise";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";
const noise = openSimplexNoise2D();

export function CollisionExampleIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [collidingX, setCollidingX] = useState(300);
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  const [fill, stroke] = useColors();

  useEffect(() => {
    if (canvas.current) {
      setCtx(canvas.current.getContext("2d")!);
    }
  }, [canvas]);

  useEffect(() => {
    if (ctx) {
      ctx.font = "10px 'Overpass Mono', monospace";
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
    }
    draw();
  }, [ctx, fill, stroke, maxHeight, maxWidth, collidingX]);

  const draw = () => {
    if (!ctx || maxHeight === 0 || maxWidth === 0) {
      return;
    }
    ctx.lineWidth = 10;
    ctx.clearRect(0, 0, maxWidth, maxHeight);

    let y = maxHeight / 2;
    let x = 1;

    const points: [number, number][] = [];
    while (x > 0 && y > 0 && x < maxWidth && y < maxHeight) {
      const n = noise(x / 100, y / 100);
      x += 4;
      y += Math.sin(n * 1.3) * 4;
      points.push([x, y]);
    }

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (const [x, y] of points) {
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#b4637a";
    for (let i = 0; i < points.length; i += 5) {
      const [x, y] = points[i];
      ctx.moveTo(x, y);
      ctx.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.closePath();

    const collidingPath: [number, number][] = [];

    x = collidingX;
    y = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#ea9d34";
    while (x > 0 && y > 0 && x < maxWidth && y < maxHeight) {
      const n = noise(x / 100, y / 100);
      x += Math.sin(n * 1.3) * 4;
      y += Math.cos(n * 1.3) * 4;
      collidingPath.push([x, y]);

      if (
        points.some(([px, py]) => Math.sqrt((px - x) ** 2 + (py - y) ** 2) < 5)
      ) {
        break;
      }

      ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#56949f";
    for (let i = 0; i < collidingPath.length; i += 5) {
      const [x, y] = collidingPath[i];
      ctx.moveTo(x, y);
      ctx.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.closePath();
  };

  return (
    <Illustration>
      <canvas
        className="h-[500px] w-full touch-none"
        ref={canvas}
        onMouseMove={(event) => setCollidingX(event.offsetX)}
        onTouchMove={(event) => {
          const [touch] = event.touches;
          const bbox = event.currentTarget.getBoundingClientRect();
          setCollidingX(
            touch.clientX - bbox.left,
          );
        }}
      />
    </Illustration>
  );
}
