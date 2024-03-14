import { createContext, useContext, useEffect, useReducer } from "react";
import reducers from "../Reducers/productReducers";
import axios from 'axios';

const ProductContext=createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState={
    isLoading:false,
    isError:false,
    FeaturedProduct:[],
    Products:[],
    SingleProduct:{}
}

const ProductProvider=({children})=>{
    const [state,dispatch]=useReducer(reducers,initialState);

    const getProducts=async(url)=>{
        dispatch({type:"SET_LOADING"});
        try {
            const response=await axios.get(url);
            const data=await response.data;
            dispatch({type:"SET_API_DATA",payload:data});

        } catch (error) {
            dispatch({type:"SET_ERROR"});

        }
    }

    useEffect(()=>{
        getProducts(API);
    },[])

    return (
        <ProductContext.Provider value={{...state}}> 
            {children}
        </ProductContext.Provider>
    )
}

const useProduct=()=>{
    return useContext(ProductContext);
}

export {ProductContext,useProduct,ProductProvider}