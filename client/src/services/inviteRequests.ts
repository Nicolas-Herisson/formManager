import httpRequester from './axios.config';
import { isAxiosError } from 'axios';

export async function fetchInviteUser(email: string, name: string, role_id: number) {
  try {
    const response = await httpRequester.post('/invites', { email, name, role_id });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.log(error);
    throw error;
  }
}

export async function fetchGetInvites() {
  try {
    const response = await httpRequester.get('/invites');

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.log(error);
    throw error;
  }
}

export async function fetchDeleteInvite(invite_id: number) {
  try {
    const response = await httpRequester.delete(`/invites/${invite_id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.log(error);
    throw error;
  }
}
