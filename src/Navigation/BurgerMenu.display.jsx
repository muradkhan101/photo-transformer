import React from 'react';
import styled from 'styled-components';
import { BEZIER, EGG_WHITE } from '../constants';

const BurgerHolder = styled.div`
  margin-left: 1em;
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: transparent;
  .bar1, .bar2, .bar3, .bar4, .bar5 {
    position: relative;
    margin: 0 auto;
    height: 4px;
    width: 80%;
    background-color: ${EGG_WHITE};
  }
  .bar1 {
    top: 20px;
    transform: scaleX(1);
    transform-origin: left center;
    transition: transform 0.15s ${BEZIER} 0.55s, background-color 0.2s ${BEZIER};
  }
  .bar2 {
    top: 28px;
    transform: scaleX(1);
    transform-origin: left center;
    transition: transform 0.15s ${BEZIER} 0.4s, background-color 0.2s ${BEZIER};
  }
  .bar3 {
    top: 36px;
    width: 50%;
    left: -15%;
    transform: scaleX(1);
    transform-origin: left center;
    transition: transform 0.15s ${BEZIER} 0.3s, background-color 0.2s ${BEZIER};
  }
  .bar4 {
    transform-origin: center center;
    top: 18px;
    transition: transform 0.2s ${BEZIER}, background-color 0.2s ${BEZIER};
    transform: rotate(45deg) scaleX(0);
  }
  .bar5 {
    transform-origin: center center;
    top: 14px;
    transition: transform 0.2s ${BEZIER} 0.1s, background-color 0.2s ${BEZIER};
    transform: rotate(-45deg) scaleX(0);
  }
`

export default class BurgerMenu extends React.Component {
  render() {
    return (
        <BurgerHolder onClick={this.props.onClick} id="burger-holder">
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
          <div className="bar4" />
          <div className="bar5" />
        </BurgerHolder>
    )
  }
}
