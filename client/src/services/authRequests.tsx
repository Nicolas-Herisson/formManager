import httpRequester from './axios.config';
import { isAxiosError } from 'axios';
import type { Login, Register } from '../types/types';

export async function fetchLogin(user: Login) {
  try {
    const response = await httpRequester.post('/login', user);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data.error;

    console.error('Error logging in:', error);
    return null;
  }
}

export async function fetchRegister(user: Register) {
  try {
    const { data } = await httpRequester.post('/register', user);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) return error.response?.data.error;

    console.error('Error registering user:', error);

    return null;
  }
}

export async function fetchLogout() {
  try {
    const { data } = await httpRequester.post('/logout');

    return data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data.error;

    console.error('Error logging out:', error);
    return null;
  }
}

export async function fetchForgotPassword(email: string) {
  try {
    const { data } = await httpRequester.post('/forgot-password', { email });

    return data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data.error;

    console.error('Error forgot password:', error);
    return null;
  }
}

export async function fetchResetPassword(id: string, password: string, confirmPassword: string, isInvite: boolean) {
  try {
    const response = await httpRequester.patch(`/${isInvite ? '0' : '1'}/reset-password`, {
      id,
      password,
      confirmPassword
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.log(error);
    throw error;
  }
}
