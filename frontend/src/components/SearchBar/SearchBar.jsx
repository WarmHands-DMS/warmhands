import { useState, useEffect, useRef } from 'react';
import './SearchBar.scss';

export const SearchBar = () => {
  const suggestions = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const searchBarRef = useRef(null);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    // Filter suggestions based on input value
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
      // Step 3: Add useEffect to handle clicks outside the search bar
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
            placeholder="Type to search..."
          />
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
