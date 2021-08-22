import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(Boolean);
  const [isBurgerOpen, setIsBurgerOpen] = useState(Boolean);

  const openMobileMenuHandler = () => {
    setIsNavOpen(!isNavOpen);
    setIsBurgerOpen(!isBurgerOpen);

    document.body.classList.toggle("overflow-hidden");
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <div className="nav-header">
            <Link to="/">Anime Club</Link>
          </div>
          <div className="desktop-nav-links">
            <Link to="/search">Search</Link>

            <Link to="/about">About</Link>

            <Link to="/discover">Discover</Link>
          </div>

          <div
            className={isBurgerOpen ? `burger open` : `burger`}
            onClick={openMobileMenuHandler}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </nav>

      <div
        className={isNavOpen ? `mobile-nav mobile-nav-active` : `mobile-nav`}
      >
        <Link onClick={openMobileMenuHandler} to="/search">
          Search
        </Link>
        <Link onClick={openMobileMenuHandler} to="/about">
          About
        </Link>
        <Link onClick={openMobileMenuHandler} to="/discover">
          Discover
        </Link>
      </div>
    </>
  );
};

export default Nav;
