
## Middleware
- It refers to function that has access to request object (req), response object (res) and next function in application's request response cycle.

- These functions can :
1. Execute any code
2. Make changes to request & response objects
3. End request-response cycle
4. Call the next middleware function in the stack 

- Think of middlewares as series of checkpoints or processing stations that an http requests passes through before reaching its final destination.

## Headers 
- Headers are key value pairs of metadata that are send along with HTTP request or response. They provide additional information about message body, sender, recepient and various aspects of communication.

- Think of them as envelope labels which tells you about important details about the letter before you even open it.

- Types of headers :-
1. Request headers
2. Response headers

- In Express.js we interact with the headers via the request (req) & response (res) objects

## Status Codes
HTTP response status codes indicate whether a specific HTTP request has been succesfully completed. Response codes are grouped in 5 classes :

1. Informational responses (`100-199`)
2. Successful responses (`200-299`)
3. Redirection messaages (`300-399`)
4. Client error messages (`400-499`)
5. Server error messages (`500-599`)
