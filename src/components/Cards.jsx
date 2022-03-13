import React from "react";
import styles from "./styles/Cards.module.css";

import Card from "./Card.jsx";

export default function Cards({ cities, onClose }) {
  return !cities.length ? (
    <div className={styles.container}>
      Nothing to show, use the search bar to find your city!
    </div>
  ) : (
    <div className={styles.container}>
      {cities.map((city) => (
        <Card key={city.id} city={city} onClose={onClose} />
      ))}
    </div>
  );
}
