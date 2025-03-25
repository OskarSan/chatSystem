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
            client.write(`${input}`);
            rl.prompt();
        });
        
        client.on('data', (data) => {
            console.log(`${data.toString()}`);
            rl.prompt();
        });
    
        client.on('end', () => {
            console.log('Disconnected from server');
            rl.close();
        });
    
    });

    