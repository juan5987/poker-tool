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
  structure: {

  },
  errorMessage: "",
  redirectToTournamentPage: false,
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
        redirect: true,
      }

    case "SUBMIT_CREATE_TOURNAMENT_FORM_FAILED":
      return {
        ...state,
        errorMessage: action.message,
      }

    default:
      return state;
  }
};

export default reducer;
