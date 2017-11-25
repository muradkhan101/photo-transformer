import React from 'react';
import { object, string } from 'prop-types';
import * as helpers from './circleHelpers';
import transformWrapper from './TransformWrapper.display';
/*
 * Needs to pull info from somewhere originally (ImageContainer - imageURL context)
 * Needs to store imgData in state ( will try w/ passing Data back to PhotoData first but that might be slow)
 * Needs to perform a set of actions on imgData and store state (heap for some sorts, circles for other)
 * Needs to update canvas after each cycle
*/

class CirclesTransformer extends React.Component {
  static contextTypes = {
    photoData : object,
    imageURL : string,
  }
  state = {
    photo: undefined,
    continue: false,
    name: 'circles',
    circles: [],
  }

  reset() {

  }

  render() {
    let { photoData } = this.context;
    let children =  React.Children.map(
      this.props.children,
      (child) => {
        if (child.type.name === 'Canvas') {
          return React.cloneElement(child, {
            name: this.state.name,
            renderCanvas: () => 1,
          });
        } else if (child.type.name === 'LoadButton') {
          return React.cloneElement(child, {
            name: this.state.name,
          })
        }
        else return child;
      }
    )
    return children;
  }
}

const CirclesWrappedTransformer = transformWrapper(CirclesTransformer)
export default CirclesWrappedTransformer;
