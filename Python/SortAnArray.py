from typing import List


class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def merge(arr, L, M, R):
            left, right = arr[L:M+1], arr[M+1:R+1]
            i, j, k = L, 0, 0

            while j <= len(left) and k <= len(right):
                if left[j] <= right[k]:
                    arr[i] = left[j]
                    j += 1
                else:
                    arr[i] = right[k]
                    k += 1
                i += 1

            while j <= len(left):
                nums[i] = nums[j]
                j += 1
                i += 1
            while k <= len(right):
                nums[i] = nums[k]
                k += 1
                i += 1
        def mergeSort(arr, l, r):
            if l == r:
                return arr
            m = (l + r) // 2
            mergeSort(arr, l, m)
            mergeSort(arr, m + 1, r)
            merge(arr, l, m, r)
            return arr
        
"""
This problem uses merge sort.
Merge sort requires divide and conquer.
Merge sort means that we keep divide array into binary until there is only 1 value left in the node.
After that, we compare two values each other which one is bigger.
Smaller one will be on the left side and larger one will be on right side.

There are two helper function. 
First one is merge sort function.
If left and right values are same, then just return array.
Except for this case, we will have middle value.
Then we will do merge sort from left to middle, middle to right each.
And then we merge them all.

Next one is merge function. Merge function will merge every values in an incremental order.
If left value is smaller than right one, then we assign the value to the array.
Otherwise, we assign the right value to the array.
This is repeated until j and k indexs are smaller than the length of each value.

Example 1:

Input: nums = [10,9,1,1,1,2,3,1]

Output: [1,1,1,1,2,3,9,10]

TC: O(nlogn)
SC: O(n)
"""