// SIMPLE EXAMPLE SOLUTIONS

// Task 1
function reverseObject(obj) {
  return Object.keys(obj).reduce((rev, k) =>
    Object.assign(rev, { [obj[k]]: k }), {})
}

function unlock(message) {
  print(decode(message, reverseObject(encode_key)))
}

// Task 2
function fibonacci(n) {
 return n == 1 || n == 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}

// Task 3
function squareSum(n) {
 for (var i = 1, s = 0; i <= n; i++) s += i * i;
 return s;
}

// Task 4
function collatzLength(n) {
 function helper(n, length) {
  if (n === 1) return length
  if (n % 2 === 0) return helper(n / 2, length + 1)
  return helper(n * 3 + 1, length + 1)
 }
 return helper(n, 1)
}

// Task 5
function nthPrime(n) {
  function isPrime(n) {
    if (n <= 1) return false
    if (n === 2) return true
    for (var i = 2; i < n; i++) {
      if (n % i === 0) return false
    }
    return true
  }
  for (var i = 2, nth = 1; ; i++) {
    if (isPrime(i) && n === nth++) {
      return i
    }
  }
}
