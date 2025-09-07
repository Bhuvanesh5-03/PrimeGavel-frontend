import React from 'react'
import { useEffect, useState } from 'react'
const ProductDetail = (props) => {
  
  
  return (
    <div className='container bg-secondary mt-5'>
        <h2>Product Type - {props.l.ProductType}</h2>
        <h3>Product Name - {props.l.ProductName}</h3>
       <h4>Product Quantity - {props.l.ProductQuantity}</h4>
        <img src={props.l.Image} alt="Product"/>
        <h1>Price - </h1><h2>Increment price - </h2>
    </div>
  )
}

export default ProductDetail