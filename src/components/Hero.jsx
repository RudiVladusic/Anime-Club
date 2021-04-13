import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="heroMain">
      <div className="heroContainer">
        <header className="heroHeader">
          <h2>
            Psycho Pass - new season <span>(TV)</span>
          </h2>
        </header>
        <p>
          Using these "crime coefficients", a culprit can be apprehended before
          they ever commit a crime. But is it a perfect system?
        </p>
        <Link className="heroLink" to="/anime/39491" role="button">
          Trailer 🎞️
        </Link>
      </div>
    </div>
  );
};

export default Hero;
