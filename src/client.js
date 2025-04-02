const net = require('net');
const readline = require('readline');
let name = "";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});




const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to server!');



    rl.on('line', (input) => {
        try {
            client.write(`${input}`);
            rl.prompt();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });
    
    client.on('data', (data) => {
        try {
            console.log(`${data.toString()}`);
            rl.prompt();
        } catch (error) {
            console.error('Error processing server message:', error);
        }
    });

    client.on('end', () => {
        console.log('Disconnected from server');
        rl.close();
    });
    
    client.on('error', (error) => {
        console.error('Connection error:', error);
        rl.close();
    });

});

client.on('error', (error) => {
    console.error('Failed to connect to server:', error);
    rl.close();
});

    