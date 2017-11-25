import React from 'react';
import { object, string } from 'prop-types';
import { split, brightness } from './sortHelpers';
import transformWrapper from './TransformWrapper.display';

class QuickSortTransformer extends React.Component {
  static contextTypes = {
    photoData : object,
    imageURL : string,
  }
  state = {
    name : 'quickSort',
    continue : false,
    stack : [],
    pixelDistance : 4,
    imgData : undefined,
  }

  draw(canvas) {
    if (this.state.continue) {
      this.quickSort(this.state.imgData.data, canvas);
    }
  }


  quickSortHelper(array, canvas) {
    var stack = [];
    let splitPoint = split(array, 0, array.length - this.state.pixelDistance, this.state.pixelDistance, brightness);

    stack.push({
      split: splitPoint,
      begin: 0,
      end: splitPoint - this.state.pixelDistance
    })
    stack.push({
      split: splitPoint,
      begin: splitPoint + this.state.pixelDistance,
      end: array.length - this.state.pixelDistance
    })
    this.setState({stack : stack},
    () => this.animation = window.setTimeout(() => this.draw(canvas), 200))
    return stack;
  }

  quickSort(array, canvas) {
    let stack = new Array(...this.state.stack);
    for (let i = stack.length - 1; i >= 0; i--) {
      let q = stack[i];
      if (q.begin < q.end && q.begin !== q.split && q.end !== q.split) {
        let splitPoint = split(array, q.begin, q.end, this.state.pixelDistance, brightness);
        if (q.begin < splitPoint - this.state.pixelDistance)
        stack.push({
          split: splitPoint,
          begin: q.begin,
          end: splitPoint - this.state.pixelDistance
        })
        if (q.begin + this.state.pixelDistance < q.end)
        stack.push({
          split: splitPoint,
          begin: splitPoint + this.state.pixelDistance,
          end: q.end
        })
      }
      stack.splice(i, 1);
    }
    if (!stack.length) this.setState({continue : false});
    this.setState({stack : stack},
    () => this.animation = window.setTimeout(() => this.draw(canvas), 200));
    return stack;
  }

  reset() {
    if (this.animation) {
      window.clearTimeout(this.animation);
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
                    this.quickSortHelper(this.state.imgData.data, canvas);
                  });
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

const QuickSortWrapperTransformer = transformWrapper(QuickSortTransformer)
export default QuickSortWrapperTransformer;
