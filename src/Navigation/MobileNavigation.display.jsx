import React from 'react';
import styled from 'styled-components';
import NavigationList from './NavigationList.display'
import BurgerMenu from './BurgerMenu.display';
import { mediaQuery, BEZIER, EGG_WHITE, SKY_BLUE, HEADING_FONTS, FONT_SIZE, CHARCOAL } from '../constants';

const MobileTitle = styled.div`
  color: ${EGG_WHITE};
  font-family: ${HEADING_FONTS};
  font-size: ${FONT_SIZE.large};
  transition: color 0.1s linear 0.3s;
  position: absolute;
  top: 28px;
  right: 1em;
  h2 {margin: 0; line-height: 0;}
`

const MobileNav = styled.nav`
  display: none;
  background: ${CHARCOAL};
  transition: background-color 0.1s linear 0.3s, top 0.25s ${BEZIER};
  padding-top: 0.5em;
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  width: 100%;
  min-height: 5em;
  @media ( ${mediaQuery('md')} ) {
    display: flex;
  }
  .nav-menu {
    transition: max-height 0.3s cubic-bezier(0, 0.73, 1, 1);
    margin: 75px auto 10px;
    max-height: 0px;
    overflow: hidden;
    position: relative;
  }
  &.is-open {
    background-color: ${EGG_WHITE};
    transition: background-color 0.15s linear;
    .nav-menu {
      max-height: 170px;
    }
    .site-name, .nav-text {
      color: ${SKY_BLUE};
      transition: color 0.15s linear;
    }
    #burger-holder {
      .bar1, .bar2, .bar3, .bar4, .bar5 {background-color: ${SKY_BLUE};}
      .bar1 {
        transform:  scaleX(0);
        transition: transform 0.15s ${BEZIER}, background-color 0.2s ${BEZIER};
      }
      .bar2 {
        transform: scaleX(0);
        transition: transform 0.15s ${BEZIER} 0.1s, background-color 0.2s ${BEZIER};
      }
      .bar3 {
        transform: scaleX(0);
        transition: transform 0.15s ${BEZIER} 0.25s, background-color 0.2s ${BEZIER};
      }
      .bar4 {
        transform: rotate(45deg) scaleX(1);
        transition: transform 0.2s ${BEZIER} 0.5s, background-color 0.2s ${BEZIER};

      }
      .bar5 {
        transform: rotate(-45deg) scaleX(1);
        transition: transform 0.2s ${BEZIER} 0.4s, background-color 0.2s ${BEZIER};
      }
    }
  }
`

export default class MobileNavigation extends React.Component {

  state = {
    open : false,
  }

  clickBurger() {
    this.setState( {open : !this.state.open } )
  }

  render() {
    return (
      <MobileNav id="mobile-navigation" ref="mobileNav" className={this.state.open ? 'is-open' : ''}>
        <BurgerMenu onClick={() => this.clickBurger() }/>
        <NavigationList navList={this.props.navList}/>
        <MobileTitle className="site-name"> Transform this ya bish! </MobileTitle>
      </MobileNav>
    );
  }
}
