import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <View style={[
      styles.bubble,
      isUser ? styles.userBubble : styles.botBubble
    ]}>
      <Text style={[
        styles.messageText,
        isUser ? styles.userText : styles.botText
      ]}>
        {message.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  botBubble: {
    backgroundColor: '#e9ecef',
    alignSelf: 'flex-start',
    marginRight: '20%',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#000',
  },
});
