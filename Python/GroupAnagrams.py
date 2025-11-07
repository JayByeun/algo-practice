from collections import defaultdict
from typing import List


class Solution:
    def groupAnagrams(self, str: List[str]) -> List[List[str]]:
        res = defaultdict(list)

        for s in str: 
            count = [0] * 26
            for c in s:
                count[ord(c) - ord("a")] += 1
            res[tuple(count)].append(s)

        return list(res.values())
    


"""
This problem cna be solved with Hash table.
Anagram means some words which include same letters.
So each count will be key and value will be the letter.
For example, 1:e 2:a something like this.
We should find all anagrams even there is only one word in the array of list.
key: (1:e)(1:a)(1:t)
values: eat, tea, ate
With this, each anagrams are grouped.

Input: strs = ["act","pots","tops","cat","stop","hat"]

Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]

TC: O(m * n)
SC: O(m)
"""