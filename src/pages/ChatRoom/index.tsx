import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Container, HeaderRoom, HeaderRoomLeft, Title } from './styles';
import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';

export default function ChatRoom() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <HeaderRoom>
        <HeaderRoomLeft>
          <Title>Grupos</Title>
        </HeaderRoomLeft>

        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </HeaderRoom>

      <FabButton setVisible={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalNewRoom setVisible={() => setModalVisible(false)} />
      </Modal>
    </Container>
  );
}
