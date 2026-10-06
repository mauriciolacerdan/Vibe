import { FlatList } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { UserSearchResult } from '../../types/models';

export const Container = styled.View`
  //padding-top: 15px;
  flex: 1;
  background-color: #f8fafc;
`;

export const AreaInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  margin: 12px;
  border-radius: 14px;
  border-width: 1px;
  border-color: #e2e8f0;
  padding: 8px 12px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: transparent;
  height: 40px;
  padding-left: 10px;
  font-size: 16px;
  color: #111827;
`;

export const List = styled(FlatList<UserSearchResult>)`
  flex: 1;
`;
