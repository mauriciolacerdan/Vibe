/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-native-firebase/app', () => ({
  getApp: jest.fn(() => ({ name: 'default' })),
}));
jest.mock('@react-native-firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));
jest.mock('@react-native-firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
}));
jest.mock('@react-native-firebase/storage', () => ({
  getStorage: jest.fn(() => ({})),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  clear: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn(),
}));
jest.mock('@react-native-vector-icons/feather', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@react-native-vector-icons/material-design-icons', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('react-native-animatable', () => ({
  createAnimatableComponent: jest.fn(
    (component: React.ComponentType) => component,
  ),
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<App />);
    await Promise.resolve();
  });
});
