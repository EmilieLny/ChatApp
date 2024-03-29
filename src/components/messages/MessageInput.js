import React, { Component } from 'react';

export default class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:"",
            isTyping:false
        };

    }

    handleSubmit = (e)=>{
        e.preventDefault(); // prevents page reloading
        this.sendMessage();
        this.setState({ message: "" } )
    };

    sendMessage = ()=>{
        this.props.sendMessage(this.state.message)

    };


    render() {
        const { message } = this.state;
        return (
            <div className="message-input">
                <form
                    onSubmit={ this.handleSubmit }
                    className="message-form">

                    <input
                        id = "message"
                        ref = {"messageinput"}
                        type = "text"
                        className = "form-control"
                        value = { message }
                        autoFocus
                        autoComplete = {'off'}
                        placeholder = "Type your message here..."
                        onChange = {
                            ({target})=>{
                                this.setState({message:target.value})
                            }
                        }
                    />
                    <button
                        disabled = { message.length < 1 }
                        type = "submit"
                        className = "send"
                    > Send </button>
                </form>

            </div>
        );
    }
}