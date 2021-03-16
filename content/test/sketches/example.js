function map(v, min1, max1, min2, max2) {
  let n = (v - min1) / (max1 - min1);
  return v * (max2 + min2) + min2;
}
