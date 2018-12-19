import bezierCurve from './bezierCurve';

describe('bezierCurve', () => {
  it('should calculate point on bezier curve', () => {
    const startPoint = { x: 100, y: 100 };
    const controlPoint = { x: 400, y: 400 };
    const endPoint = { x: 200, y: 200 };

    const point = bezierCurve.pointAt(startPoint, controlPoint, endPoint, 0.5);

    expect(point).toEqual({ x: 275, y: 275 });
  });
});
