export function combine(array, copy, s) {
  for (let i = 0; i < copy.length; i++) {
    array[i + s] = copy[i];
  }
  return array;
}

export function split(array, start, end, pixelDistance, comparison) {
  let done = false,
      left = start + pixelDistance,
      right = end,
      pivot = comparison(array, start);

  while (!done) {
    while (left <= right && comparison(array, left) <= pivot) left += pixelDistance;
    while (comparison(array, right) >= pivot && right >= left) right -= pixelDistance;
    if (left >= right) done = true;
    else swapPixel(array, left, right);
  }
  swapPixel(array, start, right);
  return right;
}

export function swapPixel(array, i1, i2) {
  for (let i = 0; i < 3; i++) {
    let t = array[i1 + i];
    array[i1 + i] = array[i2 + i];
    array[i2 + i] = t;
  }
  return array;
}

export function movePixel(array, initial, end, pixelDistance) {
  let toMove = array.slice(initial, initial + pixelDistance);
  let newArray;
  if (initial > end) {
    newArray = [...array.slice(0, end), ...toMove, ...array.slice(end, initial), ...array.slice(initial + pixelDistance)];
  } else {
    newArray = [...array.slice(0, initial), ...array.slice(initial + pixelDistance, end + pixelDistance), ...toMove, ...array.slice(end + pixelDistance)];
  }
  return newArray;
}

export function getPixels(array, i) {
  return [array[i], array[i + 1], array[i + 2], array[i + 3]]
}

export function floorToFour(num) {
  return Math.floor(num / 4) * 4;
}

// Comparison functions

export function brightness(array, index) {
  return array[index] + array[index+1] + array[index+2];
}

export function red(array, index) { return array[index]; }
export function green(array, index) { return array[index + 1]; }
export function blue(array, index) { return array[index + 2]; }
