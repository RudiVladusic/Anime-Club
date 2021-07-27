import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/RudiVladusic">
        <FontAwesomeIcon icon={faGithub} /> Rudi Vladušić
      </a>
      <a href="https://discord.gg/swgZZxxgsz">
        <FontAwesomeIcon icon={faDiscord} /> Anime Club Discord
      </a>
    </footer>
  );
};

export default Footer;
