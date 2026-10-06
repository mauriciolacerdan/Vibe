import React, { useEffect, useState } from 'react';
import { Alert, Modal, Platform } from 'react-native';
import {
  launchImageLibrary,
  type ImageLibraryOptions,
} from 'react-native-image-picker';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';
import {
  getDownloadURL as getStorageDownloadURL,
  putFile,
  ref as storageRef,
} from '@react-native-firebase/storage';
import Feather from '@react-native-vector-icons/feather';
import { useAuth } from '../../contexts/auth';
import { db, isStorageObjectNotFound, storage } from '../../services/firebase';
import {
  Container,
  ProfileHeader,
  AvatarButton,
  Avatar,
  AvatarEdit,
  Name,
  Email,
  Options,
  OptionButton,
  OptionContent,
  OptionLeft,
  OptionIconContainer,
  OptionText,
  Chevron,
  DangerText,
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ButtonBack,
  Input,
  SaveButton,
  SaveButtonText,
} from './styles';

export default function Profile() {
  const { signOut, user, setUser, storageUser } = useAuth();

  const [nome, setNome] = useState(user?.nome ?? '');
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadAvatar() {
      try {
        if (!user) return;

        const response = await getStorageDownloadURL(
          storageRef(storage, `users/${user.uid}`),
        );

        if (isActive) {
          setUrl(response);
        }
      } catch (err) {
        if (!isStorageObjectNotFound(err)) {
          console.error('Unable to load profile image', err);
        }
      }
    }

    loadAvatar();

    return () => {
      isActive = false;
    };
  }, [user]);

  async function updateProfile() {
    const newName = nome.trim();

    if (newName === '' || !user) {
      return;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        nome: newName,
      });

      const postsDocs = await getDocs(
        query(collection(db, 'posts'), where('userId', '==', user.uid)),
      );

      await Promise.all(
        postsDocs.docs.map(postSnapshot =>
          updateDoc(doc(db, 'posts', postSnapshot.id), {
            autor: newName,
          }),
        ),
      );

      const data = {
        uid: user.uid,
        nome: newName,
        email: user.email,
      };

      setUser(data);
      await storageUser(data);

      setOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);

      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  }

  function uploadFile() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
        return;
      }

      const imageUri = response.assets?.[0]?.uri;

      if (!imageUri) {
        Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
        return;
      }

      setUrl(imageUri);

      uploadFileFirebase(imageUri)
        .then(uploadAvatarPosts)
        .catch(error => {
          console.error('Unable to upload profile image', error);

          Alert.alert('Erro', 'Não foi possível atualizar sua foto.');
        });
    });
  }

  async function uploadFileFirebase(fileSource: string) {
    if (!user) return;

    await putFile(storageRef(storage, `users/${user.uid}`), fileSource);
  }

  async function uploadAvatarPosts() {
    if (!user) return;

    const image = await getStorageDownloadURL(
      storageRef(storage, `users/${user.uid}`),
    );

    const postDocs = await getDocs(
      query(collection(db, 'posts'), where('userId', '==', user.uid)),
    );

    await Promise.all(
      postDocs.docs.map(postSnapshot =>
        updateDoc(doc(db, 'posts', postSnapshot.id), {
          avatarUrl: image,
        }),
      ),
    );
  }

  return (
    <Container>
      <ProfileHeader>
        <AvatarButton onPress={uploadFile} activeOpacity={0.85}>
          {url ? (
            <Avatar source={{ uri: url }} />
          ) : (
            <Avatar source={require('../../assets/avatar.png')} />
          )}

          <AvatarEdit>
            <Feather name="camera" size={17} color="#fff" />
          </AvatarEdit>
        </AvatarButton>

        <Name>{user?.nome}</Name>
        <Email>{user?.email}</Email>
      </ProfileHeader>

      <Options>
        <OptionButton
          activeOpacity={0.7}
          onPress={() => {
            setNome(user?.nome ?? '');
            setOpen(true);
          }}
        >
          <OptionContent>
            <OptionLeft>
              <OptionIconContainer>
                <Feather name="user" size={20} color="#2563EB" />
              </OptionIconContainer>

              <OptionText>Atualizar perfil</OptionText>
            </OptionLeft>

            <Chevron name="chevron-right" size={21} color="#94A3B8" />
          </OptionContent>
        </OptionButton>

        <OptionButton activeOpacity={0.7} onPress={signOut}>
          <OptionContent>
            <OptionLeft>
              <OptionIconContainer>
                <Feather name="log-out" size={20} color="#DC2626" />
              </OptionIconContainer>

              <DangerText>Sair da conta</DangerText>
            </OptionLeft>

            <Chevron name="chevron-right" size={21} color="#94A3B8" />
          </OptionContent>
        </OptionButton>
      </Options>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <ModalOverlay>
          <ModalContainer
            behavior={Platform.OS === 'android' ? undefined : 'padding'}
          >
            <ModalHeader>
              <ButtonBack onPress={() => setOpen(false)}>
                <Feather name="arrow-left" size={22} color="#111827" />
              </ButtonBack>

              <ModalTitle>Atualizar perfil</ModalTitle>
            </ModalHeader>

            <Input
              placeholder="Seu nome"
              placeholderTextColor="#94A3B8"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            <SaveButton onPress={updateProfile}>
              <SaveButtonText>Salvar alterações</SaveButtonText>
            </SaveButton>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}
