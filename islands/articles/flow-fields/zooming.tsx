import { openSimplexNoise2D } from "$noise";
import { Code } from "@/islands/articles/code.tsx";
import { Illustration } from "@/islands/articles/flow-fields/illustration.tsx";
import { useState } from "preact/hooks";
const noise = openSimplexNoise2D();

export function ZoomingIllustration() {
  const [smooth, setSmooth] = useState(20);

  return (
    <Illustration>
      <Code>
        {`const smoothness = ${smooth};
const p1 = [1.0, 1.0];
const p2 = [1.0, 2.0];
distance(p1, p2) // returns 1.0;
distance(
  [p1.x / ${smooth}, p1.y / ${smooth}],
  [p2.x / ${smooth}, p2.y / ${smooth}],
)  // returns ${(1 / smooth).toPrecision(3)}
        `}
      </Code>
      <div className="pb-2 flex gap-4 py-4 items-center justify-center">
        <label for="zoom-smooth">smoothness</label>
        <input
          type="range"
          min={1}
          max={100}
          value={smooth}
          onChange={(event) => setSmooth(Number(event.currentTarget.value))}
        />
      </div>
    </Illustration>
  );
}
