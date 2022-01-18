import axios from 'axios';
const api = `http://localhost:3001`;

const distributorMiddleware = (store) => (next) => (action) => {

    switch (action.type) {
        case "IMPORT_CHIPS": {
            const userId = localStorage.getItem('id');
            const token = localStorage.getItem('token');

            axios({
                method: 'get',
                url: `${api}/chip/${userId}`,
                headers: { "Authorization": `Bearer ${token}` },
            })
                .then((response) => {
                    store.dispatch({ type: "IMPORT_CHIPS_SUCCESS", chips: response.data.chips });
                })
                .catch(error => console.log(error));
        }
            break;

        default:
            next(action);
            break;
    }

};

export default distributorMiddleware;
