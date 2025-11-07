from typing import List


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = {}
        freq = [[] for i in range(len(nums) + 1)]

        for n in nums:
            count[n] = 1 + count.get(n, 0)
        for n, c in count.items():
            freq[c].append(n)

        res = []
        for i in range(len(freq) - 1, 0, -1):
            for n in freq[i]:
                res.append(n)

                if len(res) == k:
                    return res
                

"""
This problem should use bucket sort.
Bucket sort is putting value to each index as bucket. 
With key-value pairs as index and count number, we can find the most frequent k numbers.

count[n] should be from 0 to length of nums.
There is list which contains counts for each index. This is sorted by descending order.
We should append numbers until the length of result is same as k.

Example 1:

Input: nums = [1,2,2,3,3,3], k = 2

Output: [2,3]

TC: O(n)
SC: O(n)
"""