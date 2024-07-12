

 

const filterReducer=(state,action)=>{
switch(action.type){

case "LOAD_FILTER_PRODUCTS":

    let pricearr = action.payload.map((curElm)=>{
    return curElm.price
    })


let maxprice = Math.max(...pricearr)

    return{
        ...state,
        filter_Products:[...action.payload],
        all_products:[...action.payload],
        filters: { ...state.filters,maxprice,price:maxprice}

    }
case "set_grid_view":
    return{
        ...state,
        grid_View:true
    }
    case "set_list_view":
    return{
        ...state,
        grid_View:false
    }



    case "get_sort_value":
        
      
        return{
            ...state,
            sortingvalue: action.payload
        }
    
        
case "Sorting_Value":
    let newSortvalue;
    const { filter_Products,sortingvalue}= state
    let tempsortproducts= [...filter_Products]


    const Sortingproducts=(a,b)=>{
        if(sortingvalue==="a-z"){
            return a.name.localeCompare(b.name)
        }
        if(sortingvalue==="z-a"){
            return  b.name.localeCompare(a.name)
        }
        if(sortingvalue ==="lowest"){
            return  a.price - b.price;
        }
        if(sortingvalue ==="highest"){
            return  b.price - a.price;
        }
    }
  
    newSortvalue= tempsortproducts.sort(Sortingproducts)
  
    return{
        ...state,
        filter_Products: newSortvalue
    }

    
  case "UPDATE_FILTER_VALUE":

  const { name , value} = action.payload;

  return{
    ...state,
    filters:{
        ...state.filters,
        [name]:value
    },

  }
    case "UPDATE_FILTERS":
        
let {all_products} = state;
let tempfilterproducts = [...all_products]
const {text,category,company,color,price} = state.filters;

if(text){
    tempfilterproducts = tempfilterproducts.filter((curElm)=>{
     return curElm.name.toLowerCase().includes(text);
    })
}
if(category!=="All"){
   tempfilterproducts = tempfilterproducts.filter((curElm)=>{
    return  curElm.category === category;
   })
}
if(company!=="All"){
    tempfilterproducts = tempfilterproducts.filter((curElm)=>{
return curElm.company === company;
    })
}
if (color !== "All") {
    tempfilterproducts = tempfilterproducts.filter((curElem) =>
      curElem.colors.includes(color)
    );
  }
if(price===0){
    tempfilterproducts =tempfilterproducts.filter((curElm)=>
    curElm.price == price)
}
else{
    tempfilterproducts =tempfilterproducts.filter((curElm)=>
    curElm.price <= price)
}
return{
    ...state,
    filter_Products:tempfilterproducts
}
case "clear_filter":
    return{
        ...state,
        filters:{
            text : "",
            category:"All",
            company:"All",
            color:"All",
            price:state.filters.maxprice,
            minprice:state.filters.minprice,
            maxprice:state.filters.maxprice
        }
       
    }
    default:
        return state
}


}
export default filterReducer
