import { api } from "../../infrastructure/services/api";

interface LoginParams {
    email: string;
    password: string;
}

interface RegisterParams {
    email: string;
    password: string;
    fullName: string;
}

export const authRepository = {
    logn: async ({ email, password }: LoginParams) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data; 
    },
    register: async ({ email, password, fullName}: RegisterParams) => {
        const response = await api.post('/auth/register', {email, password, fullName });
    },
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },
};