import { useEffect,createContext,useReducer,useContext } from "react";
 import { useProductContext } from "./productcontex";
 import reducer from "../reducer/filterreducer"
const FilterContext = createContext()

const initialState={

    filter_Products: [],
    all_products:[],
    grid_View:false,
    sortingvalue:"lowest",
    filters: {
        text : "",
        category:"All",
        company:"All",
        color:"All",
        price:0,
        minprice:0,
        maxprice:0
        }


}

export const Filtercontextprovider=({children})=>{

    const {products} = useProductContext()


    const [state,dispatch]=useReducer(reducer,initialState)

const sorting=(event)=>{
    let userValue = event.target.value
    return dispatch({type:"get_sort_value", payload: userValue})
    
}


    const setgridview=()=>{
        return dispatch({type:"set_grid_view"})
    }
    const setlistview=()=>{
        return dispatch({type:"set_list_view"})
    }

    const updateFilterValue =(event)=>{
let name = event.target.name;
let value =event.target.value;
return dispatch({type: "UPDATE_FILTER_VALUE",payload:{name,value}})
    }
const clearFilters =()=>{
    return dispatch({type:"clear_filter"})
}

useEffect(()=>{
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
},[products])

useEffect(()=>{
    dispatch({ type: "UPDATE_FILTERS" });
    dispatch({ type: "Sorting_Value" });
},[products,state.sortingvalue,state.filters])


return(
    <FilterContext.Provider value={{...state,setgridview,setlistview,sorting,updateFilterValue,clearFilters}}>
{children}
    </FilterContext.Provider>
)
}

export const  useFiltercontext=()=>{
    return useContext(FilterContext)
}