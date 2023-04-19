import React, { useState } from 'react';
import * as Styled from './searchBar.styled.js';
import { Link } from "react-router-dom";
import {getDominantColors} from "../../utilities/utilities.js"


function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  const search = async () => {
    setResults([]);
    const response = await fetch(`http://localhost:3000/search?term=${query}&limit=${20}`);
    const data = await response.json();
    setResults(data);
  };


  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleAlbumHover = (event) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.src = event.target.src;

    img.onload = () => {
      const { width, height } = img;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, 0, 0, width, height);

      const imageData = context.getImageData(0, 0, width, height);
      const colors = getDominantColors(imageData);

      const album = event.target.parentElement;
      
      album.style.boxShadow = `0px 0px 50px 10px rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.7)`;
    };
  };

  const handleAlbumUnhover = (event) => {
    const album = event.target.parentElement;
    album.style.boxShadow = '';
  };

  const getColors = (imageData) => {
    const colors = { red: 0, green: 0, blue: 0, count: 0 };

    for (let i = 0; i < imageData.data.length; i += 4) {
      colors.red += imageData.data[i];
      colors.green += imageData.data[i + 1];
      colors.blue += imageData.data[i + 2];
      colors.count++;
    }

    colors.red = Math.floor(colors.red / colors.count);
    colors.green = Math.floor(colors.green / colors.count);
    colors.blue = Math.floor(colors.blue / colors.count);

    return [colors.red, colors.green, colors.blue];
  };

  return (
    <>
      <Styled.Input type="text" value={query} onChange={handleChange} />
      <Styled.SearchButton onClick={search}>Search</Styled.SearchButton>
      <Styled.AlbumList>
        {results.map((result) => (
           <Link to={`/album/${result.albumId}`}>
          <Styled.Result className="search-result" key={result.artworkUrl}>
          
            <Styled.Album
              className="albumMin"
              src={result.artworkUrl}
              alt={result.name}
              onMouseEnter={handleAlbumHover}
              onMouseLeave={handleAlbumUnhover}
            />
            <Styled.Title>{result.name}</Styled.Title>
          </Styled.Result>
          </Link>

        ))}
      </Styled.AlbumList>
    </>
  );
}

export default SearchBar;
