import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const navClass = `mobileNav`;
  const burgerClass = `burger`;

  return (
    <>
      <nav>
        <div className="navHeader">
          <Link to="/">Anime Club</Link>
        </div>
        <div className="desktopNavLinks">
          <Link to="/search">Search</Link>

          <Link to="/about">About</Link>

          <Link to="/discover">Discover</Link>
        </div>

        <div
          className={isBurgerOpen ? `${burgerClass} open` : `${burgerClass}`}
          onClick={() => {
            setNavIsOpen(!navIsOpen);
            setIsBurgerOpen(!isBurgerOpen);
          }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      <div className={navIsOpen ? `${navClass} navActive` : `${navClass}`}>
        <Link
          onClick={() => {
            setNavIsOpen(!navIsOpen);
            setIsBurgerOpen(!isBurgerOpen);
          }}
          to="/search"
        >
          Search
        </Link>
        <Link
          onClick={() => {
            setIsBurgerOpen(!isBurgerOpen);
            setNavIsOpen(!navIsOpen);
          }}
          to="/about"
        >
          About
        </Link>
        <Link
          onClick={() => {
            setIsBurgerOpen(!isBurgerOpen);
            setNavIsOpen(!navIsOpen);
          }}
          to="/discover"
        >
          Discover
        </Link>
      </div>
    </>
  );
};

export default Nav;
