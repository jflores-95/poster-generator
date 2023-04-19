import React from 'react'
import * as Styled from "./posterPreview.styled"
import { mockDataRegularAlbum, mockDataSingle, mockTwoColorOnly, largeTitle, faces, x100pre, unVeranoSinTi, YHLQMDLG } from './mockData.mock'

const PosterPreview = () => {

  const ALBUM = YHLQMDLG;

  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
  

  return (
    <>
      <Styled.Container>
        <Styled.ImageContainer id="imageContainer">
        <Styled.TitleContainer>{ALBUM?.albumName} BY {ALBUM?.artistName}  </Styled.TitleContainer>

          <Styled.AlbumArt src={ALBUM.artWork} alt={mockDataRegularAlbum.albumName} />
        </Styled.ImageContainer>

        <Styled.DataContainer id="dataContainer">

          <Styled.Top id="Top">
          <Styled.SongContainer>
              {ALBUM?.trackList &&
                chunk(ALBUM.trackList, 16).map((songGroup, groupIndex) => (
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
              {ALBUM?.palette?.map((color, index) => (
                <Styled.Color style={{ backgroundColor: `rgb(${color.join(",")})` }} key={index} />
              ))}
            </Styled.palette>
            <Styled.AditionalInfo>
             
              <Styled.OutNowInfo>
              {ALBUM?.releaseDate}
              </Styled.OutNowInfo>
              <Styled.OutNowInfo>
              {ALBUM?.albumTime}
              </Styled.OutNowInfo>
              <Styled.OutNowInfo>
             {ALBUM?.primaryGenreName}
              </Styled.OutNowInfo>
              <Styled.OutNowInfo>
             {ALBUM?.contentAdvisoryRating}
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