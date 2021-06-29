export const getRandomGenre = (min, max, exclude) => {
  let calc = Math.floor(Math.random() * (max - min) + min);
  if (calc === exclude || calc === 33 || calc === 34) {
    calc = calc + 2;
  }
  return calc;
};
