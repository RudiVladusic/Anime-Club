import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const navClass = `mobileNav`;

  return (
    <>
      <nav>
        <div className="navHeader">
          <Link to="/">
            <span>A</span>nime <span>C</span>lub
          </Link>
        </div>
        <div className="desktopNavLinks">
          <Link to="/search">Search</Link>

          <Link to="/about">About</Link>

          <Link to="/discover">Discover</Link>
        </div>

        <div className="burger" onClick={() => setNavIsOpen(!navIsOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      <div className={navIsOpen ? `${navClass} navActive` : `${navClass}`}>
        <Link onClick={() => setNavIsOpen(!navIsOpen)} to="/search">
          Search
        </Link>
        <Link onClick={() => setNavIsOpen(!navIsOpen)} to="/about">
          About
        </Link>
        <Link onClick={() => setNavIsOpen(!navIsOpen)} to="/discover">
          Discover
        </Link>
      </div>
    </>
  );
};

export default Nav;
