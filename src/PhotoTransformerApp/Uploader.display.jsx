import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Make custom CSS for this shite

const Upload = styled.span`
  &::after, &::before {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  &::after {
    content: "Choose a photo to transform";
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
    color: #464a4c;
    background-color: #eceeef;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0 .25rem .25rem 0;
  }
`

export default class Uploader extends React.Component {
  render() {
    return (
      <label for="image" class="custom-file">
        <input type="file" id="image" class="file-input" accept=".png, .jpg, .jpeg, image/*" />
        <Upload class="custom-file-control"></Upload>
      </label>
    )
  }
}
