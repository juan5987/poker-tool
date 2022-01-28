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
              store.dispatch({type: "GET_PRIZE_POOL", tournaments: response.data.tournaments});
          })
          .catch(error => console.log(error));
      break;
    }

    case "GET_PRIZE_POOL": {
      const state = store.getState();
      const token = localStorage.getItem('token');
      const tournamentId = action.tournamentId;
      let tournaments = action.tournaments;
      let modifying = false;

      if(!tournaments){
        tournaments = state.tournament.tournaments.filter(el => parseInt(el.id) === parseInt(tournamentId));
        modifying = true;
      }

      tournaments.forEach(tournament => {
        axios({
          method: 'get',
          url: `${api}/cashprice/${tournament.id}`,
          headers: { "Authorization": `Bearer ${token}` },
      })
        .then((response) => {
          store.dispatch({type: "GET_PRIZE_POOL_SUCCESS", prizePool: response.data.prizePool, modifying: modifying});
        })
        .catch(error => console.log(error));
      });

      break;
    }

    case "SUBMIT_CREATE_TOURNAMENT_FORM": {
      const state = store.getState();
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');
      const prizePool = state.tournament.createTournament.prizePool;

      axios({
        method: 'post',
        url: `${api}/tournament/${userId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          tournament: state.tournament.createTournament,
        },
      })
        .then(response => {
          store.dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_FORM_SUCCESS", tournamentId: response.data.tournament.id, prizePool: response.data.prizePool });
          store.dispatch({type: "GET_TOURNAMENTS_FROM_API"});
          if(prizePool[0]) {
            store.dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_PRIZE_POOL", tournamentId: response.data.tournament.id, prizePool: prizePool });
          }
        })
        .catch((error) => {
          console.error(error.response.data.message);
          store.dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_FORM_FAILED", message: error.response.data.message });
        });

      break;
    }

    case "SUBMIT_CREATE_TOURNAMENT_PRIZE_POOL": {
      const token = localStorage.getItem('token');
      const tournamentId = action.tournamentId;
      const prizePool = action.prizePool;

      prizePool.forEach(element => {
        element.tournament_id = tournamentId;

        axios({
          method: 'post',
          url: `${api}/cashprice/${tournamentId}`,
          headers: { "Authorization": `Bearer ${token}` },
          data: {
            prizePool: element,
          },
        })
          .then(response => {
            //Je récupère un objet par prizePool lié au tournoi
            store.dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_PRIZE_POOL_SUCCESS", prizePool: response.data.prizePool });
          })
          .catch((error) => {
            console.error(error);
            store.dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_PRIZE_POOL_FAILED" });
          });
      });

      break;
    }

    case "DELETE_TOURNAMENT": {
      
      const token = localStorage.getItem('token');
      const tournamentId = action.tournamentId;

      axios({
        method: 'delete',
        url: `${api}/tournament/${tournamentId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          tournamentId: action.tournamentId,
        }
      })
      .then(response => {
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
      const prizePool = state.tournament.prizePool.filter(el => parseInt(el.tournament_id) === parseInt(tournamentId));

      axios({
        method: 'patch',
        url: `${api}/tournament/modify/${tournamentId}`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
          tournament: state.tournament.modifyTournament,
        }
      })
      .then(response => {
        store.dispatch({ type: "SUBMIT_MODIFY_TOURNAMENT_FORM_SUCCESS"});
        store.dispatch({type: "GET_TOURNAMENTS_FROM_API"});
        store.dispatch({ type: "SUBMIT_MODIFY_TOURNAMENT_PRIZE_POOL", tournamentId: response.data.id, prizePool: prizePool });

      })
      .catch((error) => {
        console.error(error);
      });

      break;
    }

    case "SUBMIT_MODIFY_TOURNAMENT_PRIZE_POOL": {
      const token = localStorage.getItem('token');
      const tournamentId = action.tournamentId;
      const prizePool = action.prizePool;

        axios({
          method: 'delete',
          url: `${api}/cashprice/${tournamentId}`,
          headers: { "Authorization": `Bearer ${token}` },
        })
          .then(response => {
            store.dispatch({ type: "SUBMIT_MODIFY_TOURNAMENT_PRIZE_POOL_SUCCESS", prizePool: prizePool, tournamentId: tournamentId });
          })
          .catch((error) => {
            console.error(error);
            store.dispatch({ type: "SUBMIT_MODIFY_TOURNAMENT_PRIZE_POOL_FAILED" });
          });

      break;
    }

    case "SUBMIT_MODIFY_TOURNAMENT_PRIZE_POOL_SUCCESS": {
      const token = localStorage.getItem('token');
      const tournamentId = action.tournamentId;
      const prizePool = action.prizePool;

      prizePool.forEach(element => {
        element.tournament_id = tournamentId;

        axios({
          method: 'post',
          url: `${api}/cashprice/${tournamentId}`,
          headers: { "Authorization": `Bearer ${token}` },
          data: {
            prizePool: element,
          }
        })
          .then(response => {
            // store.dispatch({ type: "ADD_MODIFIED_PRIZE_POOL_IN_STATE", prizePool: response.data.prizePool });
            store.dispatch({type: "GET_TOURNAMENTS_FROM_API"});
          })
          .catch((error) => {
            console.error(error);
            store.dispatch({ type: "ADD_MODIFIED_PRIZE_POOL_IN_STATE_FAILED" });
          });
      });

      break;
    }

    default:
      next(action);
      break;
  }

};

export default tournamentsMiddleware;
