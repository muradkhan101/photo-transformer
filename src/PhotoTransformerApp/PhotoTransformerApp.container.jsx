import styled from 'styled-components';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavigationContainer from '../Navigation/Navigation.container';
import ImageContainer from '../PhotoDisplay/ImageContainer.container';
import CurrentPhoto from '../PhotoDisplay/CurrentPhoto.container';
import photoData from '../PhotoDisplay/PhotoData.container';
import Content from './Content.display';

import { mediaQuery } from '../constants';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 45px 0.75fr 0.25fr 60px;
  grid-template-areas:
  "navigation header"
  "navigation content"
  "photo content"
  "photo footer";
  @media ( ${mediaQuery('md')} ) {
    display: flex;
    flex-direction: column;
  }
`

export default class PhotoTransformerApp extends React.Component {

  render() {
    let CurrentPhotoData = photoData(
      () => window.innerWidth < 825,
      true
    )
    return (
      <BrowserRouter>
        <MainContainer>
          <NavigationContainer />
          <ImageContainer>
            <CurrentPhotoData>
              <CurrentPhoto />
            </CurrentPhotoData>
            <Content />
          </ImageContainer>
        </MainContainer>
      </BrowserRouter>
    )
  }
}
