import React from 'react';
import { object, string } from 'prop-types';
import { movePixel, brightness } from './sortHelpers';
import transformWrapper from './TransformWrapper.display';

class InsertionSortTransformer extends React.Component {
  static contextTypes = {
    photoData : object,
    imageURL : string,
  }
  state = {
    name : 'insertionSort',
    continue : false,
    pixelDistance : 4,
    imgData : undefined,
    sortIndex: 4,
  }

  draw(canvas) {
    if (this.state.continue) {
      this.insertionSort(brightness, canvas);
    }
  }

  insertionSort(comparison, canvas) {
    let sortIndex = this.state.sortIndex;
    let currentIndex;

    let newArray = this.state.imgData.data;
    for (let i = 0; i < 125; i++) {
      if (comparison(newArray, sortIndex) < comparison(newArray, sortIndex - this.state.pixelDistance)) {
        currentIndex = sortIndex - this.state.pixelDistance;
        while (comparison(newArray, sortIndex) < comparison(newArray, currentIndex)) {
          if (currentIndex < 0) break;
          currentIndex -= this.state.pixelDistance;
        }
        newArray = movePixel(newArray, sortIndex, currentIndex + this.state.pixelDistance, this.state.pixelDistance);
      }
      sortIndex += this.state.pixelDistance;
    }

    for (let j = 0; j < newArray.length; j++)
      this.state.imgData.data[j] = newArray[j]

    this.setState({
      sortIndex : sortIndex,
      imgData : this.state.imgData,
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
      sortIndex: 4,
    })
  }

  render() {
    let children =  React.Children.map(
      this.props.children,
      (child) => {
        if (child.type.name === 'Canvas') {
          return React.cloneElement(child, {
            name: this.state.name,
            renderCanvas: (canvas) => {
              if (this.state.imgData) {
                let ctx = canvas.getContext('2d');
                ctx.putImageData(this.state.imgData, 0, 0);
              }
            },
          });
        } else if (child.type.name === 'LoadButton') {
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

const InsertionSortWrapperTransformer = transformWrapper(InsertionSortTransformer)
export default InsertionSortWrapperTransformer;
