import React from 'react';
import styled from 'styled-components';
import { EGG_WHITE, ALL_PADDING, FONT_SIZE, M_LEFT, M_BOT, HEADING_FONTS, BODY_FONTS, CHARCOAL, mediaQuery } from '../constants'

const Info = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${EGG_WHITE};
  ${ALL_PADDING};
  padding-top: 0;
  ${M_LEFT};
  margin-right: 25px;
  max-width: 325px;
  @media ( ${mediaQuery('md')} ) { margin-right: 0;}
  @media ( max-width: 1000px ) { margin-top: 20px; }
`

const Title = styled.h3`
  font-size: ${FONT_SIZE.large};
  font-family: ${HEADING_FONTS};
  ${M_BOT};
  color: ${CHARCOAL};
`

const BodyText = styled.p`
  font-size: ${FONT_SIZE.medium};
  font-family: ${BODY_FONTS};
  color: ${CHARCOAL};
`

const Information = (props) => {
  return (
    <Info>
      <Title>{props.title}</Title>
      <BodyText>{props.body}</BodyText>
    </Info>
  )
}

export default Information;
