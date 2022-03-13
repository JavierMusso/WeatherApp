import React from "react";
import styles from "./styles/About.module.css";

export default function About() {
  return (
    <div className={styles.aboutme}>
      <h2>
        Weather App by{" "}
        <a
          href="https://www.linkedin.com/in/javier-musso"
          target="_blank"
          rel="noreferrer"
        >
          Javier Musso
        </a>
      </h2>
      <p>
        Hi! My name is{" "}
        <a
          href="https://www.linkedin.com/in/javier-musso"
          target="_blank"
          rel="noreferrer"
        >
          Javier Musso
        </a>{" "}
        and I'm currently taking{" "}
        <a href="https://www.soyhenry.com/" target="_blank" rel="noreferrer">
          Henry
        </a>
        's FullStack Web Developer Bootcamp.
        <br />
        It's been great so far, learning from the basics, to deep down JS
        internals.
      </p>
      <p>
        This app is done with React, following ES6 standards. Such as CSS
        Modules, npx React-create-app and modular components.
      </p>
      <p>
        Huge thanks to my TAs at Henry, helping on every little details.
        <br />
        And thanks to{" "}
        <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">
          OpenWeather.org
        </a>{" "}
        for the free access to their powerfull API.
      </p>
      <small>This site is not fully responsive. Yet ;-&#41;</small>
    </div>
  );
}
