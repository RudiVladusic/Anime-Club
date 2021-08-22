import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <div className="footer-icon-stack">
        <a href="https://github.com/RudiVladusic">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="https://discord.gg/swgZZxxgsz">
          <FontAwesomeIcon icon={faDiscord} size="2x" />
        </a>
      </div>
      <div className="footer-subscribe-stack">
        <input type="text" placeholder="Enter your email..." />
        <button type="submit">Subscribe</button>
      </div>
      <div className="footer-description-stack">
        <p>Website made with ReactJS. Jikan API is used to render content.</p>
        <p>All images and information belong to their respective owners.</p>
      </div>
    </footer>
  );
};

export default Footer;
