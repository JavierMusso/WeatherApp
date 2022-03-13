import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Nav from "../components/Nav.jsx";
import Cards from "../components/Cards.jsx";
import About from "../components/About.jsx";
import City from "../components/City.jsx";

const apiKey = "fb3ef08cbb8111cdefd7f1a2ff808d1f";

function App() {
  // defino estado de lista de ciudades
  const [cities, setCities] = useState([]);
  const [cachedCities, setCachedCities] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  function onClose(id) {
    setCities((oldCities) => oldCities.filter((c) => c.id !== id));
  }

  // defino la funcion que hace fetch mediante el nombre que yo le paso
  function fetchByCity(ciudad) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`
    )
      .then((r) => r.json())
      .then((recurso) => {
        if (recurso.main !== undefined) {
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon,
          };
          setCities((oldCities) => [...oldCities, ciudad]);
          setCachedCities((oldCache) => [...oldCache, ciudad]);
          fetchData(ciudad.latitud, ciudad.longitud, ciudad.name);
        } else {
          alert(`Ciudad ${ciudad} no encontrada`);
        }
      });
  }

  function fetchData(lat, lon, ciudad) {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`
    )
      .then((r) => r.json())
      .then((recurso) => {
        if (recurso !== undefined) {
          setDailyData((prev) => [
            ...prev,
            { [ciudad.toLowerCase()]: recurso },
          ]);
        }
      });
  }

  function onSearch(ciudad) {
    // verifico si mi lista de cache tiene alguna ciudad adentro (cuando ya hice algun search)
    if (cachedCities.length) {
      // verifico si esta renderizada la ciudad
      let isRendered = cities.find(
        (city) => city.name.toLowerCase() === ciudad
      );

      // verifico si esta en cache la ciudad
      let isCached = cachedCities.find(
        (city) => city.name.toLowerCase() === ciudad
      );

      // si esta renderizada, no hacer nada
      if (!isRendered) {
        // si no esta renderizada, deberia checkear si esta en cache
        if (isCached) {
          // si esta en cache, renderizarla usando la del cache, para no volver a consumir la api
          //console.log(`mostrando ${ciudad} mediante CACHE`);
          setCities((oldCities) => [...oldCities, isCached]);
        } else {
          // si no esta en cache, hacer fetch a la api
          //console.log(`mostrando ${ciudad} mediante fetch`);
          fetchByCity(ciudad);
        }
      } else {
        alert(`Los datos de ${ciudad} ya estan cargados`);
      }
    } else {
      // este else es para cuando la lista cache esta vacia(no hice ningun search)
      //console.log(`mostrando ${ciudad} mediante fetch`);
      fetchByCity(ciudad);
    }
  }

  const onFilter = (ciudadId) => {
    return cities.find((c) => c.id === parseInt(ciudadId));
  };

  return (
    <Router>
      <div className="App">
        <Nav onSearch={onSearch} />
        <Routes>
          <Route
            path="/"
            element={<Cards cities={cities} onClose={onClose} />}
          />
          <Route path="about" element={<About />} />
          <Route
            path="/ciudad/:ciudadId"
            element={
              <City
                onFilter={onFilter}
                onClose={onClose}
                dailyData={dailyData}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
