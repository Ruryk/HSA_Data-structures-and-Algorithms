export const countingSort = (arr: number[], maxValue: number): number[] => {
    const countArr = new Array(maxValue + 1).fill(0);
    const sortedArr = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
        countArr[arr[i]]++;
    }

    for (let i = 1; i < countArr.length; i++) {
        countArr[i] += countArr[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        sortedArr[countArr[arr[i]] - 1] = arr[i];
        countArr[arr[i]]--;
    }

    return sortedArr;
}
