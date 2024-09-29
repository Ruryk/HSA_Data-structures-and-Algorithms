# HSA12 20. Data structures and Algorithms

## BST and Counting Sort
- Implement class for Balanced Binary Search Tree that can insert, find and delete elements.
- Generate 100 random datasets and measure complexity.
- Implement Counting Sort algorithm.
- Figure out when Counting Sort doesn’t perform.

## Structure
- `src/bst.ts` — Implementation of a balanced binary search tree (BST).
- `src/countingSort.ts` — Implementation of the Counting Sort algorithm.
- `src/dataGenerator.ts` — Test data generator and performance tests.
- `src/index.ts` — Entry point for running tests.

## Install Dependencies
````bash
npm install
````

## Run the Project
````bash
npm start
````

## Results
Based on the analysis of the test results for Balanced Binary Search Tree (BST) and Counting Sort, several key conclusions can be drawn about their performance.

1. BST Insert, Find, Delete:
   - Insert Time:
   The time taken for insertions in the BST varies depending on the size of the dataset. For smaller arrays (e.g., 10,000 elements), the time is around 2-3 ms, while for larger arrays (e.g., 90,000+ elements), the time reaches 30-35 ms. This aligns with the expected O(log n) complexity for balanced tree insertions.
   - Find Time:
   Searching also exhibits logarithmic complexity, and on average, the find operation is slightly faster than insertion, which is expected. For large arrays (e.g., 90,000 elements), the search time reaches around 14 ms, indicating the efficient operation of the algorithm in balanced conditions.
   - Delete Time:
   Deletion times are somewhat similar to insertion times, ranging from 5 ms to 35 ms depending on the dataset size. This behavior is consistent with what’s expected for deletion operations in balanced search trees.
2. Counting Sort:
   - Counting Sort shows extremely low sorting times, even for large arrays (e.g., 90,000+ elements), with times ranging from 0.5 to 2 ms. This confirms that the algorithm is very fast for arrays with a limited range of values (from 0 to maxValue).
   - These results align with the theoretical complexity of Counting Sort, which is O(n + k), where n is the number of elements and k is the maximum value in the array.
3. Performance Comparison:
   - For large arrays, Counting Sort is much more efficient than BST for sorting operations since, even for datasets with more than 90,000 elements, the sorting time remains under 2 ms. In contrast, insertion, search, and deletion in BST take up to 35 ms.
   - Conclusion: Counting Sort is ideal for sorting datasets with a known range of values and significantly outperforms BST in terms of performance for large datasets.

## Summary:
   - BST: The Balanced BST efficiently handles search, insertion, and deletion operations for large datasets, exhibiting logarithmic complexity O(log n). It is suitable for scenarios where frequent modifications to the data structure (insertions and deletions) are required.
   - Counting Sort: Counting Sort demonstrates high efficiency in sorting arrays with a limited range of values, particularly when the task is to sort an array quickly without modifying its structure. However, the algorithm becomes less efficient for arrays with a large range of values or negative numbers, where modifications are necessary.


### Correlation between Data Size and Counting Sort Time (ms) to determine if larger data sizes consistently result in longer sorting times.
![Data Size and Counting Sort Time](./images/Data%20Size%20and%20Counting%20Sort%20Time.png)

### Counting Sort Time (ms) compare to BST Insert Time (ms) for different Test values
![Comparison of Sorting and Insertion Times](./images/Comparison%20of%20Sorting%20and%20Insertion%20Times.png)

### Performance of Counting Sort Time (ms) compare to BST Delete Time (ms) across different Data Sizes
![Performance Comparison](./images/Performance%20Comparison.png)

