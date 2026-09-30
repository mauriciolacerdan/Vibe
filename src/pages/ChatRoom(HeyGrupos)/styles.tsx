import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HeaderRoom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 20px;
  padding-horizontal: 10px;
  background-color: #2e54d4;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const HeaderRoomLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  padding-left: 10px;
`;