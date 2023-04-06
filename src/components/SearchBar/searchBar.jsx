import React, { useState } from 'react';
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

  const printPalette = async (src) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    // load image
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // get palette
      const colors = getPalette(ctx, 6);
      console.log(colors);
    };
    img.src = src;
  };

  const getPalette = (ctx, nColors) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pixels = imageData.data;
    const colorCounts = {};

    // loop through pixels and count color occurrences
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const rgb = `${r},${g},${b}`;

      if (r < 50 && g < 50 && b < 50) {
        // ignore very dark colors
        continue;
      }

      if (colorCounts[rgb]) {
        colorCounts[rgb]++;
      } else {
        colorCounts[rgb] = 1;
      }
    }

    // sort colors by count
    const colorKeys = Object.keys(colorCounts);
    colorKeys.sort((a, b) => {
      return colorCounts[b] - colorCounts[a];
    });

    // get top n colors
    const topColors = [];
    for (let i = 0; i < Math.min(nColors, colorKeys.length); i++) {
      topColors.push(colorKeys[i]);
    }

    // convert colors to arrays of RGB values
    return topColors.map((color) => color.split(',').map(Number));
  };

  return (
    <>
      <Styled.Input type="text" value={query} onChange={handleChange} />
      <Styled.SearchButton onClick={search}>Search</Styled.SearchButton>
      <Styled.AlbumList>
        {results.map((result) => (
          <Styled.Result className="search-result" key={result.name}>
            <Styled.Album
              className="albumMin"
              src={result.artworkUrl}
              alt={result.name}
              onClick={() => printPalette(result.artworkUrl)}
            />
            <Styled.Title>{result.name}</Styled.Title>
          </Styled.Result>
        ))}
      </Styled.AlbumList>
    </>
  );
}

export default SearchBar;
