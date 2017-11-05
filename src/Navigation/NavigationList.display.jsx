import React from 'react';
import styled from 'styled-components';

import { NavigationItem } from './NavigationItem.display';

const NavList = styled.ul`
  list-style: none;
  text-align: right;
  display: flex;
  flex-direction: column;
`

export const NavigationList = (props) => {
  return (
    <NavList>
      {props.navList.map(e => <NavigationItem key={e.link} link={e.link} item={e.item}></NavigationItem>)}
    </NavList>
  )
}
