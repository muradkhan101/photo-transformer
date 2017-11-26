import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FONT_SIZE, EGG_WHITE } from '../constants';

const NavItem = styled.li`
  display: inline-block;
  font-size: ${FONT_SIZE.medium};
  margin: 0.75em 0;
  background: ${props => props.background};
`
const LinkText = styled.p`
  color: ${EGG_WHITE};
  text-decoration: none;
`

export const NavigationItem = (props) => {
  return (
    <NavItem className="nav-item">
      <Link to={props.link} style={{textDecoration: 'none'}}>
        <LinkText>{props.item}</LinkText>
      </Link>
    </NavItem>
  )
}
