import httpRequester from './axios.config';
import { isAxiosError } from 'axios';

export async function fetchGetMe() {
  try {
    const response = await httpRequester.get('/users/me');

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.log(error);
    throw error;
  }
}

export async function fetchGetRoles() {
  try {
    const response = await httpRequester.get('/users/roles');

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.log(error);
    throw error;
  }
}
