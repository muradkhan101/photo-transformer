import React from 'react';
import { object, string } from 'prop-types';
import { swapPixel, brightness } from './sortHelpers';
import transformWrapper from './TransformWrapper.display';

class BubbleSortTransformer extends React.Component {
  static contextTypes = {
    photoData : object,
    imageURL : string,
  }
  state = {
    name : 'bubbleSort',
    continue : false,
    pixelDistance : 4,
    imgData : undefined,
    sortIndex: undefined,
  }

  draw(canvas) {
    if (this.state.continue) {
      this.bubbleSort(brightness, canvas);
    }
  }

  bubbleSort(comparison, canvas) {
    var sortIndex = this.state.sortIndex ? this.state.sortIndex : this.state.imgData.data.length;
    let array = this.state.imgData.data;
    let keepSorting = false;
    for (let j = 0; j < 75; j++) {
      for (let i = 0; i < sortIndex; i += this.state.pixelDistance) {
        if (comparison(array, i) > comparison(array,i + this.state.pixelDistance)) {
          swapPixel(array, i, i + this.state.pixelDistance);
          keepSorting = true;
        }
      }
      sortIndex -= this.state.pixelDistance;
    }
    this.setState({
      sortIndex : sortIndex,
      imgData : this.state.imgData,
      continue : keepSorting,
    },
      () => this.animation = window.requestAnimationFrame( () => this.draw(canvas))
    );
  }

  reset() {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation);
      this.animation = undefined;
    }
    this.setState({
      continue: false,
      sortIndex: undefined,
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
              if (this.state.imgData) {
                let ctx = canvas.getContext('2d');
                ctx.putImageData(this.state.imgData, 0, 0);
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
                    imgData: imgData,
                  }, () => this.draw(canvas))
                })
            }
          })
        } else return child;
      }
    )
    return children;
  }
}

const BubbleSortWrapperTransformer = transformWrapper(BubbleSortTransformer)
export default BubbleSortWrapperTransformer;
