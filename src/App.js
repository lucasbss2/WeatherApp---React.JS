import React, { useState } from "react";

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "8c31e73c684d1d68959873e37c86255f",
  language: "pt_br",
  units: "metric",
};

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});

  const fetchApi = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setWeather(result);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const searchEvt = (e) => {
    if (e.key === "Enter" && input != "") {
      const url = `${api.base}weather?q=${input}&units=${api.units}&APPID=${api.key}&lang=${api.language}`;
      fetchApi(url);
    }
  };

  const dateBuilder = (d) => {
    const Months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const Days = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    let Day = Days[d.getDay()];
    let Date = d.getDate();
    let Month = Months[d.getMonth()];
    let Year = d.getFullYear();

    return `${Day} - ${Date} de ${Month} de ${Year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 24
            ? "App-warm"
            : "App-cold"
          : "App"
      }
    >
      <main>
        <div className="searchBox">
          <input
            type="text"
            className="searchInput"
            placeholder="Digite o nome da cidade."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyPress={searchEvt}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="infoBox">
              <div className="locationBox">
                <div className="Location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="Date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weatherContainer">
                <div className="Temp">{Math.ceil(weather.main.temp)}°C</div>
                <div className="Weather">
                  {weather.weather[0].description.charAt(0).toUpperCase() +
                    weather.weather[0].description.slice(1)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
