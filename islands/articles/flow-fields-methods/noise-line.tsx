import { openSimplexNoise2D } from "$noise";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { Illustration } from "@/islands/articles/illustration.tsx";
import { useColors } from "@/islands/articles/useColors.ts";
import { useResize } from "@/islands/articles/useResize.ts";

const noise = openSimplexNoise2D();

export function NoiseLineIllustration() {
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
  }, [ctx, fill, stroke, maxHeight, maxWidth]);

  const drawLine = (x: number, y: number) => {
    if (x < 0 || x > maxWidth || y < 0 || y > maxHeight || !ctx) {
      return;
    }
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const n = noise(x / 80, y / 80);
    x += Math.cos(n) * 7;
    y += Math.sin(n) * 7;
    ctx.lineTo(x, y);
    ctx.stroke();
    requestAnimationFrame(() => drawLine(x, y));
  };

  const draw = () => {
    if (!ctx) {
      return;
    }
    ctx.lineWidth = 3;
    ctx.clearRect(0, 0, maxWidth, maxHeight);

    const startY = maxHeight * 0.2;
    for (let i = 0; i < 20; i++) {
      const x = 0;
      const y = startY + i * 5;
      drawLine(x, y);
    }
  };

  const fillCanvas = () => {
    if (!ctx) {
      return;
    }
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let i = 0; i < 500; i += 0.5) {
      const x = 0;
      const y = Math.random() * maxHeight;
      drawLine(x, y);
    }
  };

  return (
    <Illustration>
      <canvas
        className="h-[500px] w-full touch-none"
        ref={canvas}
        onMouseMove={(event) => drawLine(event.offsetX, event.offsetY)}
        onTouchMove={(event) => {
          const [touch] = event.touches;
          const bbox = event.currentTarget.getBoundingClientRect();
          drawLine(touch.clientX - bbox.left, touch.clientY - bbox.top);
        }}
      />
      <div className="pt-4 flex gap-4 items-center justify-center">
        <Button onClick={() => fillCanvas()}>Fill the canvas</Button>
        <Button onClick={() => draw()}>Reset</Button>
      </div>
    </Illustration>
  );
}
