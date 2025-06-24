// Run using 'npm start' as we've defined it in scripts
// In order to see any updated changes in code you need to restart the server 

const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") { // This favicon request gets automatically called on each request so we are just eliminating it from our logs
        return res.end();
    }

    const log = `${Date.now()}: ${req.method} ${req.url} New request received\n`; // Type random path in browser url and it will log that in 'logs.txt'
    const myUrl = url.parse(req.url, true); // By passing true, we say that we want to handle query parameters
    console.log(myUrl);

    fs.appendFile('logs.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end("Homepage");
                break;
            case '/about':
                const userName = myUrl.query.myname;
                res.end(`Hi, ${userName}`);
                break;
            case '/signup':
                if (req.method === 'GET') {
                    res.end("This is Signup page");
                }
                else if (req.method === 'POST') {
                    res.end("Success")
                }
                break;
            default:
                res.end("Error 404: Page not found!!");
                // break;
        }
    })
    // console.log(req); // Provides complete info of request object
    // console.log(req.headers);
    // res.end('Hello bro from server');
});

myServer.listen(8000, () => {
    console.log('Server started listening on port 8000');
});