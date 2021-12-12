import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../Search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(Boolean);
  const [isBurgerOpen, setIsBurgerOpen] = useState(Boolean);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openMobileMenuHandler = () => {
    setIsNavOpen(!isNavOpen);
    setIsBurgerOpen(!isBurgerOpen);
  };

  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isNavOpen]);

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/">
            <div className="nav-header"></div>
          </Link>

          <div className="nav-search-stack">
            <Search
              isSearchOpen={isSearchOpen}
              isNavOpen={isNavOpen}
              isBurgerOpen={isBurgerOpen}
              setIsBurgerOpen={setIsBurgerOpen}
              setIsNavOpen={setIsNavOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
            <FontAwesomeIcon
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
              }}
              className="form-trigger-icon"
              icon={faSearch}
              size="2x"
            />
          </div>

          <div className="desktop-nav-links">
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
        {/* <Link onClick={openMobileMenuHandler} to="/search">
          Search
        </Link> */}
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
