import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ApplicationUserSimplified } from '../../models/application-user.model';
import decodeJWT from '../../utils/decode-jwt';

type User = Omit<ApplicationUserSimplified, 'passwordHash' | 'id'> & {
  displayName: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

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
        state.isAuthenticated = true;
        state.user = {
          userName: decodedToken.userName,
          email: decodedToken.email,
          displayName: decodedToken.userName,
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;
