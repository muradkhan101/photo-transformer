import React from 'react';
import styled from 'styled-components';
import { mediaQuery, BEZIER } from '../constants';
import NavigationItem from './NavigationItem.display';

const NavList = styled.ul`
  list-style: none;
  text-align: right;
  display: flex;
  flex-direction: column;
  @media ( ${mediaQuery('md')} ) {
    transition: all 0.5s ${BEZIER};
    width: 100%;
    width: auto;
    list-style: none;
    margin: 0 auto;
  }
`

const NavigationList = (props) => {
  return (
    <NavList className="nav-menu">
      {props.navList.map(e => <NavigationItem key={e.link} link={e.link} item={e.item}></NavigationItem>)}
    </NavList>
  )
}

export default NavigationList;
