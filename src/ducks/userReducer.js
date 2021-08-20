import axios from 'axios';

const initialState = {
    firstName: null,
    lastName: null
}

const REQUEST_USER_DATA = 'REQUEST_USER_DATA';

export const requestUserData = () => {
    const data = axios.get('/auth/user-data').then(res => res.data);

    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case `${REQUEST_USER_DATA}_PENDING`: {
            return {
                ...state,
            }
        }
        case `${REQUEST_USER_DATA}_FULFILLED`: {
            return {
                ...state,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                email: action.payload.user.email
            }
        }
        case `${REQUEST_USER_DATA}_REJECTED`: {
            return {
                ...state,
                errorMessages: action.payload
            }
        }
        default: {
            return state;
        }
    }
}