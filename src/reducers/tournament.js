const initialState = {
  tournaments: [],
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
    chips_user: false,
    comment: "",
  },
  structure: {

  },
  errorMessage: "",
  redirectToTournamentsPage: false,
}


const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "GET_TOURNAMENTS_FROM_API_SUCCESS":
      return {
        ...state,
        tournaments: action.tournaments,
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
        },
        errorMessage: "",
        redirectToTournamentsPage: true,
      }

    case "SUBMIT_CREATE_TOURNAMENT_FORM_FAILED":
      return {
        ...state,
        errorMessage: action.message,
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

    default:
      return state;
  }
};

export default reducer;
