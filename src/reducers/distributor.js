import {calculator} from 'utils/calculator';

const initialState = {
    chips: [],
    startingStack: 0,
    nbPlayer: 0,
    isResult: false,
    result: [],
}

const reducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case "CHANGE_DISTRIBUTOR_INPUTS":
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
        case "ADD_CHIP":
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
        case "REMOVE_CHIP":
            return {
                ...state,
                chips: [
                    ...state.chips.slice(0, action.index),
                    ...state.chips.slice(action.index + 1)
                ]

            }

        case "CHANGE_TOURNAMENT_INFOS":
            return {
                ...state,
                [action.inputName]: parseInt(action.newValue),
            }

        case "CALCULATE_DISTRIBUTION":
            return {
                ...state,
                isResult: true,
                result: calculator(state.chips, state.nbPlayer, state.startingStack)
            }

        case "RESET_DISTRIBUTOR":
            return {
                ...state,
                isResult: false,
            }

        case "IMPORT_CHIPS_SUCCESS":
            return {
                ...state,
                chips: action.chips,
            }
        
        default:
        return state;
    }
}

export default reducer;