import React from 'react'
import SearchBar from '../../components/SearchBar/searchBar'
import * as Styled from './home.styled.js'
import PosterPreview from '../posterPreview/posterPreview'

export default function Home() {
  return (
<Styled.Container>
  <PosterPreview></PosterPreview>
  
    {/* <SearchBar></SearchBar>  */}
</Styled.Container>
  )
}
