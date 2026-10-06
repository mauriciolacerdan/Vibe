import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
  padding: 16px;
`;

export const Input = styled.TextInput`
  background-color: #ffffff;
  border-width: 1px;
  border-color: #e2e8f0;
  border-radius: 16px;
  margin-top: 10px;
  padding: 16px;
  color: #111827;
  font-size: 18px;
  min-height: 180px;
  text-align-vertical: top;
`;

export const Button = styled.TouchableOpacity`
  margin-right: 7px;
  padding: 8px 14px;
  background-color: #2e54d4;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 600;
`;
