import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(Boolean);
  const [isBurgerOpen, setIsBurgerOpen] = useState(Boolean);
  const [distance, setDistance] = useState(Number);

  const handleScroll = () => {
    const position = window.pageYOffset;

    setDistance(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openMobileMenuHandler = () => {
    setIsNavOpen(!isNavOpen);
    setIsBurgerOpen(!isBurgerOpen);

    document.body.classList.toggle("overflow-hidden");
  };

  return (
    <>
      <nav className={distance > 100 ? `position-fixed` : ``}>
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
