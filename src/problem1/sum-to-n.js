// Using native loop to sum all numbers from 1 to n
// Complexity: O(n)
function sum_to_n_a(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// Using formula to sum all numbers from 1 to n
// Complexity: O(1)
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2;
}

// Using recursion to sum all numbers from 1 to n
// Complexity: O(n)
function sum_to_n_c(n) {
  if (n === 1) {
    return 1;
  }

  return n + sum_to_n_c(n - 1);
}
