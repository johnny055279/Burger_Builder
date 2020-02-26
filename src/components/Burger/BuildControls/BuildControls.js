import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}> 
        {controls.map(ctrl => (
            <BuildControl key = {ctrl.label} 
                          label = {ctrl.label}
                          addIngredients = {() => props.ingredientAdd(ctrl.type)}
                          removeIngredients = {() => props.ingredientRemove(ctrl.type)}
                          disableBtn = {props.disableButton[ctrl.type]}/>
        ))}
    </div>
);

export default buildControls