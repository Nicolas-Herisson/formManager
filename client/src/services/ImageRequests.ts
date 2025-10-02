import httpRequester from './axios.config';
import { isAxiosError } from 'axios';

export async function fetchUploadImage(uploadData: IUploadData) {
  try {
    console.log(uploadData);
    const response = await httpRequester.post('/upload-image', uploadData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.error('Error uploading images:', error);
  }
}

interface IUploadData {
  formTitle: string;
  questionTitle: string;
  image: File;
}

export async function fetchDeleteImage(deleteData: IDeleteData) {
  try {
    console.log(deleteData);
    const response = await httpRequester.post('/delete-image', deleteData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.error;
    }
    console.error('Error deleting images:', error);
  }
}

interface IDeleteData {
  formTitle: string;
  questionTitle: string;
}
