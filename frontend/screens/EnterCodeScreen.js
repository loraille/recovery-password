import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import {urlBackend} from '../modules/var'

const EnterCodeScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');


  const handleVerifyToken = async () => {
    try {
      console.log('email',email)
      console.log('token',token)
      const response = await fetch(`${urlBackend}/confirm-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, token })
      });
      const data = await response.json();
      console.log(data)
      if (data.result) {
        navigation.navigate('ResetPassword', { email, token });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Erreur lors de la vérification du code.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Code de réinitialisation"
        value={token}
        onChangeText={setToken}
      />
      <Button title="Valider" onPress={handleVerifyToken} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EnterCodeScreen;
