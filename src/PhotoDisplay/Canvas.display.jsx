import React from 'react';

export default class Canvas extends React.Component {

  componentWillReceiveProps(nextProps) {
    let ctx = this.refs[this.props.name].getContext('2d');
    if (nextProps.imgData) ctx.putImageData(nextProps.imgData.imgData, 0, 0)
  }

  render() {
    return <canvas ref={`${this.props.name}`} id={`${this.props.name}Canvas`}/>
  }
}
