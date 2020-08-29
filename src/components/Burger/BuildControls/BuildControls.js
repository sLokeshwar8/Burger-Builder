import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Meat', type: 'meat'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'}
]

const BuildControls = (props) => {
    return (
            <div className={classes.BuildControls}>
                <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
                {controls.map(cltr => (
                    <BuildControl 
                        key={cltr.label} 
                        label={cltr.label} 
                        added={() => props.ingredientAdded(cltr.type)}
                        subtract={() => props.ingredientSubtract(cltr.type)}
                        disabled={props.disabled[cltr.type]}
                       />
                ))}
                <button disabled={!props.purchasable}
                 className={classes.OrderButton} onClick={props.ordered}>ORDER NOW</button>
            </div>
            );
}

export default BuildControls;