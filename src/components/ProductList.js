import React from 'react'
import Grid_view from './gridview'
import List_view from './listview'
import { useFiltercontext } from '../context/filterContext'
const ProductList = () => {
    const {  filter_Products, grid_View} =useFiltercontext()

  if(grid_View){
    return <Grid_view products={filter_Products}/>
  }
  if(grid_View === false){
    return <List_view products={filter_Products}/>
  }
}

export default ProductList
