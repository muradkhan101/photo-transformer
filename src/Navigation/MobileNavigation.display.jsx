import React from 'react';
import styled from 'styled-components';

const MobileNav = styled.nav`
  display: none;
  background: #313131;
  transition: background-color 0.1s linear 0.3s, top 0.25s $bezier;
  padding-top: 0.5em;
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  width: 100%;
  min-height: 5em;
  @media (max-width: 594px) {
    display: flex;
  }
`

export default class MobileNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MobileNav id="mobile-navigation"></MobileNav>
    );
  }
}
