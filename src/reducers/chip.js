
const initialState = { 
  chips: [],
  successMessage: "",
  errorMessage: "",
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "ADD_CHIP_CHIPS":
      return {
        ...state,
        chips: [
            ...state.chips,
            {
                color:'#000000',
                value: 0,
                quantity:0,
            }
        ],
      }

    case "CHANGE_CHIP_INPUTS":
      return{
          ...state,
          chips: state.chips.map(
              (chip, i) => i === action.index 
              ? {
                  ...chip, 
                  [action.inputName]: action.inputName === "color" ? action.newValue : parseInt(action.newValue),
              } 
              : chip
          )
      }

    case "REMOVE_CHIP_CHIP":
      return {
        ...state,
        chips: [
            ...state.chips.slice(0, action.index),
            ...state.chips.slice(action.index + 1)
        ]
      }

    case "GET_CHIPS_SUCCESS":
      return {
        ...state,
        chips: action.chips,
        successMessage: "",
        errorMessage: "",
      }

    case "SAVE_CHIPS_SUCCESS":
      return {
        ...state,
        successMessage: action.successMessage,
        errorMessage: "",
      }

      case "SAVE_CHIPS_FAILED":
        return {
          ...state,
          errorMessage: action.errorMessage,
          successMessage: "",
        }

    default:
      return state;
  }
  
};

export default reducer;
