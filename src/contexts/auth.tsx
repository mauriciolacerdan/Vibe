import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';
import { doc, getDoc, setDoc } from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../services/firebase';
import type { AuthUser } from '../types/models';

type AuthContextValue = {
  signed: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  storageUser: (data: AuthUser) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const cachedUser = await AsyncStorage.getItem('@devapp');

      if (cachedUser) {
        setUser(JSON.parse(cachedUser) as AuthUser);
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signUp(email: string, password: string, name: string) {
    setLoadingAuth(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const data: AuthUser = {
        uid: credential.user.uid,
        nome: name,
        email: credential.user.email,
      };

      await setDoc(doc(db, 'users', data.uid), {
        nome: name,
        createdAt: new Date(),
      });
      setUser(data);
      await storageUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userProfile = await getDoc(doc(db, 'users', credential.user.uid));
      const data: AuthUser = {
        uid: credential.user.uid,
        nome: userProfile.data()?.nome ?? '',
        email: credential.user.email,
      };

      setUser(data);
      await storageUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  async function storageUser(data: AuthUser) {
    await AsyncStorage.setItem('@devapp', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        signUp,
        signIn,
        signOut,
        loadingAuth,
        loading,
        user,
        setUser,
        storageUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
