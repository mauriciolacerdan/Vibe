import React, { useLayoutEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from '@react-native-firebase/firestore';

import { useAuth } from '../../contexts/auth';
import PostsList from '../../components/PostList';
import { Container, ListsPosts } from './styles';
import { db } from '../../services/firebase';
import type { Post } from '../../types/models';
import type { AppStackParamList } from '../../types/navigation';

export default function PostsUser() {
  const route = useRoute<RouteProp<AppStackParamList, 'PostsUser'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, 'PostsUser'>>();
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title === '' ? '' : route.params.title,
    });
  }, [navigation, route.params.title]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getDocs(
        query(
          collection(db, 'posts'),
          where('userId', '==', route.params.userId),
          orderBy('created', 'desc'),
        ),
      )
        .then(snapshot => {
          const postList = snapshot.docs.map(postSnapshot => ({
            ...postSnapshot.data(),
            id: postSnapshot.id,
          })) as Post[];
          if (isActive) {
            setPosts(postList);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Unable to load user posts', error);
          if (isActive) {
            setLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, [route.params.userId]),
  );

  return (
    <Container>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size={50} color="#e52246" />
        </View>
      ) : (
        <ListsPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => (
            <PostsList data={item} userId={user?.uid ?? ''} />
          )}
        />
      )}
    </Container>
  );
}
