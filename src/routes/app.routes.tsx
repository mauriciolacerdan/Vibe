import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from '@react-native-vector-icons/feather';

import Home from '../pages/Home/index';
import Profile from '../pages/Profile/index';
import Search from '../pages/Search/index';
import NewPost from '../pages/NewPost/index';
import PostsUser from '../pages/PostsUser/index';
import ChatRoom from '../pages/ChatRoom';
import type { AppStackParamList, AppTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createNativeStackNavigator<AppStackParamList>();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Pesquise',
          headerTintColor: '#ffffff',
          headerStyle: { backgroundColor: '#111827' },
        }}
      />

      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          title: 'Novo post',
          headerTintColor: '#ffffff',
          headerStyle: { backgroundColor: '#111827' },
        }}
      />

      <Stack.Screen
        name="PostsUser"
        component={PostsUser}
        options={{
          headerTintColor: '#ffffff',
          headerStyle: { backgroundColor: '#111827' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopWidth: 1,
          borderTopColor: '#1f2937',
        },
      }}
      initialRouteName="HomeTab"
    >
      <Tab.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />;
          },
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" color={color} size={size} />;
          },
        }}
      />*/}
      <Tab.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="message-circle" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
