import api from './api';

export const fetchUsers = async () => {
    try {
        const response = await api.get('/users'); 
        return response.data;
    } catch (error) {
        console.warn("Could not fetch users", error);
        return [];
    }
};
