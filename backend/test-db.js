const net = require('net');

const host = 'mysql-1543fadf-gmmalathika99-e236.l.aivencloud.com';
const port = 25853;

const socket = new net.Socket();

socket.setTimeout(10000);

socket.on('connect', () => {
    console.log('✅ TCP CONNECTION SUCCESS');
    console.log(`Connected to ${host}:${port}`);
    socket.destroy();
});

socket.on('timeout', () => {
    console.log('❌ TCP CONNECTION TIMEOUT');
    socket.destroy();
});

socket.on('error', (err) => {
    console.log('❌ TCP CONNECTION ERROR');
    console.log('Code:', err.code);
    console.log('Message:', err.message);
});

socket.connect(port, host);