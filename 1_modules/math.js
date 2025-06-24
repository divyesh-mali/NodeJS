function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

// `module.exports` can only be used once in a code file.
module.exports = {
    addFn: add,
    subtractFn: subtract
}

// Another way to export the functions. These will return type 'anonymous function' because they dont have any name. 

// We can use `exports.funName` as many times as we want unlike module.exports which can only be used once in a file.
/**
 * exports.add = (a,b) => a+b;
 * exports.subtract = (a,b) => a-b;
 */