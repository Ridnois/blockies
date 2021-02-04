export interface hash {
  seed: string;
  ref?: number[];
}

export const shift = (origin: hash) => {
  const { ref = [0, 0, 0, 0] } = origin;
  var t = ref[0] ^ (ref[0] << 11);
  ref[0] = ref[1];
  ref[1] = ref[2];
  ref[2] = ref[3];
  ref[3] = (ref[3] ^ (ref[3] >> 19) ^ t ^ (t >> 8));
  return { ...origin, ref };
}

export const asFLoat = (origin: hash) => {
  const { ref = [0, 0, 0, 0] } = origin;
  return (ref[3] >>> 0) / ((1 << 31) >>> 0);
}


export const hash = (origin: hash) => {
  const { seed, ref = [0, 0, 0, 0] } = origin;
  return () => {
    seed.split("").map((char: string, i: number) => {
      ref[i % 4] = ((ref[i % 4] << 5) - ref[i % 4]) + char.charCodeAt(0);
    });
    return {
      seed,
      ref,
    }
  }
}

export const randomFloat = (origin: hash) => {
  const reference = hash(origin);
  return () => asFLoat(shift(reference()))
}