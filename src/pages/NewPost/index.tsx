import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addDoc, collection } from '@react-native-firebase/firestore';
import { getDownloadURL, ref } from '@react-native-firebase/storage';
import { useAuth } from '../../contexts/auth';
import { Container, Input, Button, ButtonText } from './styles';
import { Alert } from 'react-native';
import { db, isStorageObjectNotFound, storage } from '../../services/firebase';
import type { AppStackParamList } from '../../types/navigation';

export default function NewPost() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, 'NewPost'>>();
  const { user } = useAuth();
  const [post, setPost] = useState('');

  const handlePost = useCallback(async () => {
    if (post === '') {
      Alert.alert('Seu post contem conteudo invalido');
      return;
    }
    if (!user) {
      Alert.alert('Faça login para criar uma publicação');
      return;
    }

    let avatarUrl: string | null = null;

    try {
      avatarUrl = await getDownloadURL(ref(storage, `users/${user.uid}`));
    } catch (error) {
      if (!isStorageObjectNotFound(error)) {
        console.error('Unable to load profile image for post', error);
      }
    }

    try {
      await addDoc(collection(db, 'posts'), {
        created: new Date(),
        content: post,
        autor: user.nome,
        userId: user.uid,
        likes: 0,
        avatarUrl,
      });
      setPost('');
      console.log('Post criado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao criar o post', String(error));
    }
  }, [navigation, post, user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handlePost}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [handlePost, navigation]);

  return (
    <Container>
      <Input
        placeholder="O que está acontecendo ?"
        value={post}
        onChangeText={text => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#ddd"
        maxLength={300}
      />
    </Container>
  );
}
