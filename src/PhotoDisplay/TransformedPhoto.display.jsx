import React from 'react';
import Canvas from './Canvas.display.jsx';
import styled from 'styled-components';
import { object } from 'prop-types';

const Transformed = styled.div`
  grid-area: photo;
  padding: 8px;
  margin: 0 auto;
  text-align: center;
`

export default class CurrentPhoto extends React.Component {
  static contextTypes = {
    photoData : object
  }
  render() {
    let { photoData } = this.context;
    return (
      <Current>
        <h3> Current Photo </h3>
        <Canvas imgData={photoData.getPhotoData()} name="current"/>
      </Current>
    )
  }
}
