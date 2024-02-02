import { Illustration } from "@/islands/articles/illustration.tsx";
import { useColors } from "@/islands/articles/useColors.ts";
import { useResize } from "@/islands/articles/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";

// function distance(a: [number, number], b: [number, number]): number {
// 	return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
// }

// function angleBetween(a: [number, number], b: [number, number]): number {
// 	return Math.atan2(a[1] - b[1], a[0] - b[1]);
// }

export function VectorIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [xSmooth, setXSmooth] = useState(100);
  const [ySmooth, setYSmooth] = useState(100);
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  const [fill, stroke] = useColors();

  useEffect(() => {
    if (canvas.current) {
      const currentCtx = canvas.current.getContext("2d");
      if (currentCtx) {
        setCtx(currentCtx);
      }
    }
  }, [canvas]);

  useEffect(() => {
    if (ctx) {
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
    }
    draw();
  }, [ctx, fill, stroke, maxHeight, maxWidth, xSmooth, ySmooth]);

  const draw = () => {
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, maxWidth, maxHeight);

    for (let y = 0; y < maxHeight; y += 10) {
      for (let x = 0; x < maxWidth; x += 10) {
        const nx = x + Math.sin(x / xSmooth) * 8;
        const ny = y + Math.sin(y / ySmooth) * 8;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
      }
    }
  };

  return (
    <Illustration>
      <canvas className="h-[500px] w-full" ref={canvas} />
      <div className="py-4 flex gap-4 flex-col">
        <div className="flex gap-4 py-2 items-center">
          <label for="x-smooths">Smooth X</label>
          <input
            id="x-smooths"
            type="range"
            step={1}
            min={1}
            max={500}
            value={xSmooth}
            onInput={(e) => setXSmooth(parseInt(e.currentTarget.value, 10))}
          />
          <span>{xSmooth}</span>
        </div>
        <div className="flex gap-4 py-2 items-center">
          <label for="y-smooths">Smooth Y</label>
          <input
            type="range"
            step={1}
            min={1}
            max={500}
            id="smoothness_angles"
            value={ySmooth}
            onInput={(e) => setYSmooth(parseInt(e.currentTarget.value, 10))}
          />
          <span>{ySmooth}</span>
        </div>
      </div>
    </Illustration>
  );
}
