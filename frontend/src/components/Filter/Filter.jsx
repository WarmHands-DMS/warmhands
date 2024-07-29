import { useState, useEffect, useRef } from 'react';
import './Filter.scss';

export const Filter = () => {
  const suggestions = [
    'Colombo',
    'Kandy',
    'Jaffna',
    'Anuradhapura',
    'Mathara',
    'Rathnapura',
    'Badulla',
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const searchBarRef = useRef(null);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSelect = (value) => {
    setInputValue(value);
    setFilteredSuggestions([]);
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
      <h1>
        Search Results for <b>Colombo</b>
      </h1>
      <div className="items">
        <div className="item item1 autocomplete-container" ref={searchBarRef}>
          <label htmlFor="location">Location</label>
          <input
            className="autocomplete-input"
            type="text"
            name="location"
            value={inputValue}
            id="location"
            placeholder="Disaster Location"
            onChange={handleChange}
          />
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
        </div>
        <div className="item item2">
          <label htmlFor="type">Disater Type</label>
          <select name="location" id="location">
            <option value="all">All</option>
            <option value="all">Flood</option>
            <option value="all">Fires</option>
            <option value="all">Earthquakes</option>
          </select>
        </div>
        <div className="item3">
          <button>
              Search
          </button>
        </div>
      </div>
      {/* <ul className="autocomplete-suggestions">
        {filteredSuggestions.map((suggestion, index) => (
          <li
            key={index}
            className="autocomplete-suggestion"
            onClick={() => handleSelect(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul> */}
    </div>
  );
};
