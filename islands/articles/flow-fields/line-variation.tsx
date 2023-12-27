import { perlinNoise2D } from "$noise";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useColors } from "@/islands/articles/flow-fields/useColors.ts";
import { useResize } from "@/islands/articles/flow-fields/useResize.ts";
import { useEffect, useRef, useState } from "preact/hooks";

const noise = perlinNoise2D();
const positions = Array.from(
  { length: 4_000 },
  () => [Math.random() * 595, Math.random() * 500],
);

export function LineVariationIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fill, stroke] = useColors();
  const [maxLineLength, setMaxLineLength] = useState(10);
  const [warp, setWarp] = useState(1.0);
  const [stepSize, setStepSize] = useState(15);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });

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
  }, [ctx, fill, stroke, maxHeight, maxWidth, maxLineLength, warp, stepSize]);

  const draw = () => {
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, maxWidth, maxHeight);
    ctx.lineWidth = 0.5;

    for (let i = 0; i < positions.length; i++) {
      let x = positions[i][0];
      let y = positions[i][1];
      let length = 0;
      ctx.beginPath();
      ctx.moveTo(x, y);
      while (
        x > 0 && y > 0 && x < maxWidth && y < maxHeight &&
        length < maxLineLength
      ) {
        const n = noise(x / 80, y / 80);
        x += Math.cos(n * warp) * stepSize;
        y += Math.sin(n * warp) * stepSize;
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
      />
      <div className="pt-4 flex flex-col gap-4">
        <div className="flex gap-2">
          <span>Warp</span>
          <input
            type="range"
            value={warp}
            min={0.5}
            max={4.4}
            step={0.1}
            onChange={(event) => setWarp(parseFloat(event.currentTarget.value))}
          />
          <span className="inline-block w-[50px]">{warp}</span>
        </div>

        <div className="flex gap-2">
          <span>Max length</span>
          <input
            type="range"
            value={maxLineLength}
            min={5}
            max={150}
            onChange={(event) =>
              setMaxLineLength(parseInt(event.currentTarget.value, 10))}
          />
          <span className="inline-block w-[50px]">{maxLineLength}</span>
        </div>

        <div className="flex gap-2">
          <span>Step size</span>
          <input
            type="range"
            value={stepSize}
            min={5}
            max={100}
            onChange={(event) =>
              setStepSize(parseInt(event.currentTarget.value, 10))}
          />
          <span className="inline-block w-[50px]">{stepSize}</span>
        </div>
      </div>
    </Illustration>
  );
}
