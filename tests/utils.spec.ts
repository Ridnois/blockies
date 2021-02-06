import { gridArray, shift } from '../src';

describe("gridArray", () => {
  const grid = gridArray({ seed: "Default seed" });
  it("should be symmetric", () => {
    expect(typeof grid).toEqual("object");
    expect(grid).toEqual(grid.reverse());
  });
  it("Should be constant", () => {
    const g1 = gridArray({ seed: 'foo' })
    const g2 = gridArray({ seed: 'foo' })
    expect(g1).toEqual(g2);
  });
});

describe("shift", () => {
  it("should return ann array", () => {
    const result = shift({ seed: 'foo' });
    expect(typeof result.ref).toEqual("object");
  })
})