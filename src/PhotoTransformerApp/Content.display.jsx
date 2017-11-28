import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import { FONT_SIZE, HEADING_FONTS, mediaQuery, TITLE } from '../constants';
import * as wrapper from '../Content/InfoWrappers';
import Uploader from './Uploader.display';

const ContentArea = styled.div`
  grid-area: content;
  padding-left: 100px;
  @media( ${mediaQuery('md')} ) {
    padding: 0;
  }
`

const Heading = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
  text-align: center;
`

const Title = styled.h1`
  text-align: center;
  font-size: ${FONT_SIZE.x_large};
  font-family: ${HEADING_FONTS};
  @media ( ${mediaQuery('md')} ) {display: none;}
`

const Content = (props_) => {
  return (
    <ContentArea id="content">
      <Heading>
        <Title> {TITLE} </Title>
        <Uploader/>
      </Heading>
      <Switch>
        <Route exact path="/circles/" render={props => <wrapper.WrappedCirclesInfo {...props}/>} />
        <Route exact path="/selectionSort/" render={props => <wrapper.WrappedSelectionInfo {...props} />}/>
        <Route exact path="/quickSort/" render={props => <wrapper.WrappedQuickInfo {...props}/> }/>
        <Route exact path="/mergeSort/" render={props => <wrapper.WrappedMergeInfo {...props}/>}/>
        <Route exact path="/bubbleSort/" render={props => <wrapper.WrappedBubbleInfo {...props}/>}/>
        <Route exact path="/insertionSort/" render={props => <wrapper.WrappedInsertionInfo {...props}/>} />
      </Switch>
    </ContentArea>
  )
}

export default Content;
