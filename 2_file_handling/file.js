const fs = require('fs')

// --------------WRITE-----FILE------------------------------


// ** Synchronously **
fs.writeFileSync("./2_file_handling/sync.txt", "Hello world synchronously");


// ** Asynchronously **
// The only difference in asynchronous is that here we provide a callback function which will be executed once the file is written
// If there is an error, it will be passed to the callback function
// If the file is written successfully, the error will be null
fs.writeFile("./2_file_handling/async.txt", "Hello world asynchronously", (err) => {

})

// --------------READ-----FILE------------------------------

// ** Synchronously **
const data = fs.readFileSync("./2_file_handling/readThisSync.txt", "utf-8");
console.log(data); // Output: Hello world synchronously

// ** Asynchronously ** -> Notice that you haven't assigned async readfile to any variable because it doesn't return anything
fs.readFile("./2_file_handling/readThisAsync.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log(data); // Output: Hello world synchronously
})


// -------------APPEND---FILE---------------------------------

fs.appendFileSync('./2_file_handling/demo1.txt', `${Date.now()} - Appending this text synchronously\n`);

// -------------COPY---FILE------------------------------------
fs.cpSync('./2_file_handling/demo1.txt', './2_file_handling/demo2.txt');



// -------------DELETE---FILE----------------------------------
// fs.unlinkSync('./2_file_handling/demo2.txt'); // This will delete the file demo2.txt

// -------------STATS---OF---FILE--------------------------
console.log(fs.statSync('./2_file_handling/demo1.txt'));
// This will give you the stats of the file demo1.txt, including size, creation time and other metadata. 


//--------------CREATE---DIRECTORY------------------------
fs.mkdirSync('./2_file_handling/newDir'); // This will create a new directory 
fs.mkdirSync("my-docs/a/b", {recursive: true}); // This will create a new directory with subdirectories, if they don't exist