import React from 'react';
import styled from 'styled-components';
import CurrentPhotoData from './CurrentPhotoData.container';
import { object } from 'prop-types';

const Current = styled.div`
  grid-area: photo;
  padding: 8px;
  margin: 0 auto;
`

export default class CurrentPhoto extends React.Component {
  static conte
  render() {
    return (
      <Current>
        <img src="../src/logo.svg" alt="Currently loaded photo"/>
      </Current>
    )
  }
}
