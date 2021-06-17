const api = `https://api.jikan.moe/v3/top/anime/1/`;

export const getUpcomingAnime = async () => {
  const call = await fetch(`${api}upcoming`);
  const result = await call.json();
  return result;
};

export const getTrendingAnime = async () => {
  const call = await fetch(`${api}airing`);
  const result = await call.json();
  return result;
};

export const getSpecials = async () => {
  const call = await fetch(`${api}special`);
  const result = await call.json();
  return result;
};
