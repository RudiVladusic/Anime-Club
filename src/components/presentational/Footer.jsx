import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-icon-stack">
          <a href="https://github.com/RudiVladusic">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://discord.gg/swgZZxxgsz">
            <FontAwesomeIcon icon={faDiscord} size="2x" />
          </a>
        </div>

        <div className="footer-description-stack">
          <h2>Disclaimer</h2>
          <p>
            This is a personal project website made for practice. It displays
            information about various anime shows and manga. Users can search
            information about their favorite shows as well as discover new ones.
          </p>
          <p>
            Images and information about shows is fetched with{" "}
            <a href="https://jikan.moe/">Jikan API</a>.
          </p>
          <p>All images and information belong to their respective owners.</p>
          <p>Thank you for reading ❤</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
