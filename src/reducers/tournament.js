const initialState = {
  tournaments: [],
  prizePool: [],
  createTournament: {
    name: "",
    date: "",
    location: "",
    nbPlayer: 2,
    speed: 1,
    startingStack: 1,
    buyIn: 1,
    small_blind: 1,
    rebuy: "",
    chips_user: false,
    comment: "",
    prizePool: [],
  },
  modifyTournament: {
    name: "",
    date: "",
    location: "",
    nbPlayer: 2,
    speed: 1,
    startingStack: 1,
    buyIn: 1,
    small_blind: 1,
    rebuy: "",
    chips_user: false,
    comment: "",
    prizePool: [],
  },
  structure: {

  },
  errorMessage: "",
  redirectToTournamentsPage: false,
  openPrizePoolModal: false,
}


const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "GET_TOURNAMENTS_FROM_API_SUCCESS":
      return {
        ...state,
        tournaments: action.tournaments,
      }

    case "GET_PRIZE_POOL_SUCCESS":
      console.log("state.prizePool", state.prizePool);
      console.log("action.prizePool.filter(e => !state.prizePool.some(f => f.id === e.id))", action.prizePool.filter(e => !state.prizePool.some(f => f.id === e.id)))
      return {
        ...state,
        prizePool: action.prizePool,
      }

    case "SHOW_CREATE_TOURNAMENT_MODAL":
      return {
        ...state,
        showCreateTournamentModal: true,
      }
    case "CREATE_TOURNAMENT":
      return {
        ...state,
        createTournament: action.tournament,
      }
    case "CHANGE_CREATE_TOURNAMENT_INPUTS":
      return {
        ...state,
        createTournament: {
          ...state.createTournament,
          [action.inputName]: action.newValue,
        }
      }
    case "CLOSE_MODALS":
      return {
        ...state,
        showCreateTournamentModal: false,
        openPrizePoolModal: false,
      }

    case "SUBMIT_CREATE_TOURNAMENT_FORM_SUCCESS":
      return {
        ...state,
        createTournament: {
          name: "",
          date: "",
          location: "",
          nbPlayer: 2,
          speed: 1,
          startingStack: 1,
          buyIn: 1,
          small_blind: 1,
          chips_user: false,
          comment: "",
          prizePool: [],
        },
        errorMessage: "",
        redirectToTournamentsPage: true,
      }

    case "SUBMIT_CREATE_TOURNAMENT_FORM_FAILED":
      return {
        ...state,
        errorMessage: action.message,
      }

    case "SUBMIT_CREATE_TOURNAMENT_PRIZE_POOL_SUCCESS":
      return {
        ...state,
        createTournament: {
          ...state.createTournament,
          prizePool: [
            ...state.createTournament.prizePool,
            action.prizePool,
          ]
        }
      }

    case "CANCEL_REDIRECT":
      return {
        ...state,
        redirectToTournamentsPage: false,
      }

    case "CHANGE_MODIFY_TOURNAMENT_INPUTS":
      return {
        ...state,
        modifyTournament: {
          ...state.modifyTournament,
          [action.inputName]: action.newValue,
        }
      }

    case "ADD_MODIFY_TOURNAMENT":
      return {
        ...state,
        modifyTournament: {
          id: action.tournament.id,
          name: action.tournament.name,
          date: action.tournament.date,
          location: action.tournament.location,
          nbPlayer: action.tournament.nb_players,
          speed: action.tournament.speed,
          startingStack: action.tournament.starting_stack,
          buyIn: action.tournament.buy_in,
          rebuy: action.tournament.rebuy,
          small_blind: action.tournament.small_blind,
          chips_user: action.tournament.chips_user,
          comment: action.tournament.comments,
        }
      }

    case "SUBMIT_MODIFY_TOURNAMENT_FORM_SUCCESS":
      return {
        ...state,
        redirectToTournamentsPage: true,
      }

    case "OPEN_PRIZE_POOL_MODAL":
      return {
        ...state,
        openPrizePoolModal: true,
      }

    case "PRIZE_POOL_INPUT_CHANGE":
      return {
        ...state,
        createTournament: {
          ...state.createTournament,
          prizePool: state.createTournament.prizePool.map(
            (price, i) => i === action.index
              ? {
                ...price,
                [action.inputName]: parseInt(action.newValue),
              }
              : price
          ),
        }
      }

    case "PRIZE_POOL_INPUT_CHANGE_MODIFY":
      return {
        ...state,
        prizePool: state.prizePool.filter(el => parseInt(el.tournament_id) === parseInt(action.tournamentId)).map(
          (price, i) => i === action.index
            ? {
              ...price,
              [action.inputName]: parseInt(action.newValue),
            }
            : price
        ),
      }

    case "ADD_PRIZE_POOL_MODAL":
      return {
        ...state,
        createTournament: {
          ...state.createTournament,
          prizePool: [
            ...state.createTournament.prizePool,
            { position: state.createTournament.prizePool.length + 1, amount: 0, tournament_id: null },
          ]
        }
      }

    case "ADD_PRIZE_POOL_MODAL_IN_MODIFY":
      return {
        ...state,
        prizePool: [
          ...state.prizePool,
          { position: state.prizePool.length + 1, amount: 0, tournament_id: action.tournamentId },
        ]
      }

    case "DELETE_PRIZE_POOL_INPUT":
      return {
        ...state,
        createTournament: {
          ...state.createTournament,
          prizePool: state.createTournament.prizePool.filter((price, i) => i !== action.index),
        }
      }

    case "DELETE_PRIZE_POOL_INPUT_MODIFY":
      return {
        ...state,
        prizePool: state.prizePool.filter((price, i) => i !== action.index),
      }

    case "RESET_PRIZE_POOL_INPUTS":
      return {
        ...state,
        createTournament: {
          ...state.createTournament,
          prizePool: [],
        }
      }
    
    case "ADD_MODIFIED_PRIZE_POOL_IN_STATE":
      console.log(state.prizePool.filter(el => el.id !== action.prizePool.id))
      console.log(action.prizePool)
      return {
        ...state,
        prizePool: [
          ...state.prizePool.filter(el => el.id !== action.prizePool.id),
          action.prizePool,
        ]
      }

    default:
      return state;
  }
};

export default reducer;
