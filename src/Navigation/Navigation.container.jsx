import React from 'react';
import styled from 'styled-components';

import Navigation from './Navigation.display';
import MobileNavigation from './MobileNavigation.display';

import { SKY_BLUE } from '../constants';

const NavigationBar = styled.div`
  grid-area: navigation;
  background-color: ${SKY_BLUE};
`
const TEMP = {
  title: 'Photo Effects',
  navList : [
    {link: 'circles', item: 'Circles'},
    {link: '/bubbleSort', item: 'Bubble Sort'},
    {link: '/quickSort', item: 'Quick Sort'},
    {link: '/mergeSort', item: 'Merge Sort'},
    {link: '/selectionSort', item: 'Selection Sort'},
  ]
}

export default class NavigationContainer extends React.Component {

  render() {
    return (
      <NavigationBar id="nav-container">
        <Navigation title={TEMP.title} navList={TEMP.navList}></Navigation>
        <MobileNavigation title={TEMP.title} navList={TEMP.navList}></MobileNavigation>
      </NavigationBar>
    )
  }
}
