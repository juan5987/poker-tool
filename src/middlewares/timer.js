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
        
        default:
            next(action);
            break;
    }
    
};

export default timerMiddleware;