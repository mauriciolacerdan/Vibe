import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { Post } from '../../types/models';

export const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

export const ListsPosts = styled(FlatList<Post>)`
  flex: 1;
  background-color: #f8fafc;
`;
