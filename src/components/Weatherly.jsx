import { useEffect, useState } from "react";
import sun from "../assets/sun.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";
import rain from "../assets/rain.png";
import cloud from "../assets/cloud.png";
import notfoundimg from "../assets/notfound.png";

import Child from "./Child";
import Style from "./weatherly.module.css";
import { FaSearch } from "react-icons/fa";

const Weatherly = () => {
  const [inputcity, setInputCity] = useState("chennai");

  const [weatherimg, setWeatherImg] = useState(sun);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(85);
  const [wind, setWind] = useState(50);

  const [citynotfound, setCityNotFound] = useState(false);

  const image = {
    "01d": sun,
    "01n": sun,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  useEffect(() => {
    search();
  }, []);

  const handleChange = (e) => {
    setInputCity(e.target.value);
  };

  const search = async () => {
    try {
      const apikey="438039b1e80e093c1635d7e332ba8af8";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputcity}&appid=${apikey}&units=metric`;
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod == 404) {
        setCityNotFound(true);
        console.log("city not found");
        return;
      }
      setWeatherImg(image[data.weather[0].icon] || sun);
      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCityNotFound(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section className={Style.container}>
        <article>
          <div className={Style.input}>
            <input
              type="text"
              placeholder="Search city"
              onChange={handleChange}
              value={inputcity}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
            />
          </div>
          <div onClick={search}>
            <FaSearch />
          </div>
        </article>
        {!citynotfound && (
          <article>
            <Child
              weatherimg={weatherimg}
              temp={temp}
              city={city}
              country={country}
              lat={lat}
              log={log}
              humidity={humidity}
              wind={wind}
            />
          </article>
        )}
        {citynotfound && (
          <section className={Style.error}>
            <div>
              <img src={notfoundimg} alt="" />
            </div>
            <div>City Not Found</div>
          </section>
        )}
      </section>
    </>
  );
};

export default Weatherly;
