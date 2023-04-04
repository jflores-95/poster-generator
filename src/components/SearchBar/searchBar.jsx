import React, { useState } from 'react';
import './searchBar.styles.css';
import * as Styled from "./searchBar.styled.js";



function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    setResults([])
    const response = await fetch(`http://localhost:3000/search?term=${query}&limit=${20}`);
    const data = await response.json();
    setResults(data);
  };
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
<Styled.Container>
  <Styled.Input type="text" value={query} onChange={handleChange} />
  <Styled.SearchButton onClick={search}>Search</Styled.SearchButton>
  <Styled.AlbumList>
    {results.map((result) => (
      <Styled.Result className="search-result" key={result.name}>
        <Styled.Album className="albumMin" src={result.artworkUrl} alt={result.name} />
        <Styled.Title>{result.name}</Styled.Title>
      </Styled.Result>
    ))}
  </Styled.AlbumList>
</Styled.Container>
  );
}

export default SearchBar;
