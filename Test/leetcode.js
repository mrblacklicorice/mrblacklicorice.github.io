var binaryPrint = function (root, n) {
  let q = [root];
  let r = [];

  while (q.length > 0) {
    var i = q.shift();
    r.push(i.val);

    if (i.left != undefined) q.push(i.left)
    if (i.right != undefined) q.push(i.right)
  }

  return r;
}

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * 509. Fibonacci Number
 * 
 * @param {number} n
 * @return {number}
 */
function fib(n, mem = [0, 1]) {
  if (mem[n] != null) return mem[n];

  if (n == 1 || n == 2) {
    mem[n] = 1;
    return 1;
  }

  mem[n] = fib(n - 1, mem) + fib(n - 2, mem);
  return mem[n];
}

// console.log(fib(2));

function isTravelPossible(towers) {
  if (towers[0] == 0) return false;
  if (towers[0] >= towers.length) return true;
  var checker = false;
  var steps = towers[0];
  for (let i = 1; i <= steps; i++) {
    towers.shift();
    checker = isTravelPossible(towers);
    if (checker) return true;
  }
  return false;
}

function shuffle(array) {
  var temp;
  var number;
  for (let i = 0; i < array.length; i++) {
    temp = array[i];
    number = Math.floor(Math.random() * array.length);
    array[i] = array[number];
    array[number] = temp;
  }
  return array;
}

function Equation(numbers, operations, result) {
  if (numbers.length == 1) return [numbers[0]];
  var array = [];
  var temp = Equation(numbers.slice(1), operations, null);
  for (let i = 0; i < operations.length; i++) {
    for (let j = 0; j < temp.length; j++) {
      array.push(numbers[0] + operations[i] + temp[j]);
    }
  }
  if (result == null) return array;
  for (let k = 0; k < array.length; k++) {
    if (eval(array[k]) == result) return array[k];
  }
}



// describe('Fib', function () {
//   describe('seq', function () {
//     it('Ans should be 8', function () {
//       assert.equal(fib(6, []), 8);
//     });
//     it('Ans should be 5', function () {
//       assert.equal(fib(5, []), 5);
//     });
//   });
// });


// describe('shuffle', function () {
//   it('shuffled', function () {
//     assert.notEqual(shuffle([1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7]);
//   });
// });


// describe('equation', function () {
//   assert.equal(Equation([10, 10, 10, 10], ["+", "-", "*", "/"], 200));
// });


// Given an array of integers nums.

// A pair (i,j) is called good if nums[i] == nums[j] and i < j.

// Return the number of good pairs.


var numIdenticalPairs = function (nums) {
  var count = 0;
  for (let j = 0; j < nums.length; j++) {
    for (let i = 0; i < j; i++) {
      if (nums[i] == nums[j]) count++;
    }
  }
  return count;
};

var titleToNumber = function (s) {
  var array = (s.split("")).reverse();
  var count = 0;
  for (let i = 0; i < array.length; i++) {
    count += Math.pow(26, i + 1) * array[i].charCodeAt(0) - 64;
  }
  return count;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 * returns if one element can be removed to make the function strictly increasing
 */
var canBeIncreasing = function (nums) {
  if (nums.length < 3) return true;
  nums.unshift(0);
  nums.push(1001);
  var once = false;
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i] >= nums[i + 1]) {
      if (once) return false;
      once = true;

      if (nums[i - 1] >= nums[i + 1]) nums[i + 1] = nums[i];
      else nums[i] = nums[i - 1];
    }
  }
  return true;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  var s1 = "";
  var s2 = "";
  var result;

  while (!(l1 == undefined && l2 == undefined)) {
    if (l1 != undefined) { s1 += l1.val; l1 = l1.next; }
    if (l2 != undefined) { s2 += l2.val; l2 = l2.next; }
  }

  s1 = s1.split("")
  s2 = s2.split("")

  if (s1.length > s2.length) {
    s2 = s2.concat(new Array(s1.length - s2.length).fill("0"));
  } else if (s2.length > s1.length) {
    s1 = s1.concat(new Array(s2.length - s1.length).fill("0"));
  }

  result = new Array(s1.length + 1).fill(0);

  for (let i = 0; i < s1.length; i++) {
    result[i] += (+s1[i]) + (+s2[i]);
    if (result[i] > 9) {
      result[i] = result[i] - 10;
      result[i + 1]++;
    }
  }

  if (result[result.length - 1] == 0) result.pop();
  result.reverse();
  result[0] = { val: result[0], next: null };

  for (var i = 1; i < result.length; i++) {
    result[i] = { val: result[i], next: result[i - 1] };
  }

  return result.pop();
};

var calculate = function (s) {
  s = (s.split(" ")).join("");
  var sign = "";
  var array = new Array(2);
  array.fill("");
  var temp = "";
  var s_temp = "";
  var counter = 0;
  var change = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      counter++;
    } else if (s[i] == ")") {
      counter--;
      if (counter == 0) {
        temp = temp.substring(1);
        s_temp += String(calculate(temp));
        temp = "";
        change = true;
      }
    }

    if (counter == 0 && !change) {
      s_temp += s[i];
    }

    if (counter > 0) {
      temp += s[i];
    }
    if (change) change = false;
  }
  s = s_temp;
  if (s_temp[0] == "-") return parseInt(s_temp);
  for (let i = 0; i < s.length; i++) {
    if (s[i] != "+" && s[i] != "-" && sign == "") {
      array[0] += s[i];
    } else if (s[i] == "+" || s[i] == "-") {
      if (s[i - 1] != "-" && s[i - 1] != "+") {
        if (array[1] != "") {
          if (sign == "-") {
            array[0] = String(parseInt(array[0]) - parseInt(array[1]));
          } else if (sign == "+") {
            array[0] = String(parseInt(array[0]) + parseInt(array[1]));
          }
          array[1] = "";
        }
        sign = s[i];
      } else {
        array[1] += s[i];
      }
    } else if (s[i] != "+" && s[i] != "-" && sign != "") {
      array[1] += s[i];
    }
  }
  console.log(array);
  if (sign == "-") {
    array[0] = String(parseInt(array[0]) - parseInt(array[1]));
  } else if (sign == "+") {
    array[0] = String(parseInt(array[0]) + parseInt(array[1]));
  }
  return parseInt(array[0]);
};

// console.log(calculate("(1+(4+5+2)-3)+(6+8)"));
// console.log(calculate("2-(5-6)"));
// console.log(calculate("(5-(1+(5)))"));

var clumsy = function (N) {
  if (N <= 1) return "1";
  var result = "";
  var counter = 0;
  var array = ["l", "l", "+", "-"];
  while (N > 0) {
    if (counter == 0) result += " ";
    result += N;
    if (counter == 2) result += " ";
    result += array[counter];
    if (counter != 3) {
      counter++;
    } else {
      counter = 0;
    }
    N--;
  }
  result = result.slice(0, -1);
  var end = result.split(" ");
  var temp = new Array();
  end.shift();
  for (let i = 0; i < end.length; i++) {
    if (i % 2 == 0) {
      temp = end[i].split("l");
      switch (temp.length) {
        case 1:
          end[i] = temp[0];
          break;
        case 2:
          end[i] = String(temp[0] * temp[1]);
          break;
        case 3:
          end[i] = String(Math.floor((temp[0] * temp[1]) / temp[2]));
          break;
        default:
          break;
      }
    }
  }
  return String(eval(end.join("")));
};

// console.log(clumsy(10));


var longestCommonSubsequence = function (x, y) {
  var grid = ((new Array(x.length)).fill(0)).map(ele => (new Array(y.length)).fill(0));
  var counter = 0;
  var left = 0;
  var down = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      counter = 0;
      left = 0;
      down = 0;
      if (x[row] == y[col]) {
        counter++;
      }

      if (row > 0) {
        down = grid[row - 1][col];
      }

      if (col > 0) {
        left = grid[row][col - 1];
      }

      if (counter == 1) {
        if (row > 0 && col > 0)
          counter += grid[row - 1][col - 1];
      } else {
        if (left > down) {
          counter += left;
        } else {
          counter += down;
        }
      }

      grid[row][col] = counter;
    }
  }
  return grid[x.length - 1][y.length - 1];
};

var maximumProduct = function (nums) {
  var temp;
  nums.sort(function (a, b) {
    return b - a
  });

  for (let i = 0; i < nums.length; i++) {
    if (Math.sign(nums[i]) == -1) {
      temp = nums.splice(i);
    }
  }
  temp = temp.reverse();
  if (temp[0] * temp[1] > nums[0] * nums[1]) {
    if (temp[0] * temp[1] > nums[1] * nums[2]) {
      return temp[0] * temp[1] * nums[0];
    }
  }
  return nums[0] * nums[1] * nums[2];
};

// console.log(maximumProduct([-4, -3, -2, -1, 60]));


var heightChecker = function (heights) {
  var counter = 0;
  heights.sort((a, b) => {
    if (a - b < 0) counter++;
    return a - b;
  });
  console.log(heights);
  return counter;
};

// console.log(heightChecker([1,1,4,2,1,3]));



var isLongPressedName = function (name, typed) {
  var result = false;
  var grid = ((new Array(name.length)).fill(0)).map(ele => (new Array(typed.length)).fill(0));
  var thisLineGood = false;
  var lastIndex = -1;
  var thisCol = false;
  var checker = true;
  for (let i = 0; i < typed.length; i++) {
    if (name.search(typed[i]) == -1) return false;
  }

  for (let n = 0; n < grid.length; n++) {
    thisLineGood = false;
    for (let t = 0; t < grid[n].length; t++) {
      if (thisLineGood) {
        if (grid[n][t] == name[n]) {
          if (grid[n][t - 1] != name[n]) {
            return false;
          } else {
            grid[n][t] = false;
          }
        } else {
          grid[n][t] = false;
        }
      } else {
        if (name[n] == typed[t] && lastIndex < t) {
          thisCol = false;
          for (let i = 0; i < n && !thisCol; i++) {
            if (grid[i][t]) {
              thisCol = true;
            }
          }
          if (thisCol) {
            grid[n][t] = false;
          } else {
            grid[n][t] = true;
            thisLineGood = true;
            lastIndex = t;
          }
        } else {
          grid[n][t] = false;
        }
      }
    }
    if (!thisLineGood) return false;
  }
  return true;
};

// console.log(isLongPressedName("ALEX", "AALELXX"));

var rankTeams = function (votes) {
  totalvotes = {};
  for (let i = 0; i < votes.length; i++) {
    var single_vote = votes[i].split("");
    for (let j = 0; j < single_vote.length; j++) {
      if (!totalvotes.hasOwnProperty(single_vote[j])) totalvotes[single_vote[j]] = 0;
      totalvotes[single_vote[j]] += (j + 1);
    }
  }
  var temp = [];
  var result = new Array(single_vote.length);
  var values = Object.values(totalvotes);
  values.sort((a, b) => a - b);
  for (let i = 0; i < values.length; i++) {
    temp = [];
    for (var [key, value] of Object.entries(totalvotes)) {
      if (value == values[i]) temp.push(key);
    }
    if (temp.length == 1) {
      result.push(temp[0]);
    } else {
      console.log(temp);
      if (!result.includes(temp[0])) result = result.concat(temp.sort());
    }
  }
  return result.join("");
};

var maximumSwap = function (num) {
  var temp = String(num).split("");
  var high_index = 0;
  var high = parseInt(temp[high_index]);

  for (let j = 0; j < temp.length; j++) {
    if (j == 0 || temp[j - 1] == high) {
      high_index = j;
      high = parseInt(temp[high_index]);
      for (let i = j; i < temp.length; i++) {
        if (parseInt(temp[i]) >= high) {
          high_index = i;
          high = parseInt(temp[i]);
        }
      }
    } else {
      temp_num = temp[j - 1];
      temp[j - 1] = high;
      temp[high_index] = temp_num;

      return parseInt(temp.join(""));
    }
  }
  return parseInt(temp.join(""));
};

var checkPossibility = function (nums) {
  if (nums.length == 1) return true;
  var temp = [...nums];
  var first = true;
  var second = true;
  var temp_good = true;
  var nums_good = true;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i - 1] != undefined && nums[i - 1] > nums[i] && nums_good) {
      nums[i - 1] = nums[i];
      nums_good = false;
    }
    if (temp[temp.length - i] != undefined && temp[temp.length - (i + 1)] > temp[temp.length - (i)] && temp_good) {
      temp[temp.length - i] = temp[temp.length - (i + 1)];
      temp_good = false;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if ((nums[i - 1] != undefined && nums[i - 1] > nums[i])) {
      first = false;
    }
    if ((temp[temp.length - i] != undefined && temp[temp.length - (i + 1)] > temp[temp.length - (i)])) {
      second = false;
    }
  }
  return (first || second);
};


// console.log(checkPossibility([4, 2, 3]));

function random(no_sets, max, min, percentage) {
  var counter = 0;
  for (let index = 0; index < no_sets; index++) {
    if (Math.ceil(Math.random() * 150) + 1 < 20) counter++;
  }
  return counter;
}

var judgeCircle = function (moves) {
  var x = 0;
  var y = 0;
  for (const move of moves) {
    if (move == "U") y++;
    else if (move == "D") y--;
    else if (move == "R") x++;
    else if (move == "L") x--;
  }
  return (x == 0 && y == 0);
};

var lastStoneWeight = function (stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => b - a);
    stones.push(stones[0] - stones[1]);
    stones.splice(0, 2);
  }
  if (stones.length == 1) return stones[0];
  return 0;
};


var getSmallestString = function (n, k) {
  var arr = new Array(n);
  var inventory = 0;
  var filling = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (k > 26) {
      arr[i] = 26;
      k -= 26;
    } else if (k > 0) {
      arr[i] = k;
      inventory = i;
      filling = i - 1;
      k = 0;
    } else {
      arr[i] = 0;
    }
  }
  while (arr[0] == 0) {
    if (arr[inventory] > 1) {
      arr[filling]++;
      arr[inventory]--;
      filling--;
    } else {
      inventory++;
    }
  }
  return arr.map(x => String.fromCharCode(x + 96)).join("");
};

var sortString = function (s) {
  s_arr = (s.split("")).sort();
  var value;
  var end = "";
  var count = 0;

  while (s_arr.length != count) {
    value = 0;
    for (let i = 0; i < s_arr.length; i++) {
      if (s_arr[i] != "" && (s_arr[i]).charCodeAt(0) > value) {
        end += s_arr[i];
        value = (s_arr[i]).charCodeAt(0);
        s_arr[i] = "";
        count++;
      }
    }
    value = 1000;
    for (let i = s_arr.length - 1; i >= 0; i--) {
      if (s_arr[i] != "" && (s_arr[i]).charCodeAt(0) < value) {
        end += s_arr[i];
        value = (s_arr[i]).charCodeAt(0);
        s_arr[i] = "";
        count++;
      }
    }
  }
  return end;
};

var isToeplitzMatrix = function (matrix) {
  for (let i = 0; i < matrix.length - 1; i++) {
    console.log(matrix[i].slice(0, matrix[0].length));
    if (JSON.stringify(matrix[i].slice(0, matrix[0].length - 1)) != JSON.stringify(matrix[i + 1].slice(1))) {
      return false;
    }
  }
  return true;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  var x;
  if (head == null) return false;
  while (head.next != null && head.next != head) {
    x = head.next;
    head.next = head;
    head = x;
  }
  return (head.next == head);
};

var singleNumber = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i += 2) {
    if (nums[i] != nums[i + 1]) return nums[i];
  }
};

var check = function (nums) {
  var n = true;
  var x = 0;
  if (nums[0] < nums[nums.length - 1]) n = false;
  for (const y of nums) {
    if (y < x) {
      if (!n) return false;
      n = false;
    }
    x = y;
  }
  return true;
};

var isMonotonic = function (A) {
  for (let i = 1; i < A.length; i++) {
    if ((A[0] <= A[1]) ? !(A[i - 1] <= A[i]) : !(A[i - 1] >= A[i])) return false;
  }
  return true;
};

var maximumWealth = function (accounts) {
  var current_sum = 0;
  var highest_wealth = 0;
  for (let i = 0; i < accounts.length; i++) {
    current_sum = 0;
    for (let j = 0; j < accounts[i].length; j++) {
      current_sum += accounts[i][j];
    }
    if (highest_wealth < current_sum) highest_wealth = current_sum;
  }
};



var numSquares = function (n) {
  if (n < 4) return n;

  var min = n;
  var sqrt = Math.floor(Math.sqrt(n));
  var current = 0;
  var sqr = 0;

  for (let i = sqrt; i > 0; i--) {
    sqr = i * i;
    current = Math.floor(n / sqr) + numSquares(n % sqr);
    if (current < min) {
      min = current;
    }
  }

  return min;
};


var square_num = function (n) {
  var arr = [0];
  while (arr.length <= n) {
    var m = arr.length;
    var squares = Number.MAX_VALUE;
    for (var i = 1; i * i <= m; ++i) {
      squares = min(squares, arr[m - i * i] + 1);
    }
    arr.push_back(squares);
  }
}

var min = function (a, b) {
  return (a - b > 0) ? b : a;
}


var nthUglyNumber = function (n) {
  var current = 1;
  var counter = 1;

  while (counter <= n) {
    let temp = current;
    while (temp % 2 == 0 && temp != 1) {
      temp /= 2;
    }
    while (temp % 3 == 0 && temp != 1) {
      temp /= 3;
    }
    while (temp % 5 == 0 && temp != 1) {
      temp /= 5;
    }
    if (temp == 1) {
      counter++
    }
    current++;
  }
  return (current - 1);
};

var maxPower = function (s) {
  if (s.length < 2) return s.length;

  var current_score = 1;
  var highscore = 1;

  for (let i = 1; i < s.length; i++) {
    if (s.charAt(i) == s.charAt(i - 1)) {
      console.log(s.charAt(i));
      current_score++;
    }
    else {
      current_score = 1;
    }
    if (current_score > highscore) {
      highscore = current_score;
    }
  }
  return highscore;
}

var longestCommonPrefix = function (strs) {
  if (strs.length == 1) return strs[0];
  var highest = -1;
  var hit = false;

  var min = strs.reduce((shortestWord, currentWord) => {
    return currentWord.length < shortestWord.length ? currentWord : shortestWord;
  }, strs[0]);

  for (let i = 0; i < min.length; i++) {
    for (let j = 0; j < strs.length && !hit; j++) {
      hit = !(strs[j][i] == min[i]);
    }

    if (!hit) {
      highest = i;
    } else {
      return min.substring(0, highest + 1);
    }
  }

  return min;
};

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  var words = (s.split(" ")).map(val => { val.split("").reverse().join("") }).join(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = (words[i].split("")).reverse().join("")
  }

  return words.join(" ");
  // return (s.split(" ")).map(val => { return val.split("").reverse().join("") }).join(" ");

};

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  var x = Infinity;
  var k = 0;
  while (x > h) {
    x = 0;
    k++;
    for (let i = 0; i < piles.length; i++) {
      x += Math.ceil(piles[i] / k);
    }
  }

  return k;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  var t = new Array(nums.length - 1).fill(false);
  for (let i = 0; i < nums.length; i++) {
    if (t[nums[i]]) return nums[i];
    else t[nums[i]] = !t[nums[i]];
  }
};

// console.log(findDuplicate([1, 3, 4, 2, 2]));

let searchMatrix = function (matrix, target) {

  var i = matrix.length - 1;
  while (matrix[i][0] > target) {
    i--;
    if (i == -1) return false;
  }

  var start = 0, end = matrix[i].length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (matrix[i][mid] === target) return true;
    else if (matrix[i][mid] < target) start = mid + 1;
    else end = mid - 1;
  }

  return false;
}

// console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3));

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  var mat = ((new Array(n)).fill(0)).map(ele => (new Array(n)).fill(0));

  var r = 0, c = 0;
  var rx = 0, cx = 1;

  mat[0][0] = 1;
  for (let i = 2; i <= n * n; i++) {
    if (!(r + rx < n && r + rx > -1 && c + cx < n && c + cx > -1 && mat[r + rx][c + cx] == 0)) {
      [cx, rx] = (cx != 0) ? [0, cx] : [-rx, 0];
    }
    mat[r + rx][c + cx] = i;
    r += rx;
    c += cx;
  }
  return mat;
};

// console.table(generateMatrix(5))

/**
 * @param {number[]} rains
 * @return {number[]}
 */
var avoidFlood = function (rains) {
  var ans = new Array(rains.length).fill(-1);

  var result = [];
  temp = [];
  var zero = false;

  for (let i = 0; i < rains.length; i++) {
    if ((!zero && rains[i] != 0) || (zero && rains[i] == 0)) {
      temp.push(rains[i]);
    } else {
      result.push(temp);
      temp = [rains[i]];
      zero = !zero;
    }
  }
  result.push(temp);
  return result;
};

// console.log(avoidFlood([1, 2, 0, 0, 2, 1]));

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
};

// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));

/**
 * TODO: 630
 * @param {number[][]} courses
 * @return {number}
 */
var scheduleCourse = function (courses) {
  var oc = courses.sort((a, b) => a[1] - b[1]);
  var counter = 0;
  var curr_day = 0;

  for (let i = 0; i < oc.length; i++) {
    if (oc[i][1] >= curr_day + oc[i][0] && oc[i][0] <= oc[i][1]) {
      curr_day += oc[i][0];
      counter++;
    }
  }

  return counter;
}

// console.log(scheduleCourse([[100, 200], [1000, 1300], [200, 1250], [2000, 3200]]));

/**
 * 1354. Construct Target Array With Multiple Sums
 * @param {number[]} target
 * @return {boolean}
 */
var isPossible = function (target) {
  var max_i = 0;
  var total = 0;

  if (target.length == 2 && target.includes(1)) return true;
  if (target.length == 1) return (target[0] == 1);

  do {
    total = 0;
    max_i = 0;
    for (let i = 0; i < target.length; i++) {
      total += target[i];
      if (target[i] > target[max_i]) {
        max_i = i;
      }
    }

    if (target[max_i] == 1 && total == target.length) return true;

    total -= target[max_i];
    target[max_i] -= total;
  } while ((target[max_i] > 0));

  return false;
};

// console.log(isPossible([9, 3, 5]));

/**
 * 1423. Maximum Points You Can Obtain from Cards
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
  var st = [0];
  var ed = [0];

  if (cardPoints.length < k) {
    var x = 0;
    for (let i = 0; i < cardPoints.length; i++) {
      x += cardPoints[i];
    }
    return x;
  }

  for (let i = 0; i < k; i++) {
    st.push(st[st.length - 1] + cardPoints[i])
    ed.push(ed[ed.length - 1] + cardPoints[cardPoints.length - (i + 1)])
  }

  ed.reverse();

  var high = 0;

  for (let i = 0; i < st.length; i++) {
    if (high < ed[i] + st[i]) {
      high = ed[i] + st[i];
    }
  }

  return high;
};

// console.log(maxScore([11, 49, 100, 20, 86, 29, 72], 4));

/**
 * 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers
 * @param {string} n
 * @return {number}
 */
var minPartitions = function (n) {
  return Math.max(...n.split(""));
};

// console.log(minPartitions("82734"));

/**
 * 1315. Sum of Nodes with Even-Valued Grandparent
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumEvenGrandparent = function (root) {
  var total = 0;
  if (root.left != null) {
    if (root.val % 2 == 0) {
      total += (root.left.left != null) ? root.left.left.val : 0;
      total += (root.left.right != null) ? root.left.right.val : 0;
    }
    total += sumEvenGrandparent(root.left);
  }
  if (root.right != null) {
    if (root.val % 2 == 0) {
      total += (root.right.left != null) ? root.right.left.val : 0;
      total += (root.right.right != null) ? root.right.right.val : 0;
    }
    total += sumEvenGrandparent(root.right);
  }
  return total;
};

/**
 * 1647. Minimum Deletions to Make Character Frequencies Unique
 * @param {string} s
 * @return {number}
 */
var minDeletions = function (s) {
  var total = 0;

  var dict = {};
  var arr = s.split("");

  for (let i = 0; i < arr.length; i++) {
    if (dict[arr[i]] == null) dict[arr[i]] = 1;
    else dict[arr[i]]++;
  }

  var keys = Object.keys(dict);
  var result = [];

  for (let i = 0; i < keys.length; i++) {
    if (result[dict[keys[i]] - 1] == undefined) result[dict[keys[i]] - 1] = [keys[i]];
    else result[dict[keys[i]] - 1].push(keys[i]);
  }

  var j = 0;
  for (let i = 0; i < result.length; i++) {
    while (result[i] != undefined && result[i].length > 1) {
      j = i - 1;
      while (j >= 0) {
        if (result[j] == undefined) result[j] = [result[j + 1].pop()];
        else result[j].push(result[j + 1].pop());

        total++;

        if (result[j].length > 1) j--;
        else break;
      }
      if (j == -1 && result[0].length > 1) {
        result[0].pop();
        total++;
      }
    }
  }

  return total;
};

// console.log(minDeletions("aaabbbcc"));

/**
 * 406. Queue Reconstruction by Height
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  people = people.sort((a, b) => { return (a[0] - b[0] != 0) ? a[0] - b[0] : a[1] - b[1] })
  var result = new Array(people.length).fill([1000000, 1000000]);

  var total = 0;
  var j = 0;
  for (let i = 0; i < people.length; i++) {
    total = people[i][1];
    j = 0;
    while (total > 0 || result[j][0] != 1000000) {
      if (result[j][0] >= people[i][0]) total--;
      j++;
    }
    result[j] = people[i];
  }

  return result;
};

// console.log(reconstructQueue([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]));

/**
 * 462. Minimum Moves to Equal Array Elements II
 * @param {number[]} nums
 * @return {number}
 */
var minMoves2 = function (nums) {
  nums = nums.sort((a, b) => a - b);
  var median = (nums.length % 2 == 1) ? nums[Math.floor(nums.length / 2)] : (nums[Math.floor(nums.length / 2)] + nums[Math.floor(nums.length / 2)]) / 2;

  var result = 0;
  for (let i = 0; i < nums.length; i++) {
    result += Math.abs(nums[i] - median);
  }
  return result;
};

// console.log(minMoves2([1, 0, 0, 8, 6]));

/**
 * 1710. Maximum Units on a Truck
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  boxTypes = boxTypes.sort((a, b) => b[1] - a[1]);
  var total = 0;
  for (let i = 0; i < boxTypes.length; i++) {
    if (boxTypes[i][0] <= truckSize) {
      total += boxTypes[i][0] * boxTypes[i][1];
      truckSize -= boxTypes[i][0];
    } else {
      total += truckSize * boxTypes[i][1];
      break;
    }
  }

  return total;
};

// console.log(maximumUnits([[5, 10], [2, 5], [4, 7], [3, 9]], 10));

/**
 * 2278. Percentage of Letter in String
 * @param {string} s
 * @param {character} letter
 * @return {number}
 */
var percentageLetter = function (s, letter) {
  var total = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == letter) total++;
  }
  return Math.floor((total / s.length) * 100);
};

// console.log(percentageLetter("foobar", "o"));

/**
 * 2095. Delete the Middle Node of a Linked List
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
  var start = head;
  var length = 0;

  if (head.next == null) return null;

  while (start.next != null) {
    start = start.next;
    length++;
  }

  start = head;
  length = (length % 2 == 0) ? (length / 2) : ((length + 1) / 2);

  for (let i = 0; i < length - 1; i++) {
    start = start.next;
  }

  start.next = (start.next.next != null) ? start.next.next : null;

  return head;
};

/**
 * 1562. Find Latest Group of Size M
 * @param {number[]} arr
 * @param {number} m
 * @return {number}
 */
var findLatestStep = function (arr, m) {
  var result = new Array(arr.length).fill('0')
  var target = "1".repeat(m);
  var latest = -1;


  for (let i = 0; i < arr.length; i++) {
    console.log(result);
    result[arr[i] - 1] = '1';
    if (result.join("").split("0").includes(target)) latest = i + 1;
  }

  return latest;
};

// console.log(findLatestStep([3, 5, 1, 2, 4], 1))

/**
 * 1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
var maxArea = function (h, w, horizontalCuts, verticalCuts) {
  verticalCuts.sort((a, b) => a - b);
  horizontalCuts.sort((a, b) => a - b);

  verticalCuts.push(w);
  horizontalCuts.push(h);

  var max_v = verticalCuts[0];
  var max_h = horizontalCuts[0];

  for (let i = 0; i < verticalCuts.length - 1; i++) {
    if (max_v < verticalCuts[i + 1] - verticalCuts[i]) max_v = verticalCuts[i + 1] - verticalCuts[i];
  }

  for (let i = 0; i < horizontalCuts.length - 1; i++) {
    if (max_h < horizontalCuts[i + 1] - horizontalCuts[i]) max_h = horizontalCuts[i + 1] - horizontalCuts[i];
  }

  let x = max_v * max_h;
  if (!Number.isSafeInteger(x)) {
    return Number((BigInt(max_v) * BigInt(max_h)) % BigInt((10 ** 9) + 7));
  }
  return x % ((10 ** 9) + 7);
};

// console.log(maxArea(5, 4, [1, 2, 4], [1, 3]));

/**
 * 2235. Add Two Integers
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var sum = function (num1, num2) {
  return num1 + num2;
};

// console.log(sum(1, 2));

/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  let p = 1;
  let n = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      p = n + 1;
    } else if (nums[i] < nums[i - 1]) {
      n = p + 1;
    }
  }

  return Math.max(p, n);
};

// console.log(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8]));

/**
 * 135. Candy
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  var results = new Array(ratings.length).fill(1);

  if (ratings.length == 1) return 1;

  if (ratings[0] < ratings[1]) results[0] = 1;
  else results[0] = 2;

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i - 1] <= ratings[i]) {
      results[i] = results[i - 1] + 1;
    } else {
      if (results[i - 1] > 1) results[i] = results[i - 1] - 1;
      else results[i - 1]++;
    }
  }

  var sum = 0;
  for (let i = 0; i < results.length; i++) {
    sum += results[i];
  }

  return sum;
};

// console.log(candy([1, 3, 2, 2, 1]));

/**
 * 128. Longest Consecutive Sequence
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length < 2) return nums.length;
  nums = nums.sort((a, b) => a - b);

  var lar = 1;
  var curr = 1;
  var prev = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] == prev + 1) curr++;
    else if (!(nums[i] == prev)) curr = 1;

    if (lar < curr) lar = curr;
    prev = nums[i];
  }

  return lar;
};

// console.log(longestConsecutive([1, 2, 0, 1]));

/**
 * 199. Binary Tree Right Side View
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  var res = [root.val];

  console.log(root.left);
  console.log(root.right);

  // var left = root.left ? rightSideView(root.left) : [];
  // var right = root.right ? rightSideView(root.right) : [];

  // if (right.length >= left.length) res.concat(right);
  // else res.concat(left).concat(right.substring(left.length))

  return res;
};

/**
 * 473. Matchsticks to Square
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks, target) {
  if (target == undefined) {
    matchsticks = matchsticks.sort((a, b) => b - a);
    var l = 0;

    for (let i = 0; i < matchsticks.length; i++) {
      l += matchsticks[i];
    }

    if (l % 4 != 0) return false;
    else l /= 4;

    matchsticks = makesquare(matchsticks, l);
    matchsticks = makesquare(matchsticks, l);
    matchsticks = makesquare(matchsticks, l);
    matchsticks = makesquare(matchsticks, l);

    return (matchsticks.join('').matches(new Array(matchsticks.length).fill(0).join('')));
  } else {
    var result = ((new Array(matchsticks.length + 1)).fill(null)).map(ele => (new Array(target + 1)).fill(null))

    result[0].fill(false);
    for (let i = 0; i < result.length; i++) {
      result[i][0] = true;
    }

    for (let i = 1; i < result.length; i++) {
      for (let j = 1; j < result[i].length; j++) {
        if (matchsticks[i - 1] > j) {
          result[i][j] = result[i - 1][j];
        } else {
          result[i][j] = result[i - 1][j - matchsticks[i - 1]];
        }
      }
    }

    if (result[result.length - 1][result[0].length - 1] == false) return matchsticks;

    var x = result.length - 1;
    var y = result[0].length - 1;

    console;

    while (x != 1 || y != 0) {
      if (!(result[x - 1][y] == true)) {
        y -= matchsticks[x - 1];
        matchsticks[x - 1] = 0;
      }
      x--;
    }

    return matchsticks;
  }
};

// console.log(makesquare([1, 1, 2, 2, 2]));

/**
 * 102. Binary Tree Level Order Traversal
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root == null) return [];

  let l = [0]
  let q = [root];

  let r = [];

  while (q.length > 0) {
    var c = l.shift();
    var i = q.shift();

    if (r[c] == null) r[c] = [i.val];
    else r[c].push(i.val);

    if (i.left != null) {
      q.push(i.left)
      l.push(c + 1);
    }

    if (i.right != null) {
      q.push(i.right)
      l.push(c + 1);
    }
  }

  return r;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length == 0) return null;
  var head = {
    val: preorder.shift(),
    left: null,
    right: null
  }

  var int = inorder.indexOf(head.val);

  var lp = [];
  var li = inorder.slice(0, int);

  var rp = [];
  var ri = inorder.slice(int + 1);

  for (let i = 0; i < preorder.length; i++) {
    if (li.includes(preorder[i])) lp.push(preorder[i]);
    if (ri.includes(preorder[i])) rp.push(preorder[i]);
  }

  if (lp.length > 0) {
    head.left = buildTree(lp, li);
  }

  if (rp.length > 0) {
    head.right = buildTree(rp, ri);
  }

  return head;
};

// console.log(binaryPrint(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])));

/**
 * 695. Max Area of Island
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  var result = new Array(grid.length).fill(false).map(ele => (new Array(grid[0].length)).fill(false));

  var highest = 0;
  var curr = 0;
  var queue = [];
  var h;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1 && !result[i][j]) {
        queue.push([i, j]);
        while (queue.length > 0) {
          h = queue.shift();
          if (!result[h[0]][h[1]]) {
            result[h[0]][h[1]] = true;
            curr++;

            for (let q = -1; q <= 1; q += 2) {
              if (h[0] + q > -1 && h[0] + q < grid.length && grid[h[0] + q][h[1]] == 1 && !result[h[0] + q][h[1]])
                queue.push([h[0] + q, h[1]]);

              if (h[1] + q > -1 && h[1] + q < grid[0].length && grid[h[0]][h[1] + q] == 1 && !result[h[0]][h[1] + q])
                queue.push([h[0], h[1] + q]);

            }
          }
        }

        if (curr > highest) highest = curr;
        curr = 0;
      }
    }
  }

  return highest;
};

// console.log(maxAreaOfIsland([[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]));
// console.log(maxAreaOfIsland([[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]]));

/**
 * 118. Pascal's Triangle
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  if (numRows == 1) return [[1]];

  var result = [[1], [1, 1]];

  var temp;
  for (let l = 2; l < numRows; l++) {
    temp = [1];
    for (let i = 0; i < result[l - 1].length - 1; i++) {
      temp.push(result[l - 1][i] + result[l - 1][i + 1]);
    }
    temp.push(1);
    result.push(temp);
  }
  return result;
};

// console.log(generate(5));

/**
 * 119. Pascal's Triangle II
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  if (rowIndex == 0) return [1];
  if (rowIndex == 1) return [1, 1];

  var prev = [1, 1];
  var curr = [1, 2, 1];
  var l = 2;

  while (l < rowIndex) {
    prev = curr;
    curr = [1];

    for (let i = 0; i < prev.length - 1; i++) {
      curr.push(prev[i] + prev[i + 1]);
    }
    curr.push(1);

    l++;
  }
  return curr;
};

// console.log(getRow(5));

/**
 * 792. Number of Matching Subsequences
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
  var result = 0;
  var curr_i = 0;
  var skip = false;

  var curr_word;

  for (let i = 0; i < words.length; i++) {
    curr_word = words[i].split('');
    curr_i = 0;
    skip = false;

    for (let j = 0; (j < curr_word.length) && !skip; j++) {
      if (!s.includes(curr_word[j], curr_i)) skip = true;
      curr_i = s.indexOf(curr_word[j], curr_i) + 1;
    }

    if (!skip) {
      result++;
    }
  }

  return result;
};

// console.log(numMatchingSubseq("abcde", ["a", "bb", "acd", "ace"]));

/**
 * 206. Reverse Linked List
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  var curr = head;
  var prev = null;
  var nxt;

  while (curr != null) {
    nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }

  return prev;
};

/**
 * 92. Reverse Linked List II
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let start = head;
  let curr = head;

  var i = 1
  while (i < left) {
    start = curr;
    curr = curr.next;
    i++;
  }

  var prev = null;
  var tail = curr;
  var nxt;

  while (i <= right) {
    nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
    i++;
  }

  start.next = prev;
  tail.next = curr;

  return left == 1 ? prev : head;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  var result = [];

  var new_head = new ListNode(0, head);
  var curr = new_head;
  while (curr.next != null) {
    if (curr.next.val >= x) {
      result.push(curr.next.val);
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  for (let i = 0; i < result.length; i++) {
    curr.next = { val: result[i], next: null };

    curr = curr.next;
  }

  return new_head.next;
};

/**
 * 34. Find First and Last Position of Element in Sorted Array
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  var l = 0, h = nums.length - 1;
  var m = Math.floor((h - l) / 2);

  var r = [-1, -1];

  while (l <= h && r[0] == -1) {
    m = l + Math.floor((h - l) / 2);
    if ((m == 0 || nums[m - 1] < target) && nums[m] == target) r[0] = m;
    else if (target > nums[m]) l = m + 1;
    else h = m - 1;
  }

  l = 0, h = nums.length - 1;
  m = (h - l) / 2;

  while (l <= h && r[1] == -1) {
    m = l + Math.floor((h - l) / 2);
    if ((m == nums.length - 1 || nums[m + 1] > target) && nums[m] == target) r[1] = m
    else if (target < nums[m]) h = m - 1;
    else l = m + 1;
  }

  return r;
};

// console.log(searchRange([5, 7, 7, 8, 8, 10], 8));

/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  var one = [];
  var two = [];
  var history = [];

  const dfs = function (head) {
    history.push(head.val);

    if (head.val === p.val) {
      one = [...history];
    }
    if (head.val === q.val) {
      two = [...history];
    }

    if (one.length == 0 || two.length == 0) {
      if (head.left != null) {
        dfs(head.left);
        history.pop();
      }
      if (head.right != null) {
        dfs(head.right);
        history.pop();
      }
    }

    return null;
  };

  dfs(root);
  var curr = root;

  for (let i = 1; i < (one.length > two.length) ? two.length : one.length; i++) {
    if (one[i] == two[i]) {
      if (curr.left && curr.left.val == one[i]) curr = curr.left;
      if (curr.right && curr.right.val == one[i]) curr = curr.right;
    } else {
      break;
    }
  }

  return curr;
};

/**
 * 114. Flatten Binary Tree to Linked List
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (root == null) return;
  var result = [];
  const dfs = function (head) {
    result.push(head.val);

    if (head.left != null) {
      dfs(head.left);
    }
    if (head.right != null) {
      dfs(head.right);
    }
  }

  dfs(root);

  var s = root;
  for (let i = 0; i < result.length; i++) {
    s.val = result[i];
    s.left = null;
    if (i != result.length - 1) {
      s.right = new TreeNode();
      s = s.right;
    }
  }
};

/**
 * 242. Valid Anagram
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length != t.length) return false;

  var t = t.split('');

  var n;
  for (let i = 0; i < s.length; i++) {
    n = t.indexOf(s[i]);

    if (n != -1 && t[n] != '') t[n] = ''
    else return false;
  }

  return true;
};

// console.log(isAnagram("anagram", "nagaram"));

/**
 * 890. Find and Replace Pattern
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
var findAndReplacePattern = function (words, pattern) {
  let len = pattern.length;

  let hash = encodeString(pattern);

  var result = [];

  for (let word = 0; word < words.length; word++) {
    if (words[word].length == len && encodeString(words[word]) == (hash)) result.push(words[word]);
  }

  function encodeString(str) {
    let map = new Map();
    let res = "";
    let i = 0;

    let ch;
    for (let j = 0; j < str.length; j++) {
      ch = str[j];

      if (!map.has(ch)) map.set(ch, i++);
      res += map.get(ch);
    }

    return res;
  }

  return result;
};

// console.log(findAndReplacePattern(["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb"));

/**
 * 916. Word Subsets
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function (words1, words2) {
  var total = {};
  var curr = {};
  var keys = [];

  for (let i = 0; i < words2.length; i++) {
    curr = {};

    for (let l = 0; l < words2[i].length; l++) {
      if (curr[words2[i][l]]) curr[words2[i][l]]++;
      else curr[words2[i][l]] = 1;
    }

    keys = Object.keys(curr);
    for (let i = 0; i < keys.length; i++) {
      if (total[keys[i]]) total[keys[i]] = (total[keys[i]] > curr[keys[i]]) ? total[keys[i]] : curr[keys[i]];
      else total[keys[i]] = curr[keys[i]];
    }
  }


  var result = [];
  var tempG;
  for (let i = 0; i < words1.length; i++) {
    tempG = { ...total };

    for (let l = 0; l < words1[i].length; l++) {
      if (tempG[words1[i][l]]) tempG[words1[i][l]]--;
      if (tempG[words1[i][l]] == 0) delete tempG[words1[i][l]]
    }

    if (Object.keys(tempG).length == 0) result.push(words1[i]);
  }

  return result;
};

// console.log(wordSubsets(["amazon", "apple", "facebook", "google", "leetcode"], ["lo", "eo"]));

/**
 * 307. Range Sum Query - Mutable
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.len = nums.length;
  this.nums = nums;
  this.bit = new Array(this.len).fill(0);

  // Build Tree
  for (let i = 0; i < this.len; i++) {
    this.add(i, nums[i]);
  }
};

NumArray.prototype.add = function (idx, val) {
  while (idx < this.len) {
    this.bit[idx] += val;
    idx = idx | (idx + 1);
  }
}

NumArray.prototype.update = function (idx, val) {
  let delta = val - this.nums[idx];

  this.nums[idx] = val;
  this.add(idx, delta);
};

NumArray.prototype.sum = function (idx) {
  let res = 0;

  while (idx >= 0) {
    res += this.bit[idx];
    idx = (idx & (idx + 1)) - 1
  }

  return res;
}

NumArray.prototype.sumRange = function (l, r) {
  return this.sum(r) - this.sum(l - 1)
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */

// var obj = new NumArray([1, 3, 5]);
// obj.update(1, 2);
// var param_2 = obj.sumRange(0, 2);

// console.log(obj, param_2);

/**
 * 62. Unique Paths
 * 
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  var f = function (x) {
    var sum = 1;
    for (let i = x; i > 0; i--) {
      sum *= i;
    }
    return sum;
  }

  return (f(n + m - 2)) / ((f(n - 1)) * (f(m - 1)));
};

// console.log(uniquePaths(3, 7));

/**
 * 378. Kth Smallest Element in a Sorted Matrix
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  return (matrix + '').split(",").sort((a, b) => a - b)[k - 1]
};

// console.log([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8);

var MyCalendar = function () {
  this.arr = [];
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  if (this.arr.length == 0) {
    this.arr.push([start, end]);
    return true;
  }
  var low = 0, high = this.arr.length;

  while (low < high) {
    var mid = low + high >>> 1;
    if (this.arr[mid][0] < start) low = mid + 1;
    else high = mid;
  }

  if ((low != this.arr.length && this.arr[low][0] < end) || (low != 0 && this.arr[low - 1][1] > start)) {
    return false;
  }

  this.arr.splice(low, 0, [start, end]);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

// myCalendar = new MyCalendar();
// console.log(myCalendar.book(10, 20));
// console.log(myCalendar.book(15, 25));
// console.log(myCalendar.book(20, 30));

/**
 * 858. Mirror Reflection
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var mirrorReflection = function (p, q) {
  var y = p, x = q;
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  var lcm = (p * q) / x;

  return ((lcm / p) % 2 == 1) ? (((lcm / q) % 2 == 1) ? 1 : 2) : (((lcm / q) % 2 == 1) ? 0 : 1);
};

// console.log(mirrorReflection(3, 4));

/**
 * 387. First Unique Character in a String
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  var str = s.split('');
  var d = {};

  for (let i = 0; i < str.length; i++) {
    if (d[str[i]] == undefined) {
      if (str.indexOf(str[i], i + 1) == -1) return i;
      d[str[i]] = true;
    }
  }

  return -1;
};

// console.log(firstUniqChar('leetcode'));

/**
 * 2351. First Letter to Appear Twice
 * @param {string} s
 * @return {character}
 */
var repeatedCharacter = function (s) {
  var str = s.split('');

  var curr1 = '';
  var curr2 = '';
  var high = ["", 100];

  for (let i = 0; i < str.length; i++) {
    curr1 = str.indexOf(str[i], i + 1);

    if (curr1 != -1 && (curr1 - i) > -1) {
      curr2 = str.indexOf(str[i], curr1);

      if (curr2 != -1 && (curr2 - curr1) > -1 && (curr2) < high[1]) {
        high = [str[i], curr2];
      }
    }
  }

  return high[0];
};

// console.log(repeatedCharacter('"jkodgypoya"'));

/**
 * 804. Unique Morse Code Words
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function (words) {
  var dict = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];

  var result = new Set();
  var temp = '';

  for (let i = 0; i < words.length; i++) {
    for (let l = 0; l < words[i].length; l++) {
      temp += dict[words[i].charCodeAt(l) - 97];
    }
    result.add(temp);
    temp = '';
  }

  return result.size;
};

// console.log(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]));

/**
 * 342. Power of Four
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  var q = Math.abs(n).toString(2).split('1');
  return (n > 0 && q.length == 2 && q[1].length % 2 == 0);
};

// console.log(isPowerOfFour(16));

/**
 * 234. Palindrome Linked List
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  var f = '', r = '';

  while (head != null) {
    f = head.val + f;
    r = r + head.val;

    head = head.next;
  }

  return (f == r);
};

/**
 * 326. Power of Three
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
  var q = Math.abs(n).toString(3);
  return (n > 0 && q.split(1).length == 2 && q.split(2).length == 1);
};

// console.log(isPowerOfThree(27));

/**
 * 231. Power of Two
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  var q = Math.abs(n).toString(2).split('1');
  return (n > 0 && q.length == 2);
};


// console.log(isPowerOfTwo(64));

/**
 * 383. Ransom Note
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  var dict = {};

  for (let i = 0; i < magazine.length; i++) {
    if (!dict[magazine[i]]) dict[magazine[i]] = 1;
    else !dict[magazine[i]]++;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    if (!dict[ransomNote[i]] || dict[ransomNote[i]] == 0) return false;
    else dict[ransomNote[i]]--;
  }

  return true;
};

// console.log(canConstruct("aa", "aab"));

/**
 * 869. Reordered Power of 2
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function (n) {
  var ref = [
    [{ "1": 1 }, { "2": 1 }, { "4": 1 }, { "8": 1 }],
    [{ "1": 1, "6": 1 }, { "2": 1, "3": 1 }, { "4": 1, "6": 1 }],
    [{ "1": 1, "2": 1, "8": 1 }, { "2": 1, "5": 1, "6": 1 }, { "1": 1, "2": 1, "5": 1 }],
    [{ "0": 1, "1": 1, "2": 1, "4": 1 }, { "0": 1, "2": 1, "4": 1, "8": 1 }, { "0": 1, "4": 1, "6": 1, "9": 1 }, { "1": 1, "2": 1, "8": 1, "9": 1 }],
    [{ "1": 1, "3": 1, "4": 1, "6": 1, "8": 1 }, { "2": 1, "3": 1, "6": 1, "7": 1, "8": 1 }, { "3": 1, "5": 2, "6": 2 }],
    [{ "0": 1, "1": 2, "2": 1, "3": 1, "7": 1 }, { "1": 1, "2": 2, "4": 2, "6": 1 }, { "2": 2, "4": 1, "5": 1, "8": 2 }],
    [{ "0": 1, "1": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1 }, { "0": 1, "1": 1, "2": 2, "5": 1, "7": 1, "9": 1 }, { "0": 1, "1": 1, "3": 1, "4": 3, "9": 1 }, { "0": 1, "3": 1, "6": 1, "8": 4 }],
    [{ "1": 2, "2": 1, "6": 2, "7": 3 }, { "2": 1, "3": 3, "4": 2, "5": 2 }, { "0": 1, "1": 1, "4": 1, "6": 2, "7": 1, "8": 2 }],
    [{ "1": 2, "2": 2, "3": 1, "4": 1, "7": 2, "8": 1 }, { "2": 1, "3": 1, "4": 2, "5": 2, "6": 2, "8": 1 }, { "0": 1, "1": 1, "2": 1, "3": 1, "5": 1, "6": 1, "7": 1, "8": 1, "9": 1 }]
  ]

  var s = String(n);
  var l = s.length;

  for (let i = 0; i < ref[l - 1].length; i++) {
    for (let j = 0; j < l; j++) {
      if (!ref[l - 1][i][s[j]] || ref[l - 1][i][s[j]] == 0) {
        break;
      } else {
        ref[l - 1][i][s[j]]--;
        if (j == l - 1) return true;
      }
    }
  }

  return false;
};

// console.log(reorderedPowerOf2(16));

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  var result = new Array(grid.length).fill(false).map(ele => (new Array(grid[0].length)).fill(false));

  var num = 0;
  var queue = [];
  var h;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1 && !result[i][j]) {
        queue.push([i, j]);
        while (queue.length > 0) {
          h = queue.shift();
          if (!result[h[0]][h[1]]) {
            result[h[0]][h[1]] = true;

            for (let q = -1; q <= 1; q += 2) {
              if (h[0] + q > -1 && h[0] + q < grid.length && grid[h[0] + q][h[1]] == 1 && !result[h[0] + q][h[1]])
                queue.push([h[0] + q, h[1]]);

              if (h[1] + q > -1 && h[1] + q < grid[0].length && grid[h[0]][h[1] + q] == 1 && !result[h[0]][h[1] + q])
                queue.push([h[0], h[1] + q]);

            }
          }
        }
        num++;
      }
    }
  }

  return num;
};

// console.log(numIslands([["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]));

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function (root, max) {
  if (root == null) return 0;

  if (max == undefined) max = root.val;

  if (root.val >= max) return 1 + goodNodes(root.left, root.val) + goodNodes(root.right, root.val);
  else return goodNodes(root.left, max) + goodNodes(root.right, max);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  var queue = [[root, 1]];

  var result = [];

  while (queue.length > 0) {
    var h = queue.shift();

    if (result[h[1] - 1] == undefined) result[h[1] - 1] = [h[0].val, 1];
    else {
      result[h[1] - 1][0] += h[0].val;
      result[h[1] - 1][1]++;
    }

    if (h[0].left != null) queue.push([h[0].left, h[1] + 1]);
    if (h[0].right != null) queue.push([h[0].right, h[1] + 1]);
  }

  return result.map(ele => ele[0] / (ele[1] * 1.0));
};

function pairing(d) {
  var oL = d.sort((a, b) => a - b);

  var hist = {};

  var curr;
  var unique = 0;

  for (let i = 0; i < oL.length / 2; i++) {
    curr = (oL[i] + oL[oL.length - i - 1]) / 2
    if (hist[curr] == undefined) {
      unique++;
      hist[curr] = true;
    }
  }

  return unique;
}

// console.log(pairing([1, 4, 1, 3, 5, 6]));

function pScore(username1, username2, p) {
  var curr;
  var total = 0;

  var dict = {};

  for (let i = 0; i < username2.length; i++) {
    if (dict[username2[i]] == undefined) dict[username2[i]] = 1;
    else dict[username2[i]]++;
  }

  var temp;

  for (let j = 0; j < username1.length - ((username2.length - 1) * p); j++) {
    temp = { ...dict };
    curr = "";
    for (let i = j; (i < username1.length && curr.length < username2.length); i += p) {
      curr += username1[i];
    }

    for (let i = 0; i < curr.length; i++) {
      if (temp[curr[i]] == undefined || temp[curr[i]] == 0) break;
      else {
        temp[curr[i]]--;
        if (i == curr.length - 1) total++;
      }
    }
  }

  return total;
}

// console.log(pScore('zxyzxxyz', 'xxzy', 1));

/**
 * 1480. Running Sum of 1d Array
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  var result = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    result.push(result[i - 1] + nums[i]);
  }

  return result;
};

// console.log(runningSum([1, 2, 3, 4]));

/**
 * 724. Find Pivot Index
 * 
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  var result = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    result.push(result[i - 1] + nums[i]);
  }

  if (result[result.length - 1] == result[0])
    return 0;

  for (let i = 1; i < result.length - 1; i++) {
    if (result[i - 1] == result[result.length - 1] - result[i])
      return i;
  }

  if (result[result.length - 2] == 0)
    return result.length - 1;

  return -1;
};

// console.log(pivotIndex([1, 7, 3, 6, 5, 6]));

/**
 * 205. Isomorphic Strings
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  var dict1 = {};
  var dict2 = {};
  var counter = 'a';

  for (let i = 0; i < s.length; i++) {
    if (dict1[s[i]] == null && dict2[t[i]] == null) {
      dict1[s[i]] = counter;
      dict2[t[i]] = counter;
      counter = String.fromCharCode(counter.charCodeAt(0) + 1);
    } else {
      if (dict2[t[i]] != dict1[s[i]])
        return false;
    }
  }

  return true;
};

// console.log(isIsomorphic("foo", "bar"));

/**
 * 392. Is Subsequence
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  var curr = 0;

  for (let i = 0; i < t.length; i++) {
    if (s[curr] == t[i]) curr++;
  }

  return curr == s.length;
};

// console.log(isSubsequence("abc", "ahbgdc"));

/**
 * 21. Merge Two Sorted Lists
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  var head = new ListNode();
  var curr = head;

  while (list1 != null && list2 != null) {
    if (list1.val > list2.val) {
      curr.next = new ListNode(list2.val);
      list2 = list2.next;
    } else {
      curr.next = new ListNode(list1.val);
      list1 = list1.next;
    }

    curr = curr.next;
  }

  if (list1 != null) curr.next = list1;
  if (list2 != null) curr.next = list2;

  return head.next;
};

/**
 * 876. Middle of the Linked List
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  var count = 0;

  var curr = head;

  while (curr != null) {
    curr = curr.next;
    count++;
  }

  var mid = Math.floor(count / 2);
  curr = head;

  for (let i = 0; i < mid; i++) {
    curr = curr.next;
  }

  return curr;
};

/**
 * 142. Linked List Cycle II
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  var set = new Set();

  while (head != null) {
    if (set.has(head)) {
      return head;
    }

    set.add(head);

    head = head.next;
  }
  return null;
};

/**
 * 121. Best Time to Buy and Sell Stock
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  var l = 0;
  var r = 1;
  var max = 0;

  while (r < prices.length) {
    if (prices[r] > prices[l]) {
      max = (max > prices[r] - prices[l]) ? max : prices[r] - prices[l];
    } else {
      l = r;
    }
    r++;
  }

  return max;
};

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));

/**
 * 409. Longest Palindrome
 * 
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  var count = 0;
  var dict = {};

  for (let i = 0; i < s.length; i++) {
    if (dict[s[i]] == null) {
      dict[s[i]] = true;
    } else {
      delete dict[s[i]];
      count += 2;
    }
  }

  return count + (Object.keys(dict).length > 0 ? 1 : 0);
};

// console.log(longestPalindrome("abccccdd"));

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * 589. N-ary Tree Preorder Traversal
 * 
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root, result) {
  if (result == null) {
    result = [];
  }

  if (root != null && root.children != null) {
    result.push(root.val);
    for (let i = 0; i < root.children.length; i++) {
      preorder(root.children[i], result);
    }
  }

  return result;
};

/**
 * 704. Binary Search
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var Bsearch = function (nums, target) {
  var start = 0;
  var end = nums.length - 1;

  while (start <= end) {
    var mid = Math.floor((start + end) / 2);

    if (nums[mid] === target)
      return mid;
    else if (nums[mid] < target)
      start = mid + 1;
    else
      end = mid - 1;
  }

  return -1;
};

// console.log(Bsearch([-1, 0, 3, 5, 9, 12], 9));

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * 278. First Bad Version
 * 
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    var start = 0;
    var end = n;

    while (start <= end) {
      var mid = Math.floor((start + end) / 2);

      if (isBadVersion(mid)) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return start;
  };
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root, min, max) {
  if (root == null) return true;

  if (min != null && root.val <= min) return false;
  if (max != null && root.val >= max) return false;

  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
};

/**
 * 733. Flood Fill
 * 
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  var num = image[sr][sc];
  image[sr][sc] = color;

  if (sr > 0 && image[sr - 1][sc] != color && image[sr - 1][sc] == num)
    image = floodFill(image, sr - 1, sc, color);

  if (sr < image.length - 1 && image[sr + 1][sc] != color && image[sr + 1][sc] == num)
    image = floodFill(image, sr + 1, sc, color);

  if (sc > 0 && image[sr][sc - 1] != color && image[sr][sc - 1] == num)
    image = floodFill(image, sr, sc - 1, color);

  if (sc < image[sr].length - 1 && image[sr][sc + 1] != color && image[sr][sc + 1] == num)
    image = floodFill(image, sr, sc + 1, color);

  return image;
};

// console.log(floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2));

/**
 * 70. Climbing Stairs
 * 
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n < 3) return n;

  var list = [1, 2];

  for (let i = 2; i < n; i++) {
    list.push(list[i - 1] + list[i - 2]);
  }

  return list.pop();
};

// console.log(climbStairs(3));

/**
 * 746. Min Cost Climbing Stairs
 * 
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  var list = [cost[0], cost[1]];

  for (let i = 2; i < cost.length; i++) {
    list.push(Math.min(list[i - 1], list[i - 2]) + cost[i]);
  }

  return Math.min(list.pop(), list.pop());
};

// console.log(minCostClimbingStairs([10, 15, 20]));

/**
 * 438. Find All Anagrams in a String
 * 
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  var result = [];
  var hist = new Array(26).fill(0);

  for (let i = 0; i < p.length; i++) {
    hist[p.charCodeAt(i) - 97]++;
  }

  for (let i = 0; i < p.length; i++) {
    hist[s.charCodeAt(i) - 97]--;
  }

  if (hist.every((ele) => ele == 0))
    result.push(0);

  for (let i = 1; i < s.length - p.length + 1; i++) {
    hist[s.charCodeAt(i - 1) - 97]++;
    hist[s.charCodeAt(i + p.length - 1) - 97]--;
    if (hist.every((ele) => ele == 0))
      result.push(i);
  }

  return result;
};

// console.log(findAnagrams("cbaebabacd", "abc"));

/**
 * 198. House Robber
 * 
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // console.log(nums);
  var temp = 0, max = 0, temp2 = 0;

  for (let i = 0; i < nums.length; i++) {
    temp2 = Math.max(temp + nums[i], max);
    temp = max;
    max = temp2;
  }

  return max;
};

// console.log(rob([1, 2, 3, 1]));

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 1721. Swapping Nodes in a Linked List
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function (head, k) {
  var start = head;
  var left;
  var length = 1;

  while (start != null) {
    if (length == k) left = start;

    start = start.next;
    length++;
  }

  start = head;

  while (start != null) {
    if (length - 1 == k) break;

    start = start.next;
    length--;
  }


  if (start != null && left != null) {
    var temp = start.val;
    start.val = left.val;
    left.val = temp;
  }
  return head;
};

// Input: head = [1,2,3,4,5], k = 2
// Output: [1, 4, 3, 2, 5]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 24. Swap Nodes in Pairs
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  var p = null, a, b, n;

  if (head == null || head.next == null) return head;
  a = head;
  b = a.next;
  n = b.next;

  do {
    if (p != null) p.next = b;
    else head = b;

    b.next = a;
    a.next = n;

    p = a;
    a = n;
    if (a == null || a.next == null) return head;
    b = a.next;
    n = b.next;
  } while (b != null)

  return head;
};

// Input: head = [1, 2, 3, 4]
// Output: [2, 1, 4, 3]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 2130. Maximum Twin Sum of a Linked List
 * 
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  var arr = [];
  var t = 0;

  while (head != null) {
    arr.push(head.val);
    head = head.next;
  }

  for (let i = 0; i < arr.length / 2; i++) {
    t = Math.max(t, arr[i] + arr[arr.length - 1 - i]);
  }

  return t;
};

// Input: head = [5, 4, 2, 1]
// Output: 6

/**
 * 841. Keys and Rooms
 * 
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  var roomState = new Array(rooms.length).fill(false);

  var keys = rooms[0];
  roomState[0] = true;
  var key;

  while (keys.length != 0) {
    key = keys.shift();
    if (!roomState[key]) {
      roomState[key] = true;
      (rooms[key]).forEach(e => {
        keys.push(e);
      });
    }
  }

  return roomState.every(v => v === true);
};

// console.log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]));

/**
 * 2667. Create Hello World Function
 * 
 * @return {Function}
 */
var createHelloWorld = function () {
  return function (...args) {
    return "Hello World";
  }
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

/**
 * 2620. Counter
 * 
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  return function () {
    return n++;
  };
};

/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */

/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
  var obj = {};

  obj.curr = init;
  obj.increment = () => { obj.curr++; return obj.curr; };
  obj.decrement = () => { obj.curr--; return obj.curr; };
  obj.reset = () => { obj.curr = init; return obj.curr; }

  return obj;
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */

/**
 * 2635. Apply Transform Over Each Element in Array
 * 
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = fn(arr[i], i);
  }

  return arr;
};

// console.log(map([1, 2, 3], function plusone(n) { return n + 1; }));

/**
 * 2634. Filter Elements from Array
 * 
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  var newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) newArr.push(arr[i])
  }

  return newArr;
};

/**
 * 2626. Array Reduce Transformation
 * 
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  var val = init;

  for (let i = 0; i < nums.length; i++) {
    val = fn(val, nums[i]);
  }

  return val;
};

/**
 * 2629. Function Composition
 * 
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    var temp = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      temp = functions[i](temp);
    }

    return temp;
  }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */

/**
 * 2666. Allow One Function Call
 * 
 * @param {Function} fn
 * @return {Function}
 */
var once = function (fn) {
  var o = false;
  return function (...args) {
    if (!o) {
      o = true;
      return fn(...args)
    }
  }
};

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn
 */

/**
 * 2623. Memoize
 * 
 * @param {Function} fn
 */
function memoize(fn) {
  var hist = {};
  return function (...args) {
    var p = JSON.stringify(args);
    if (hist[p] != null) {
      return hist[p];
    } else {
      hist[p] = fn(...args);
      return hist[p];
    }
  }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */

/**
 *  2632. Curry
 * @param {Function} fn
 * @return {Function}
 */
var curry = function (fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  }
};

/**
 * 2621. Sleep
 * 
 * @param {number} millis
 */
async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

/**
 * 2637. Promise Time Limit
 * 
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Time Limit Exceeded")
      }, t)
      fn(...args).then(resolve).catch(reject);
    })
  }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */

/**
 * 1557. Minimum Number of Vertices to Reach All Nodes
 * 
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findSmallestSetOfVertices = function (n, edges) {
  var arr = new Array(n);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
  }

  for (let i = 0; i < edges.length; i++) {
    if (arr[edges[i][1]] != -1) arr[edges[i][1]] = -1;
  }

  console.log(arr);

  return arr.filter(e => e != -1);
};

// console.log(findSmallestSetOfVertices(6, [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]]));

/**
 * 2636. Promise Pool
 * 
 * @param {Function[]} functions
 * @param {number} n
 * @return {Function}
 */
var promisePool = async function (functions, n) {
  return new Promise((resolve) => {
    var count = 0;
    var i = 0;

    function t() {
      if (count == 0 && i == functions.length) {
        resolve();
        return;
      }

      while (count < n && i < functions.length) {
        count++;
        var p = functions[i]();
        i++;
        p.then(() => {
          count--;
          t();
        })
      }
    }

    t();
  })
};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */


/**
 * 2622. Cache With Time Limit
 */
var TimeLimitedCache = function () {
  this.dict = {};
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  if (this.dict[key] != undefined) {
    clearTimeout(this.dict[key][1]);
    var t = setTimeout(() => { delete this.dict[key] }, duration)
    this.dict[key] = [value, t];
    return true;
  } else {
    var t = setTimeout(() => { delete this.dict[key] }, duration)
    this.dict[key] = [value, t];
    return false;
  }
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (this.dict[key] != undefined) return this.dict[key][0];
  return -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return Object.keys(this.dict).length;
};

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */

/**
 * 785. Is Graph Bipartite?
 * 
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  var track = new Array(graph.length).fill(-1);

  track[0] = 0;

  var queue = [0];

  while (queue.length != 0) {
    var node = queue.shift();

    for (let i = 0; i < graph[node].length; i++) {
      if (track[graph[node][i]] == -1) {
        track[graph[node][i]] = (track[node] == 0) ? 1 : 0;
        queue.push(graph[node][i]);
      } else if (track[graph[node][i]] == track[node]) {
        return false;
      }
    }

    if (graph[node].length == 0 || queue.length == 0) {
      for (let i = 0; i < track.length; i++) {
        if (track[i] == -1) {
          track[i] = 0;
          queue.push(i);
          break;
        }
      }
    }
  }

  return true;
};

// console.log(isBipartite([[2, 4], [2, 3, 4], [0, 1], [1], [0, 1], [7], [9], [5], [], [6], [12, 14], [], [10], [], [10], [19], [18], [], [16], [15], [23], [23], [], [20, 21], [], [], [27], [26], [], [], [34], [33, 34], [], [31], [30, 31], [38, 39], [37, 38, 39], [36], [35, 36], [35, 36], [43], [], [], [40], [], [49], [47, 48, 49], [46, 48, 49], [46, 47, 49], [45, 46, 47, 48]]));

/**
 * 399. Evaluate Division
 * 
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  var obj = {};

  for (let i = 0; i < equations.length; i++) {
    if (obj[equations[i][0]] == undefined) obj[equations[i][0]] = [[equations[i][0], 1]];
    if (obj[equations[i][1]] == undefined) obj[equations[i][1]] = [[equations[i][1], 1]];

    obj[equations[i][0]].push([equations[i][1], values[i]]);
    obj[equations[i][1]].push([equations[i][0], 1 / values[i]]);
  }

  var result = new Array(queries.length).fill(-1);

  for (let q = 0; q < queries.length; q++) {
    if (obj[queries[q][0]] == undefined || obj[queries[q][1]] == undefined) continue;

    var visited = {};
    visited[queries[q][0]] = true;
    var queue = [queries[q][0]];
    var valueQ = [1];

    while (queue.length != 0) {
      var node = queue.shift();
      var val = valueQ.shift();
      for (let a = 0; a < obj[node].length; a++) {
        if (obj[node][a][0] == queries[q][1]) {
          result[q] = obj[node][a][1] * val;
          continue;
        } else if (visited[obj[node][a][0]] == undefined) {
          queue.push(obj[node][a][0]);
          valueQ.push(obj[node][a][1] * val);
          visited[obj[node][a][0]] = true;
        }
      }
    }
  }

  return result;
};

// console.log(calcEquation([["x1", "x2"], ["x2", "x3"], ["x3", "x4"], ["x4", "x5"]], [3.0, 4.0, 5.0, 6.0], [["x1", "x5"], ["x5", "x2"], ["x2", "x4"], ["x2", "x2"], ["x2", "x9"], ["x9", "x9"]]));
// console.log(calcEquation([["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]]))

/**
 * 934. Shortest Bridge
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function (grid) {
  var s = [];

  for (let i = 0; i < grid.length && s.length == 0; i++) {
    for (let j = 0; j < grid[i].length && s.length == 0; j++) {
      if (grid[i][j] == 1) {
        queue = [[i, j]];
        grid[i][j] = 2;
        while (queue.length != 0) {
          var n = queue.shift();

          if (!(
            (n[0] == 0 || grid[n[0] - 1][n[1]]) &&
            (n[1] == 0 || grid[n[0]][n[1] - 1]) &&
            (n[0] == grid.length - 1 || grid[n[0] + 1][n[1]]) &&
            (n[1] == grid.length - 1 || grid[n[0]][n[1] + 1])
          )) s.push(n);

          if (n[0] != 0 && grid[n[0] - 1][n[1]] == 1) {
            queue.push([n[0] - 1, n[1]]);
            grid[n[0] - 1][n[1]] = 2;
          }
          if (n[1] != 0 && grid[n[0]][n[1] - 1] == 1) {
            queue.push([n[0], n[1] - 1]);
            grid[n[0]][n[1] - 1] = 2;
          }
          if (n[0] != grid.length - 1 && grid[n[0] + 1][n[1]] == 1) {
            queue.push([n[0] + 1, n[1]]);
            grid[n[0] + 1][n[1]] = 2;
          }
          if (n[1] != grid.length - 1 && grid[n[0]][n[1] + 1] == 1) {
            queue.push([n[0], n[1] + 1]);
            grid[n[0]][n[1] + 1] = 2;
          }
        }
      }
    }
  }
  var n;
  var narr = [];

  var i = 0;

  while (true) {
    while (s.length != 0) {
      n = s.shift();
      if (n[0] != 0) {
        if (grid[n[0] - 1][n[1]] == 0) {
          narr.push([n[0] - 1, n[1]]);
          grid[n[0] - 1][n[1]] = -1
        }
        else if (grid[n[0] - 1][n[1]] == 1) return i;
      }
      if (n[1] != 0) {
        if (grid[n[0]][n[1] - 1] == 0) {
          narr.push([n[0], n[1] - 1]);
          grid[n[0]][n[1] - 1] = -1
        }
        if (grid[n[0]][n[1] - 1] == 1) return i;
      }
      if (n[0] != grid.length - 1) {
        if (grid[n[0] + 1][n[1]] == 0) {
          narr.push([n[0] + 1, n[1]]);
          grid[n[0] + 1][n[1]] = -1
        }
        if (grid[n[0] + 1][n[1]] == 1) return i;
      }
      if (n[1] != grid.length - 1) {
        if (grid[n[0]][n[1] + 1] == 0) {
          narr.push([n[0], n[1] + 1]);
          grid[n[0]][n[1] + 1] = -1
        }
        if (grid[n[0]][n[1] + 1] == 1) return i;
      }
    }

    s = narr;
    narr = [];
    i++;
  }
};

// console.log(shortestBridge([[1, 0, 0], [0, 0, 0], [0, 0, 1]]));

/**
 * 347. Top K Frequent Elements
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  var obj = {};

  for (let i = 0; i < nums.length; i++) {
    if (obj[nums[i]] == undefined) obj[nums[i]] = 0;
    obj[nums[i]]++;
  }

  var arr = [];
  for (const val in obj) {
    if (Object.hasOwnProperty.call(obj, val)) {
      arr.push(Number(val));
    }
  }

  return arr.sort((a, b) => obj[b] - obj[a]).slice(0, k);
};

// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));

/**
 * 2633. Convert Object to JSON String
 * 
 * @param {any} object
 * @return {string}
 */
var jsonStringify = function (object) {
  if (Array.isArray(object)) {
    if (object.length == 0) return "[]";
    var str = "[";

    for (let i = 0; i < object.length; i++) {
      str += jsonStringify(object[i]) + ",";
    }
    return str.slice(0, -1) + "]";
  } else if (typeof object == "object") {
    if (object == null) return null;

    var keys = Object.keys(object);
    if (keys.length == 0) return "{}";

    var str = "{"
    for (let i = 0; i < keys.length; i++) {
      str += `"${keys[i]}":${jsonStringify(object[keys[i]])},`;
    }

    return str.slice(0, -1) + "}";
  } else if (typeof object == "string") {
    return `"${object}"`;
  } else return object;
};

// console.log(jsonStringify({ "key": { "a": 1, "b": [{}, null, "Hello"] } }));

/**
 * 2628. JSON Deep Equal
 * 
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
var areDeeplyEqual = function (o1, o2) {
  if (Array.isArray(o1)) {
    if (!Array.isArray(o2)) return false;
    if (o1.length != o2.length) return false;

    for (let i = 0; i < o1.length; i++) {
      if (!areDeeplyEqual(o1[i], o2[i])) return false;
    }
  } else if (typeof o1 == "object") {
    if (o1 == null || o2 == null) return o1 == o2;
    if (typeof o2 != "object" || Array.isArray(o2)) return false;

    var o1Keys = Object.keys(o1);
    if (o1Keys.length != Object.keys(o2).length) return false;

    for (let i = 0; i < o1Keys.length; i++) {
      if (o2[o1Keys[i]] === undefined) return false;
      if (!areDeeplyEqual(o1[o1Keys[i]], o2[o1Keys[i]])) return false;
    }
  } else {
    return o1 === o2;
  }

  return true;
};

// console.log(areDeeplyEqual({ "x": null, "L": [1, 2, 3] }, { "x": null, "L": ["1", "2", "3"] }));

/**
 * 2627. Debounce
 * 
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
  var id = null;
  return function (...args) {
    if (id != null) {
      clearTimeout(id);
    }
    id = setTimeout(() => { fn(...args); id = null; }, t);
  }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */

/**
 * 2676. Throttle
 * 
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var throttle = function (fn, t) {
  var g = true;
  var cal = false;
  var arg;
  return function (...args) {
    arg = args;
    if (g) {
      fn(...arg);
      g = false;
      setTimeout(thing, t);
    } else cal = true;
  }

  function thing() {
    g = true;
    if (cal) {
      fn(...arg)
      g = false;
      cal = false;
      setTimeout(thing, t);
    }
  }
};

/**
 * const throttled = throttle(console.log, 100);
 * throttled("log"); // logged immediately.
 * throttled("log"); // logged at t=100ms.
 */

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.main = new MinPriorityQueue();
  for (let i = 0; i < nums.length; i++) {
    this.main.enqueue(nums[i]);
  }
  this.k = k;
  while (this.main.size() > k) this.main.dequeue().element;
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.main.enqueue(val);
  if (this.main.size() > this.k) this.main.dequeue().element;
  return this.main.front().element;
};

/**
 * @param {Array} arr
 * @return {Matrix}
 */
var jsonToMatrix = function (arr) {
  var keys = {};
  var mat = [[]];

  for (let i = 0; i < arr.length; i++) {
    mat.push(new Array(mat[0].length).fill(""));
    parse(arr[i], "");
  }

  function parse(object, key) {
    if (Array.isArray(object)) {
      for (let i = 0; i < object.length; i++) {
        parse(object[i], key + ((key == "") ? "" : ".") + i);
      }
    } else if (object != null && typeof object == "object") {
      var objKeys = Object.keys(object);

      for (let i = 0; i < objKeys.length; i++) {
        parse(object[objKeys[i]], key + ((key == "") ? "" : ".") + objKeys[i]);
      }
    } else {
      if (keys[key] == undefined) {
        keys[key] = sortedIndex(mat[0], key);
        mat[0].splice(keys[key], 0, key);

        for (let i = keys[key] + 1; i < mat[0].length; i++) {
          keys[mat[0][i]]++;
        }

        for (let i = 1; i < mat.length; i++) {
          mat[i].splice(keys[key], 0, "");
        }
      }

      mat[mat.length - 1].splice(keys[key], 1, object);
    }
  }

  function sortedIndex(array, value) {
    var low = 0,
      high = array.length;

    while (low < high) {
      var mid = (low + high) >>> 1;
      if (array[mid] < value) low = mid + 1;
      else high = mid;
    }
    return low;
  }

  return mat;
};

// console.log(jsonToMatrix([{ "b": 1, "a": 2 }, { "b": 3, "a": 4 }]));

/**
 * 2542. Maximum Subsequence Score
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function (nums1, nums2, k) {
  var obj = {};

  for (let i = 0; i < nums1.length; i++) {
    if (obj[nums2[i]] == undefined) obj[nums2[i]] = [];
    obj[nums2[i]].push(nums1[i]);
  }

  nums2 = nums2.sort((a, b) => a - b);
  var arr = [];

  for (let i = 0; i < nums2.length; i++) {
    if (obj[nums2[i]] == undefined) continue;
    arr.push(...obj[nums2[i]]);
    obj[nums2[i]] = undefined;
  }

  var high = 0;
  var val;

  var sum = 0;
  var index;

  newNums = nums1.sort((a, b) => b - a);

  for (let i = 0; i < k - 1; i++) {
    sum += newNums[i];
  }

  for (let i = 0; i < nums2.length - (k - 1); i++) {
    // console.log(newNums);
    index = newNums.indexOf(arr[i]);

    if (index < k - 1) {
      sum -= arr[i];
      newNums.splice(index, 1);
      sum += newNums[k - 2];
    } else {
      newNums.splice(index, 1);
    }

    val = (arr[i] + sum) * nums2[i];
    if (val > high) high = val;
  }

  return high;
};

// console.log(maxScore([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1));

/**
 * 2700. Differences Between Two Objects
 * 
 * @param {object} obj1
 * @param {object} obj2
 * @return {object}
 */
function objDiff(obj1, obj2) {
  var obj = {};
  var result;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    var length = (obj1.length > obj2.length) ? obj2.length : obj1.length;
    for (let i = 0; i < length; i++) {
      result = objDiff(obj1[i], obj2[i]);
      if (Object.keys(result).length != 0) obj[i] = result;
    }
  } else if (typeof obj1 == "object" && obj1 != null && !Array.isArray(obj1) && !Array.isArray(obj2) && typeof obj2 == "object" && obj2 != null) {
    obj = {};
    for (const key in obj1) {
      if (Object.hasOwnProperty.call(obj1, key) && Object.hasOwnProperty.call(obj2, key)) {
        result = objDiff(obj1[key], obj2[key]);
        if (Object.keys(result).length != 0) obj[key] = result;
      }
    }
  } else if (obj1 !== obj2) return [obj1, obj2];
  return obj;
};

// console.log(objDiff({ "a": 1, "v": 3, "x": [], "z": { "a": null } }, { "a": 2, "v": 4, "x": [], "z": { "a": 2 } }));

/**
 * 837. New 21 Game
 * 
 * @param {number} n
 * @param {number} k
 * @param {number} maxPts
 * @return {number}
 */
var new21Game = function (n, k, maxPts) {
  var arr = new Array(n + 1);
  arr[0] = 1;

  var sum = k > 0 ? 1 : 0;
  var res = k > 0 ? 0 : 1;
  for (let i = 1; i <= n; i++) {
    arr[i] = sum / maxPts;
    if (i < k) sum += arr[i];
    else res += arr[i];
    if (i - maxPts >= 0 && i - maxPts < k) sum -= arr[i - maxPts];
  }

  return res;
};

// console.log(new21Game(6, 1, 10))

/**
 * 2677. Chunk Array
 * 
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function (arr, size) {
  var result = [];

  for (let i = 0; i < Math.floor(arr.length / size); i++) {
    result.push(arr.slice(i * size, (i + 1) * size));
  }

  if (arr.length % size != 0) result.push(arr.slice(Math.floor(arr.length / size) * size))

  return result;
};

// console.log(chunk([1, 2, 3, 4, 5], 1));


/**
 * 2619. Array Prototype Last 
 * */
Array.prototype.last = function () {
  if (this.length == 0) return -1;
  return this[this.length - 1];
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */

/**
 * 744. Find Smallest Letter Greater Than Target
 * 
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  var low = 0,
    high = letters.length;

  while (low < high) {
    var mid = (low + high) >>> 1;
    if (letters[mid] <= target) low = mid + 1;
    else high = mid;
  }

  return letters[low % letters.length];
};

// console.log(nextGreatestLetter(["x", "x", "y", "y"], "z"));

/**
 * 1502. Can Make Arithmetic Progression From Sequence
 * 
 * @param {number[]} arr
 * @return {boolean}
 */
var canMakeArithmeticProgression = function (arr) {
  var array = arr.sort((a, b) => a - b);
  const diff = array[0] - array[1];

  for (let i = 1; i < array.length - 1; i++) {
    if (diff != array[i] - array[i + 1]) return false;
  }

  return true;
};

// console.log(canMakeArithmeticProgression([3, 5, 1]));

/**
 * 1146. Snapshot Array
 * 
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.curr = {};
  this.hist = [];
  this.changes = false;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  this.curr[index] = val;
  this.changes = true;
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  if (this.changes || this.hist.length === 0) {
    this.hist.push({ ...this.curr });
  } else {
    this.hist.push(this.hist[this.hist.length - 1])
  }
  this.changes = false;
  return this.hist.length - 1;
};

/** 
 * @param {number} index 
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  return this.hist[snap_id][index] || 0;
};

/** 
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */

/**
 * 2090. K Radius Subarray Averages
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function (nums, k) {
  if (nums.length <= 2 * k) return new Array(nums.length).fill(-1);
  var result = new Array(k).fill(-1);
  var sum = 0;
  var denom = (k * 2) + 1;

  for (let i = 0; i < nums.length - (k * 2); i++) {
    if (i == 0) {
      for (let j = 0; j < denom; j++) {
        sum += nums[j];
      }
      result.push(Math.floor(sum / denom));
    } else {
      sum -= nums[i - 1];
      sum += nums[i + (k * 2)];
      result.push(Math.floor(sum / denom));
    }
  }

  for (let i = 0; i < k; i++) {
    result.push(-1);
  }

  return result;
};

// console.log(getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3));

/**
 * 845. Longest Mountain in Array
 * 
 * @param {number[]} arr
 * @return {number}
 */
var longestMountain = function (arr) {
  var max = 0;
  var score = 0;
  var up = true;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      up = true;
      score = 0;
      continue;
    }

    if (up) {
      if (arr[i] < arr[i + 1]) score++;
      if (arr[i] > arr[i + 1] && score != 0) {
        up = false;
        score++;
        if (score > max) max = score;
      }
    } else {
      if (arr[i] > arr[i + 1]) {
        score++;
        if (score > max) max = score;
      } else {
        if (arr[i] < arr[i + 1]) score = 1;
        else score = 0;
        up = true;
      }
    }

    // console.log(arr[i], arr[i + 1], score);
  }

  return (max > 1) ? max + 1 : max;
};

// console.log(longestMountain([2, 1, 4, 7, 3, 2, 5]));

/**
 * 2348. Number of Zero-Filled Subarrays
 * 
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
  var total = 0;
  var curr = 0;

  for (let i = 0; i < nums.length + 1; i++) {
    if (i < nums.length && nums[i] == 0) {
      curr++;
    } else if (curr != 0) {
      total += (curr * (curr + 1)) / 2;
      curr = 0;
    }
  }

  return total;
};

// console.log(zeroFilledSubarray([0, 0, 0, 2, 0, 0]));

/**
 * 720. Longest Word in Dictionary
 * 
 * @param {string[]} words
 * @return {string}
 */
var longestWord = function (words) {
  var sort = words.sort((a, b) => {
    if (a.length == b.length) return a.localeCompare(b);
    else return a.length - b.length;
  });
  var maxWord = "";
  var dict = { "": true };

  for (let i = 0; i < sort.length; i++) {
    if (dict[sort[i].substring(0, sort[i].length - 1)]) {
      dict[sort[i]] = true;
      if (maxWord.length != sort[i].length) maxWord = sort[i];
    }
  }

  // console.log(sort);
  return maxWord;
};

// console.log(longestWord(["m", "mo", "moc", "moch", "mocha", "l", "la", "lat", "latt", "latte", "c", "ca", "cat"]));

/**
 * 1027. Longest Arithmetic Subsequence
 * 
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  var diff = 0;
  var max = 2;
  var currCount = 0;
  var curr = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      diff = nums[j] - nums[i];
      currCount = 2;
      curr = nums[j];

      for (let k = j + 1; k < nums.length; k++) {
        if (nums[k] - curr == diff) {
          currCount++;
          curr = nums[k];
        }
      }

      if (currCount > max) {
        max = currCount;
      }
    }
  }

  return max;
};

// console.log(longestArithSeqLength([9, 4, 7, 2, 10]));

/**
 * 3. Longest Substring Without Repeating Characters
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var dict = {};
  var start = 0;
  var temp = 0;
  var max = 0;

  while (start + temp < s.length) {
    // console.log(dict, str, start);
    if (dict[s[start + temp]] == undefined) {
      dict[s[start + temp]] = true;
      temp++;
      if (temp > max) max = temp;
    } else {
      dict[s[start]] = undefined;
      temp--;
      start++;
    }
  }

  return max;
};

// console.log(lengthOfLongestSubstring("abcabcbb"));

/**
 * 2428. Maximum Sum of an Hourglass
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var maxSum = function (grid) {
  var sum = 0;
  var high = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    sum = rid[i - 1][0] + grid[i - 1][1] + grid[i - 1][2] + grid[i][1] + grid[i + 1][0] + grid[i + 1][1] + grid[i + 1][2];
    if (sum > high) high = sum;
    for (let j = 2; j < grid[i].length - 1; j++) {
      sum -= grid[i - 1][j - 2] + grid[i][j - 1] + grid[i + 1][j - 2];
      sum += grid[i - 1][j + 1] + grid[i][j] + grid[i + 1][j + 1];
      if (sum > high) high = sum;
    }
  }

  return high;
};

// console.log(maxSum([[6, 2, 1, 3], [4, 2, 1, 5], [9, 2, 8, 7], [4, 1, 2, 9]]));


/**
 * 735. Asteroid Collision
 * 
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  var result = [asteroids[0]];
  var l, r;
  var i = 1;

  while (i != asteroids.length) {
    l = result[result.length - 1];
    r = asteroids[i];
    if (l > 0 && r < 0) {
      if (Math.abs(l) >= Math.abs(r)) i++;
      if (Math.abs(l) <= Math.abs(r)) result.pop();
    } else {
      result.push(r);
      i++;
    }
  }

  return result;
};

// console.log(asteroidCollision([10, 2, -5]));

/**
 * 9. Palindrome Number
 * 
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  var str = String(x);

  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] != str[str.length - 1 - i]) return false;
  }

  return true;
};

// console.log(isPalindrome(121));

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 894. All Possible Full Binary Trees
 * 
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function (n) {
  if (n % 2 == 0) return [];
  else if (n == 1) return [new TreeNode(0)];
  else if (n == 3) return [new TreeNode(0, new TreeNode(0), new TreeNode(0))];

  var result = [];
  var tempL, tempR;

  for (let i = 1; i < (n + 1) / 2; i += 2) {
    tempL = allPossibleFBT(i)
    tempR = allPossibleFBT(n - i - 1);

    for (let l = 0; l < tempL.length; l++) {
      for (let r = 0; r < tempR.length; r++) {
        result.push(new TreeNode(0, tempL[l], tempR[r]));
        if (i != n - i - 1) result.push(new TreeNode(0, tempR[r], tempL[l]));
      }
    }
  }

  return result;
};

/**
 * 1870. Minimum Speed to Arrive on Time
 * 
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
var minSpeedOnTime = function (dist, hour) {
  if (hour <= dist.length - 1) return -1;
  var t = (n) => Math.round(n * 1000000000) / 1000000000;

  var sum = dist.reduce((a, c) => a + c);

  var left = Math.round(sum / Math.ceil(hour));
  if (left < 1) left = 1;
  if (dist.length == 1) return Math.round(sum / hour);

  var i = 0;
  var reached;

  right = 10 ** 7;
  while (left < right) {
    reached = false;
    let mid = Math.floor((left + right) / 2);

    curr = t(hour - (t(dist.at(-1) / mid)));

    for (i = 0; i < dist.length - 1; i++) {
      curr -= Math.ceil(dist[i] / mid);
      if (curr < dist.length - 2 - i) break;
      // console.log("curr = " + curr);
    }

    if (i == dist.length - 1) reached = true;

    if (reached) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

// console.log(minSpeedOnTime([1, 3, 2], 2.7));

/**
 * 852. Peak Index in a Mountain Array
 * 
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    const m = Math.floor((r + l) / 2);
    if (arr[m] < arr[m + 1]) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return l;
};

// console.log(peakIndexInMountainArray([3, 4, 5, 1]));

/**
 * 486. Predict the Winner
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function (nums, hsum, s = 0, e, p1 = 0, p2 = 0, isP1 = true) {
  if (hsum == null) {
    hsum = nums.reduce((a, c) => a + c) / 2;
    e = nums.length - 1;
  }

  if (isP1) {
    if (p1 + nums[s] > hsum || p1 + nums[e] > hsum) {
      return true;
    }

    if (s < e) return (PredictTheWinner(nums, hsum, s + 1, e, p1 + nums[s], p2, !isP1) || PredictTheWinner(nums, hsum, s, e - 1, p1 + nums[e], p2, !isP1));
    else return p1 >= p2
  } else {
    if (p2 + nums[s] > hsum || p2 + nums[e] > hsum) {
      return false;
    }

    if (s < e - 1) return (PredictTheWinner(nums, hsum, s + 1, e, p1, p2 + nums[s], !isP1) && PredictTheWinner(nums, hsum, s, e - 1, p1, p2 + nums[e], !isP1));
    else return p1 >= p2
  }
};

// console.log(PredictTheWinner([1, 5, 2, 4, 6]))

/**
 * 77. Combinations
 * 
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k, s = 1) {
  if (k == 1) {
    var arr = new Array(n - s + 1);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = [i + s];
    }

    return arr;
  }

  var arr = []
  var next = combine(n, k - 1, s + 1);
  for (let i = s; i <= (n - k) + 1 + (s - 1); i++) {
    for (let j = 0; j < next.length; j++) {
      if (next[j][0] > i) {
        arr.push([i, ...next[j]]);
      }
    }
  }

  return arr;
};

// console.log(combine(4, 2))
// ['837410833', '632430250', '105119715', '175020828', '780720007', '603540455', '690579983', '988268367', '090085029']

/**
 * 17. Letter Combinations of a Phone Number
 * 
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits == "") return [];
  var dict = { 1: "", 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz" }

  var result = new Set();

  if (digits.length > 1) {
    var next = letterCombinations(digits.substring(1));
    var arr = dict[digits.charAt(0)].split("");

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < next.length; j++) {
        result.add(arr[i] + next[j]);
      }
    }
  } else {
    dict[digits.charAt(0)].split("").forEach(e => result.add(e));
  }

  return Array.from(result);
};

// console.log(letterCombinations("23"));

/**
 * 46. Permutations
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  if (nums.length == 1) return [nums];
  else if (nums.length == 2) return [[nums[0], nums[1]], [nums[1], nums[0]]];

  var res = [];
  var l = nums.length;
  var f = nums.shift();
  var next = permute(nums);

  for (let i = 0; i < next.length; i++) {
    for (let j = 0; j < l; j++) {
      res.push([...next[i].slice(0, j), f, ...next[i].slice(j)]);
    }
  }

  return res;
};

// console.log(permute([1, 2, 3]));

/**
 * 139. Word Break
 * 
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  var dict = {};
  wordDict.forEach(e => dict[e] = true);

  var q = [0];

  var seen = new Array(s.length + 1).fill(false);

  while (q.length != 0) {
    var start = q.shift();
    if (start == s.length) return true;
    for (let end = start + 1; end <= s.length; end++) {
      if (!seen[end] && dict[s.substring(start, end)]) {
        q.push(end);
        seen[end] = true;
      }
    }
  }

  return false;
};

// console.log(wordBreak("leetcode", ["leet", "code"]));

/**
 * 33. Search in Rotated Sorted Array
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchRS = function (nums, target) {
  var i = 0;

  var start = 1;
  var end = nums.length - 1;
  var mid;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (nums[mid - 1] > nums[mid]) {
      i = mid;
      break;
    } else if (nums[mid] < nums[0]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  start = 0;
  end = nums.length - 1;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (nums[(mid + i) % nums.length] === target) return (mid + i) % nums.length;
    else if (nums[(mid + i) % nums.length] < target) start = mid + 1;
    else end = mid - 1;
  }

  return -1;
};

// console.log(search([4, 5, 6, 7, 0, 1, 2], 0));

/**
 * 81. Search in Rotated Sorted Array II
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  var i = 0;

  var start = 0;
  var end = nums.length - 1;
  var mid;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (nums[mid] == target) return true;

    if ((start == end) || (nums[mid] != nums[start] && nums[mid] != nums[end])) {
      if (nums[mid - 1] > nums[mid]) end = -10;
      else if (nums[mid] < nums[0]) end = mid - 1;
      else start = mid + 1;
    } else {
      if (nums[mid] == nums[start]) start++;
      if (nums[mid] == nums[end]) end--;
    }
  }

  if (end == -10) i = mid;
  start = 0;
  end = nums.length - 1;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (nums[(mid + i) % nums.length] === target) return true;
    else if (nums[(mid + i) % nums.length] < target) start = mid + 1;
    else end = mid - 1;
  }

  return false;
};

// console.log(search([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2));

/**
 * 97. Interleaving String
 * 
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  // console.log(i1, i2)
  if (s2.length + s1.length != s3.length) return false;

  var dict = {};

  function helper(i, j, k) {
    if (k == s3.length) return true;

    if (dict[i + "+" + j] != null) return dict[i + "+" + j];

    var ans = false;

    if (i < s1.length && s1[i] == s3[k])
      ans = ans || helper(i + 1, j, k + 1)

    if (j < s2.length && s2[j] == s3[k])
      ans = ans || helper(i, j + 1, k + 1)

    dict[i + "+" + j] = ans;
    return ans
  }

  return helper(0, 0, 0)
};

// console.log(isInterleave("a", "b", "a"))

var MyStack = function () {
  this.q1 = [];
  this.q2 = [];
  this.first = true;
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  if (this.first) {
    this.q1 = [x];
    for (let i = 0; i < this.q2.length; i++) {
      this.q1.push(this.q2[i])
    }
    this.q2 = [];
  } else {
    this.q2 = [x];
    for (let i = 0; i < this.q1.length; i++) {
      this.q2.push(this.q1[i])
    }
    this.q1 = [];
  }

  this.first = !this.first;
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  if (this.first) return this.q2.shift();
  else return this.q1.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  console.log(this.first)
  if (this.first) return this.q2[0];
  else return this.q1[0];
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  if (this.first) return this.q2.length == 0;
  else return this.q1.length == 0;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

/**
 * 2483. Minimum Penalty for a Shop
 * 
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function (customers) {
  var score = 0;
  var max = 0;
  var idx = 0;

  for (let i = 0; i < customers.length; i++) {
    if (customers[i] == "Y") score++;
    else score--;

    if (score > max) {
      max = score;
      idx = i + 1;
    }
  }

  return idx;
};

// console.log(bestClosingTime("YYNY"))

/**
 * 199. Binary Tree Right Side View
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (root == null) return [];
  var result = [];

  var q = [[root, 0]];

  var t;
  while (q.length != 0) {
    t = q.shift();

    if (result[t[1]] == undefined) result[t[1]] = t[0].val;

    if (t[0].right != null) q.push([t[0].right, t[1] + 1])
    if (t[0].left != null) q.push([t[0].left, t[1] + 1])
  }

  return result;
};


/**
 * 767. Reorganize String
 * 
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (s) {
  const freqMap = {};
  for (const c of s) {
    freqMap[c] = (freqMap[c] || 0) + 1;
  }

  const maxHeap = [...Object.keys(freqMap)].sort((a, b) => freqMap[b] - freqMap[a]);

  let res = "";
  while (maxHeap.length >= 2) {
    const char1 = maxHeap.shift();
    const char2 = maxHeap.shift();

    res += char1;
    res += char2;

    if (--freqMap[char1] > 0) maxHeap.push(char1);
    if (--freqMap[char2] > 0) maxHeap.push(char2);

    maxHeap.sort((a, b) => freqMap[b] - freqMap[a]);
  }

  if (maxHeap.length) {
    const char = maxHeap[0];
    if (freqMap[char] > 1) return "";
    res += char;
  }

  return res;
}

// console.log(reorganizeString("aabbcc"))


/**
 * 338. Counting Bits
 * 
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  if (n == 0) return [0];
  if (n == 1) return [0, 1];
  var result = [0, 1];
  var len;

  for (let i = 2; i <= n; i *= 2) {
    len = result.length;

    for (let j = 0; j < len; j++) {
      result.push(result[j] + 1);

      if (i + j == n) return result;
    }
  }

  return result;
};

// console.log(countBits(5));

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * 138. Copy List with Random Pointer
 * 
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (head == null) return null;
  var curr = head;

  while (curr != null) {
    curr.next = new Node(curr.val, curr.next, null)
    curr = curr.next.next
  }

  curr = head;
  while (curr != null) {
    curr.next.random = (curr.random != null) ? curr.random.next : null;

    curr = curr.next.next
  }

  var cpy = head.next;
  var res = cpy;
  head.next = head.next.next;
  curr = head.next;

  while (curr != null) {
    cpy.next = curr.next
    curr.next = curr.next.next
    curr = curr.next
    cpy = cpy.next
  }

  return res;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 725. Split Linked List in Parts
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
  var len = 0;

  var curr = head;

  while (curr != null) {
    len++;
    curr = curr.next;
  }

  var res = [];
  curr = head;
  var tmp;

  if (len < k) {
    for (let i = 0; i < k; i++) {
      if (curr != null) {
        res.push(curr);

        tmp = curr.next;
        curr.next = null;
        curr = tmp;
      } else res.push(null)
    }
  } else {
    var each = Math.floor(len / k);
    var extra = len % k;

    for (let i = 0; i < k; i++) {
      res.push(curr);

      for (let j = 1; j < each + ((extra > 0) ? 1 : 0); j++) {
        curr = curr.next;
      }

      tmp = curr.next;
      curr.next = null;
      curr = tmp;
      extra--;
    }
  }

  return res;
};

/**
 * 64. Minimum Path Sum
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  var dp = new Array(grid.length)

  // console.log(dp);
  dp[0] = new Array(grid[0].length);
  dp[0][0] = grid[0][0]

  for (let i = 1; i < grid.length; i++) {
    dp[i] = new Array(grid[0].length)
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }

  for (let i = 1; i < grid[0].length; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i]
  }

  for (let i = 1; i < grid.length; i++) {
    for (let j = 1; j < grid[0].length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }

  // console.table(dp)
  return dp[grid.length - 1][grid[0].length - 1]
};

// console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]));

/**
 * 807. Max Increase to Keep City Skyline
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function (grid) {
  var rowsMax = new Array(grid.length).fill(0);
  var colsMax = new Array(grid.length).fill(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      rowsMax[i] = rowsMax[i] > grid[i][j] ? rowsMax[i] : grid[i][j]
      colsMax[j] = colsMax[j] > grid[i][j] ? colsMax[j] : grid[i][j]
    }
  }

  var sum = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      sum += (rowsMax[i] > colsMax[j]) ? colsMax[j] - grid[i][j] : rowsMax[i] - grid[i][j]
    }
  }

  return sum;
};

// console.log(maxIncreaseKeepingSkyline([[3, 0, 8, 4], [2, 4, 5, 7], [9, 2, 6, 3], [0, 3, 1, 0]]))

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} restricted
 * @return {number}
 */
var reachableNodes = function (n, edges, restricted) {
  var graph = new Array(n).fill(0);
  var res = {};

  restricted.forEach(e => { res[e] = true })

  console.log(res)

  for (let i = 0; i < edges.length; i++) {
    if (graph[edges[i][0]] == 0) graph[edges[i][0]] = {}
    if (graph[edges[i][1]] == 0) graph[edges[i][1]] = {}

    // console.log(res[edges[i][0]], res[edges[i][0]]);

    if ((res[edges[i][0]] == null && res[edges[i][1]] == null)) {
      graph[edges[i][0]][edges[i][1]] = true;
      graph[edges[i][1]][edges[i][0]] = true;
    }
  }

  console.log(graph)

  var visited = new Array(n).fill(false);
  visited[0] = true;
  var count = 1;

  var q = ["0"];
  var tmp;

  while (q.length != 0) {
    tmp = q.shift();

    for (const key in graph[Number(tmp)]) {
      if (Object.hasOwnProperty.call(graph[Number(tmp)], key)) {
        if (!visited[Number(key)]) {
          visited[Number(key)] = true;
          count++;
          q.push(key)
        }
      }
    }
  }

  // console.log(count);
  return count;
};

// console.log(reachableNodes(7, [[0, 1], [1, 2], [3, 1], [4, 0], [0, 5], [5, 6]], [4, 5]))

/**
 * 229. Majority Element II
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
  var dict = {};
  var result = [];

  for (let i = 0; i < nums.length; i++) {
    if (dict[nums[i]] == null) dict[nums[i]] = 1
    else if (dict[nums[i]] != -1) dict[nums[i]]++

    if (dict[nums[i]] != null && dict[nums[i]] / nums.length > 1 / 3) {
      result.push(nums[i])
      dict[nums[i]] = -1;
    }
  }

  // console.log(dict)
  return result;
};

// console.log(majorityElement([3, 2, 3]))

/**
 * 343. Integer Break
 * 
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  if (n <= 3) return n - 1;
  if (n % 3 == 2) return 3 ** ~~(n / 3) * 2;
  else if (n % 3 == 1) return 3 ** ~~((n / 3) - 1) * 4;
  else return 3 ** ~~(n / 3);
};

// console.log(integerBreak(10));

/**
 * 1155. Number of Dice Rolls With Target Sum
 * 
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
  const mod = Math.pow(10, 9) + 7;

  let prev = new Array(target + 1).fill(0);
  let curr = new Array(target + 1).fill(0);

  prev[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      let ans = 0;
      for (let x = 1; x <= k; x++) {
        if (j - x >= 0) {
          ans += prev[j - x] % mod;
        }
      }
      curr[j] = ans;
    }
    prev = [...curr];
  }
  return prev[target] % mod;
};

// console.log(numRollsToTarget(2, 6, 7));

/**
 * 1578. Minimum Time to Make Rope Colorful
 * 
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
  if (colors.length == 1) return 0;

  var totalTime = 0;
  var max = neededTime[0];

  for (let i = 1; i < colors.length; i++) {
    if (colors[i] != colors[i - 1]) {
      max = 0;
    }

    totalTime += Math.min(max, neededTime[i]);
    max = Math.max(max, neededTime[i])
  }

  return totalTime;
};

// console.log(minCost("bbbaaa", [4, 9, 3, 8, 8, 9]))

/**
 * 2610. Convert an Array Into a 2D Array With Conditions
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var findMatrix = function (nums) {
  var result = [];

  var dict = {};
  for (let i = 0; i < nums.length; i++) {
    if (dict[nums[i]] != undefined) dict[nums[i]]++;
    else dict[nums[i]] = 1;
  }


  var temp;
  var keys = Object.keys(dict);

  while (keys.length != 0) {
    temp = [];

    for (let i = 0; i < keys.length; i++) {
      temp.push(keys[i]);
      dict[keys[i]]--;
      if (dict[keys[i]] == 0) delete dict[keys[i]];
    }
    result.push(temp);

    keys = Object.keys(dict);
  }

  return result;
};

// console.log(findMatrix([1, 3, 4, 1, 2, 3, 1]))

/**
 * 2125. Number of Laser Beams in a Bank
 * 
 * @param {string[]} bank
 * @return {number}
 */
var numberOfBeams = function (bank) {
  var temp = 0;
  var left = 0;
  var total = 0;

  for (let i = 0; i < bank.length; i++) {
    for (let j = 0; j < bank[i].length; j++) {
      if (bank[i][j] == "1") temp++;
    }

    if (left == 0) {
      left = temp;
    } else if (temp != 0) {
      total += temp * left;
      left = temp;
    }

    temp = 0;
  }

  return total;
};

// console.log(numberOfBeams(["011001", "000000", "010100", "001000"]));

/**
 * 2870. Minimum Number of Operations to Make Array Empty
 * 
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  var dict = {};
  for (let i = 0; i < nums.length; i++) {
    if (dict[nums[i]] != undefined) dict[nums[i]]++;
    else dict[nums[i]] = 1;
  }


  var keys = Object.keys(dict);
  var total = 0;

  for (let i = 0; i < keys.length; i++) {
    if (dict[keys[i]] == 1) return -1;
    total += Math.ceil(dict[keys[i]] / 3);
  }

  return total;
};

// console.log(minOperations([2, 3, 3, 2, 2, 4, 2, 3, 4]));

/**
 * 300. Longest Increasing Subsequence
 * 
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  var stor = new Array(nums.length).fill(1);

  var high = 1;
  var temp = 1;

  for (let i = nums.length - 2; i > -1; i--) {
    temp = 0;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i] && stor[j] > temp)
        temp = stor[j];
    }

    stor[i] = temp + 1;
    if (high < temp + 1) high = temp + 1;
  }

  return high;
};

// console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));

/**
 * 1235. Maximum Profit in Job Scheduling
 * 
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function (startTime, endTime, profit) {
  var dict = { "-1": 0 };
  var temp = 0;

  var id = Array.from({ length: startTime.length }, (_, i) => i)
    .sort((a, b) => startTime[a] - startTime[b]);


  for (let i = id.length - 1; i >= 0; i--) {
    if (dict[startTime[id[i]]] == null) dict[startTime[id[i]]] = 0;

    temp = search(endTime[id[i]], id, i)

    if (i == startTime.length - 1) {
      dict[startTime[id[i]]] = profit[id[i]];
    } else {
      dict[startTime[id[i]]] = (dict[startTime[id[i + 1]]] > dict[temp] + profit[id[i]]) ? dict[startTime[id[i + 1]]] : dict[temp] + profit[id[i]];
    }
  }

  function search(target, id, left) {
    let right = id.length - 1;
    let mid;

    if (target > startTime[id[right]]) {
      return -1;
    }

    while (left < right) {
      mid = Math.floor((left + right) / 2);

      if (startTime[id[mid]] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return startTime[id[left]];
  }


  return dict[startTime[id[0]]];
};

// console.log(jobScheduling([6, 15, 7, 11, 1, 3, 16, 2], [19, 18, 19, 16, 10, 8, 19, 8], [2, 9, 1, 19, 5, 7, 3, 19]))
