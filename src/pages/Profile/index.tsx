import React, { useState, useEffect } from 'react';
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

import { useAuth } from '../../contexts/auth';
import Header from '../../components/Header';
import {
  Container,
  Name,
  Email,
  Buttoon,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  Input,
} from './styles';

import Feather from '@react-native-vector-icons/feather';
import {
  db,
  isStorageObjectNotFound,
  storage,
} from '../../services/firebase';

export default function Profile() {
  const { signOut, user, setUser, storageUser } = useAuth();

  const [nome, setNome] = useState(user?.nome ?? '');
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadAvatar() {
      try {
        if (isActive && user) {
          const response = await getStorageDownloadURL(
            storageRef(storage, `users/${user.uid}`),
          );
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

  async function handleSignOut() {
    await signOut();
  }

  async function updateProfile() {
    if (nome === '' || !user) {
      return;
    }

    await updateDoc(doc(db, 'users', user.uid), {
      nome,
    });

    //Buscar todos os posts desse user e atualizar o nome dele
    const postsDocs = await getDocs(
      query(collection(db, 'posts'), where('userId', '==', user.uid)),
    );

    //Percorrer todos posts desse user e atualizar
    await Promise.all(
      postsDocs.docs.map(postSnapshot =>
        updateDoc(doc(db, 'posts', postSnapshot.id), { autor: nome }),
      ),
    );

    const data = {
      uid: user.uid,
      nome: nome,
      email: user.email,
    };
    setUser(data);
    storageUser(data);

    setOpen(false);
  }

  function uploadFile() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Cancelou!');
      } else if (response.errorCode) {
        Alert.alert('Ops parece que deu algum erro');
      } else {
        const imageUri = response.assets?.[0]?.uri;
        if (!imageUri) {
          Alert.alert('Ops parece que deu algum erro');
          return;
        }

        uploadFileFirebase(imageUri)
          .then(uploadAvatarPosts)
          .catch(error => {
            console.error('Unable to upload profile image', error);
            Alert.alert('Ops parece que deu algum erro');
          });

        console.log('URI DA FOTO', imageUri);
        setUrl(imageUri);
      }
    });
  }

  async function uploadFileFirebase(fileSource: string) {
    if (!user) {
      return;
    }

    await putFile(storageRef(storage, `users/${user.uid}`), fileSource);
  }

  async function uploadAvatarPosts() {
    if (!user) {
      return;
    }

    const image = await getStorageDownloadURL(
      storageRef(storage, `users/${user.uid}`),
    );
    console.log('url recebida', image);

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
      <Header />

      {url ? (
        <UploadButton onPress={uploadFile}>
          <UploadText>+</UploadText>
          <Avatar source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton onPress={uploadFile}>
          <UploadText>+</UploadText>
        </UploadButton>
      )}

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Buttoon $bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText $color="#fff">Atualizar Perfil</ButtonText>
      </Buttoon>

      <Buttoon $bg="#ddd" onPress={handleSignOut}>
        <ButtonText $color="#353840">Sair</ButtonText>
      </Buttoon>

      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer
          behavior={Platform.OS === 'android' ? undefined : 'padding'}
        >
          <ButtonBack onPress={() => setOpen(false)}>
            <Feather name="arrow-left" size={22} color="#121212" />
            <ButtonText $color="#121212">Voltar</ButtonText>
          </ButtonBack>

          <Input
            placeholder={user?.nome}
            value={nome}
            onChangeText={text => setNome(text)}
          />

          <Buttoon $bg="#428cfd" onPress={updateProfile}>
            <ButtonText $color="#fff">Salvar</ButtonText>
          </Buttoon>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
