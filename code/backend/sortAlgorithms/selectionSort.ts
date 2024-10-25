export default function selectionSort(array: number[]): number[][] {

  if(array.length <= 1) {
    return [array];
  }

  //array kopieren, sonst wird die Referenz zugewiesen
  let result = [array.slice()]; 

  for(let i=0;i<array.length-1;i++) {
    let min = array[i];
    let minIndex = i;

    //Finde Minimum in Teilarray
    for(let j= i+1;j<array.length;j++) {
      if(min > array[j]) {
        min = array[j];
        minIndex = j;
      }
    }
    //mit min Element vertauschen
    let temp = array[i];
    array[i] = min;
    array[minIndex] = temp;

    //Zwischenarray kopieren und in result reinstecken 
    const clonedArray = array.slice(); 
    result.push(clonedArray);
  }

  return result;
}
