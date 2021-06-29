export const filterAnimeCall = async (query) => {
  const call = await fetch(`https://api.jikan.moe/v3/genre/anime/${query}/1`);
  const result = await call.json();
  if (!call.ok) {
    throw Error(`Could not fetch`);
  }
  return result;
};
