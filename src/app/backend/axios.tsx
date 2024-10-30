import axios from 'axios';

const fetchAllCards = async (languageType: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/cards/language/${languageType}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch cards:', error);
        return [];
    }
};

export default fetchAllCards


const toggleLike = async (id: number) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/cards/${id}/toggleLike`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch cards:', error);
        return [];
    }
};

export {toggleLike}