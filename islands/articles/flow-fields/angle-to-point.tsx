import { Button } from "@/components/ui/button.tsx";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";

function angleToCenter(x: number, y: number, cx: number, cy: number) {
  const distance = Math.sqrt(
    Math.pow(x - cx, 2) + Math.pow(y - cy, 2),
  );
  return Math.atan2(y - cy, x - cx);
}

export function AngleBetweenIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [center, setCenter] = useState([0, 0]);
  const [mode, setMode] = useState<"lines" | "numbers">("lines");
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
            angleToCenter(x * 5, y * 5, center[0], center[1]) * 10,
          ) / 10;
          ctx.fillText(`${n}`, x * 5, y * 5);
        }
      }
      return;
    }

    ctx.lineWidth = 0.5;

    for (let i = 0; i < 50; i++) {
      let x = Math.random() * maxWidth;
      let y = Math.random() * maxHeight;

      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let i = 0; i < 100; i++) {
        const distance = Math.sqrt(
          Math.pow(x - center[0], 2) + Math.pow(y - center[1], 2),
        );
        const angle = angleToCenter(x, y, center[0], center[1]);

        x = center[0] + Math.cos(angle + 0.01) * distance;
        y = center[1] + Math.sin(angle + 0.02) * distance;
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
