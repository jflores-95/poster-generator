import React, { useState } from 'react';
import * as Styled from './searchBar.styled.js';
import KMeans from 'kmeans-js';
import { Link } from "react-router-dom";


let palette = [];
function SearchBar() {
  const [query, setQuery] = useState('');
  const [albumInfo, setAlbumInfo] = useState(null)
  const [results, setResults] = useState([]);


  const search = async () => {
    setResults([]);
    const response = await fetch(`http://localhost:3000/search?term=${query}&limit=${20}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSelectedAlbum = async (albumId) => {
    const response = await fetch(`http://localhost:3000/albumId?albumId=${albumId}`);
    const data = await response.json();
    data.palette = palette;
    setAlbumInfo(data);
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
      const colors = getColors(imageData);

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
      palette = colors;
      console.log(colors);
    };
    img.src = src;
  };

  const getPalette = (ctx, nColors) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pixels = imageData.data;
  
    // create an array of pixels in the format [r, g, b, a]
    const pixelArray = [];
    for (let i = 0; i < pixels.length; i += 4) {
      pixelArray.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
    }
  
    // use k-means to cluster the colors
    const kmeans = new KMeans();
    const clusters = kmeans.cluster(pixelArray, nColors);
  
    // get the average color of each cluster
    clusters.map((cluster) => {
      const r = cluster.reduce((acc, val) => acc + val[0], 0) / cluster.length;
      const g = cluster.reduce((acc, val) => acc + val[1], 0) / cluster.length;
      const b = cluster.reduce((acc, val) => acc + val[2], 0) / cluster.length;
      return [r, g, b];
    });
  
    return clusters;
  };

  const selectAlbum = (album) => {
    printPalette(album.artworkUrl);
    handleSelectedAlbum(album.albumId);
  }

  return (
    <>
      <Styled.Input type="text" value={query} onChange={handleChange} />
      <Styled.SearchButton onClick={search}>Search</Styled.SearchButton>
      <Styled.AlbumList>
        {results.map((result) => (
          <Styled.Result className="search-result" key={result.artworkUrl}>
             <Link to={{ pathname: '/album', state: { mensaje:"HOLA" } }}>
            <Styled.Album
              className="albumMin"
              src={result.artworkUrl}
              alt={result.name}
              onMouseEnter={handleAlbumHover}
              onMouseLeave={handleAlbumUnhover}
              onClick={() => selectAlbum(result)}
            />
            </Link>
            <Styled.Title>{result.name}</Styled.Title>
          </Styled.Result>
        ))}
      </Styled.AlbumList>
    </>
  );
}

export default SearchBar;
