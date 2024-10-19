import { useState, useRef, useEffect } from 'react';
import { allCities } from '../../lib/LocationData';
import './Filter.scss';

export const Filter = ({ onFilterChange }) => {
  const suggestions = allCities;

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [disasterType, setDisasterType] = useState('all');
  const searchBarRef = useRef(null);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filteredSuggestions = suggestions
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      )
      .sort();
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSelect = (value) => {
    setInputValue(value);
    setFilteredSuggestions([]);
    onFilterChange({ location: value, disasterType });
  };

  const handleDisasterTypeChange = (event) => {
    const value = event.target.value;
    setDisasterType(value);
    onFilterChange({ location: inputValue, disasterType: value });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter">
      <h1>Search Results</h1>
      <div className="items">
        <div className="item item1 autocomplete-container" ref={searchBarRef}>
          <label htmlFor="location">Location</label>
          <input
            className="autocomplete-input"
            type="text"
            name="location"
            value={inputValue}
            id="location"
            placeholder="Search Location"
            onChange={handleChange}
          />
          {filteredSuggestions.length > 0 && (
            <ul className="autocomplete-suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="autocomplete-suggestion"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="item item2">
          <label htmlFor="type">Disaster Type</label>
          <select
            name="type"
            id="type"
            value={disasterType}
            onChange={handleDisasterTypeChange}
          >
            <option value="all">All</option>
            <option value="Flood">Flood</option>
            <option value="Fire">Fire</option>
            <option value="Cyclone">Cyclone</option>
            <option value="Landslide">Landslide</option>
            <option value="Tsunami">Tsunami</option>
            <option value="Earthquake">Earthquake</option>
          </select>
        </div>
      </div>
    </div>
  );
};
