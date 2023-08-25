import axios from 'axios';

export const searchRepositories = async (searchQuery) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/search-repositories?q=${searchQuery}`);
        return response.data.repositories;
    } catch (error) {
        console.error('Error searching repositories:', error);
        throw error;
    }
};