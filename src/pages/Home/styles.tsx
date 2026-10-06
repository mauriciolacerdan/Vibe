import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { Post } from '../../types/models';

export const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

export const ButtonSearch = styled.TouchableOpacity`
  position: absolute;
  bottom: 115px;
  right: 6%;
  width: 55px;
  height: 55px;
  background-color: #2e54d4;
  border-radius: 31px;
  justify-content: center;
  align-items: center;
  z-index: 99;
  elevation: 6;
`;

export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 6%;
  width: 55px;
  height: 55px;
  background-color: #2e54d4;
  border-radius: 31px;
  justify-content: center;
  align-items: center;
  z-index: 99;
  elevation: 6;
`;

export const ListPosts = styled(FlatList<Post>)`
  flex: 1;
  background-color: #f8fafc;
`;
