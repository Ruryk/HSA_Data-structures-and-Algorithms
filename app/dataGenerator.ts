import * as fs from 'fs';
import * as path from 'path';

import { BalancedBST } from './bst';
import { countingSort } from './countingSort';

// Create or clear the CSV file
const csvFilePath = path.join(__dirname, 'results.csv');
fs.writeFileSync(csvFilePath, 'Test,Data Size,BST Insert Time (ms),BST Find Time (ms),BST Delete Time (ms),Counting Sort Time (ms)\n');

// Generate random data
function generateRandomArray(size: number, maxValue: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * maxValue));
}

// Test BST and record time
function testBST(data: number[]): { insertTime: number, findTime: number, deleteTime: number } {
    const bst = new BalancedBST<number>();

    const insertStart = process.hrtime();
    data.forEach((num) => bst.add(num));
    const insertEnd = process.hrtime(insertStart);

    const findStart = process.hrtime();
    data.forEach((num) => bst.find(num));
    const findEnd = process.hrtime(findStart);

    const deleteStart = process.hrtime();
    data.forEach((num) => bst.remove(num));
    const deleteEnd = process.hrtime(deleteStart);

    return {
        insertTime: (insertEnd[0] * 1000) + (insertEnd[1] / 1000000),  // Convert to ms
        findTime: (findEnd[0] * 1000) + (findEnd[1] / 1000000),
        deleteTime: (deleteEnd[0] * 1000) + (deleteEnd[1] / 1000000)
    };
}

// Test Counting Sort and record time
function testCountingSort(data: number[], maxValue: number): number {
    const startTime = process.hrtime();
    countingSort(data, maxValue);
    const endTime = process.hrtime(startTime);
    return (endTime[0] * 1000) + (endTime[1] / 1000000);  // Convert to ms
}

// Generate 100 datasets and run tests
export function runTests(): void {
    for (let i = 1; i <= 100; i++) {
        const size = Math.floor(Math.random() * 95000) + 5000;  // Random size between 5000 and 100000
        const maxValue = Math.floor(Math.random() * 100000);  // Random max value up to 100000
        const data = generateRandomArray(size, maxValue);

        console.log(`\n--- Test #${i} ---`);
        const bstTimes = testBST(data);
        const countingSortTime = testCountingSort(data, maxValue);

        console.log(`Dataset size: ${size}`);
        console.log(`BST Insert Time: ${bstTimes.insertTime} ms`);
        console.log(`BST Find Time: ${bstTimes.findTime} ms`);
        console.log(`BST Delete Time: ${bstTimes.deleteTime} ms`);
        console.log(`Counting Sort Time: ${countingSortTime} ms`);

        // Append results to the CSV file
        const csvLine = `${i},${size},${bstTimes.insertTime},${bstTimes.findTime},${bstTimes.deleteTime},${countingSortTime}\n`;
        fs.appendFileSync(csvFilePath, csvLine);
    }
}
