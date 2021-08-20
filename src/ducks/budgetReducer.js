import axios from 'axios';

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REMOVE_PURCHASE';


export const requestBudgetData = () => {
    const data = axios.get('/api/budget-data').then(res => res.data);
    
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

export const addPurchase = (price, description, category) => {
    const data = axios.post('/api/budget-data/purchase', {price, description, category}).then(res => res.data);
    console.log(data);

    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export const removePurchase = (id) => {
    const data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data);

    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case `${REQUEST_BUDGET_DATA}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${REQUEST_BUDGET_DATA}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                purchases: action.payload.purchases,
                budgetLimit: action.payload.budgetLimit
            }
        }
        case `${REQUEST_BUDGET_DATA}_REJECTED`: {
            return {
                ...state,
                loading: false,
                errorMessages: action.payload
            }
        }
        case `${ADD_PURCHASE}_PENDING`: {
            return {
                ...state,
                loading: true,
            }
        }
        case `${ADD_PURCHASE}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                purchases: action.payload
            }
        }
        case `${ADD_PURCHASE}_REJECTED`: {
            return {
                ...state,
                loading: false,
                errorMessages: action.payload
            }
        }
        case `${REMOVE_PURCHASE}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${REMOVE_PURCHASE}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                purchases: action.payload
            }
        }
        case `${REMOVE_PURCHASE}_REJECTED`: {
            return {
                ...state,
                loading: false,
                errorMessages: action.payload
            }
        }
        default: {
            return state
        }
    }
}