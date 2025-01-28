import Style from "./child.module.css";
import windimg from "../assets/windimg.png";
import humidityimg from "../assets/humidity.png";
import PropTypes from "prop-types";

const Child = ({
  weatherimg,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
}) => {
  return (
    <section className={Style.childcontainer}>
      <article>
        <img src={weatherimg} alt="" />
      </article>
      <article>
        <div>{Math.floor(temp)}&deg;C</div>
      </article>
      <article>
        <div>{city}</div>
      </article>
      <article>
        <div>{country}</div>
      </article>
      <article>
        <article>
          <div>latitude</div>
          <div>{lat}</div>
        </article>
        <article>
          <div>longitude</div>
          <div>{log}</div>
        </article>
      </article>
      <section className={Style.img}>
        <article>
          <img src={humidityimg} alt="" />
          <div>Humidity</div>
          <div>{humidity}%</div>
        </article>
        <article>
          <img src={windimg} alt="" />
          <div>Wind Speed</div>
          <div>{wind} km/hr</div>
        </article>
      </section>
    </section>
  );
};

Child.propTypes = {
  weatherimg: PropTypes.string,
  temp: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
  lat: PropTypes.number,
  log: PropTypes.number,
  humidity: PropTypes.number,
  wind: PropTypes.number,
};

export default Child;
