import { openSimplexNoise2D } from "$noise";
import { Button } from "@/components/ui/button.tsx";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";

const noise = openSimplexNoise2D();

function distance([x, y]: [number, number], [ox, oy]: [number, number]) {
  return Math.sqrt(Math.pow(x - ox, 2) + Math.pow(y - oy, 2));
}

export function CollisionDetectionIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  let points: [number, number, number][] = [];
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
  }, [ctx, stroke, fill, maxWidth, maxHeight]);
  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    setCtx(canvas.current.getContext("2d")!);
  }, [canvas]);

  useEffect(() => {
    draw();
  }, [canvas, ctx, maxWidth, maxHeight, fill, stroke]);

  const createLine = (x: number, y: number) => {
    const r = Math.random() * 30 + 10;
    const colors = ["#b4637a", "#907aa9", "#d7827e", "#ea9d34"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const line: [number, number, number][] = [];
    line.push([x, y, r]);
    while (
      x > 0 && y > 0 && x < maxWidth && y < maxHeight
    ) {
      const n = noise(x / 120, y / 120);
      x += Math.cos(n * 1.4) * 0.5;
      y += Math.sin(n * 1.4) * 0.5;
      if (
        points.some(([px, py, pr]) =>
          distance([x, y], [px, py]) < (r + pr) / 2 + 5
        )
      ) {
        break;
      }
      line.push([x, y, r]);
    }
    if (line.length > 50) {
      points.push(...line);
      drawLine(line, color);
    }
  };

  const drawLine = (
    [from, to, ...rest]: [number, number, number][],
    color: string,
  ) => {
    if (!to || !ctx) {
      ctx?.closePath();
      return;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = from[2];
    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
    requestAnimationFrame(() => {
      drawLine([to, ...rest], color);
    });
  };

  const draw = () => {
    if (!ctx || maxWidth === 0 || maxHeight === 0) {
      return;
    }

    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let i = 0; i < 70; i++) {
      const x = Math.random() * maxWidth;
      const y = Math.random() * maxHeight;
      createLine(x, y);
    }
  };

  return (
    <Illustration>
      <canvas
        className="h-[500px] w-full touch-none"
        ref={canvas}
        onMouseMove={(event) => createLine(event.offsetX, event.offsetY)}
        onTouchMove={(event) => {
          const [touch] = event.touches;
          const bbox = event.currentTarget.getBoundingClientRect();
          createLine(
            touch.clientX - bbox.left,
            touch.clientY - bbox.top,
          );
        }}
      />
      <div className="pt-2">
        <Button
          onClick={() => {
            points = [];
            ctx?.clearRect(0, 0, maxWidth, maxHeight);
          }}
        >
          Reset
        </Button>
      </div>
    </Illustration>
  );
}
