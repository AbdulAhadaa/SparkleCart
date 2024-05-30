import styled from "styled-components";
import { useFiltercontext } from "../context/filterContext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice"; 

import { Button } from "../styles/Button";

const FilterSection = () => {
    const {
      filters: {text,category,color, price,minprice, maxprice},
      all_products,
      updateFilterValue,
      clearFilters
       
      
    }= useFiltercontext()

const getuniquedata =(data,property)=>{
let newVal = data.map((curElm)=>{
return curElm[property]

});
if(property==="colors"){
 newVal= newVal.flat()
 
}


return (newVal = ["All", ...new Set(newVal)])

}
const categoryonlydata = getuniquedata(all_products,"category") 
const companyonlydata = getuniquedata(all_products,"company") 
const colorsonlydata = getuniquedata(all_products,"colors") 
console.log(colorsonlydata)
  return (
    <Wrapper>


      <div className="filter-search">
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <input 
            type="text"
            name="text"
            value={text}
            onChange={updateFilterValue}
             />
        </form>
      </div>


      <div className="filter-category">
    <h3 style={{color:"#088F8F"}}>Category</h3>
    <div>
        {
            categoryonlydata.map((curElm,index)=>{
 return(
    <button 
    
    key={index} 
    type="button" 
    name="category" 

    

    value={curElm}
    
    onClick={updateFilterValue} >
{curElm}
    </button>
 )
            })
        }
        </div> 
      </div>
      

      <div className="filter-company">
    <h3 style={{color:"#088F8F"}}>Company</h3>
    <form action="#">
      <select 
      name="company" 
      id="company"
      className="filter-company--select"
      onClick={updateFilterValue}
      >
{
  companyonlydata.map((curElm,index)=>{
return(
<option key={index} value={curElm} name="company">
  {curElm}

</option>
)
  })
}
      </select>
    </form>
      </div>

      {/* <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorsonlydata.map((curcolor,index)=>{

   return (
   <button
   key={index}
   style={{backgroundColor:curcolor}}
   value={curcolor}
   name="color"
   type="button"
   className="btn-style"
   onClick={updateFilterValue}

   >
    {color === curcolor? "" : null}
    </button>)
          })}
        </div>
      </div> */}
      {/* <div className="filter-colors colors">
        <h3>  Colors</h3>
<div className="filter-color-style">
{
  colorsonlydata.map((curcolor,index)=>{
return(
  <button
  key={index}
  type="button"
  value={curcolor}
  name="color"
  style={{backgroundColor:curcolor}}
  className="btnStyle"
  onClick={updateFilterValue}
  
  >
    {color===curcolor? "" :null}
  </button>
)
  })
}
</div>
      </div> */}
       <div className="filter-colors colors">
        <h3 style={{color:"#088F8F"}}>Colors</h3>

        <div className="filter-color-style">
          {colorsonlydata.map((curColor, index) => {
            if (curColor === "All") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                 
                  onClick={updateFilterValue}>
                  all
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={updateFilterValue}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>

{/* <div className="filter_price">
  <h3>price</h3>
  <p>
{maxprice}
  </p>
<input 
type="range"
name="color"
onClick={updateFilterValue}
min={minprice}
max={maxprice}
value={price}

/>
</div> */}

<div className="filter_price" style={{color:"#088F8F"}}>
        <h3 >Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minprice}
          max={maxprice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>
      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection
