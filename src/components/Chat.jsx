import React from 'react';
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
import './component.css'
import API from "../store/requests";

class ChatBox extends React.Component {
  componentDidMount() {
    addResponseMessage('How can I help you today!');
  }

  handleNewUserMessage = newMessage => {
    console.debug(`New message incomig! ${newMessage}`);
    let params = {
      question: newMessage,
      action: 'GetReply',
    };
    API.triggerPost('DataUploader', params)
    .then(response => {
      if (response.status === 200 && response.data.success) {
        addResponseMessage(response.data.result);
      }
    })
    .catch(err => {
      this.setState({ showLoader: false });
      me.showModal(err.message, 'error');
    });
  };

  render() {
    return (
      <div className="App customStyleForChatBox">
        <Chat handleNewUserMessage={this.handleNewUserMessage} title="Maiden Cube Pvt Ltd" />
      </div>
    );
  }
}
export default ChatBox;
//export default Layout(ChatBox);
