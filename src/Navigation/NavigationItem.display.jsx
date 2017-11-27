import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FONT_SIZE, EGG_WHITE, mediaQuery, CHARCOAL } from '../constants';

const NavItem = styled.li`
  display: inline-block;
  font-size: ${FONT_SIZE.medium};
  margin: 0.75em 0;
  background: ${props => props.background || ''};

  @media ( ${mediaQuery('md')} ) {
    display: block;
    text-align: center;
    margin: 0.25em auto;
  }
`

const LinkText = styled.p`
  color: ${EGG_WHITE};
  text-decoration: none;
`

const linkStyles = {
  position: 'relative',
  fontSize: '1.25em',
  color: CHARCOAL,
  textDecoration: 'none',
}


const NavigationItem = (props) => {
  return (
    <NavItem className="nav-item">
      <Link to={props.link} style={linkStyles}>
        <LinkText className="nav-text">{props.item}</LinkText>
      </Link>
    </NavItem>
  )
}

export default NavigationItem;
