import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="main-content about">
      <div className="main-content-wrapper about-wrapper">
        <header>
          <h2>Anime Club</h2>
          <p>Your own anime booklet!</p>
        </header>
      </div>
    </main>
  );
};

export default About;
