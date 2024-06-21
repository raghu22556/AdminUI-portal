import React from 'react';
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
import Layout from './Layout';
import './component.css'

class ChatBox extends React.Component {
  componentDidMount() {
    addResponseMessage('How can I help you today!');
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  };

  render() {
    return (
      <div className="App customStyleForChatBox">
        <Chat handleNewUserMessage={this.handleNewUserMessage} title="Maiden Cube Pvt Ltd" />
      </div>
    );
  }
}

export default Layout(ChatBox);
