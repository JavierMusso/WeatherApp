import React from "react";
import Logo from "../img/logoHenry.png";
import SearchBar from "./SearchBar.jsx";
import styles from "./styles/Nav.module.css";

//importo Link
import { Link } from "react-router-dom";
//dentro del componente hago los linkeos necesarios.

function Nav({ onSearch }) {
  return (
    <>
      <nav>
        <div className={styles.container}>
          <Link to="/" title="Back to home">
            <div className={styles.logo}>
              <img src={Logo} alt="" />
              <h1>Henry - Weather App</h1>
            </div>
          </Link>
          <div>
            <SearchBar onSearch={onSearch} />
            <Link to="/about" className={styles.about}>
              About Me
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
