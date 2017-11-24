import React from 'react';
import styled from 'styled-components';
import { EGG_WHITE, ALL_PADDING, FONT_SIZE, M_LEFT, M_BOT, HEADING_FONTS, BODY_FONTS } from '../constants'

const Info = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${EGG_WHITE};
  ${ALL_PADDING};
  ${M_LEFT};
`

const Title = styled.h3`
  font-size: ${FONT_SIZE.large};
  font-family: ${HEADING_FONTS};
  ${M_BOT};
`

const BodyText = styled.p`
  font-size: ${FONT_SIZE.medium};
  font-family: ${BODY_FONTS};
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
