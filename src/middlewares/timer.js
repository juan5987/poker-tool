import { structureCreator } from "../utils/structureCreator";

const timerMiddleware = (store) => (next) => (action) => {

    switch (action.type) {

        case "REFRESH_TIME": {

            setInterval(() => {
                let now = new Date();
                let currentTime = {
                    hour: now.getHours() >= 10 ? now.getHours() : "0" + now.getHours(),
                    minute: now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes(),
                }
                store.dispatch({type: "SHOW_TIME", currentTime: currentTime});
            }, 1000);

            break;
        }
        case "RESET_TIMER": {
            const state = store.getState();
            const intervalId = state.timer.intervalId;

            clearInterval(intervalId);
            store.dispatch({type: "RESET_CURRENT_VALUES", intervalId: intervalId});

            break;
        }

        case "GO_TO_PREVIOUS_STAGE": {

            const state = store.getState();
            const intervalId = state.timer.intervalId;

            store.dispatch({type: "CLEAR_INTERVAL", intervalId: intervalId});
            store.dispatch({type: "LOAD_PREVIOUS_STAGE"});

            break;
        }

        case "GO_TO_NEXT_STAGE": {

            const state = store.getState();
            const intervalId = state.timer.intervalId;

            store.dispatch({type: "CLEAR_INTERVAL", intervalId: intervalId});
            store.dispatch({type: "LOAD_NEXT_STAGE"});

            break;
        }

        case "LAUNCH_TIMER": {

            const state = store.getState();

            if (!state.timer.isLaunch) {
                const intervalId = setInterval(() => {
                    store.dispatch({type:"CHANGE_CURRENT_VALUES", intervalId: intervalId});
                }, 1000)
                const intervalIdRebuy = setInterval(() => {
                    store.dispatch({type:"LAUNCH_REBUY_TIMER", intervalId: intervalIdRebuy});
                }, 60000)
            }

            next(action);
            break;
        }

        case "STOP_TIMER": {
            const state = store.getState();
            const intervalId = state.timer.intervalId;
            const intervalIdRebuy = state.timer.intervalIdRebuy;
            
            if (state.timer.isLaunch) {
                clearInterval(intervalId);
                clearInterval(intervalIdRebuy);
            }

            next(action);
            break;
        }

        case "LAUNCH_TOURNAMENT": {
            const state = store.getState();
            const tournaments = state.tournament.tournaments;
            const currentTournament = tournaments.find(tournament => tournament.id === parseInt(action.tournamentId));
            const prizePool = state.tournament.prizePool.filter(el => parseInt(el.tournament_id) === parseInt(currentTournament.id));
            console.log(prizePool);
            const structure = structureCreator(
                currentTournament.small_blind,
                currentTournament.nb_players,
                currentTournament.starting_stack,
            );
            if(currentTournament.rebuy){
                currentTournament.rebuyMinute = parseInt(currentTournament.rebuy.substring(2));
                currentTournament.rebuyHour = parseInt(currentTournament.rebuy.charAt(0));
            } else {
                currentTournament.rebuyMinute = 0;
                currentTournament.rebuyHour = 0;
            }
            
            currentTournament.structure = structure;
            console.log(currentTournament)
            const chips = currentTournament.chips_user ? state.chip.chips : [];

            store.dispatch({type: "LAUNCH_TOURNAMENT_SUCCESS", tournament: currentTournament, chips: chips, prizePool: prizePool});

            break;
        }
        
        default:
            next(action);
            break;
    }
    
};

export default timerMiddleware;