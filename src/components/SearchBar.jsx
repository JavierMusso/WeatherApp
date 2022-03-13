import React, { useState } from "react";
import styles from "./styles/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(city.toLowerCase());
        setCity("");
      }}
    >
      <input
        className={styles.input}
        type="text"
        placeholder="City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input className={styles.submit} type="submit" value="Search" />
    </form>
  );
}
