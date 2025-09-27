import httpRequester from './axios.config';
import type { createResponse, updateResponse } from '../types/types';
import { isAxiosError } from 'axios';

export async function fetchGetResponses(id: number) {
  try {
    const response = await httpRequester.get(`/${id}/responses`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    console.error('Error fetching responses:', error);
    throw error;
  }
}

export async function fetchGetResponse(form_id: number, response_id: number) {
  try {
    const response = await httpRequester.get(`/${form_id}/responses/${response_id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    console.error('Error fetching response:', error);
    throw error;
  }
}

export async function fetchCreateResponse(responseData: createResponse) {
  try {
    const response = await httpRequester.post(`/${responseData.form_id}/responses`, responseData);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    console.error('Error creating response:', error);
    throw error;
  }
}

export async function fetchDeleteResponse(id: number) {
  try {
    await httpRequester.delete(`/responses/${id}`);
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    console.error('Error deleting response:', error);
    throw error;
  }
}

export async function fetchUpdateResponse(id: number, responseData: updateResponse) {
  try {
    const response = await httpRequester.put(`/${id}/responses`, responseData);
    console.log('response', response);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    console.error('Error updating response:', error);
    throw error;
  }
}
