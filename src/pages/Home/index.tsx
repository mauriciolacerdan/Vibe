import React, { useState, useCallback } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Container, ButtonPost, ListPosts, ButtonSearch } from './styles';
import Feather from '@react-native-vector-icons/feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from '@react-native-firebase/firestore';
import { useAuth } from '../../contexts/auth';
import Header from '../../components/Header';
import PostsList from '../../components/PostList';
import { db } from '../../services/firebase';
import type { Post } from '../../types/models';
import type { AppStackParamList } from '../../types/navigation';
import type { QueryDocumentSnapshot } from '@react-native-firebase/firestore';

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, 'Home'>>();
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState<QueryDocumentSnapshot | undefined>();
  const [emptyList, setEmptyList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      function fetchPosts() {
        getDocs(
          query(collection(db, 'posts'), orderBy('created', 'desc'), limit(5)),
        )
          .then(snapshot => {
            if (isActive) {
              setPosts([]);
              const postList = snapshot.docs.map(postSnapshot => ({
                ...postSnapshot.data(),
                id: postSnapshot.id,
              })) as Post[];

              setEmptyList(snapshot.empty);
              setPosts(postList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);
              setLoading(false);
            }
          })
          .catch(error => {
            console.error('Unable to load posts', error);
            if (isActive) {
              setLoading(false);
            }
          });
      }
      fetchPosts();

      return () => {
        isActive = false;
      };
    }, []),
  );

  // buscar mais posts quando puchar lista para cima
  async function handleRefreshPosts() {
    setLoadingRefresh(true);

    try {
      const snapshot = await getDocs(
        query(collection(db, 'posts'), orderBy('created', 'desc'), limit(5)),
      );
      const postList = snapshot.docs.map(postSnapshot => ({
        ...postSnapshot.data(),
        id: postSnapshot.id,
      })) as Post[];

      setEmptyList(snapshot.empty);
      setPosts(postList);
      setLastItem(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error('Unable to refresh posts', error);
    } finally {
      setLoadingRefresh(false);
    }
  }

  // buscar mais posts ao chegar no final da lista
  async function getListsPosts() {
    if (emptyList) {
      setLoading(false);
      return null;
    }
    if (loading || !lastItem) return;

    getDocs(
      query(
        collection(db, 'posts'),
        orderBy('created', 'desc'),
        limit(5),
        startAfter(lastItem),
      ),
    )
      .then(snapshot => {
        const postList = snapshot.docs.map(postSnapshot => ({
          ...postSnapshot.data(),
          id: postSnapshot.id,
        })) as Post[];

        setEmptyList(snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Unable to load more posts', error);
      });
  }

  return (
    <Container>
      <Header />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={50} color="#111827" />
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => (
            <PostsList data={item} userId={user?.uid ?? ''} />
          )}
          refreshing={loadingRefresh}
          onRefresh={handleRefreshPosts}
          onEndReached={() => getListsPosts()}
          onEndReachedThreshold={0.1}
        />
      )}

      <ButtonSearch
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Search')}
      >
        <Feather name="search" color="#fff" size={20} />
      </ButtonSearch>

      <ButtonPost
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}
      >
        <Feather name="edit-2" color="#fff" size={20} />
      </ButtonPost>
    </Container>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
