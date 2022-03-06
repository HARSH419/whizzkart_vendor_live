import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleDoubleDown,
  faPaperPlane,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        message: [{
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        }],
    };
  }

  componentDidMount() {
    this.setState = {
      message: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'Hello world',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    };
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View>
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  scrollToBottomComponent = () => {
    return <FontAwesomeIcon icon={faAngleDoubleDown} size={22} color="#333" />;
  };

  onSend(messageSend = []) {
      
    this.setState(previousMessages => ({
      message: GiftedChat.append(previousMessages.messsage, messageSend),
    }));
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.message}
        onSend={messageSend => this.onSend(messageSend)}
        user={{
          _id: 1,
        }}
        renderBubble={this.renderBubble}
        alwaysShowSend
        renderSend={this.renderSend}
      />
    );

    if (Platform.OS === 'android') {
      return (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behaviour="padding"
          keyboardVerticalOffset={30}
          enabled>
          {chat}
        </KeyboardAvoidingView>
      );
    } else {
      return chat;
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chat;
