// 2. Flatten a nested array – e.g., [1,[2,[3,4],5]] → [1,2,3,4,5].

function flattenIterative(arr){
    const stack = [...arr];
    const result = [];

    while(stack.length){
        const lastItem = stack.pop()
        if(Array.isArray(lastItem)){
            stack.push(...lastItem)
        }
        else{
            result.push(lastItem) 
        }
    }
return result.reverse()
}

// ✅ Correct call
console.log(flattenIterative([1, [2, [3, 4], 5]]));
// [1, 2, 3, 4, 5]
