import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px 12px;
  background-color: #ffffff;
  border-radius: 16px;
  border-width: 1px;
  border-color: #e2e8f0;
  padding: 14px 14px 12px;
  elevation: 2;
  shadow-color: #111827;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
`;

export const Header = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const Name = styled.Text`
  color: #111827;
  font-size: 17px;
  font-weight: 700;
`;

export const Avatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  margin-right: 10px;
  border-width: 1px;
  border-color: #e2e8f0;
`;

export const AvatarPlaceholder = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  margin-right: 10px;
  background-color: #e2e8f0;
  align-items: center;
  justify-content: center;
`;

export const ContentView = styled.View``;

export const Content = styled.Text`
  color: #111827;
  font-size: 15px;
  line-height: 22px;
  margin: 4px 0 10px;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-width: 1px;
  border-top-color: #f1f5f9;
  padding-top: 10px;
`;

export const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Like = styled.Text`
  color: #2563eb;
  margin-right: 6px;
  font-weight: 600;
`;

export const TimePost = styled.Text`
  color: #64748b;
  font-size: 12px;
`;
