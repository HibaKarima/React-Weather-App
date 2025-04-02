import './Current-weather.css'
import React from 'react'
function CurrentWeather({ data }) {
  return (
    <div className="CurrentWeather container">
      <div className="weather-temperature">
        <div className="weather-icon">
          <img alt="weather" src={`icons/${data.weather[0].icon}.png`} />
        </div>
        <div>{data.city}</div>
        <div>{Math.round(data.main.temp)}°c</div>
        <div>{data.weather[0].description}</div>
      </div>
      <div className="weather-info">
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°c
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">pressure</span>
            <span className="parameter-value">{data.main.pressure} hpa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
