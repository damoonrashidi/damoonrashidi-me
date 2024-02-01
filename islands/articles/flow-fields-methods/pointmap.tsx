import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { Illustration } from "@/islands/articles/illustration.tsx";
import { useColors } from "@/islands/articles/useColors.ts";
import { useResize } from "@/islands/articles/useResize.ts";

function distance([x, y]: [number, number], [ox, oy]: [number, number]) {
  return Math.sqrt(Math.pow(x - ox, 2) + Math.pow(y - oy, 2));
}

function getBoxForCoord(
  x: number,
  y: number,
  maxWidth: number,
  maxHeight: number,
): [number, number] {
  const col = Math.floor((x / maxWidth) * 10);
  const row = Math.floor((y / maxHeight) * 10);
  return [row, col];
}

type Point = [number, number];

export function PointMapIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [pos, setPos] = useState([0, 0]);
  const [generatePoints, setGeneratePoints] = useState(0);
  const [maxWidth, maxHeight] = useResize(canvas, (width, height) => {
    if (canvas.current) {
      canvas.current.width = width;
      canvas.current.height = height;
    }
  });
  const [pointmap, setPointmap] = useState<Point[][][]>(
    Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => [])),
  );
  const [fill, stroke] = useColors();

  useEffect(() => {
    if (ctx) {
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
    if (!maxWidth || !maxHeight) {
      return;
    }

    const clone: Point[][][] = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => []),
    );

    const pointCount = Math.round(Math.random() * 1200);

    for (let i = 0; i < pointCount; i++) {
      const x = Math.random() * maxWidth;
      const y = Math.random() * maxHeight;
      const [row, col] = getBoxForCoord(x, y, maxWidth, maxHeight);
      if (clone[row] && clone[row][col]) {
        clone[row][col].push([x, y]);
      }
    }
    setPointmap(clone);
  }, [maxWidth, maxHeight, generatePoints]);

  useEffect(() => {
    draw();
  }, [canvas, ctx, maxWidth, maxHeight, fill, stroke, pos, pointmap]);

  const draw = () => {
    if (!ctx || maxWidth === 0 || maxHeight === 0) {
      return;
    }

    for (let row = 0; row < pointmap.length; row++) {
      for (let col = 0; col < pointmap[row].length; col++) {
        for (const [x, y] of pointmap[row][col]) {
          if (pos[1] === col && pos[0] == row) {
            ctx.fillStyle = "#ea9d34";
          } else {
            ctx.fillStyle = "#9893a5";
          }
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let y = 0; y < maxHeight; y += maxHeight * 0.1) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(maxWidth, y);
      ctx.stroke();
    }
    for (let x = 0; x < maxWidth; x += maxWidth * 0.1) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, maxHeight);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(maxWidth, 0);
    ctx.lineTo(maxWidth, maxHeight);
    ctx.lineTo(0, maxHeight);
    ctx.stroke();
  };

  return (
    <Illustration>
      <canvas
        className="h-[500px] w-full touch-none"
        ref={canvas}
        onMouseMove={(event) =>
          setPos(
            getBoxForCoord(event.offsetX, event.offsetY, maxWidth, maxHeight),
          )
        }
        onTouchMove={(event) => {
          const [touch] = event.touches;
          const bbox = event.currentTarget.getBoundingClientRect();
          setPos(
            getBoxForCoord(
              touch.clientX - bbox.left,
              touch.clientY - bbox.top,
              maxWidth,
              maxHeight,
            ),
          );
        }}
      />
      <div className="pt-2">
        <Button
          onClick={() => {
            ctx?.clearRect(0, 0, maxWidth, maxHeight);
            setGeneratePoints(Math.random());
          }}
        >
          Generate new points
        </Button>
      </div>
    </Illustration>
  );
}
