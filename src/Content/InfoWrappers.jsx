import CirclesTransformer from '../Transformers/CirclesTransformer.container';
import MergeSortTransformer from '../Transformers/MergeSortTransformer.container';
import QuickSortTransformer from '../Transformers/QuickSortTransformer.container';
import BubbleSortTransformer from '../Transformers/BubbleSortTransformer.container';
import SelectionSortTransformer from '../Transformers/SelectionSortTransformer.container';
import InsertionSortTransformer from '../Transformers/InsertionSortTransformer.container';
import InfoWrapper from './InfoWrapper.display';

const circleProps = {
  title: 'Circles',
  body: 'The image is recreating using non-overlapping circles. The size of the circle is determined by the amount of detail in that area of the image, which is calculated from the variance in RGB values around the circle.',
}
const mergeProps = {
  title: 'Merge Sort',
  body: 'Merge sort is a divide-and-conquer style sorting algorithm that splits a given array into halves until it reaches a set size, usually 1. The resulting sorted arrays are then combined and sorted repeatedly until the entire array is sorted. The runtime is n log(n).',
}
const quickProps = {
  title: 'Quick Sort',
  body: 'The quick sort algorithm is a divide-and-conquer algorithm that accomplishes its task by repeatedly partioning the array. An index is chosen as the pivot, and all elements less than it are moved to the left and all elements greater than it are moved to the right. This process is repeated until the sort completes in n log(n) time.',
}
const bubbleProps = {
  title: 'Bubble Sort',
  body: 'Bubble sort works by iterating through all the elements of an array and comparing neighboring elements. It swaps the elements if the order is incorrect, resulting in the largest, or smallest, bubbling to the end of the array. The process is then repeated n times until the entire array is sorted, giving this algorithm a run-time of n^2.',
}
const selectionProps = {
  title: 'Selection Sort',
  body: 'In Selection Sort, the greatest, or smallest, element in an array is found, and then moved to the end of the array. This process is then repeated n times, placing the next greatest element one position before the last one, until the entire array is sorted. Selection sort has a runtime of n^2 since it has to loop n times across an array of length n.',
}
const insertionProps = {
  title: 'Insertion Sort',
  body: 'To understand how Insertion Sort works, imagine you have a sorted set of card in your hand and you are handed a new card. To find it\'s correct position, you\'ll check each card in your hand until you find the correct spot. Once you place it there, the hand will be sorted again. This same process is done in the Insertion sort algorithm, but using array members instead of cards.',
}

export const WrappedCirclesInfo = InfoWrapper(CirclesTransformer)(circleProps)
export const WrappedMergeInfo = InfoWrapper(MergeSortTransformer)(mergeProps)
export const WrappedQuickInfo = InfoWrapper(QuickSortTransformer)(quickProps)
export const WrappedBubbleInfo = InfoWrapper(BubbleSortTransformer)(bubbleProps)
export const WrappedSelectionInfo = InfoWrapper(SelectionSortTransformer)(selectionProps)
export const WrappedInsertionInfo = InfoWrapper(InsertionSortTransformer)(insertionProps)
