import React from 'react';
import PropTypes from 'prop-types'

// Need to make this more general since other canvas will need photo data too?
// Could get state from canvas itself? No, imgData needs to be held in component for sorting

const photoData = (mediaQuery, maxHeight, maxWidth) => {
  /*
   * returns a Component that sets canvas image data to context
   * mediaQuery is test in loadPhoto function
   *    ex : () => window.innerWidth < 594
   * maxHeight, maxWidth are largest size canvas element should be set to
  */
  return class extends React.Component {
    static childContextTypes = {
      photoData : PropTypes.object,
      imageURL: PropTypes.string,
      subscribe: PropTypes.func,
    }
    // This method is gonna cause issues with updating children later on
    // Might update too much and be slow w/ large arrays, or won't do it often enough
    state = {
      photoData : {
        setPhoto: (imgData) => this.setPhoto(imgData),
        getPhotoData: () => this.getPhotoData(),
        loadPhoto: (url, canvas) => this.loadPhoto(url, canvas),
      },
      photo : {
        imgData : undefined,
        width : undefined,
        height : undefined,
      },
    }

    setPhoto(imgData) { this.setState({photo : imgData}) }

    getPhotoData() { return this.state.photo }

    loadPhoto(url, canvas) {
      let this_ = this;
      let ctx = canvas.getContext('2d');

      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        let h, w;
        // Need to generalize this part to work for any sized canvas
        if ( mediaQuery() ) {
          if ( this.height > this.width) {
            h = Math.min( maxHeight, this.height );
            w = Math.round( this.width / this.height * h );
          } else {
            w = Math.min( window.innerWidth - 16, this.width );
            h = Math.round( this.height / this.width * w );
          }
        } else {
          if (this.height > this.width ) {
            h = Math.min( ( window.innerHeight - (45 + 60) - 8) / 3 , this.height );
            w = Math.round( this.width / this.height * h );
          } else {
            w = Math.min( ( window.innerWidth - 16) * 0.25, this.width );
            h = Math.round( this.height / this.width * w );
          }
        }

        canvas.height = h;
        canvas.width = w;
        ctx.drawImage(this, 0, 0,w,h);
        loaded(w, h);
      }

      img.src = url

      function loaded(w, h) {
        let imgData = ctx.getImageData(0,0,w,h);
        this_.setState({
          photo : {
            imgData : imgData,
            width : w,
            height : h,
          }
        })
      }
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
