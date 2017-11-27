import styled from 'styled-components';
import React from 'react';

import NavigationContainer from '../Navigation/Navigation.container';
import ImageContainer from '../PhotoDisplay/ImageContainer.container';
import CurrentPhoto from '../PhotoDisplay/CurrentPhoto.container';
import photoData from '../PhotoDisplay/PhotoData.container';
import Uploader from './Uploader.display';

import MergeSortTransformer from '../Transformers/MergeSortTransformer.container';
import QuickSortTransformer from '../Transformers/QuickSortTransformer.container';
import BubbleSortTransformer from '../Transformers/BubbleSortTransformer.container';
import SelectionSortTransformer from '../Transformers/SelectionSortTransformer.container';
import CirclesTransformer from '../Transformers/CirclesTransformer.container';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { LIGHT_BLUE, FONT_SIZE, HEADING_FONTS, mediaQuery } from '../constants';
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
  grid-template-rows: 45px 0.75fr auto 60px;
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

const Content = styled.div`
  grid-area: content;
  padding-left: 100px;
  @media( ${mediaQuery('md')} ) {
    padding: 0;
  }
`



// Title Stuff
const Heading = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
  text-align: center;
`

const Title = styled.h1`
  text-align: center;
  font-size: ${FONT_SIZE.x_large};
  font-family: ${HEADING_FONTS};
  @media ( ${mediaQuery('sm')} ) {display: none;}
`

export default class PhotoTransformerApp extends React.Component {

  render() {
    let CurrentPhotoData = photoData(
      () => window.innerWidth < 594,
      true
    )
    // Instead of transformer, have info component that contains transformer
    return (
      <BrowserRouter>
        <MainContainer>
          <NavigationContainer />
          <ImageContainer>
            <CurrentPhotoData>
              <CurrentPhoto />
            </CurrentPhotoData>
            <Content>
              <Heading>
                <Title> Transform This! </Title>
                <Uploader/>
              </Heading>
              <Switch>
                <Route exact path="/circles/" component={CirclesTransformer} />
                <Route exact path="/selectionSort/" component={SelectionSortTransformer}/>
                <Route exact path="/quickSort/" component={QuickSortTransformer}/>
                <Route exact path="/mergeSort/" component={MergeSortTransformer}/>
                <Route exact path="/bubbleSort/" component={BubbleSortTransformer} />
              </Switch>
            </Content>
          </ImageContainer>
        </MainContainer>
      </BrowserRouter>
    )
  }
}
