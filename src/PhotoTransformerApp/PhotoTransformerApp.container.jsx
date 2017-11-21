import styled from 'styled-components';
import React from 'react';

import NavigationContainer from '../Navigation/Navigation.container';
import CurrentPhoto from '../PhotoDisplay/CurrentPhoto.container';
import photoData from '../PhotoDisplay/PhotoData.container';
import Uploader from './Uploader.display';
/* To-dos
   Load image data into canvas element when present
   Create image uploader component and store
   Implement React Router for multiple apps
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
  @media (max-width: 750px) {
    grid-template-columns: 30% 70%;
  }
  @media (max-width: 593px) {
    grid-template-columns: 100%;
    grid-template-rows: 45px auto auto 60px;
    grid-template-areas:
    "navigation"
    "content"
    "content"
    "footer";
  }
`

export default class PhotoTransformerApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let CurrentPhotoData = photoData(
      () => window.innerWidth < 594,
      400,
      500
    )
    return (
      <MainContainer>
        <NavigationContainer/>
        <CurrentPhotoData>
          <CurrentPhoto/>
          <Uploader/>
        </CurrentPhotoData>
      </MainContainer>
    );
  }
}
