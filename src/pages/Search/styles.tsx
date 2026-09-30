import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { UserSearchResult } from '../../types/models';

export const Container = styled(SafeAreaView)`
  padding-top: 14px;
  flex: 1;
  background-color: #353840;
`;

export const AreaInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f1f1f1;
  margin: 10px;
  border-radius: 4px;
  padding: 5px 10px;
`;

export const Input = styled.TextInput`
  width: 90%;
  background-color: #f1f1f1;
  height: 40px;
  padding-left: 8px;
  font-size: 17px;
  color: #121212;
`;

export const List = styled(FlatList<UserSearchResult>)`
  flex: 1;
`;
