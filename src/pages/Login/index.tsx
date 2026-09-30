import React, { useState } from 'react';
import { Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
} from './styles';
import { useAuth } from '../../contexts/auth';

import * as Animatable from 'react-native-animatable';
const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, signIn, loadingAuth } = useAuth();

  async function handleSignIn() {
    if (email === '' || password === '') {
      Alert.alert('PREENCHA TODOS OS CAMPOS');
      return;
    }

    await signIn(email, password);
  }

  async function handleSignUp() {
    if (email === '' || password === '' || name === '') {
      Alert.alert('PREENCHA TODOS OS CAMPOS PARA CADASTRAR');
      return;
    }

    await signUp(email, password, name);
  }

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  if (login) {
    return (
      <Container>
        <TitleAnimated animation="flipInY">
          Dev<Text style={styles.post}>Post</Text>
        </TitleAnimated>

        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="******"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>

        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }

  return (
    <Container>
      <TitleAnimated animation="flipInY">
        Dev<Text style={styles.post}>Post</Text>
      </TitleAnimated>

      <Input
        placeholder="Seu nome"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="seuemail@teste.com"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="******"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />

      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Ja possuo uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}

const styles = StyleSheet.create({
  post: {
    color: '#E52246',
  },
});
