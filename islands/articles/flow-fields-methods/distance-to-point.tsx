import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { Illustration } from "../illustration.tsx";
import { useColors } from "../useColors.ts";
import { useResize } from "../useResize.ts";

const points = Array.from({ length: 1000 }, () => [
	Math.random() * 595,
	Math.random() * 595,
]);

function distanceToCenter(
	x: number,
	y: number,
	destinationX: number,
	destinationY: number,
): number {
	const dx = x - destinationX;
	const dy = y - destinationY;
	return Math.sqrt(dx ** 2 + dy ** 2);
}

export function DistanceToPointIllustration() {
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
						distanceToCenter(x * 5, y * 5, center[0], center[1]),
					);
					ctx.fillText(`${n}`, x * 5, y * 5);
				}
			}
			return;
		}

		for (let [x, y] of points) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			let length = 0;
			while (x > 0 && y > 0 && x < maxWidth && y < maxHeight && length < 150) {
				const n = distanceToCenter(x, y, center[0], center[1]);
				x += Math.cos(n / 4) * 2;
				y += Math.sin(n / 4) * 2;
				length += 2;
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
