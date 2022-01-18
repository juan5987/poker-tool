import axios from 'axios';
import { api } from '../config';

const chipsMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case "GET_CHIPS_FROM_API": {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      axios({
        method: 'get',
        url: `${api}/chip/${userId}`,
        headers: { "Authorization": `Bearer ${token}` },
      })
      .then((response) => {
        store.dispatch({type: "GET_CHIPS_SUCCESS", chips: response.data.chips });
      })
      .catch(error => console.log(error));
    }
    break;

    case "SAVE_CHIPS": {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const state = store.getState();

      axios({
        method: 'post',
        url: `${api}/chip/${userId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          chips: state.chip.chips,
        }
      })
      .then((response) => {
        console.log(response);
        store.dispatch({type:"SAVE_CHIPS_SUCCESS", successMessage: response.data.message });
      })
      .catch((error) => {
        console.error(error.response.data.message)
        store.dispatch({type: "SAVE_CHIPS_FAILED", errorMessage: error.response.data.message});
      });
    }
    break;
      
    default:
      next(action);
      break;
  }

};

export default chipsMiddleware;
