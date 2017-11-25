import React from 'react';

export default class Canvas extends React.Component {

  /*
   * Needs a renderCanvas prop that tells it how to render
   * For CircleTransformer, putImageData won't work since it doesn't draw the image
  */

  componentWillReceiveProps(nextProps) {
    if (nextProps.renderCanvas)
      nextProps.renderCanvas(this.refs[this.props.name])
  }

  render() {
    return <canvas ref={`${this.props.name}`} id={`${this.props.name}Canvas`}/>
  }
}
