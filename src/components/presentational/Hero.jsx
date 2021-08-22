import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay-wrapper">
        <div className="hero-overlay">
          <header className="hero-overlay__header">
            <h2>Psycho Pass</h2>
          </header>
          <div className="hero-overlay__description">
            <p>
              Using these "crime coefficients", a culprit can be apprehended
              before they ever commit a crime. But is it a perfect system? For
              Inspectors Kei Mikhail Ignatov and Arata Shindou, that remains to
              be seen, as their career with the Public Safety Bureau's Crime
              Investigation Department has only just begun.
            </p>
          </div>
          <Link className="hero-overlay__link" to="/anime/39491" role="button">
            Watch trailer <FontAwesomeIcon icon={faFilm} />
          </Link>
          <div className="hero-overlay__icon-stack">
            <a href="https://github.com/RudiVladusic">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://discord.gg/swgZZxxgsz">
              <FontAwesomeIcon icon={faDiscord} size="2x" />
            </a>
            <a href="mailto:47flint@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
