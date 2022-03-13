import React from "react";
import styles from "./styles/DailyWeather.module.css";

function DailyWeather({ dataOfDay, dayOfWeek }) {
  return (
    <div className={styles.container}>
      <h5>{dayOfWeek}</h5>
      <img
        className="iconoClima"
        src={`http://openweathermap.org/img/wn/${dataOfDay.weather[0].icon}@2x.png`}
        width="80"
        height="80"
        alt=""
        title={dataOfDay.weather[0].description}
      />
      <p>
        Min: <span>{dataOfDay.temp.min}°</span>
      </p>
      <p>
        Max: <span>{dataOfDay.temp.max}°</span>
      </p>
      <p>
        Hum: <span>{dataOfDay.humidity} %</span>
      </p>
    </div>
  );
}

export default DailyWeather;
