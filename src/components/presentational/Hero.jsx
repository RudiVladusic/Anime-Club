import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <header className="hero-overlay__header">
          <h2>
            Psycho Pass <span>(TV)</span>
          </h2>
          <h3>New episodes - Fridays at 00:55 (JST)</h3>
        </header>
        <div className="hero-overlay__description">
          <p>
            Using these "crime coefficients", a culprit can be apprehended
            before they ever commit a crime. But is it a perfect system?
          </p>
        </div>
        <Link className="hero-overlay__link" to="/anime/39491" role="button">
          Trailer <FontAwesomeIcon icon={faFilm} />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
