import styled from 'styled-components';
import React from 'react';

import NavigationContainer from '../Navigation/Navigation.container';

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
`

export default class PhotoTransformerApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <NavigationContainer></NavigationContainer>
      </MainContainer>
    );
  }
}
