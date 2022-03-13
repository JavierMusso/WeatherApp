import React from "react";
import { useParams } from "react-router";
import styles from "./styles/City.module.css";
import { Link } from "react-router-dom";
import DailyWeather from "./DailyWeather";

export default function City({ onFilter, onClose, dailyData }) {
  const { ciudadId } = useParams();

  let city = onFilter(ciudadId); // le doy una id, me devuelve un objeto con la ciudad en cuestion

  // ahora que tengo el nombre, lo utilizo para buscarlo en la lista de data diaria
  let cityName = city.name.toLowerCase();

  // itero por la lista de data diaria, buscando la que necesito segun mi nombre de ciudad
  for (let data of dailyData) {
    if (data[cityName]) {
      var cityData = data[cityName];
    }
  }

  // creo una lista de los 7 dias que quiero mostrar, descontando el primer dia
  // usando .shift no funcionaba.. sacaba 2 veces del final o cosas extrañas
  let listOfDays = [];
  for (let i = 1; i < cityData.daily.length; i++) {
    listOfDays.push(cityData.daily[i]);
  }

  // mi funcion para formatear tiempo unix
  let myTimezoneAdjust = 10800;
  let timezone_offset = cityData.timezone_offset;
  function timeFormatting(unixTime) {
    let unixTimestamp = unixTime + timezone_offset + myTimezoneAdjust;

    let date = new Date(unixTimestamp * 1000);
    let day = date.getDay();
    let hour = date.getHours();
    let minutes = `0${date.getMinutes()}`;

    return { hours: `${hour}:${minutes.substr(-2)}`, days: day };
  }

  function dayOfWeek(n) {
    switch (n) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return "osvaldo";
    }
  }

  return !cityData ? (
    <div>No se encontro la ciudad</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"
            ></path>
          </svg>
        </Link>
      </div>
      <Link to="/">
        <button className={styles.btnClose} onClick={() => onClose(city.id)}>
          X
        </button>
      </Link>
      <h2>{city.name}</h2>
      <div className={styles.current}>
        <p>
          Local Time <span>{timeFormatting(cityData.current.dt).hours}</span>
        </p>
        <div className={styles.details}>
          <div>
            <p>
              Sunrise at{" "}
              <span>{timeFormatting(cityData.current.sunrise).hours}</span>
            </p>
            <p>
              Sunset at{" "}
              <span>{timeFormatting(cityData.current.sunset).hours}</span>
            </p>
          </div>
          <div>
            <p>Temp: {cityData.current.temp}°</p>
            <p>Humidity: {cityData.current.humidity} %</p>
          </div>
          <div className={styles.icon}>
            <img
              className="iconoClima"
              src={`http://openweathermap.org/img/wn/${cityData.current.weather[0].icon}@2x.png`}
              width="80"
              height="80"
              alt=""
              title={cityData.current.weather[0].description}
            />
          </div>
        </div>
      </div>
      <h3>Next week weather</h3>
      <div className={styles.forecast}>
        {listOfDays.map((day, i) => (
          <DailyWeather
            dataOfDay={day}
            dayOfWeek={dayOfWeek(i + 1)}
            key={i}
          ></DailyWeather>
        ))}
      </div>
    </div>
  );
}
