import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import {
  Container,
  Brand,
  Subtitle,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
  Form,
} from './styles';
import { useAuth } from '../../contexts/auth';

import * as Animatable from 'react-native-animatable';
const BrandAnimated = Animatable.createAnimatableComponent(Brand);

export default function Login() {
  const [login, setLogin] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

  return (
    <Container>
      <BrandAnimated animation="fadeInDown" duration={700}>
        <Brand>Vibe</Brand>
      </BrandAnimated>

      <Subtitle>
        {login
          ? 'Conecte-se com pessoas e ideias.'
          : 'Crie sua conta e comece a compartilhar.'}
      </Subtitle>

      <Form>
        {!login && (
          <Input
            placeholder="Seu nome"
            value={name}
            onChangeText={text => setName(text)}
          />
        )}

        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="******"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <Button onPress={login ? handleSignIn : handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <ButtonText>{login ? 'Acessar' : 'Cadastrar'}</ButtonText>
          )}
        </Button>

        <SignUpButton onPress={toggleLogin}>
          <SignUpText>
            {login ? 'Criar uma conta' : 'Já possuo uma conta'}
          </SignUpText>
        </SignUpButton>
      </Form>
    </Container>
  );
}
