import styled from 'styled-components';

// Estilos de cuerpo
export const Container = styled.body`
  display: flex;
  background-color: #EAE8DF;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  height: 1920px;
  width: 1080px;
  flex-direction: column;
`;


export const Top = styled.div`
  display:flex;
  height: 80%;  
  flex-direction: row;
`

export const Bottom = styled.div`

`

export const ImageContainer = styled.div`
color: #060504;
display: flex;
flex-direction:column;
margin: 100px;
margin-bottom: 80px;
justify-content: center;
`

export const AlbumArt = styled.img`
  height: 880px;
  width: 880px;
`

export const DataContainer = styled.div`
height: 100%;
color: #060504;
margin: 0 100px 100px 100px;
overflow: hidden;
`

export const TitleContainer = styled.div`
  display: flex;
  text-align: initial; /* Centrar el texto */
  margin-bottom: 20px;
  font-family: 'Bebas Neue', sans-serif;
  flex-basis:20%;
  height: 120px;
  font-size:50px;
`;

export const Year = styled.span`
font-size:15px;
`

export const palette = styled.div`
  display: flex; /* Hace que los elementos se muestren en una sola fila */
  flex-wrap: nowrap; /* Evita que los elementos se envuelvan a una nueva línea */
  margin-bottom: 80px;
  justify-content: center; /* Centra los elementos horizontalmente */
`;

export const color = styled.div`
  width: 40px; /* Establece el ancho del color */
  height: 40px; /* Establece la altura del color */
  margin: 0 5px; /* Agrega un pequeño margen entre cada color */
`;


export const AlbumName = styled.div`
font-size: 6rem;
`

export const ArtistName = styled.span`
font-size: 3rem;
`

export const ReleaseInfo = styled.div`
  display: flex;
  flex-direction:column;
`;

// Estilos de paleta de colores
export const Palette = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const AditionalInfo = styled.span`
display:flex;
flex-direction: column;
`;




export const OutNowInfo = styled.span`
display: flex;
font-family: Montserrat, sans-serif;
font-weight: bold;
font-size: '35px';
align-self: flex-end;
`



export const Color = styled.span`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

// Estilos de lista de canciones
export const SongList = styled.ul`
  display: table;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size:larger;
  table-layout: fixed; /* Agregar esta propiedad para que las tablas tengan un ancho fijo */
`;

export const SongContainer = styled.div`
  font-family: Montserrat, sans-serif;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(30px, auto);
  gap: 10px;
  margin-bottom: 50px;
  flex-basis: 80%;
  font-weight: bold;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  /* Agregar un ancho fijo para las tablas */
  ul {
    width: 90%;
  }
`;

export const SongItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;

export const SongTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;



