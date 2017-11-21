import React from 'react';
import Canvas from './Canvas.display.jsx';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Current = styled.div`
  grid-area: photo;
  padding: 8px;
  margin: 0 auto;
  text-align: center;
`

export default class CurrentPhoto extends React.Component {
  static contextTypes = {
    currentPhoto : PropTypes.object
  }
  render() {
    let { currentPhoto } = this.context;
    return (
      <Current>
        <h3> Current Photo </h3>
        <Canvas imgData={currentPhoto.getPhotoData()} name="current"/>
      </Current>
    )
  }
}
