import React from 'react'
import './Item.css'

export const item = (props) => {
  return (
    <div className= 'item'>
        <img src={prop.image} alt="" />
        <p>{props.name}</p>
    </div>
  )
}
