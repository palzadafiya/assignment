import WebSocket from 'ws';
import * as readline from 'readline';

const SERVER_URL = 'ws://localhost:8080';
const ws = new WebSocket(SERVER_URL);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const clearLineAndReprompt = () => {
    process.stdout.write('\r\x1b[K');
    rl.prompt(true);
};

ws.on('open', () => {
    console.log('✅ Connected to the chat server!');
    
    rl.question('Enter your name: ', (userName) => {
        rl.question('Enter room ID: ', (roomId) => {
            const joinPayload = {
                type: 'joinRoom',
                payload: { userName, roomId },
            };
            ws.send(JSON.stringify(joinPayload));

            console.log(`--- Joined room "${roomId}". You can now start chatting! ---`);
            rl.setPrompt('> ');
            rl.prompt();
        });
    });
});

ws.on('message', (data) => {
    try {
        const message = JSON.parse(data.toString());
        
        clearLineAndReprompt();

        if (message.type === 'newMessage') {
            console.log(`[${message.payload.senderName}]: ${message.payload.content}`);
        } else if (message.type === 'userListUpdate') {
            const userNames = message.payload.users.map((u: { name: any; }) => u.name).join(', ');
            console.log(`[SERVER]: Users in room: ${userNames}`);
        } else if (message.type === 'messageHistory') {
            const history = message.payload.messages;
            if (history && history.length > 0) {
                console.log('--- Chat History ---');
                interface ChatMessage {
                    senderName: string;
                    content: string;
                }

                history.forEach((msg: ChatMessage) => {
                    console.log(`[${msg.senderName}]: ${msg.content}`);
                });
                console.log('--- End of History ---');
            } else {
                console.log('[SERVER]: No previous messages in this room.');
            }
        } else {
             console.log(`[SERVER]: ${JSON.stringify(message.payload)}`);
        }

        rl.prompt(true);
    } catch (error) {
        console.error('Error parsing message:', error);
    }
});

ws.on('close', () => {
    console.log('🔴 Disconnected from the server.');
    process.exit(0);
});

ws.on('error', (error) => {
    console.error('WebSocket Error:', error.message);
    process.exit(1);
});

rl.on('line', (input) => {
    if (input.trim() !== '') {
        const messagePayload = {
            type: 'sendMessage',
            payload: { content: input },
        };
        ws.send(JSON.stringify(messagePayload));
    }
    rl.prompt(true);
});