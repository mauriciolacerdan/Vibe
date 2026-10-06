import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import type { ModalNewRoomProps } from '../../types/models';
import {
  Container,
  Overlay,
  ModalContent,
  Title,
  Input,
  ButtonCreate,
  ButtonText,
  BackButton,
  BackButtonText,
} from './styles';

function ModalNewRoom({ setVisible }: ModalNewRoomProps) {
  const [roomName, setRoomName] = useState('');
  const auth = getAuth();
  const firestore = getFirestore();

  async function handleButtonCreate() {
    const name = roomName.trim();
    if (name === '') return;
    await createRoom(name);
  }

  async function createRoom(name: string) {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const roomRef = await addDoc(collection(firestore, 'MESSAGE_THREADS'), {
        name,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${name} criado. Bem vindo(a)!`,
          createAt: serverTimestamp(),
        },
      });
      await addDoc(collection(roomRef, 'MESSAGES'), {
        text: `Grupo ${name} criado. Bem vindo(a)!`,
        createAt: serverTimestamp(),
        system: true,
      });
      setRoomName('');
      setVisible();
    } catch (error) {
      console.log('Erro ao criar sala:', error);
    }
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={setVisible}>
        <Overlay />
      </TouchableWithoutFeedback>

      <ModalContent>
        <Title>Criar um novo Grupo?</Title>

        <Input
          value={roomName}
          onChangeText={setRoomName}
          placeholder="Nome para sua sala?"
        />

        <ButtonCreate onPress={handleButtonCreate}>
          <ButtonText>Criar sala</ButtonText>
        </ButtonCreate>

        <BackButton onPress={setVisible}>
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
      </ModalContent>
    </Container>
  );
}

export default ModalNewRoom;
