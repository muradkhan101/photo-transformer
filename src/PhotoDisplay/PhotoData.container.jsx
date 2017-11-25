import React from 'react';
import { object } from 'prop-types'

// Need to make this more general since other canvas will need photo data too?
// Could get state from canvas itself? No, imgData needs to be held in component for sorting

const photoData = (mediaQuery, current) => {
  /*
   * returns a Component that sets canvas image data to context
   * mediaQuery is test in loadPhoto function
   *    ex : () => window.innerWidth < 594
   * maxHeight, maxWidth are largest size canvas element should be set to
  */
  return class PhotoDataWrapper extends React.Component {
    static childContextTypes = {
      photoData : object,
      // imageURL: PropTypes.string,
      // subscribe: PropTypes.func,
    }
    // This method is gonna cause issues with updating children later on
    // Might update too much and be slow w/ large arrays, or won't do it often enough
    state = {
      photoData : {
        // setPhoto: (imgData) => this.setPhoto(imgData),
        getPhotoData: () => this.getPhotoData(),
        loadPhoto: (url, canvas) => this.loadPhoto(url, canvas),
      },
      imgData: undefined,
    }

    setPhoto(imgData) { this.setState({imgData : imgData}) }

    getPhotoData() { return this.state.imgData; }

    loadPhoto(url, canvas) {
      let this_ = this;
      let ctx = canvas.getContext('2d');

      let img = new Image();
      img.crossOrigin = 'Anonymous';
      return new Promise((resolve, reject) => {
        img.onload = function() {
          let h, w;
          // Need to generalize this part to work for any sized canvas
          if ( mediaQuery() ) {
            if ( this.height > this.width) {
              h = Math.min( 400, this.height );
              w = Math.round( this.width / this.height * h );
            } else {
              w = Math.min( window.innerWidth - 16, this.width );
              h = Math.round( this.height / this.width * w );
            }
          } else {
            if (this.height > this.width ) {
              h = current
                  ? Math.min( ( window.innerHeight - (45 + 60) - 8) / 3 , this.height )
                  : Math.min( 500, this.height );
              w = Math.round( this.width / this.height * h );
            } else {
              w = current
                  ? Math.min( ( window.innerWidth - 16) * 0.25, this.width )
                  : Math.min( window.innerWidth * 0.6, this.width );
              h = Math.round( this.height / this.width * w );
            }
          }

          canvas.height = h;
          canvas.width = w;
          ctx.drawImage(this, 0, 0, w, h);
          loaded(w, h);
        }

        img.src = url

        function loaded(w, h) {
          let imgData = ctx.getImageData(0,0,w,h);
          this_.state.imgData = imgData;
          resolve(imgData);
        }
      })
    }

    getChildContext() {
      return {
        photoData: this.state.photoData
      }
    }
    render () {
      return this.props.children
    }
  }
}

export default photoData;
