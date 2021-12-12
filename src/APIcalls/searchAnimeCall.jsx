export const searchAnimeCall = async (query) => {
  const call = await fetch(
    `https://api.jikan.moe/v3/search/anime?q=${query}&page=1&genre_exclude=1`
  );
  if (!call.ok) {
    throw Error(`Could not fetch`);
  }
  const result = await call.json();
  return result;
};
