import styled from 'styled-components';
import React from 'react';

import NavigationContainer from '../Navigation/Navigation.container';
import ImageContainer from '../PhotoDisplay/ImageContainer.container';
import CurrentPhoto from '../PhotoDisplay/CurrentPhoto.container';
import photoData from '../PhotoDisplay/PhotoData.container';
import Uploader from './Uploader.display';
import SelectionSortTransformer from '../Transformers/SelectionSortTransformer.container';

import { LIGHT_BLUE } from '../constants';
/* To-dos
   Load image data into canvas element when present, update size on resize
   Create image uploader component and store
   Implement React Router for multiple apps
   CSS for mobile nav
*/

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
  background: ${LIGHT_BLUE};
  @media (max-width: 750px) {
    grid-template-columns: 30% 70%;
  }
  @media (max-width: 593px) {
    display: flex;
    flex-direction: column;
  }
`

export default class PhotoTransformerApp extends React.Component {

  render() {
    let CurrentPhotoData = photoData(
      () => window.innerWidth < 594,
      true
    )
    // return (
    //   <MainContainer>
    //     <NavigationContainer/>
    //     <CurrentPhotoData>
    //       <CurrentPhoto/>
    //       <Uploader/>
    //     </CurrentPhotoData>
    //   </MainContainer>
    // );
    return (
      <MainContainer>
        <NavigationContainer />
        <ImageContainer>
          <CurrentPhotoData>
            <CurrentPhoto />
          </CurrentPhotoData>
          <Uploader/>
          <SelectionSortTransformer/>
        </ImageContainer>
      </MainContainer>
    )
  }
}
