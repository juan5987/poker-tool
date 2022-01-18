import { combineReducers } from 'redux';

import userReducer from './user';
import tournamentReducer from './tournament';
import chipReducer from './chip';
import distributorReducer from './distributor'
import timerReducer from './timer';

const rootReducer = combineReducers({
  user: userReducer,
  tournament: tournamentReducer,
  chip: chipReducer,
  distributor: distributorReducer,
  timer: timerReducer,
});

export default rootReducer;