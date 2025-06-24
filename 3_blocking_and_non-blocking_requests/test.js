const fs = require('fs');

for (let i = 0; i < 1000000000; i++) {
    // Simulating a blocking operation
    if (i === 999999999) {
        console.log('1st Blocking operation completed');
    }
}

// Blocking requests...
const data = fs.readFileSync('./3_blocking_and_non-blocking_requests/contacts.txt', 'utf-8');
console.log("Synchronous file reading: ", data);


// Non-blocking requests...
fs.readFile('./3_blocking_and_non-blocking_requests/contacts.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log("Async file reading: ", data);
});

for (let i = 0; i < 1000000000; i++) {
    // Simulating a blocking operation
    if (i === 999999999) {
        console.log('2nd Blocking operation completed');
    }
}

console.log('1');
console.log('2');
console.log('3');
console.log('4');