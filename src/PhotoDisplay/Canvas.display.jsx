import React from 'react';

export default class Canvas extends React.Component {
  state = {canvas : undefined}

  componentDidMount() {
    this.setState({ canvas: document.getElementById(`${this.props.name}Canvas`)})
  }

  componentWillReceiveProps(nextProps) {
    let ctx = this.refs[this.props.name].getContext('2d');
    let photoData = nextProps.photoData.getPhotoData();
    if (photoData.imgData) ctx.putImageData(photoData.imgData)
  }

  render() {
    return <canvas ref={`${this.props.name}`} id={`${this.props.name}Canvas`}/>
  }
}
