import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
} from '@react-native-firebase/firestore';
import SearchList from '../../components/SearchList';
import { Container, AreaInput, Input, List } from './styles';
import Feather from '@react-native-vector-icons/feather';
import { db } from '../../services/firebase';
import type { UserSearchResult } from '../../types/models';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState<UserSearchResult[]>([]);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setUsers([]);
      return;
    }
    return onSnapshot(
      query(
        collection(db, 'users'),
        where('nome', '>=', input),
        where('nome', '<=', input + '\uf8ff'),
      ),
      snapshot => {
        setUsers(
          snapshot.docs.map(userSnapshot => ({
            ...userSnapshot.data(),
            id: userSnapshot.id,
          })) as UserSearchResult[],
        );
      },
      error => console.error('Unable to search users', error),
    );
  }, [input]);

  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#111827" />
        <Input
          placeholder="Procurando alguem?"
          value={input}
          onChangeText={text => setInput(text)}
          placeholderTextColor="#353840"
        />
      </AreaInput>

      <List
        data={users}
        renderItem={({ item }) => <SearchList data={item} />}
      />
    </Container>
  );
}
