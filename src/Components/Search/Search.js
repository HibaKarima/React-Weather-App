import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from '../api'
import './Search.css'
function Search({ onSearchChange }) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      color: 'white',
      padding: '5px',
      borderRadius: '30px',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      transition: 'all 0.3s ease-in-out',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#18191a',
      borderRadius: '8px',
      padding: '5px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#393a3b' : '#242526',
      color: state.isFocused ? '#b0b3b8' : '#e4e6eb',
      padding: '10px',
      cursor: 'pointer',
    }),
  }
  const [search, setSearch] = useState(null)

  const handleOnChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions,
      )

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      }
    } catch (error) {
      console.error(error)
      return {
        options: [],
      }
    }
  }
  return (
    <div className="search-container ">
      <div className="search-icon">
        {' '}
        <span>🔍</span>
      </div>
      <div className="search-input">
        <AsyncPaginate
          placeholder="search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          styles={customStyles}
        />
      </div>
    </div>
  )
}

export default Search
