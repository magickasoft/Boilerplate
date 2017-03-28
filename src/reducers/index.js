'use strict';

import { combineReducers } from 'redux'
import apolloClient from  '../config/apolloConfig'
import { autoRehydrated } from './persist'
import { netinfo } from './netinfo'

const rootReducer = combineReducers({
    apollo: apolloClient.reducer(),
    autoRehydrated,
    netinfo,
});

export default rootReducer;
