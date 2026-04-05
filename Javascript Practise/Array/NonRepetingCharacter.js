
function firstNonRepeatingChar(str) {
  const freq = new Map();

  // Step 1: Count frequencies
  for (let ch of str) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  // Step 2: Find first non-repeating
  for (let ch of str) {
    if (freq.get(ch) === 1) {
      return ch;
    }
  }

  return null; // or -1 if no non-repeating char
}

// 🔹 Example usage
console.log(firstNonRepeatingChar("swiss")); // Output: "w"
console.log(firstNonRepeatingChar("aabbcc")); // Output: null
console.log(firstNonRepeatingChar("leetcode")); // Output: "l"
