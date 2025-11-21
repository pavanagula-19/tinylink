export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}
