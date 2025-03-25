const net = require('net');

const clients = new Map();



const server = net.createServer((socket) => {
    let nickname = "";
    
    socket.write('Welcome to the chat server! Please enter your nickname: ');


    socket.on('data', (data) => {
        const message = data.toString().trim();
        
        if (!nickname) {
            nickname = message;
            clients.set(nickname, socket);
            console.log(`${nickname} has joined the chat.`);
            broadcast(`${nickname} has joined the chat.`, socket);
            return;
        }
        

        if (message.startsWith('/dm')) {
            const [command, dmNickname, ...dmMessage] = message.split(' ');
            const dmSocket = clients.get(dmNickname);
            if (!dmSocket) {
                socket.write(`User ${dmNickname} not found.`);
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
    });

    socket.on('end', () => {
        console.log(`${nickname} has disconnected.`);
        clients.delete(nickname);
        broadcast(`${nickname} has left the chat.`, socket);
    });
});


function broadcast(message, senderSocket) {
    console.log(message);
    clients.forEach((clientSocket) => {
        if (clientSocket !== senderSocket) {
            clientSocket.write(message + '\n');
        }
    });
}

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


