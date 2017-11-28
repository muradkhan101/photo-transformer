import React from 'react';
import styled from 'styled-components';
import Information from './Information.display';

const TransformContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2em;
  @media ( max-width: 1000px ) { justify-content: center; }
`

const InfoWrapper = (Transformer) => (props) => {
  return class InfoWrapper extends React.Component {
    render() {
      return (
        <TransformContainer>
          <Transformer />
          <Information {...props} />
        </TransformContainer>
      )
    }
  }
}

export default InfoWrapper;
