import { useState } from 'react'
import './App.css'
import CurrentWeather from './Components/Current-weather/Current-weather'
import Search from './Components/Search/Search'
import Forecast from './Components/Forecast/Forecast'
// import Header from './Components/Header/Header'

import { WEATHER_API_URL, WEATHER_API_KEY } from './Components/api'
function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ')
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    )
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    )
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()

        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })
      })
      .catch((err) => console.log(err))
  }
  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <div className="header">
        <div className="header-place">
          <span>🌍</span>
          <b>{currentWeather ? currentWeather.city : 'CITY NAME'}</b>
        </div>
        <div className="header-search0">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
      </div>

      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  )
}

export default App
