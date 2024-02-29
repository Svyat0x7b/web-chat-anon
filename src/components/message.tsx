import React from 'react';
import './message.css';
const Message = () => {
    return (
        <div className="message">
            <div className="message-photo">JW</div>
            <div className="message-content">
                <h3 className="content-username">Firstname Lastname</h3>
                <p className="content-text">Hello Buddy!</p>
                <div className="content-details">
                    <div></div>
                    <div className="message-timestamp">
                        <span>12:15</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
