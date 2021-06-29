export const getLandingContent = async (endpoint) => {
  const call = await fetch(endpoint);
  const result = await call.json();

  if (!call.ok) {
    const message = `Something went wrong while fetching the data`;
    throw new Error(message);
  }
  return result;
};
