import React, {useState, useEffect} from 'react'
import * as Styled from "./posterPreview.styled"
import { useParams } from 'react-router-dom'
import KMeans from 'kmeans-js';
import { mockDataRegularAlbum, mockDataSingle, mockTwoColorOnly, largeTitle, faces, x100pre, unVeranoSinTi, YHLQMDLG } from './mockData.mock'

const PosterPreview = () => {

  const [album, setAlbum] = useState();
  let palette = [];
  const { id } = useParams();

  useEffect(() => {
    const handleSelectedAlbum = async (albumId) => {
      const response = await fetch(`http://localhost:3000/albumId?albumId=${id}`);
      const data = await response.json();
      printPalette(data.artWork);
      setTimeout(() => {
        data.palette = palette;
        setAlbum(data);
      }, 1000);
     
    };

    handleSelectedAlbum();
  }, [])

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

  

  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
  

  return (
    <>
      <Styled.Container>
        <Styled.ImageContainer id="imageContainer">
        <Styled.TitleContainer>{album?.albumName} BY {album?.artistName}  </Styled.TitleContainer>

          <Styled.AlbumArt src={album?.artWork} alt={album?.albumName} />
        </Styled.ImageContainer>

        <Styled.DataContainer id="dataContainer">

          <Styled.Top id="Top">
          <Styled.SongContainer>
              {album?.trackList &&
                chunk(album?.trackList, 16).map((songGroup, groupIndex) => (
                  <Styled.SongList key={groupIndex}>
                    {songGroup.map((track, index) => (
                      <Styled.SongItem key={index}>
                        <Styled.SongTitle>
                          {`${index + groupIndex * 16 + 1}. ${track?.trackName}`}
                        </Styled.SongTitle>
                      </Styled.SongItem>
                    ))}
                  </Styled.SongList>
                ))}
            </Styled.SongContainer>

            <Styled.ReleaseInfo>
            <Styled.palette>
              {album?.palette?.map((color, index) => (
                <Styled.Color style={{ backgroundColor: `rgb(${color.join(",")})` }} key={index} />
              ))}
            </Styled.palette>
            <Styled.AditionalInfo>
             
              <Styled.OutNowInfo>
              {album?.releaseDate}
              </Styled.OutNowInfo>
              <Styled.OutNowInfo>
              {album?.albumTime}
              </Styled.OutNowInfo>
              <Styled.OutNowInfo>
             {album?.primaryGenreName}
              </Styled.OutNowInfo>
              <Styled.OutNowInfo>
             {album?.contentAdvisoryRating}
              </Styled.OutNowInfo>
            </Styled.AditionalInfo>
            </Styled.ReleaseInfo>

          </Styled.Top>
          
        </Styled.DataContainer>

      </Styled.Container>
    </>
  )
}


export default PosterPreview;