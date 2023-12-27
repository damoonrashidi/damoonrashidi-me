import { Ref, useEffect, useState } from "preact/hooks";

export const useResize = (
  canvas: Ref<HTMLCanvasElement>,
  onResize: (width: number, height: number) => void,
) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!canvas.current) {
        return;
      }
      const { width, height } = canvas.current.getBoundingClientRect();
      setMaxWidth(width);
      setMaxHeight(height);
      onResize(width, height);
    });

    if (canvas.current) {
      observer.observe(canvas.current);
    }

    return () => {
      if (canvas.current) {
        observer.unobserve(canvas.current);
      }
    };
  }, [canvas]);

  return [maxWidth, maxHeight];
};
