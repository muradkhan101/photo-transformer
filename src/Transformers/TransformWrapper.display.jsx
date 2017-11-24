import React from 'react';
import styled from 'styled-components';
import photoData from '../PhotoDisplay/PhotoData.container';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2em;
`

const transformWrapper = (Transformer) => {
  let TransformedData = photoData(
    () => window.innerWidth < 594,
    false
  )
  export default class extends React.Component {
    render() {
      <Container>
        <TransformedData>
          {this.props.children}
          <Transformer />
        </TransformedData>
      </Container>
    }
  }
}

export default transformWrapper;
