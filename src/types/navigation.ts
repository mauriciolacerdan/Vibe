import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  NewPost: undefined;
  PostsUser: {
    title: string;
    userId: string;
  };
};

export type AppTabParamList = {
  HomeTab: NavigatorScreenParams<AppStackParamList>;
  Search: undefined;
  ChatRoom: undefined;
  Profile: undefined;
};
