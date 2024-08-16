import { useState, useEffect, useRef } from 'react';
import { allCities } from '../../lib/LocationData';
import './SearchBar.scss';

export const SearchBar = () => {
   const suggestions = allCities;
   console.log(allCities)

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
    // <div className="searchBar">
    // <div className="type"></div>
    // <form>
    //     <input type="text" name="" id="" />
    // </form>
    // </div>
    <div className="searchBar" ref={searchBarRef}>
      <div className="type"></div>
      <div className="autocomplete-container">
        <form>
          <input
            className="autocomplete-input"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type the Location"
          />
          {/* <button>
            <i className='fa-solid fa-magnifying-glass fa-xl'></i>
            Search
          </button> */}
        </form>
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
    </div>
  );
};
