import React from 'react';
import Canvas from './Canvas.display.jsx';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import { LIGHT_BLUE, FONT_SIZE, HEADING_FONTS } from '../constants'

const Current = styled.div`
  grid-area: photo;
  padding: 8px;
  margin: 0 auto;
  text-align: center;
  background: ${LIGHT_BLUE};
  width: 100%;
  font-size: ${FONT_SIZE.medium};
  font-family: ${HEADING_FONTS}
`

export default class CurrentPhoto extends React.Component {
  static contextTypes = {
    photoData : object,
    subscribe : func,
  }
  componentDidMount() {
    let { subscribe, photoData } = this.context;
    this.unsubscribe = subscribe(
      (url) => photoData.loadPhoto(url, document.getElementById('currentCanvas'))
    )
  }
  componentWillUnmount() { this.unsubscribe() }
  render() {
    let { photoData } = this.context;
    return (
      <Current id="currentPhoto">
        <h3> Current Photo </h3>
        <Canvas
          renderCanvas={(canvas) => {
            let ctx = canvas.getContext('2d');
            let imgData = photoData.getPhotoData();
            if (imgData) ctx.putImageData(imgData, 0, 0);
          }}
          name="current"
        />
      </Current>
    )
  }
}
