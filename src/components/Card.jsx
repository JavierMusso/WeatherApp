import React from "react";
import { Link } from "react-router-dom";
import "./styles/Card.module.css";

export default function Card({ city, onClose }) {
  return (
    <article>
      <button onClick={() => onClose(city.id)}>X</button>
      <Link to={`/ciudad/${city.id}`}>
        <h3>{city.name}</h3>
        <div>
          <div>
            <p>Min</p>
            <span>{city.min}°</span>
          </div>
          <div>
            <p>Max</p>
            <span>{city.max}°</span>
          </div>
          <div>
            <img
              className="iconoClima"
              src={`http://openweathermap.org/img/wn/${city.img}@2x.png`}
              width="80"
              height="80"
              alt=""
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
