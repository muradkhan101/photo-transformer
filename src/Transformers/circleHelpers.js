export class Circle {
   constructor(x_, y_, r, color) {
     this.x = x_;
     this.y = y_;
     this.r = r;
     this.color = color;
   }
   drawCircle(ctx) {
     ctx.beginPath();
     ctx.strokeStyle = this.color;
     ctx.fillStyle = this.color;
     ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2);
     ctx.stroke();
   }
   static outsideCircle(c, _x, _y, _r) {
     return (dist(c.x, c.y, _x, _y) > c.r + _r + 1);
   }
 }

// Get distance using pythagorean theorem x^2 + y^2 = dist^2
export function dist(x1, y1, x2, y2) {
   return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

export function random(max, min = 0) {
   return (Math.random() * (max - min) + min);
}

export function getPixelColor(imageData, xPos, yPos, width) {
  var rgb ='rgb(';
  for (var i=0; i<3; ++i) {
    rgb += (imageData[(width*yPos*4)+(xPos*4)+i]);
    if (i !== 2) rgb += ',';
    else rgb += ')';
  }
  return rgb;
}

export function newCircle(canvas, imgData, circles) {
  var x = Math.floor(random(canvas.width));
  var y = Math.floor(random(canvas.height));
  var r = 50/(Math.sqrt(
    calcVar(
      imgData.data,
      findIndices(imgData.data, (x+y*canvas.width)*4,canvas.width, 0, 10))));
  var valid = true;
  for (let c of circles) {
    if (Circle.outsideCircle(c, x, y, r) === false) {
      valid = false;
      break;
    }
  }
  if (valid === true) {
    return new Circle(x, y, r, getPixelColor(imgData.data, x, y, imgData.width));
  } else return null;
}

// Function to find indices of pixels within a range of the starting pixel
export function findIndices(arr, startInd, width, dist, maxDist, indArr=[]) {
  if (dist > maxDist || indArr.indexOf(startInd)>=0) {
    return null;
}
  else {
    indArr.push(startInd);
}
  // Checks if pixel is in first row of pixels
  if (startInd < width*4) {
    if (startInd === 0) { //Top left corner
      findIndices(arr, startInd+4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+width*4, width, dist+1, maxDist, indArr);
    }
    else if (startInd === 4*(width-1)) { //Top right corner
      findIndices(arr, startInd-4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+width*4, width, dist+1, maxDist, indArr);
    }
    else {
      findIndices(arr, startInd-4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+width*4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+4, width, dist+1, maxDist, indArr);
    }
  }
  // Checks for left edge cases
  else if (startInd % (width*4) === 0) {
    if (startInd === arr.length - width*4) { //Bottom left corner
      findIndices(arr, startInd-width*4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+4, width, dist+1, maxDist, indArr);
    }
    else {
      findIndices(arr, startInd-width*4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+width*4, width, dist+1, maxDist, indArr);
    }
  }
  //Checks is pixel is in last row
  else if (startInd > arr.length - 4*width) {
    if (startInd === arr.length-4) { //Bottom right corner
      findIndices(arr, startInd-width*4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd-4, width, dist+1, maxDist, indArr);
    }
    else {
      findIndices(arr, startInd-width*4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd-4, width, dist+1, maxDist, indArr);
      findIndices(arr, startInd+4, width, dist+1, maxDist, indArr);
    }
  }
  //Checks for right edge cases
  else if (startInd % (4*(width-1))) {
    findIndices(arr, startInd-width*4, width, dist+1, maxDist, indArr);
    findIndices(arr, startInd-4, width, dist+1, maxDist, indArr);
    findIndices(arr, startInd+width*4, width, dist+1, maxDist, indArr);
  }
  else {
    findIndices(arr, startInd-width*4, width, dist+1, maxDist, indArr);
    findIndices(arr, startInd-4, width, dist+1, maxDist, indArr);
    findIndices(arr, startInd+width*4, width, dist+1, maxDist, indArr);
    findIndices(arr, startInd+4, width, dist+1, maxDist, indArr);
  }
return indArr;
}

export function calcVar(pixelArray, indexArray) {
   var r=[], g=[], b=[];
   indexArray.forEach((e)=>{
     r.push(pixelArray[e]);
     g.push(pixelArray[e+1]);
     b.push(pixelArray[e+2]);
   });
   function singleVar(data) {
     var tot = 0;
     var sqTot =0;
     data.forEach(function(e){
       tot += e;
       sqTot += e*e;
     })
     return sqTot/data.length - (tot*tot)/(data.length*data.length);
   }
   return (singleVar(r) + singleVar(g) + singleVar(b));
}
