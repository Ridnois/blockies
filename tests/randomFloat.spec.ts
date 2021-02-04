import {
  randomFloat,
  hash,
  asFLoat,
  shift,
} from '../src';


describe("randomFLoat", () => {
  describe("asFloat", () => {
    const seed = hash({ seed: "foo" });
    const result = asFLoat(shift(seed()));
    expect(typeof result).toEqual("number");
  });

  describe("Shift", () => {
    const seed = hash({ seed: "foo" });
    expect(shift(seed())).toHaveProperty("ref");
  });

  describe("hash", () => {
    it("should return an array of numbers", () => {
      const seed = hash({ seed: "Hello horld!" })
      expect(seed()).toHaveProperty("ref");
    })
  });

  describe("randomFloat", () => {
    const result = randomFloat({ seed: "foo" })
    expect(result()).not.toEqual(result());
  })
});
