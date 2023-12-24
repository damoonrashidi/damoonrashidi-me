import { Illustration } from "@/components/articles/illustration.tsx";
import { useEffect, useRef } from "preact/hooks";

export function NoiseIllustration() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const ctx = canvas.current.getContext("2d")!;

    ctx.fillRect(0, 0, 400, 400);
  }, [canvas]);

  return (
    <Illustration>
      <canvas ref={canvas} />
    </Illustration>
  );
}
