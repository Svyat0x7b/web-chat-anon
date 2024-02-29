import React from 'react';
import Message from './message';
import './chat-room.css';

const ChatRoom = () => {
    return (
        <section className="chat">
            <div className="chat__header">
                <h2>Chatname</h2>
            </div>
            <div className="chat__body">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <div className="chat__input">
                <input type="text" name="message" />
                <button>Send</button>
            </div>
        </section>
    );
};

export default ChatRoom;
