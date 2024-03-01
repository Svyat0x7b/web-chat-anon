import { useState, useEffect, useRef } from 'react';
import Message from './message';
import './chat-room.css';

type JoinErrorType = {
    is: boolean;
    message?: string;
};

const ChatRoom = () => {
    const [messages, setMessages] = useState<any>([]);
    const [enteredMessage, setEnteredMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [joinError, setJoinError] = useState<JoinErrorType>({ is: false });
    const socket = useRef<any>();

    const connectHandler = () => {
        if (username.trim().length < 3 || username.trim().length > 20) {
            setJoinError({
                is: true,
                message: 'Username must contain 3 or more symbols up to 20!',
            });
            return;
        }

        socket.current = new WebSocket('ws://localhost:4000');

        socket.current.onopen = () => {
            console.log('WebSocket connected');
            const message: any = {
                event: 'connection',
                username: username.trim(),
                id: Date.now(),
            };
            socket.current.send(JSON.stringify(message));
            setConnected(true);
        };

        socket.current.onmessage = (event: any) => {
            console.log('onmessage');
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages: any) => [...prevMessages, newMessage]);
        };
        socket.current.onerror = (error: any) => {
            console.error('WebSocket error:', error);
        };

        socket.current.onclose = () => {
            console.log('WebSocket closed');
        };
    };

    const sendMessageHandler = () => {
        if (enteredMessage.length > 1000) {
            return;
        }

        const message = {
            username: username,
            message: enteredMessage,
            id: Date.now(),
            event: 'message',
        };
        socket.current.send(JSON.stringify(message));
        setEnteredMessage('');
    };

    if (!connected) {
        return (
            <section className="join-form">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    placeholder="Jack1337"
                />
                <button onClick={connectHandler} disabled={!username.trim()}>
                    Connect
                </button>
                {joinError.is && <p className="join-error">{joinError.message}</p>}
            </section>
        );
    }
    return (
        <section className="chat">
            <div className="chat__header">
                <h2>Anon Chat</h2>
            </div>
            <div className="chat__body">
                {messages.length === 0 ? (
                    <p>There is no messages!</p>
                ) : (
                    messages.map((msg: any) => {
                        return msg.event === 'connection' ? (
                            <div key={msg.id} className="connection-msg">
                                The user <span>{msg.username}</span> connected to chat!
                            </div>
                        ) : (
                            <Message key={msg.id} msg={msg} author={username} />
                        );
                    })
                )}
            </div>
            <div className="chat__input">
                <input
                    type="text"
                    name="message"
                    value={enteredMessage}
                    onChange={(e) => setEnteredMessage(e.target.value)}
                />
                <button onClick={sendMessageHandler} disabled={!enteredMessage.trim()}>
                    Send
                </button>
            </div>
        </section>
    );
};

export default ChatRoom;
