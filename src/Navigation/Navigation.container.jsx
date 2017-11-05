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
    {link: 'https://google.com', item: 'The Googles'},
    {link: 'https://reddit.com', item: 'Time Sucker'}
  ]
}

export default class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationBar>
        <Navigation title={TEMP.title} navList={TEMP.navList}></Navigation>
        <MobileNavigation></MobileNavigation>
      </NavigationBar>
    )
  }
}
