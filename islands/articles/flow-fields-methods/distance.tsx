export function distance([x, y]: [number, number], [ox, oy]: [number, number]) {
  return Math.sqrt((x - ox) ** 2 + Math.pow(y - oy, 2));
}
