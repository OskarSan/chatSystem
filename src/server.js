const net = require('net');

const clients = new Map();



const server = net.createServer((socket) => {
    let nickname = "";
    
    socket.write('Welcome to the chat server! Please enter your nickname: ');


    socket.on('data', (data) => {
        try {
            const message = data.toString().trim();

            if (!nickname) {
                nickname = message;
                if (clients.has(nickname)) {
                    socket.write('Nickname already in use. Please choose another one.\n');
                    nickname = ""; // Reset nickname
                    return;
                }
                clients.set(nickname, socket);
                console.log(`${nickname} has joined the chat.`);
                broadcast(`${nickname} has joined the chat.`, socket);
                return;
            }

            if (message.startsWith('/dm')) {
                const [command, dmNickname, ...dmMessage] = message.split(' ');
                const dmSocket = clients.get(dmNickname);
                if (!dmSocket) {
                    socket.write(`User ${dmNickname} not found.\n`);
                    return;
                }
                console.log(`(DM) ${nickname}: ${dmMessage.join(' ')}`);
                dmSocket.write(`(DM) ${nickname}: ${dmMessage.join(' ')}\n`);
                return;
            }

            if (message === '/exit') {
                socket.end();
                return;
            }

            broadcast(`${nickname}: ${message}`, socket);
        } catch (error) {
            console.error(`Error handling message from ${nickname || 'unknown user'}:`, error);
            socket.write('An error occurred while processing your message.\n');
        }
    });

    socket.on('end', () => {
        try {
            console.log(`${nickname} has disconnected.`);
            clients.delete(nickname);
            broadcast(`${nickname} has left the chat.`, socket);
        } catch (error) {
            console.error(`Error handling disconnection for ${nickname || 'unknown user'}:`, error);
        }
    });

    socket.on('error', (error) => {
        console.error(`Socket error for ${nickname || 'unknown user'}:`, error);
    });


});


function broadcast(message, senderSocket) {
    try {
        console.log(message);
        clients.forEach((clientSocket) => {
            if (clientSocket !== senderSocket) {
                clientSocket.write(message + '\n');
            }
        });
    } catch (error) {
        console.error('Error broadcasting message:', error);
    }
}

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});
