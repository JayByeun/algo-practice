from typing import List

# Medium
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        l, r = 0, len(nums) - 1
        i = 0

        def swap(i, j):
            tmp = nums[i]
            nums[i] = nums[j]
            nums[j] = tmp

        while i <= r:
            if nums[i] == 0:
                swap(l, i)
                l += 1
            elif nums[i] == 2:
                swap(i, r)
                r -= 1
                i -= 1
            i += 1


"""
This problem requires partition algorithm.
We need three pointers which are left, right and index.
Left pointer indicates first element of list,
Right pointer indicates last element of list and
index pointer starts with first element.
If left pointer indicates 0 then we should swap the values between left and index.
If right pointer indicates 2 then we should swap the values between index and right.
Index pointer is increased everythime of looping but in value 2 case, we should neutralize the incrementation by decreasing the index.

Example 1:

Input: nums = [1,0,1,2]

Output: [0,1,1,2]

TC: O(n)
SC: O(1)
"""