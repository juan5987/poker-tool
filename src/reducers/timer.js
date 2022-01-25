const now = new Date();

const initialState = {
    isQuitTimerModalOpen: false,
    currentTime: {
        hour: now.getHours(),
        minute: now.getMinutes(),
    },
    isLaunch: false,
    isAudioPlaying: false,
    intervalId: null,
    intervalIdRebuy: null,
    secondesLeft: 300,
    currentTournament: {
        name: 'Pas de nom de tournoi',
        date: "03/07/2022",
        startingStack: 10000,
        nbPlayer: 30,
        rebuyHour: 1,
        rebuyMinute: 30,
        buyIn: 4,
        minute: 5,
        seconde: 0,
        stage: 1,
        smallBlind: 10,
        bigBlind: 20,
    },
    currentValues: {
        minute: 5,
        seconde: 0,
        stage: 1,
        previousSB: 0,
        previousBB: 0,
        smallBlind: 10,
        bigBlind: 20,
        nextSB: 20,
        nextBB: 40,
        rebuyHour: 1,
        rebuyMinute: 30,
    },
    currentStructure: [
        { stage: 1, small_blind: 10, big_blind: 20 },
        { stage: 2, small_blind: 20, big_blind: 40 },
        { stage: 3, small_blind: 30, big_blind: 60 },
        { stage: 4, small_blind: 40, big_blind: 80 },
        { stage: 5, small_blind: 50, big_blind: 100 },
        { stage: 6, small_blind: 60, big_blind: 120 },
        { stage: 7, small_blind: 70, big_blind: 140 },
        { stage: 8, small_blind: 80, big_blind: 160 },
        { stage: 9, small_blind: 90, big_blind: 180 },
        { stage: 10, small_blind: 10000, big_blind: 20000 },
    ],
    currentChips: [
        { quantity: 50, color: '#dddddd', value: 10 },
        { quantity: 50, color: '#00b0ff', value: 20 },
        { quantity: 50, color: '#789f30', value: 100 },
        { quantity: 50, color: '#cec56c', value: 500 },
        { quantity: 50, color: '#78c56c', value: 1000 },
    ],
    prizePool: [
        { position: 1, amount: 50 },
        { position: 2, amount: 30 },
        { position: 3, amount: 20 },
        { position: 4, amount: 10 },
        { position: 5, amount: 10 },
    ]
}



const timer = (state = initialState, action = {}) => {

    switch (action.type) {
        case "SHOW_QUIT_TIMER_MODAL":
            return {
                ...state,
                isQuitTimerModalOpen: true,
            }

        case "CLOSE_QUIT_TIMER_MODAL":
            return {
                ...state,
                isQuitTimerModalOpen: false,
            }

        case "HIDE_MODAL":
            return {
                ...state,
                openDetailsModal: false,
                openDeleteModal: false,
                showCreateTournamentModal: false,
                openUpdateModal: false,
                isQuitTimerModalOpen: false,
            }

        case "SHOW_TIME": {
            return {
                ...state,
                currentTime: action.currentTime,
            }
        }
        case "LAUNCH_TIMER":
            return {
                ...state,
                isLaunch: true,
            }

        case "STOP_TIMER":
            return {
                ...state,
                isLaunch: false,
            }

        case "CHANGE_CURRENT_VALUES":
            return {
                ...state,
                intervalId: action.intervalId,
                isAudioPlaying:
                    state.currentValues.minute === 0 && state.currentValues.seconde === 0
                        ?
                        true
                        :
                        false,
                secondesLeft: state.currentValues.minute * 60 + state.currentValues.seconde,
                currentValues: {
                    ...state.currentValues,
                    //gestion des secondes
                    seconde:
                        state.currentValues.seconde > 0
                            ?
                            state.currentValues.seconde - 1
                            :
                            state.currentValues.minute === 0
                                ?
                                0
                                :
                                59,

                    //gestion des minutes
                    minute:
                        state.currentValues.seconde === 0
                            ?
                            state.currentValues.minute === 0 && state.currentValues.stage !== state.currentStructure[state.currentStructure.length - 1].stage
                                ?
                                state.currentTournament.minute
                                :
                                state.currentValues.stage === state.currentStructure[state.currentStructure.length - 1].stage && state.currentValues.minute === 0
                                    ?
                                    0
                                    :
                                    state.currentValues.minute - 1
                            :
                            state.currentValues.minute,

                    //gestion de l'étape
                    stage:
                        state.currentValues.minute === 0 && state.currentValues.seconde === 0 && state.currentStructure[state.currentValues.stage]
                            ?
                            state.currentValues.stage += 1
                            :
                            state.currentValues.stage,

                    //gestion des blinds
                    previousSB:
                        state.currentStructure[state.currentValues.stage - 2]
                            ?
                            state.currentStructure[state.currentValues.stage - 2].small_blind
                            :
                            0,

                    previousBB: state.currentStructure[state.currentValues.stage - 2]
                        ?
                        state.currentStructure[state.currentValues.stage - 2].big_blind
                        :
                        0,
                    smallBlind:
                        state.currentStructure[state.currentValues.stage - 1].small_blind,

                    bigBlind:
                        state.currentStructure[state.currentValues.stage - 1].big_blind,
                    nextSB:
                        state.currentStructure[state.currentValues.stage]
                            ?
                            state.currentStructure[state.currentValues.stage].small_blind
                            :
                            0,
                    nextBB: state.currentStructure[state.currentValues.stage]
                        ?
                        state.currentStructure[state.currentValues.stage].big_blind
                        :
                        0,

                }
            }

        case "RESET_CURRENT_VALUES":
            return {
                ...state,
                isLaunch: false,
                secondesLeft: state.currentTournament.minute * 60,
                currentValues: state.currentTournament,
                rangeValue: 0,
            }

        case "LOAD_PREVIOUS_STAGE":
            return {
                ...state,
                isLaunch: false,
                currentValues: {
                    ...state.currentValues,
                    minute: state.currentTournament.minute,
                    seconde: state.currentTournament.seconde,
                    stage: state.currentValues.stage > 1
                        ?
                        state.currentValues.stage - 1
                        :
                        state.currentValues.stage,
                    previousSB:
                        state.currentValues.stage > 2
                            ?
                            state.currentStructure[state.currentValues.stage - 3].small_blind
                            :
                            0,

                    previousBB: state.currentValues.stage > 2
                        ?
                        state.currentStructure[state.currentValues.stage - 3].big_blind
                        :
                        0,
                    smallBlind: state.currentValues.stage > 1
                        ?
                        state.currentStructure[state.currentValues.stage - 2].small_blind
                        :
                        state.currentValues.smallBlind,
                    bigBlind: state.currentValues.stage > 1
                        ?
                        state.currentStructure[state.currentValues.stage - 2].big_blind
                        :
                        state.currentValues.bigBlind,
                    nextSB: state.currentValues.stage > 1
                        ?
                        state.currentStructure[state.currentValues.stage - 1].small_blind
                        :
                        state.currentValues.nextSB,
                    nextBB: state.currentValues.stage > 1
                        ?
                        state.currentStructure[state.currentValues.stage - 1].big_blind
                        :
                        state.currentValues.nextBB,
                }
            }

        case "LOAD_NEXT_STAGE":
            return {
                ...state,
                isLaunch: false,
                currentValues: {
                    ...state.currentValues,
                    minute: state.currentTournament.minute,
                    seconde: state.currentTournament.seconde,
                    stage: state.currentValues.stage < state.currentStructure[state.currentStructure.length - 1].stage
                        ?
                        state.currentValues.stage + 1
                        :
                        state.currentValues.stage,
                    previousSB:
                        state.currentStructure[state.currentValues.stage]
                            ?
                            state.currentStructure[state.currentValues.stage - 1].small_blind
                            :
                            state.currentStructure[state.currentValues.stage - 2].small_blind,

                    previousBB:
                        state.currentStructure[state.currentValues.stage]
                            ?
                            state.currentStructure[state.currentValues.stage - 1].big_blind
                            :
                            state.currentStructure[state.currentValues.stage - 2].big_blind,
                    smallBlind: state.currentValues.stage < state.currentStructure[state.currentStructure.length - 1].stage
                        ?
                        state.currentStructure[state.currentValues.stage].small_blind
                        :
                        state.currentValues.smallBlind,
                    bigBlind: state.currentValues.stage < state.currentStructure[state.currentStructure.length - 1].stage
                        ?
                        state.currentStructure[state.currentValues.stage].big_blind
                        :
                        state.currentValues.bigBlind,
                    nextSB:
                        state.currentStructure[state.currentValues.stage + 1]
                            ?
                            state.currentStructure[state.currentValues.stage + 1].small_blind
                            :
                            0,

                    nextBB: state.currentStructure[state.currentValues.stage + 1]
                        ?
                        state.currentStructure[state.currentValues.stage + 1].big_blind
                        :
                        0,
                }
            }

        case "SKIP_BACK":
            return {
                ...state,
                currentValues: {
                    ...state.currentValues,
                    minute: state.currentValues.seconde >= 30 && state.currentValues.minute < state.currentTournament.minute
                        ?
                        state.currentValues.minute + 1
                        :
                        state.currentValues.minute,

                    seconde: state.currentValues.seconde < 30 && state.currentValues.minute < state.currentTournament.minute
                        ?
                        30
                        :
                        state.currentValues.seconde === 0 && state.currentValues.minute < state.currentTournament.minute
                            ?
                            30
                            :
                            0
                }
            }

        case "SKIP_FORWARD":
            return {
                ...state,
                currentValues: {
                    ...state.currentValues,
                    minute: state.currentValues.seconde === 0 && state.currentValues.minute > 0
                        ?
                        state.currentValues.minute - 1
                        :
                        state.currentValues.minute,

                    seconde: state.currentValues.seconde > 30
                        ?
                        30
                        :
                        state.currentValues.seconde === 0 && state.currentValues.minute > 0
                            ?
                            30
                            :
                            0
                }
            }

        case "LAUNCH_TOURNAMENT_SUCCESS":
            console.log(action.tournament);
            return {
                ...state,
                secondesLeft: action.tournament[0].speed * 60,
                currentTournament: {
                    name: action.tournament[0].name,
                    minute: action.tournament[0].speed,
                    seconde: 0,
                    stage: 1,
                    smallBlind: action.tournament[0].small_blind,
                    bigBlind: action.tournament[0].small_blind * 2,
                },
                currentValues: {
                    minute: action.tournament[0].speed,
                    seconde: 0,
                    stage: 1,
                    previousSB: 0,
                    previousBB: 0,
                    smallBlind: action.tournament[0].small_blind,
                    bigBlind: action.tournament[0].small_blind * 2,
                    nextSB: action.tournament[0].Structures[state.currentValues.stage].small_blind,
                    nextBB: action.tournament[0].Structures[state.currentValues.stage].big_blind,
                },
                currentStructure: action.tournament[0].Structures,
                currentChips: action.tournament[0].user.chips,
                cashPrice: action.tournament[0].cashprices,
            }

        case "LAUNCH_REBUY_TIMER":
            return {
                ...state,
                currentValues: {
                    ...state.currentValues,
                    rebuyHour: 
                    state.currentValues.rebuyHour > 0 && state.currentValues.rebuyMinute === 0
                    ?
                    state.currentValues.rebuyHour - 1
                    :
                    state.currentValues.rebuyHour,

                    rebuyMinute: 
                    state.currentValues.rebuyMinute > 0 & state.currentValues.rebuyHour >= 0
                    ?
                    state.currentValues.rebuyMinute - 1
                    :
                        state.currentValues.rebuyMinute === 0 & state.currentValues.rebuyHour > 0
                        ?
                        59
                        :
                        0
                },
                intervalIdRebuy: action.intervalId,
            }

        default:
            return state;
    }
}

export default timer;