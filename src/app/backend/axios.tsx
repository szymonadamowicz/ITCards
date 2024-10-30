import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchAllCards = async (languageType: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/cards/language/${languageType}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch cards:', error);
        return [];
    }
};

const toggleLike = async (id: number) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/cards/${id}/toggleLike`);
        return response.data;
    } catch (error) {
        console.error('Failed to toggle like:', error);
        return [];
    }
};

export { fetchAllCards, toggleLike };
