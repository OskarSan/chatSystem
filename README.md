# Basic text-chat made with JS and Node
The functionality is built on top of Node.js's built-in *net* module which provides low-level TCP socket functionality

## Transparency, Scalability, failure handling

*Transparency* is achieved through user feedback and logging

user feedback:
- The server sends clear messages to users
- The client displays server messages and connection status updates'

logging:
- The server logs key events

**scalability** is implemented through the following:

Efficient Client Management:
- Server uses a Map to manage clients which supports large number of useres without a performance drop

Broadcasting:
- The broadcast function iterates over all connected clients and sends messages accordingly

Modular design:
- The separation of client and server logic allows independent scaling of each component.

**Failure handling** is implemented like so:

Error handling in the Server:
- efficient use of try-catch blocks with informatory error messages

Error handling in the Client:
- same as in the server
- gracefully closes the interface on disconnection or errors


**summary**

Transparency: Clear user feedback and logging for both users and developers.

Scalability: Efficient client management and modular design to handle growth.

Failure Handling: Robust error handling and graceful recovery mechanisms to ensure reliability.


## How to use

run the server and clients in their own cmd windows with "node client.js" or "node server.js"

The connection to the server is automatically set to localhost:3000