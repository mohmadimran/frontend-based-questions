Array.prototype.myFilter = function(callback) {
  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      const currentItem = this[i];
      const shouldKeep = callback(currentItem, i, this);
      
      if (shouldKeep) {
        result.push(currentItem);
      }
    }
  }
  
  return result;
};

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.myFilter(x => x % 2 === 0)) // Keep even numbers 2,4