import React from 'react';
import { object, string } from 'prop-types';
import styled from 'styled-components';
import { ORANGE, SKY_BLUE, EGG_WHITE, HEADING_FONTS } from '../constants';

// Need to pass a way to start drawing on button click (call draw)

const ButtonWrapper = styled.div`
  margin-top: 12px;
`

const ButtonContainer = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;
  height: auto;
  &::before {
    z-index: 1;
    transform-origin: left;
    transform: scaleX(0);
    background-color: ${SKY_BLUE};
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
  &:hover {
    &::before {animation: 0.5s ease-in-out 0s button;}
  }
`

const Button = styled.button`
  overflow: hidden;
  display: inline-block;
  position: relative;
  background: linear-gradient(90deg, ${ORANGE}, ${SKY_BLUE});
  border: none;
  border-radius: 2px;
  font-style: italic;
  font-size: 1.2em;
  font-weight: 400;
  padding: 0.4em 0.9em;
  color: ${EGG_WHITE};
  font-family: ${HEADING_FONTS};
  @keyframes button {
    0% {transform-origin: left; transform: scaleX(0);}
    50% {transform: scaleX(1); transform-origin: left;}
    51% {transform-origin: right;}
    100% {transform: scaleX(0); transform-origin: right;}
  }
`

export default class LoadButton extends React.Component {
  static contextTypes = {
    imageURL: string,
    photoData: object,
  }
  static displayName = 'LoadButton';
  render() {
    return (
      <ButtonWrapper>
        <ButtonContainer>
          <Button onClick={this.props.onClick}>Load that S**t Up</Button>
        </ButtonContainer>
      </ButtonWrapper>
    )
  }
}
