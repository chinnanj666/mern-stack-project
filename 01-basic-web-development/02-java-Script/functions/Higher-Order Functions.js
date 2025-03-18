function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const multiplyBy2 = createMultiplier(2);
console.log(multiplyBy2(5));  // Output: 10
