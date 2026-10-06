import styled from 'styled-components/native';
import Feather from '@react-native-vector-icons/feather';

export const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
  padding: 24px 20px;
`;

export const ProfileHeader = styled.View`
  align-items: center;
  padding-top: 25px;
  padding-bottom: 32px;
`;

export const AvatarButton = styled.TouchableOpacity`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  position: relative;
`;

export const Avatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  background-color: #e2e8f0;
`;

export const AvatarEdit = styled.View`
  position: absolute;
  right: 1px;
  bottom: 1px;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #2563eb;
  border-width: 3px;
  border-color: #f8fafc;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.Text`
  margin-top: 18px;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;

export const Email = styled.Text`
  margin-top: 6px;
  font-size: 15px;
  color: #64748b;
`;

export const Options = styled.View`
  width: 100%;
`;

export const OptionButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: #e2e8f0;
`;

export const OptionContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 17px 16px;
`;

export const OptionLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: #eff6ff;
  justify-content: center;
  align-items: center;
`;

export const OptionText = styled.Text`
  margin-left: 14px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const DangerText = styled(OptionText)`
  color: #dc2626;
`;

export const Chevron = styled(Feather)``;

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(15, 23, 42, 0.35);
`;

export const ModalContainer = styled.KeyboardAvoidingView`
  width: 100%;
  background-color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 22px 20px 32px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 44px;
  margin-bottom: 20px;
`;

export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 54px;
  background-color: #f8fafc;
  border-width: 1px;
  border-color: #e2e8f0;
  border-radius: 14px;
  padding: 0 16px;
  font-size: 16px;
  color: #111827;
`;

export const SaveButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  margin-top: 14px;
  background-color: #2563eb;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;

export const SaveButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;
