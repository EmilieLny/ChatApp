import React, { Component } from 'react';
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECEIVED } from '../../const'
import Messages from '../messages/Messages';
import MessageInput from '../messages/MessageInput';


export default class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChat: null
        };
    }

    componentDidMount() {
        this.initChat();
    }

    initChat = () => {
        const { socket } = this.props;

        socket.emit(COMMUNITY_CHAT, this.resetChat);
        socket.on('connect', () => {
            socket.emit(COMMUNITY_CHAT, this.resetChat)
        })
    };

    // Reset the chat
    resetChat = (chat) => {
        const { socket } = this.props;

        this.setState({ activeChat: chat } );
        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`;

        socket.on(messageEvent, this.addMessageToChat(chat))
    };


    // adds message to chat with chatId
    addMessageToChat = (chat) => {
        return message => {
            let updatedChat = chat;
            updatedChat.messages.push(message);

            this.setState({ activeChat: updatedChat })
        }
    };

    // Adds a message to the specified chat
    sendMessage = (chatId, message)=>{
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, { chatId, message } )
    };

    render() {
        const { user } = this.props;
        const { activeChat } = this.state;
        return (
            <div className="container">
                <div className="chat-room-container">
                    {
                        activeChat && <div className="chat-room">
                            <Messages
                                messages={activeChat.messages}
                                user={user}/>
                            <MessageInput sendMessage={(message) => { this.sendMessage(activeChat.id, message) }}/>
                        </div>
                    }
                </div>

            </div>
        );
    }
}
