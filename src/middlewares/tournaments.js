import axios from 'axios';
import { api } from '../config';

const tournamentsMiddleware = (store) => (next) => (action) => {


  switch (action.type) {
    case "GET_TOURNAMENTS_FROM_API": {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      axios({
          method: 'get',
          url: `${api}/tournaments/${userId}`,
          headers: { "Authorization": `Bearer ${token}` },
      })
          .then((response) => {
              store.dispatch({ type: "GET_TOURNAMENTS_FROM_API_SUCCESS", tournaments: response.data.tournaments });
          })
          .catch(error => console.log(error));
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

    case "SUBMIT_MODIFY_TOURNAMENT_FORM": {
      const token = localStorage.getItem('token');
      const state = store.getState();
      const tournamentId = state.tournament.modifyTournament.id;

      axios({
        method: 'patch',
        url: `${api}/tournament/modify/${tournamentId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          tournament: state.tournament.modifyTournament,
        }
      })
      .then(response => {
        console.log(response);
        store.dispatch({ type: "SUBMIT_MODIFY_TOURNAMENT_FORM_SUCCESS"});
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
