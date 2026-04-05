// // 3. Remove duplicates from an array (without using Set).
// function removeDuplicates(arr) {
//   const seen = {};
//   const result = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (!seen[arr[i]]) {
//       seen[arr[i]] = true;
//       result.push(arr[i]);
//     }
//   }

//   return result;
// }

// // Example
// console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]


// Remove duplicates from array

function removeDuplicates(arr) {
  const seen = new Map(); // Or {}
  const result = [];
  
  for (let item of arr) {
    if (!seen.has(item)) { // O(1) check!
      seen.set(item, true); // O(1) store
      result.push(item);
    }
  }
  return result;
}
// TC: O(n) instead of O(n²) with nested loops!