import { useState, useEffect } from "react";

export const useMangaCall = (mangaEndpoint) => {
  const [manga, setTopManga] = useState(Array);
  const mangaCall = async (mangaEndpoint) => {
    const call = await fetch(mangaEndpoint, { method: "GET" });
    const result = await call.json();

    if (!call.ok) {
      const message = `Something went wrong while fetching data`;
      throw new Error(message);
    }

    return result;
  };

  useEffect(() => {
    mangaCall(mangaEndpoint)
      .then((res) => {
        setTopManga(res.top);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mangaEndpoint]);

  return { manga };
};
