import collections
from typing import List


class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        cols = collections.defaultdict(set)
        rows = collections.defaultdict(set)
        squares = collections.defaultdict(set)

        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    continue
                if (board[r][c] in rows[r] or
                    board[r][c] in cols[c] or
                    board[r][c] in squares[(r // 3, c // 3)]):
                    return False
                cols[c].add(board[r][c])
                rows[r].add(board[r][c])
                squares[(r // 3, c // 3)].add(board[r][c])
        return True
    

"""
Sudoku is made of big 3 x 3 boxes and inside of each box, there are also 3 x 3 cells.
Big cols and rows should contain unique numbers from 0 to 9 and a big box should contain unique 0 to 9 numbers.
Therefore, 0, 1 and 2 can be key of big boxes and 0 to 9 can be key of cells.
So we need three different dicts: cols, rows and squares.

If it is dot ("."), it should be continued. 
If the value which is board[r][c] is in rows, cols or squares, then it returns false because it is already duplicate.
Otherwise, it returns true.
For each loop, we should add value which was not returned with False.

Input: board = 
[["1","2",".",".","3",".",".",".","."],
 ["4",".",".","5",".",".",".",".","."],
 [".","9","8",".",".",".",".",".","3"],
 ["5",".",".",".","6",".",".",".","4"],
 [".",".",".","8",".","3",".",".","5"],
 ["7",".",".",".","2",".",".",".","6"],
 [".",".",".",".",".",".","2",".","."],
 [".",".",".","4","1","9",".",".","8"],
 [".",".",".",".","8",".",".","7","9"]]

Output: true

TC: O(n^2)
SC: O(n^2)
"""