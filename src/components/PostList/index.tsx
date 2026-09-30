import React, { useState } from 'react';
import {
  Container,
  Name,
  Header,
  Avatar,
  Content,
  ContentView,
  Actions,
  LikeButton,
  Like,
  TimePost,
  AvatarPlaceholder,
} from './styles';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db } from '../../services/firebase';
import type { Post } from '../../types/models';
import type { AppStackParamList } from '../../types/navigation';

type PostsListProps = {
  data: Post;
  userId: string;
};

export default function PostsList({ data, userId }: PostsListProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [likePost, setLikePost] = useState(data.likes);

  async function handleLikePost(id: string, likes: number) {
    const docId = `${userId}_${id}`;

    const likeSnapshot = await getDoc(doc(db, 'likes', docId));

    if (likeSnapshot.exists()) {
      await updateDoc(doc(db, 'posts', id), {
        likes: likes - 1,
      });

      await deleteDoc(doc(db, 'likes', docId)).then(() => {
        setLikePost(likes - 1);
      });

      return;
    }

    await setDoc(doc(db, 'likes', docId), {
      postId: id,
      userId: userId,
    });

    await updateDoc(doc(db, 'posts', id), {
      likes: likes + 1,
    }).then(() => {
      setLikePost(likes + 1);
    });
  }

  function formateTimePost() {
    const datePost = new Date(data.created.seconds * 1000);
    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  return (
    <Container>
      <Header
        onPress={() =>
          navigation.navigate('PostsUser', {
            title: data.autor,
            userId: data.userId,
          })
        }
      >
        {data.avatarUrl ? (
          <Avatar source={{ uri: data.avatarUrl }} />
        ) : (
          <AvatarPlaceholder>
            <MaterialDesignIcons name="account" size={30} color="#353840" />
          </AvatarPlaceholder>
        )}

        <Name numberOfLines={1}>{data?.autor}</Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <Like>{likePost === 0 ? '' : likePost}</Like>
          <MaterialDesignIcons
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#e52246"
          />
        </LikeButton>

        <TimePost>{formateTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
