function fib(n,mem) {
  if(mem[n]!=null) return mem[n];
  if (n == 1 || n == 2) {
      mem[n] = 1;
      return 1;
  } else {
      mem[n] = fib(n - 1,mem) + fib(n - 2,mem); 
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

function shuffle(Array) {
  var temp;
  var number;
  for (let i = 0; i < Array.length; i++) {
      temp = Array[i];
      number = Math.floor(Math.random() * Array.length);
      Array[i] = Array[number];
      Array[number] = temp;
  }
  return Array;
}

console.log(shuffle([1,2,3,4,5]));

console.log(fib(6,[]));

console.log(isTravelPossible([4, 2, 0, 0, 2, 0]));


