import styled from 'styled-components';

// Estilos para el input del search bar
export const Input = styled.input`
  border: none;
  border-bottom: 2px solid #c4c4c4;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 20px;
  width: 250px;
  outline: none;
  background-color: transparent;
  color: #c9d1d9;
  font-family: Montserrat, sans-serif;
`;

// Estilos para el botón del search bar
export const SearchButton = styled.button`
  background-color: #007ACC;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease-in-out;
  font-family: Montserrat, sans-serif;

  &:hover {
    background-color: #024c7e;
  }
`;

// Estilos para los resultados de búsqueda
export const AlbumList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a {
text-decoration: none;
  }
`;

export const Result = styled.li`

  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const Album = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

export const Title = styled.span`
  font-size: 16px;
  color: #007ACC;
  text-align: center;
  font-family: Montserrat, sans-serif;
`;

export const Palette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
`;

export const Color = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 5px;
  border-radius: 80%;
  background-color: ${props => props.color};
`;


