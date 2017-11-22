import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ORANGE, CHARCOAL } from '../constants'
// Make custom CSS for this shite
const Wrapper = styled.div`
  position: relative;
  min-width: 400px;
  max-width: 80%;

`

const FileInput = styled.input`
  min-width: 5rem;
  max-width: 100%;
  height: 2.5rem;
  margin: 0;
  opacity: 0;
`

const FileLabel = styled.label`
  position: relative;
  display: inline-block;
  height: 2.5rem;
  max-width: 100%;
  margin-bottom: 0;
  cursor: pointer;
`

const Upload = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  color: ${CHARCOAL};
  user-select: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  &::after, &::before {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  &::after {
    content: "Choose a photo...";
  }
  &::before {
    content: "Browse";
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    z-index: 6;
    display: block;
    height: 2.5rem;
    padding: .5rem 1rem;
    line-height: 1.5;
    color: #fff;
    background-color: ${ORANGE};
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0 .25rem .25rem 0;
  }
`

export default class Uploader extends React.Component {
  render() {
    return (
      <div style={{position: "relative"}}>
        <FileLabel htmlFor="image">
          <FileInput type="file" id="image" accept=".png, .jpg, .jpeg, image/*" />
          <Upload/>
        </FileLabel>
      </div>
    )
  }
}
