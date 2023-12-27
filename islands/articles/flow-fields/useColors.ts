import { useEffect, useState } from "preact/hooks";

export const useColors = () => {
  const [fill, setFill] = useState("#000");
  const [stroke, setStroke] = useState("#000");

  useEffect(() => {
    const strokeStyle = getComputedStyle(document.body).getPropertyValue(
      "--text-fg",
    );

    const fillStyle = getComputedStyle(document.body).getPropertyValue(
      "--text-fg",
    );

    setStroke(strokeStyle);
    setFill(fillStyle);
  }, []);

  useEffect(() => {
    const callback = () => {
      const strokeStyle = getComputedStyle(document.body).getPropertyValue(
        "--text-fg",
      );

      const fillStyle = getComputedStyle(document.body).getPropertyValue(
        "--text-fg",
      );

      setStroke(strokeStyle);
      setFill(fillStyle);
    };

    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", callback);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener(
        "change",
        callback,
      );
    };
  }, []);

  return [fill, stroke];
};
