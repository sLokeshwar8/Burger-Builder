import React from 'react';

import classes from './Order.module.css';


const Order = (props) => {
    //object to an array convertion
    const ingredients = [];
    
    for(let ingredientName in props.ingredients){
        
        ingredients.push({
            name: ingredientName, 
            amount : props.ingredients[ingredientName]
        })
    }
    const ingredientsOutput = ingredients.map(ig => {
    return <span key={ig.name} 
        style={{
            border : '1px solid #ccc',
            margin: '0 8px',
            padding: '5px',
            textTransform : 'capitalize'

        }}>{ig.name} ({ig.amount})</span>
    })
    console.log(props)
        return (
            <div className={classes.Order}>
                <p>Ingredients: {ingredientsOutput}</p>
                <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            </div>
        )
}

export default Order;