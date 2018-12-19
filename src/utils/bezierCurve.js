export const valueAt = (p0, p1, p2, t) => (
  (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2
);

export const pointAt = (p0, p1, p2, t) => ({
  x: valueAt(p0.x, p1.x, p2.x, t),
  y: valueAt(p0.y, p1.y, p2.y, t),
});

export default {
  valueAt,
  pointAt,
};
