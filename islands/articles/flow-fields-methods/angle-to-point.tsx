import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { Illustration } from "../illustration.tsx";
import { useColors } from "../useColors.ts";
import { useResize } from "../useResize.ts";

function angleToCenter(x: number, y: number, cx: number, cy: number) {
	return Math.atan2(y - cy, x - cx);
}
const colors = ["#f6c177", "#ea9a97", "#3e8fb0", "#9ccfd8", "#2a283e"];

const points: [number, number, string, number][] = Array.from(
	{ length: 5 },
	() => [
		Math.random() * 500,
		Math.random() * 595,
		colors[Math.floor(Math.random() * colors.length)],
		Math.random() * 20 + 10 - 10,
	],
);

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
					const distance = Math.sqrt(
						(x - center[0]) ** 2 + (y - center[1]) ** 2,
					);
					const n =
						Math.round(
							(angleToCenter(x * 5, y * 5, center[0], center[1]) -
								1 / distance) *
								10,
						) / 10;

					ctx.fillText(`${n}`, x * 5, y * 5);
				}
			}
			return;
		}

		ctx.lineWidth = 2.5;

		for (let [x, y, color, width] of points) {
			ctx.lineWidth = width;
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(x, y);
			for (let i = 0; i < 1000; i++) {
				const distance = Math.sqrt((x - center[0]) ** 2 + (y - center[1]) ** 2);
				const angle = angleToCenter(x, y, center[0], center[1]);

				x =
					center[0] + Math.cos(angle + 0.01) * (distance - 0.1) + Math.random();
				y =
					center[1] +
					Math.sin(angle + 0.015) * (distance - 0.15) +
					Math.random();

				if (Math.abs(x - center[0]) < 10 && Math.abs(y - center[1]) < 15) {
					break;
				}
				ctx.lineTo(x, y);
			}
			ctx.stroke();
		}
	};

	return (
		<Illustration>
			<canvas
				className="h-[500px] w-full touch-none"
				ref={canvas}
				onMouseMove={(event) => setCenter([event.offsetX, event.offsetY])}
				onTouchMove={(event) => {
					const [touch] = event.touches;
					const bbox = event.currentTarget.getBoundingClientRect();
					setCenter([touch.clientX - bbox.left, touch.clientY - bbox.top]);
				}}
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
