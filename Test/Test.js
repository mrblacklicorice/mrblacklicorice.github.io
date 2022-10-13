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

function fib(n, mem) {
  if (mem[n] != null) return mem[n];
  if (n == 1 || n == 2) {
    mem[n] = 1;
    return 1;
  } else {
    mem[n] = fib(n - 1, mem) + fib(n - 2, mem);
    return mem[n];
  }
}

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

var integerBreak = function (n) {
  if (n < 4) {
    return n - 1;
  }

  if (n % 3 == 2) {
    return 3 ** ~~(n / 3) * 2;
  } else if (n % 3 == 1) {
    return 3 ** ~~((n / 3) - 1) * 4;
  } else {
    return 3 ** ~~(n / 3);
  }
};

// console.log(integerBreak(8));


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
// // 2

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

  if (result.length == 1 || (result.length > 1 && result[1] == 0))
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