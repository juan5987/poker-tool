const tournamentsMiddleware = (store) => (next) => (action) => {


    switch (action.type) {

      default:
        next(action);
        break;
    }
    
};

export default tournamentsMiddleware;
