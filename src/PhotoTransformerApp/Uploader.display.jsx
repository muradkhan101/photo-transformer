import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { ORANGE, CHARCOAL, FONT_SIZE, mediaQuery } from '../constants'
// Make custom CSS for this shite
const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  margin-top: 1em;
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
  min-width: 475px;
  @media ( ${mediaQuery('sm')} ) { min-width: 300px; }
`

const Upload = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  color: ${CHARCOAL};
  user-select: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  font-size: ${FONT_SIZE.medium};
  text-align: left;
  &::after, &::before {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  &::after {
    content: "Choose a photo...";
    position: relative;
    top: 2px;
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
  static contextTypes = {
    setURL: func,
  }
  onUpload(e) {
    if (e.target.files.length) {
      let file = e.target.files[0];
      let url = window.URL.createObjectURL(file);
      this.context.setURL(url);
    }
  }
  render() {
    return (
      <Wrapper>
        <FileLabel htmlFor="image">
          <FileInput onChange={(e) => this.onUpload(e)} type="file" id="image" accept=".png, .jpg, .jpeg, image/*" />
          <Upload/>
        </FileLabel>
      </Wrapper>
    )
  }
}
