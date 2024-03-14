const productReducer=(state,action)=>{
    switch(action.type){
        case "SET_LOADING":
            return{
                ...state,
                isLoading:true
            };

        case"SET_ERROR":
            return{
                ...state,
                isError:true,
                isLoading:false
            
        };
        case "SET_API_DATA":
            const featureData=action.payload.filter((currElem)=>{
                return currElem.featured===true;
            });

            return {
                ...state,
                isLoading:false,
                FeaturedProduct:featureData,
                Products:action.payload
            };
        default:
            return{
                ...state
            }
    }
}

export default productReducer;