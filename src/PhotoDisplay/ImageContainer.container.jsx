import React from 'react';
import { string, func } from 'prop-types';

export default class ImageContainer extends React.Component {
  static childContextTypes = {
    imageURL: string,
    setURL: func,
    subscribe: func,
  }

  state = {
      imageURL: undefined,
      subscribers: [],
  }

  getChildContext() {
    return {
      imageURL: this.state.imageURL,
      setURL: (url) => this.updateURL(url),
      subscribe: (f) => this.subscribe(f),
    }
  }

  updateURL(url) {
    this.state.subscribers.map( fn => fn(url) )
    this.setState({imageURL: url})
  }

  subscribe(f) {
    this.state.subscribers.push(f);
    return () => {
      this.setState({
        subscribers: this.state.subscribers.filter(fn => fn !== f)
      })
    }
  }

  render() {
    return (this.props.children)
  }
}
