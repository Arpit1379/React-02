import { createContext, useEffect, useReducer } from "react";
import reducers from "../Reducers/filterReducer";

const FilterContext=createContext();

const initialState={
    isLoading:false,
    isError:false,
    carts:[]
}

const FilterProvider=({children})=>{
    const [state,dispatch]=useReducer(reducers,initialState);

    useEffect(()=>{
    },[])

    return (
        <FilterContext.Provider>
            {children}
        </FilterContext.Provider>
    );
}

export {FilterContext,FilterProvider}