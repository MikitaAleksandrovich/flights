import axios from 'axios';

const ticketsUrl = 'https://front-test.beta.aviasales.ru/tickets';
const searchUrl = 'https://front-test.beta.aviasales.ru/search';

// fetch tickets data
export const fetchData = async () => {

    const { data } = await axios.get(searchUrl);

    try {
        const { data: { tickets } } = await axios.get(`${ticketsUrl}?searchId=${data.searchId}`);
        return {
            tickets: tickets.splice(0, 5),
        }
    } catch (error) {
        console.log(error);
    }
};
