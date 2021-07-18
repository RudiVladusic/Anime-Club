import { useState, useEffect } from "react";

export const useGetLandingContent = (endpoint) => {
  const [upcomingAnime, setUpcomingAnime] = useState(Array);
  const [airingAnime, setAiringAnime] = useState(Array);
  const [specials, setTopSpecials] = useState(Array);

  const landingContentCall = async (endpoint) => {
    const call = await fetch(endpoint, { method: "GET" });
    const result = await call.json();

    if (!call.ok) {
      const message = `Something went wrong while fetching the data`;

      throw new Error(message);
    }

    return result;
  };

  useEffect(() => {
    landingContentCall(`${endpoint}upcoming`)
      .then((result) => {
        setUpcomingAnime(result.top);
        console.log(result.top);
      })
      .catch((err) => console.log(err));

    landingContentCall(`${endpoint}airing`)
      .then((result) => setAiringAnime(result.top))
      .catch((err) => console.log(err));

    landingContentCall(`${endpoint}special`)
      .then((result) => setTopSpecials(result.top))
      .catch((err) => console.log(err));
  }, [endpoint]);

  return { upcomingAnime, airingAnime, specials };
};
