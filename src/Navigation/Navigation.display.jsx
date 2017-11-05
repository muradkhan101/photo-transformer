import React from 'react';
import styled from 'styled-components';

import { NavigationList } from './NavigationList.display';
import { EGG_WHITE, FONT_SIZE, M_BOT } from '../constants';

const Nav = styled.nav`
  color: ${EGG_WHITE};
  margin-right: 15%;
  margin-top: 50px;
`

const Title = styled.h3`
  font-size: ${FONT_SIZE.large};
  text-align: right;
  ${M_BOT};
`

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Nav>
        <Title>{this.props.title}</Title>
        <NavigationList navList={this.props.navList}></NavigationList>
      </Nav>
    );
  }
}
