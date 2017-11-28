import React from 'react';
import { object, string } from 'prop-types';
import { swapPixel, brightness } from './sortHelpers';
import transformWrapper from './TransformWrapper.display';

class SelectionSortTransformer extends React.Component {
  static contextTypes = {
    photoData : object,
    imageURL : string,
  }
  state = {
    name : 'selectionSort',
    continue : false,
    pixelDistance : 4,
    imgData : undefined,
    sortIndex: undefined,
  }

  draw(canvas) {
    if (this.state.continue) {
      this.selectionSort(brightness, canvas);
    }
  }

  selectionSort(comparison, canvas) {
    let array = this.state.imgData.data
    let sortIndex = this.state.sortIndex ? this.state.sortIndex : array.length;
    for (let j = 0; j < 125; j++) {
      let max = -Infinity;
      let ind;
      for (let i = 0; i < sortIndex; i += this.state.pixelDistance) {
        if (comparison(array, i) > max) {
          max = comparison(array, i);
          ind = i;
        }
      }
      swapPixel(array, ind, sortIndex);
      sortIndex -= this.state.pixelDistance;
    }
    if (sortIndex <= 3) var keepSorting = false;
    this.setState({
      sortIndex : sortIndex,
      imgData : this.state.imgData,
      continue : keepSorting === false ? false : true,
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
        if (child.displayName === 'Canvas') {
          return React.cloneElement(child, {
            name: this.state.name,
            renderCanvas: (canvas) => {
              if (this.state.imgData) {
                let ctx = canvas.getContext('2d');
                ctx.putImageData(this.state.imgData, 0, 0);
              }
            },
          });
        } else if (child.displayName === 'LoadButton') {
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

const SelectionSortWrapperTransformer = transformWrapper(SelectionSortTransformer)
export default SelectionSortWrapperTransformer;
