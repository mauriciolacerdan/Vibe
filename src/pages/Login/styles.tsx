import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const Brand = styled.Text`
  color: #111827;
  font-size: 54px;
  font-weight: 800;
  letter-spacing: -1.5px;
`;

export const Subtitle = styled.Text`
  color: #64748b;
  font-size: 16px;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 28px;
`;

export const Form = styled.View`
  width: 100%;
  max-width: 360px;
`;

export const Input = styled.TextInput`
  width: 100%;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #e2e8f0;
  margin-top: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 16px;
  color: #111827;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: #2e54d4;
  border-radius: 12px;
  margin-top: 20px;
  padding: 14px 16px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

export const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 18px;
  justify-content: center;
  align-items: center;
`;

export const SignUpText = styled.Text`
  color: #64748b;
  font-size: 15px;
  font-weight: 600;
`;
