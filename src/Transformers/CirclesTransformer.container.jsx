import React from 'react';
import { object, string } from 'prop-types';
import { newCircle } from './circleHelpers';
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
    continue: false,
    name: 'circles',
    circles: [],
  }

  draw(canvas) {
    if (this.state.continue) {
      let count = 0, max = 10, attempts = 0;
      let circles = [];
      while (count < max) {
        let newC = newCircle(canvas, this.context.photoData.getPhotoData(), this.state.circles.concat(circles));
        if (newC !== null) {
          circles.push(newC);
          ++count;
        }
        ++attempts;
        if (attempts > 250) {
          this.setState({ continue : false });
          return;
        }
      }
      this.setState({circles: this.state.circles.concat(circles)},
       () => {
         window.requestAnimationFrame(() => this.draw(canvas));
       })
    }
  }

  reset() {
    this.setState({
      circles : [],
      continue : false,
      photo: undefined,
    })
  }

  render() {
    let children =  React.Children.map(
      this.props.children,
      (child) => {
        if (child.type.displayName === 'Canvas') {
          return React.cloneElement(child, {
            name: this.state.name,
            renderCanvas: (canvas) => {
              let ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (let c of this.state.circles) {
                c.drawCircle(ctx);
              }
            },
          });
        } else if (child.type.displayName === 'LoadButton') {
          return React.cloneElement(child, {
            name: this.state.name,
            onClick: () => {
              this.reset();
              let url = this.context.imageURL;
              let canvas = document.getElementById(`${this.state.name}Canvas`);
              this.context.photoData.loadPhoto(url, canvas)
                .then(imgData => {
                  this.setState({
                    continue: true,
                    photo: imgData
                  },
                  () => this.draw(canvas));
                })
            }
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
