import React from 'react';
import { Container, Name } from './styles';

import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { UserSearchResult } from '../../types/models';
import type { AppTabParamList } from '../../types/navigation';

export default function SearchList({ data }: { data: UserSearchResult }) {
  const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();

  return (
    <Container
      onPress={() =>
        navigation.navigate('HomeTab', {
          screen: 'PostsUser',
          params: { title: data.nome, userId: data.id },
        })
      }
    >
      <Name>{data.nome}</Name>
    </Container>
  );
}
