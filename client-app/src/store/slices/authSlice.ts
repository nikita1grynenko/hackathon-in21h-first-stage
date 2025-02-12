import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ApplicationUserSimplified } from '../../models/application-user.model';
import decodeJWT from '../../utils/decode-jwt';
import { faker } from '@faker-js/faker';

type User = Omit<ApplicationUserSimplified, 'passwordHash' | 'id'> & {
  displayName: string;
  avatar: string;
  avatarUrl: string | null;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};
console.log(localStorage.getItem('user') || 'null');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
    },
    loadUserFromToken: (state) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        const decodedToken = decodeJWT(token);

        const displayName = decodedToken.email.split('@')[0];

        state.isAuthenticated = true;
        state.user = {
          userName: displayName, //  displayName замість ID
          email: decodedToken.email,
          displayName: displayName,
          avatar: localStorage.getItem('avatar') || faker.image.avatar(),
          avatarUrl: null,
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('avatar', action.payload);
      }
    },
  },
});

export const { login, logout, loadUserFromToken, setAvatar } =
  authSlice.actions;
export default authSlice.reducer;
