import React from 'react';

export default class Canvas extends React.Component {
  state = {canvas : undefined}

  componentDidMount() {
    this.setState({ canvas: document.getElementById(`${this.props.name}Canvas`)})
  }

  render() {
    return <canvas id={`${this.props.name}Canvas`}/>
  }
}
