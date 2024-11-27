import React from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: () => Promise<void>;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  setInputText,
  sendMessage,
  isLoading
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          multiline
          maxLength={1000}
        />
        <TouchableOpacity 
          style={[styles.sendButton, isLoading && styles.disabledButton]} 
          onPress={sendMessage}
          disabled={isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#0084ff',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});