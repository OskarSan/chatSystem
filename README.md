# Basic text-chat made with JS and Node
The functionality is built on top of Node.js's built-in *net* module which provides low-level TCP socket functionality.

## how does it work

### Server (server.js)

The server listens on port 3000 for incoming TCP connections.
It maintains a Map of connected clients, where the key is the client's nickname, and the value is the client's socket.
When a client connects, the server sends a welcome message asking for a nickname.
The client provides a nickname, which is validated to ensure uniqueness. If the nickname is already in use, the client is asked to choose another one.
The server listens for messages from clients:
- Broadcast Messages: Messages are sent to all connected clients except the sender.
- Direct Messages: Messages starting with /dm are sent privately to the specified user.
- Exit Command: If a client sends /exit, the server disconnects the client.
When a client disconnects, the server removes the client from the Map and notifies other users.
The server handles errors during message processing, broadcasting, and client disconnection to ensure stability.

### Client (client.js)

The client connects to the server on port 3000.
Upon connection, the client displays a message indicating the connection was successful.
The client uses the readline module to read user input from the terminal.
User input is sent to the server via the TCP connection.
The client listens for messages from the server and displays them in the terminal.
Messages include:
- Broadcast messages from other users.
- Direct messages (if the user is the recipient).
- Notifications about users joining or leaving the chat.
If the server disconnects the client or an error occurs, the client displays a message and gracefully closes the connection.
The client handles errors during message sending, receiving, and connection issues to prevent crashes.


## Transparency, Scalability, failure handling

### Transparency 

user feedback:
- The server sends clear messages to users
- The client displays server messages and connection status updates'

logging:
- The server logs key events

### scalability 

Efficient Client Management:
- Server uses a Map to manage clients which supports large number of useres without a performance drop

Broadcasting:
- The broadcast function iterates over all connected clients and sends messages accordingly

Modular design:
- The separation of client and server logic allows independent scaling of each component.

### Failure handling 

Error handling in the Server:
- efficient use of try-catch blocks with informatory error messages

Error handling in the Client:
- same as in the server
- gracefully closes the interface on disconnection or errors


### summary

Transparency: Clear user feedback and logging for both users and developers.

Scalability: Efficient client management and modular design to handle growth.

Failure Handling: Robust error handling and graceful recovery mechanisms to ensure reliability.


## How to use

run the server and clients in their own cmd windows with "node client.js" or "node server.js"

The connection to the server is automatically set to localhost:3000
