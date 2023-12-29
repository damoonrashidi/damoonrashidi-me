import { Button } from "@/components/ui/button.tsx";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";

function angleBetween(
  x: number,
  y: number,
  destinationX: number,
  destinationY: number,
): number {
  const angle = Math.atan2(y - destinationY, x - destinationX);

  return angle + 0.05;
}

function map(value: number, oldRange: number[], newRange: number[]) {
  const newValue = (value - oldRange[0]) * (newRange[1] - newRange[0]) /
      (oldRange[1] - oldRange[0]) + newRange[0];
  return Math.min(Math.max(newValue, newRange[0]), newRange[1]);
}
export function AngleBetweenIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [center, setCenter] = useState([0, 0]);
  const [mode, setMode] = useState<"lines" | "numbers">("numbers");
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  const [fill, stroke] = useColors();

  useEffect(() => {
    setCenter([maxWidth / 2, maxHeight / 2]);
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
  }, [canvas, ctx, maxWidth, maxHeight, fill, stroke, center, mode]);

  const draw = () => {
    if (!ctx || maxWidth === 0 || maxHeight === 0) {
      return;
    }

    ctx.clearRect(0, 0, maxWidth, maxHeight);
    if (mode === "numbers") {
      for (let y = 0; y < maxHeight; y += 6) {
        for (let x = 0; x < maxWidth; x += 6) {
          const n = Math.round(
            angleBetween(x * 5, y * 5, center[0], center[1]),
          );
          ctx.fillText(`${n}`, x * 5, y * 5);
        }
      }
      return;
    }

    ctx.lineWidth = 0.5;

    for (let i = 0; i < 5_000; i++) {
      let x = Math.random() * maxWidth;
      let y = Math.random() * maxHeight;

      ctx.beginPath();
      ctx.moveTo(x, y);
      let length = 0;
      const stepSize = 5;
      while (x > 0 && y > 0 && x < maxWidth && y < maxHeight && length < 20) {
        const n = angleBetween(x, y, center[0], center[1]);
        x += Math.cos(n * 2.2) * stepSize;
        y += Math.sin(n * 2.2) * stepSize;
        length += stepSize;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };

  return (
    <Illustration>
      <canvas
        className="h-[500px] w-full"
        ref={canvas}
        onMouseMove={(event) =>
          setCenter([
            event.offsetX,
            event.offsetY,
          ])}
      />
      <div className="pt-2">
        <Button
          onClick={() => {
            setMode(mode === "lines" ? "numbers" : "lines");
          }}
        >
          Toggle lines
        </Button>
      </div>
    </Illustration>
  );
}
