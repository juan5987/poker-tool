import axios from 'axios';
import { api } from '../config';

const tournamentsMiddleware = (store) => (next) => (action) => {


  switch (action.type) {
    case "GET_TOURNAMENTS_FROM_API": {

      const state = store.getState();
      const token = localStorage.getItem('token');

      axios({
        method: 'post',
        url: `${api}/login`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          email: state.user.connection.email,
          password: state.user.connection.password,
        },
      })
        .then(response => {
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('token', response.data.token);
          store.dispatch({type: "GET_TOURNAMENTS_FROM_API_SUCCESS"});
        })
        .catch((error) => {
          console.log(error.response);
          store.dispatch({ type: "LOG_IN_FAILED", message: error.response.data.message });
        });

      break;
    }

    case "SUBMIT_CREATE_TOURNAMENT_FORM": {
      const state = store.getState();
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');

      axios({
        method: 'post',
        url: `${api}/tournament/${userId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          name: state.tournament.createTournament.name,
          date: state.tournament.createTournament.date,
          location: state.tournament.createTournament.location,
          nbPlayer: parseInt(state.tournament.createTournament.nbPlayer),
          speed: parseInt(state.tournament.createTournament.speed),
          startingStack: parseInt(state.tournament.createTournament.startingStack),
          buyIn: parseInt(state.tournament.createTournament.buyIn),
          small_blind: parseInt(state.tournament.createTournament.small_blind),
          chips_user: state.tournament.createTournament.chips_user,
          comment: state.tournament.createTournament.comment,
        },
      })
        .then(response => {
          store.dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_FORM_SUCCESS", tournament: response.data });
        })
        .catch((error) => {
          console.error(error.response.data.message);
          store.dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_FORM_FAILED", message: error.response.data.message });
        });
      break;
    }

    case "DELETE_TOURNAMENT": {
      
      const token = localStorage.getItem('token');
      const tournamentId = action.tournamentId;
      console.log(tournamentId);

      axios({
        method: 'delete',
        url: `${api}/tournament/${tournamentId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          tournamentId: action.tournamentId,
        }
      })
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });

      break;
    }
    default:
      next(action);
      break;
  }

};

export default tournamentsMiddleware;
