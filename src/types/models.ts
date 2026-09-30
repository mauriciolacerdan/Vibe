export type AuthUser = {
  uid: string;
  nome: string;
  email: string | null;
};

export type Post = {
  id: string;
  autor: string;
  avatarUrl: string | null;
  content: string;
  created: {
    seconds: number;
  };
  likes: number;
  userId: string;
};

export type UserSearchResult = {
  id: string;
  nome: string;
};
