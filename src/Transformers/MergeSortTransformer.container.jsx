import React from 'react';
import { object, string } from 'prop-types';
import { combine, floorToFour, brightness, getPixels } from './sortHelpers';
import transformWrapper from './TransformWrapper.display';

class MergeSortTransformer extends React.Component {
  static contextTypes = {
    photoData : object,
    imageURL : string,
  }
  state = {
    name : 'mergeSort',
    continue : false,
    stack : [],
    pixelDistance : 4,
    imgData : undefined,
  }

  draw(canvas) {
    if (this.state.continue) {
      this.mergeSort(this.state.imgData.data, canvas);
    }
  }
  
  mergeSortHelper(s = 0, e = this.state.imgData.data.length - this.state.pixelDistance, stack = []) {
    if ( s < e ) {
      let mid = floorToFour((e + s) / 2);
      this.mergeSortHelper(s, mid, stack);
      this.mergeSortHelper(mid + this.state.pixelDistance, e, stack);
      stack.unshift({
        start: s,
        mid: mid,
        end: e
      })
    }
    return stack;
  }

  mergeSort(array, canvas) {
    let stack = this.state.stack;
    let i = Math.min(750, stack.length);
    while (i--) {
      let m = stack[stack.length - 1];
      this.merge(array, m.start, m.mid, m.end, brightness);
      stack.length--;
    }
    if (stack.length === 0) this.setState({continue: false});
    this.setState({stack: stack},
      () => this.animation = window.requestAnimationFrame( () => this.draw(canvas) )
    );
  }

  merge(array, s, mid, e, comparison) {
    let left = s,
        right = mid + this.state.pixelDistance,
        merged = [];
    while (left <= mid && right <= e) {
      if ( comparison(array, left) < comparison(array, right) ) {
        merged.push(...getPixels(array, left));
        left += this.state.pixelDistance;
      } else {
        merged.push(...getPixels(array, right));
        right += this.state.pixelDistance;
      }
    }
    while (left <= mid) {
      merged.push(...getPixels(array, left));
      left += this.state.pixelDistance;
    }
    while (right <= e) {
      merged.push(...getPixels(array, right));
      right += this.state.pixelDistance;
    }
    combine(array, merged, s);
    return array;
  }

  reset() {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation);
      this.animation = undefined;
    }
    this.setState({
      stack: [],
      continue: false,
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
                    imgData: imgData
                  },
                  () => {
                    this.setState({
                      stack : this.mergeSortHelper(),
                    }, () => this.draw(canvas)
                  )}
                )}
              )}
          })
        } else return child;
      }
    )
    return children;
  }
}

const MergeSortWrapperTransformer = transformWrapper(MergeSortTransformer)
export default MergeSortWrapperTransformer;
