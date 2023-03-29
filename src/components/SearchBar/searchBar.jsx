import React, { useState } from 'react';
import './searchBar.styles.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const response = await fetch(`http://localhost:3000/search?term=${query}&limit=${20}`);
    const data = await response.json();
    setResults(data);
  };
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} />
      <button onClick={search}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result.name}>
            <img className="albumMin" src={result.artworkUrl} alt={result.name} />
            <span>{result.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
