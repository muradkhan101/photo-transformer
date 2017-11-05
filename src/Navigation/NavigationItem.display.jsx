import React from 'react';
import styled from 'styled-components';

import { FONT_SIZE, EGG_WHITE } from '../constants';

const NavItem = styled.li`
  display: inline-block;
  font-size: ${FONT_SIZE.medium};
  margin: 0.75em 0;
  background: ${props => props.background};
`
const Link = styled.a`
  color: ${EGG_WHITE};
  text-decoration: none;
`

export const NavigationItem = (props) => {
  return (
    <NavItem>
      <Link
        href={props.link}>
        {props.item}
      </Link>
    </NavItem>
  )
}
