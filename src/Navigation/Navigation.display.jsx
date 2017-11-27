import React from 'react';
import styled from 'styled-components';

import NavigationList from './NavigationList.display';
import { EGG_WHITE, FONT_SIZE, M_BOT, mediaQuery } from '../constants';

const Nav = styled.nav`
  color: ${EGG_WHITE};
  margin-right: 15%;
  top: 50px;
  position: sticky;
  overflow: scroll;
  @media ( ${mediaQuery('md')} ) {
    display: none;
  }
`

const Title = styled.h2`
  font-size: ${FONT_SIZE.x_large};
  text-align: right;
  ${M_BOT};
`

export default class Navigation extends React.Component {
  render() {
    return (
      <Nav id="navigation">
        <Title>{this.props.title}</Title>
        <NavigationList navList={this.props.navList}></NavigationList>
      </Nav>
    );
  }
}
