from typing import List


class Solution:
    def subArraySumEqualsK(self, nums: List[int], k: int) -> int:
        res = 0
        curSum = 0
        prefixSums = {0 : 1}

        for n in nums:
            curSum += n
            diff = curSum - k

            res += prefixSums.get(diff, 0)

            prefixSums[curSum] = 1 + prefixSums.get(curSum, 0)

        return res


"""
We use hash map here to solve this problem.
For n loop, we save current sum to the key and the accumulated sum from the top to the value.
The reason why we add 1 to the previous count is to save the value accumulately.

Input: nums = [2,-1,1,2], k = 2

{0:1}
{2-k = 0:1} -> another 0
{2-1-k = -1:0}
{2-1+1-k = 0:2} -> another 0
{2-1+1+2-k = 2:0} -> increase it to 1
{-1 - k = -3:0}
{-1+1-k = -2:0}
{-1+1+2-k = 0:3} -> another 0
{1-k = -1:2}
{1+2-k = 1:0}
{2-k = 2:4} -> another 0

Output: 4
"""