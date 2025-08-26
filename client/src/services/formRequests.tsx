import httpRequester from "./axios.config";
import type { Form } from "../types/types";

export async function fetchGetForms() {
    try {
        const {data} = await httpRequester.get('/forms');


        return data;
    } catch (error) {
        console.error('Error fetching forms:', error);
        return [];
    }
}

export async function fetchGetForm(id: number) {
    try {
        const {data} = await httpRequester.get(`/forms/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching form:', error);
        return null;
    }
}

export async function fetchCreateForm(form: Form) {
    try {
        const {data} = await httpRequester.post('/forms', form);
        return data;
    } catch (error) {
        console.error('Error creating form:', error);
        return null;
    }
}

export async function fetchDeleteForm(id: number) {
    try {
        const {data} = await httpRequester.delete(`/forms/${id}`);

        return data;
    } catch (error) {
        console.error('Error deleting form:', error);
        return null;
    }
}

export async function fetchUpdateForm(form: Form) {
    try {
        const {data} = await httpRequester.put(`/forms/${form.id}`, form);
        return data;
    } catch (error) {
        console.error('Error updating form:', error);
        return null;
    }
}