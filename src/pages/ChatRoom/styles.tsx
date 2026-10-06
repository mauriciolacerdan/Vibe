import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8fafc;
`;

export const HeaderRoom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 16px;
  padding-horizontal: 18px;
  background-color: #111827;
  border-bottom-width: 1px;
  border-bottom-color: #e2e8f0;
`;

export const HeaderRoomLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  padding-left: 2px;
`;