const ws = require('ws');

const PORT = 4000;

const wss = new ws.Server(
    {
        port: PORT,
    },
    () => console.log(`Server started at ${PORT}`),
);

wss.on('connection', function connection(ws) {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

const broadcastMessage = (msg) => {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(msg));
    });
};
