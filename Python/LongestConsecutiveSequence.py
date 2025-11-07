from typing import List


class Solution:
    def longestConsecutiveSequence(self, nums: List[int]) -> int:
        numSet = set(nums)
        longest = 0

        for n in nums:
            if (n - 1) not in numSet:
                length = 0
                while (n + length) in numSet:
                    length += 1

                longest = max(length, longest)
        return longest
    

"""
This problem should start with sorting the list.
After that, we need to check if left neighborhood exist.
If it exists, then the length is getting longer. 
At the end, we will find the longest value among the sequences.

Input: nums = [2,20,4,10,3,4,5]

Output: 4

TC: O(n)
SC: O(n)
"""