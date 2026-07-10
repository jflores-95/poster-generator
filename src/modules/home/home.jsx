import React from 'react'
import SearchBar from '../../components/SearchBar/searchBar'
import * as Styled from './home.styled.js'


export default function Home() {
  return (
<Styled.Container> 
  Type the album name or the artist name to generate a poster: 
    <SearchBar></SearchBar>  
</Styled.Container>
  )
}
