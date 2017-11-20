import { React } from 'react';
import { object } from 'prop-types'

export default class CurrentPhotoData extends React.Component {
  static childContextTypes = {
    currentPhoto : object
  }

  state = {
    currentPhoto : {
      setPhoto: (imgData) => this.setPhoto(imgData),
      getPhoto: () => this.getPhoto(),
    },
    photo : undefined
  }

  setPhoto(imgData) { this.setState({photo : imgData}) }

  getPhoto() { return this.state.photo }

  getChildContext() {
    return {
      currentPhoto: this.state.currentPhoto
    }
  }
  render () {
    return this.props.children
  }
}
