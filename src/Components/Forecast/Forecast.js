import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import './Forecast.css'

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]
function Forecast({ data }) {
  const dayInAWeek = new Date().getDate()
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek),
  )

  return (
    <div className="forecast">
      <div>
        <p className="title">Daily</p>
        <Accordion allowZeroExpanded>
          {data.list.splice(0, 7).map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${item.weather[0].icon}.png`}
                    />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">
                      {item.weather[0].description}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp_min)}°c /{' '}
                      {Math.round(item.main.temp_max)}°c{' '}
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <p>pressure : </p>
                    <label>{item.main.pressure}hpa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <p>humidity : </p>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <p>wind speed : </p>
                    <label>{item.wind.speed}m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <p>feels like : </p>
                    <label>{Math.round(item.main.feels_like)}°c</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <p>clouds : </p>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <p>sea level : </p>
                    <label>{item.main.sea_level}m</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default Forecast
