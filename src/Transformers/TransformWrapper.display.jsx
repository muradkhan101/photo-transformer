import React from 'react';
import styled from 'styled-components';
import photoData from '../PhotoDisplay/PhotoData.container';
import Canvas from '../PhotoDisplay/Canvas.display';
import LoadButton from '../Content/LoadButton.display';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const transformWrapper = (Transformer) => {
   /*
   * Wraps a photoData storage component around a Pixel transformer
   * which then passes the final imgData to a Canvas element to draw
   *
   * The render instructions are passed to Canvas in the Transformer
  */
  let TransformedData = photoData(
    () => window.innerWidth < 825,
    false
  )
  return class TransformWrapper extends React.Component {
    render() {
      return (
        <Container>
          <TransformedData>
            {this.props.children}
            <Transformer>
              <Canvas />
              <LoadButton/>
            </Transformer>
          </TransformedData>
        </Container>
      )
    }
  }
}

export default transformWrapper;
