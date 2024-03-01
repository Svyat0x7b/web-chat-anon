import React from 'react';
import './message.css';

interface IMessageProps {
    msg: any;
    author: string;
}

const Message: React.FC<IMessageProps> = ({ msg, author }) => {
    console.log(msg);
    const date = new Date(msg.id);
    const timestamp = `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    const avaLetters = msg.username.trim().split('').slice(0, 2).join('').toUpperCase();

    if (author == msg.username) {
        return (
            <div className="message-own">
                <div className="message-photo">
                    <span>{avaLetters}</span>
                </div>
                <div className="message-content-own">
                    <h3 className="content-username">{msg.username}</h3>
                    <p className="content-text">{msg.message}</p>
                    <div className="content-details">
                        <div></div>
                        <div className="message-timestamp">
                            <span>{timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="message">
            <div className="message-photo">{avaLetters}</div>
            <div className="message-content">
                <h3 className="content-username">{msg.username}</h3>
                <p className="content-text">{msg.message}</p>
                <div className="content-details">
                    <div></div>
                    <div className="message-timestamp">
                        <span>{timestamp}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
