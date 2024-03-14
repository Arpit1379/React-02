import {createContext, useEffect, useReducer} from 'react';
import reducers from '../Reducers/cartReducer';

const CartContext=createContext();

const initialState={
    isLoading:false,
    isError:false
}

export const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducers,initialState);

    useEffect(()=>{
       
    },[])

    return(
        <CartContext.Provider value={{...state}}>
            {children}
        </CartContext.Provider>
    );
}

export {CartContext};