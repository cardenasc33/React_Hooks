import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
    SEARCH_USERS,
    SET_MODAL,
    CLEAR_USERS,
    USER_FOUND,
    USER_NOT_FOUND,
    NEW_USER
} from '../types';

export default (state, action) => {
    //evaluate type
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                isShowing: false
            }
        case USER_FOUND:
            return {
                ...state,
                user: action.payload,
                not_found: {},
                isShowing: true
            }
        case USER_NOT_FOUND:
            return {
                ...state,
                not_found: action.payload,
                user: {},
                isShowing: true
            }
        case NEW_USER:
            return {
                ...state,
                not_found: action.payload,
                new_user: undefined,
                isShowing: true
                //users: state.users.concat(action.payload)
            }
        case SET_MODAL:
            return {
                //state is immutable, need to copy with new payload
                ...state,
                isShowing: true
            }
        default:
            return state;
    }
}